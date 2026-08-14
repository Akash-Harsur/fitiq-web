import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { getWorkoutByType } from "@/lib/workouts/scheduler";
import { WorkoutDay } from "@/lib/workouts/types";

/*
 * =========================================
 * SET RESULT TYPE
 * =========================================
 */

export type DailySetResult = {
  exerciseId: string;
  setIndex: number;
  weight: number | null;
  reps: number | null;
  completed: boolean;
};

/*
 * =========================================
 * FIREBASE-SAFE OBJECT
 * =========================================
 */

function removeUndefined<T>(value: T): T {
  if (Array.isArray(value)) {
    return value
      .filter(
        (item) => item !== undefined
      )
      .map((item) =>
        removeUndefined(item)
      ) as T;
  }

  if (
    value !== null &&
    typeof value === "object"
  ) {
    const result: Record<
      string,
      unknown
    > = {};

    Object.entries(
      value as Record<string, unknown>
    ).forEach(([key, item]) => {
      if (item !== undefined) {
        result[key] =
          removeUndefined(item);
      }
    });

    return result as T;
  }

  return value;
}

/*
 * =========================================
 * TODAY DATE
 * =========================================
 */

function getTodayKey() {
  const now = new Date();

  const year =
    now.getFullYear();

  const month = String(
    now.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    now.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/*
 * =========================================
 * NORMALIZE WORKOUT TYPE
 * =========================================
 */

function normalizeWorkoutType(
  workoutType: string
) {
  return workoutType.replace(
    /[^a-zA-Z0-9-_]/g,
    "-"
  );
}

/*
 * =========================================
 * GET WORKOUT DOCUMENT REF
 * =========================================
 */

function getDailyWorkoutRef(
  uid: string,
  workoutType: string
) {
  const dateKey =
    getTodayKey();

  const normalizedType =
    normalizeWorkoutType(
      workoutType
    );

  const workoutId =
    `${dateKey}_${normalizedType}`;

  return doc(
    db,
    "users",
    uid,
    "dailyWorkouts",
    workoutId
  );
}

/*
 * =========================================
 * GET OR CREATE DAILY WORKOUT
 * =========================================
 */

export async function getOrCreateDailyWorkout(
  uid: string,
  workoutType: string
): Promise<WorkoutDay> {
  const dateKey =
    getTodayKey();

  const normalizedType =
    normalizeWorkoutType(
      workoutType
    );

  const workoutId =
    `${dateKey}_${normalizedType}`;

  const workoutRef =
    doc(
      db,
      "users",
      uid,
      "dailyWorkouts",
      workoutId
    );

  /*
   * Check Firebase first.
   */

  const existingWorkout =
    await getDoc(workoutRef);

  if (existingWorkout.exists()) {
    const data =
      existingWorkout.data();

    return data.workout as WorkoutDay;
  }

  /*
   * Generate workout.
   */

  const workout =
    getWorkoutByType(
      workoutType
    );

  /*
   * Remove undefined values.
   */

  const firebaseSafeWorkout =
    removeUndefined(workout);

  /*
   * Save workout.
   */

  await setDoc(workoutRef, {
    workout:
      firebaseSafeWorkout,

    workoutType,

    date: dateKey,

    workoutFinished: false,

    completedExerciseIds: [],

    /*
     * Set-level tracking.
     */

    setResults: [],

    createdAt:
      serverTimestamp(),

    updatedAt:
      serverTimestamp(),
  });

  return firebaseSafeWorkout;
}

/*
 * =========================================
 * GET DAILY WORKOUT PROGRESS
 * =========================================
 */

export async function getDailyWorkoutProgress(
  uid: string,
  workoutType: string
): Promise<{
  completedExerciseIds: string[];
  workoutFinished: boolean;
  setResults: DailySetResult[];
}> {
  const workoutRef =
    getDailyWorkoutRef(
      uid,
      workoutType
    );

  const snapshot =
    await getDoc(workoutRef);

  /*
   * No document yet.
   */

  if (!snapshot.exists()) {
    return {
      completedExerciseIds: [],
      workoutFinished: false,
      setResults: [],
    };
  }

  const data =
    snapshot.data();

  /*
   * Completed exercises.
   */

  const completedExerciseIds =
    Array.isArray(
      data.completedExerciseIds
    )
      ? data.completedExerciseIds.filter(
          (id): id is string =>
            typeof id === "string"
        )
      : [];

  /*
   * Set results.
   */

  const setResults: DailySetResult[] =
    Array.isArray(
      data.setResults
    )
      ? data.setResults
          .filter(
            (result) =>
              result &&
              typeof result ===
                "object"
          )
          .map((result) => ({
            exerciseId:
              typeof result.exerciseId ===
              "string"
                ? result.exerciseId
                : "",

            setIndex:
              typeof result.setIndex ===
              "number"
                ? result.setIndex
                : 0,

            weight:
              typeof result.weight ===
              "number"
                ? result.weight
                : null,

            reps:
              typeof result.reps ===
              "number"
                ? result.reps
                : null,

            completed:
              result.completed ===
              true,
          }))
          .filter(
            (result) =>
              result.exerciseId !== ""
          )
      : [];

  return {
    completedExerciseIds,

    workoutFinished:
      data.workoutFinished ===
      true,

    setResults,
  };
}

/*
 * =========================================
 * SAVE EXERCISE PROGRESS
 * =========================================
 */

export async function saveDailyWorkoutProgress(
  uid: string,
  workoutType: string,
  completedExerciseIds: string[],
  setResults?: DailySetResult[]
) {
  const workoutRef =
    getDailyWorkoutRef(
      uid,
      workoutType
    );

  await updateDoc(
    workoutRef,
    {
      completedExerciseIds,

      /*
       * Save set results when supplied.
       */

      ...(setResults
        ? {
            setResults:
              removeUndefined(
                setResults
              ),
          }
        : {}),

      updatedAt:
        serverTimestamp(),
    }
  );
}

/*
 * =========================================
 * SAVE SET RESULTS
 * =========================================
 *
 * Called whenever weight/reps/set
 * completion changes.
 */

export async function saveDailyWorkoutSetResults(
  uid: string,
  workoutType: string,
  setResults: DailySetResult[]
) {
  const workoutRef =
    getDailyWorkoutRef(
      uid,
      workoutType
    );

  await updateDoc(
    workoutRef,
    {
      setResults:
        removeUndefined(
          setResults
        ),

      updatedAt:
        serverTimestamp(),
    }
  );
}

/*
 * =========================================
 * COMPLETE DAILY WORKOUT
 * =========================================
 */

export async function completeDailyWorkout(
  uid: string,
  workoutType: string
) {
  const workoutRef =
    getDailyWorkoutRef(
      uid,
      workoutType
    );

  await updateDoc(
    workoutRef,
    {
      workoutFinished: true,

      completedAt:
        serverTimestamp(),

      updatedAt:
        serverTimestamp(),
    }
  );
}