"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

import { WorkoutDay } from "@/lib/workouts/types";

import {
  saveDailyWorkoutProgress,
} from "@/lib/workouts/dailyWorkout";

type WorkoutContextType = {
  workoutStarted: boolean;

  workoutFinished: boolean;

  startTime: number | null;

  completedExercises: number;

  currentExercise: number;

  totalExercises: number;

  currentWorkout: WorkoutDay | null;

  completedExerciseIds: string[];

  startWorkout: (
    workout: WorkoutDay,
    uid?: string,
    workoutType?: string,
    initialCompletedExerciseIds?: string[],
    initialWorkoutFinished?: boolean
  ) => void;

  completeExercise: (
    exerciseId?: string
  ) => void;

  finishWorkout: () => void;
};

const WorkoutContext =
  createContext<WorkoutContextType | null>(
    null
  );

export function WorkoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    workoutStarted,
    setWorkoutStarted,
  ] = useState(false);

  const [
    workoutFinished,
    setWorkoutFinished,
  ] = useState(false);

  const [
    startTime,
    setStartTime,
  ] = useState<number | null>(null);

  const [
    completedExerciseIds,
    setCompletedExerciseIds,
  ] = useState<string[]>([]);

  const [
    currentWorkout,
    setCurrentWorkout,
  ] = useState<WorkoutDay | null>(null);

  /*
   * Firebase session information
   */

  const [activeUid, setActiveUid] =
    useState<string | null>(null);

  const [
    activeWorkoutType,
    setActiveWorkoutType,
  ] = useState<string | null>(null);

  /*
   * =========================================
   * START WORKOUT
   * =========================================
   */

  const startWorkout = useCallback(
    (
      workout: WorkoutDay,
      uid?: string,
      workoutType?: string,
      initialCompletedExerciseIds: string[] = [],
      initialWorkoutFinished = false
    ) => {
      setCurrentWorkout(workout);

      setWorkoutStarted(true);

      setWorkoutFinished(
        initialWorkoutFinished
      );

      setCompletedExerciseIds(
        initialCompletedExerciseIds
      );

      setStartTime(Date.now());

      /*
       * Save Firebase session details
       */

      setActiveUid(uid ?? null);

      setActiveWorkoutType(
        workoutType ?? null
      );
    },
    []
  );

  /*
   * =========================================
   * TOTAL EXERCISES
   * =========================================
   */

  const totalExercises =
    currentWorkout?.exercises.length ?? 0;

  /*
   * =========================================
   * COMPLETED COUNT
   * =========================================
   */

  const completedExercises =
    completedExerciseIds.filter((id) =>
      currentWorkout?.exercises.some(
        (exercise) =>
          exercise.id === id
      )
    ).length;

  /*
   * =========================================
   * CURRENT EXERCISE
   * =========================================
   */

  const currentExercise =
    currentWorkout
      ? (() => {
          const firstIncompleteIndex =
            currentWorkout.exercises.findIndex(
              (exercise) =>
                !completedExerciseIds.includes(
                  exercise.id
                )
            );

          if (
            firstIncompleteIndex === -1
          ) {
            return totalExercises;
          }

          return firstIncompleteIndex;
        })()
      : 0;

  /*
   * =========================================
   * COMPLETE / UNCOMPLETE EXERCISE
   * =========================================
   */

  const completeExercise = useCallback(
    (exerciseId?: string) => {
      if (!exerciseId) {
        return;
      }

      setCompletedExerciseIds(
        (previous) => {
          let nextIds: string[];

          /*
           * Already completed
           * → UNCOMPLETE
           */

          if (
            previous.includes(
              exerciseId
            )
          ) {
            nextIds = previous.filter(
              (id) =>
                id !== exerciseId
            );
          } else {
            /*
             * Not completed
             * → COMPLETE
             */

            nextIds = [
              ...previous,
              exerciseId,
            ];
          }

          /*
           * Check whether all exercises
           * are now complete.
           */

          const allCompleted =
            currentWorkout
              ? currentWorkout.exercises.every(
                  (exercise) =>
                    nextIds.includes(
                      exercise.id
                    )
                )
              : false;

          setWorkoutFinished(
            allCompleted
          );

          /*
           * Save to Firebase.
           *
           * We intentionally don't block
           * the UI while Firebase saves.
           */

          if (
            activeUid &&
            activeWorkoutType
          ) {
            saveDailyWorkoutProgress(
              activeUid,
              activeWorkoutType,
              nextIds,
              allCompleted
            ).catch((error) => {
              console.error(
                "Failed to save workout progress:",
                error
              );
            });
          }

          return nextIds;
        }
      );
    },
    [
      activeUid,
      activeWorkoutType,
      currentWorkout,
    ]
  );

  /*
   * =========================================
   * FINISH WORKOUT
   * =========================================
   */

  const finishWorkout = useCallback(
    () => {
      setWorkoutFinished(true);

      if (
        activeUid &&
        activeWorkoutType
      ) {
        saveDailyWorkoutProgress(
          activeUid,
          activeWorkoutType,
          completedExerciseIds,
          true
        ).catch((error) => {
          console.error(
            "Failed to save finished workout:",
            error
          );
        });
      }
    },
    [
      activeUid,
      activeWorkoutType,
      completedExerciseIds,
    ]
  );

  return (
    <WorkoutContext.Provider
      value={{
        workoutStarted,

        workoutFinished,

        startTime,

        completedExercises,

        currentExercise,

        totalExercises,

        currentWorkout,

        completedExerciseIds,

        startWorkout,

        completeExercise,

        finishWorkout,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context =
    useContext(WorkoutContext);

  if (!context) {
    throw new Error(
      "useWorkout must be used inside WorkoutProvider"
    );
  }

  return context;
}