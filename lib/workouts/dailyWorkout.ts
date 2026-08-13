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

  const workoutRef = doc(
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
 *
 * Reads today's saved progress from Firebase.
 */

export async function getDailyWorkoutProgress(
  uid: string,
  workoutType: string
): Promise<{
  completedExerciseIds: string[];
  workoutFinished: boolean;
}> {
  const dateKey =
    getTodayKey();

  const normalizedType =
    normalizeWorkoutType(
      workoutType
    );

  const workoutId =
    `${dateKey}_${normalizedType}`;

  const workoutRef = doc(
    db,
    "users",
    uid,
    "dailyWorkouts",
    workoutId
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
    };
  }

  const data =
    snapshot.data();

  /*
   * Safely read completed IDs.
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

  return {
    completedExerciseIds,
    workoutFinished:
      data.workoutFinished === true,
  };
}

/*
 * =========================================
 * SAVE EXERCISE PROGRESS
 * =========================================
 *
 * Called whenever an exercise is completed
 * or uncompleted.
 */

export async function saveDailyWorkoutProgress(
  uid: string,
  workoutType: string,
  completedExerciseIds: string[]
) {
  const dateKey =
    getTodayKey();

  const normalizedType =
    normalizeWorkoutType(
      workoutType
    );

  const workoutId =
    `${dateKey}_${normalizedType}`;

  const workoutRef = doc(
    db,
    "users",
    uid,
    "dailyWorkouts",
    workoutId
  );

  await updateDoc(
    workoutRef,
    {
      completedExerciseIds,
      updatedAt:
        serverTimestamp(),
    }
  );
}

/*
 * =========================================
 * COMPLETE DAILY WORKOUT
 * =========================================
 *
 * Called when every exercise is completed.
 */

export async function completeDailyWorkout(
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

  const workoutRef = doc(
    db,
    "users",
    uid,
    "dailyWorkouts",
    workoutId
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