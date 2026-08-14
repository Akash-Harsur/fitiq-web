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
  saveDailyWorkoutSetResults,
  DailySetResult,
} from "@/lib/workouts/dailyWorkout";

/*
 * =========================================
 * SET RESULT
 * =========================================
 */

export type SetResult = DailySetResult;

/*
 * =========================================
 * WORKOUT CONTEXT TYPE
 * =========================================
 */

type WorkoutContextType = {
  workoutStarted: boolean;

  workoutFinished: boolean;

  startTime: number | null;

  completedExercises: number;

  currentExercise: number;

  totalExercises: number;

  currentWorkout: WorkoutDay | null;

  completedExerciseIds: string[];

  setResults: SetResult[];

  startWorkout: (
    workout: WorkoutDay,
    uid?: string,
    workoutType?: string,
    initialCompletedExerciseIds?: string[],
    initialWorkoutFinished?: boolean,
    initialSetResults?: SetResult[]
  ) => void;

  completeExercise: (
    exerciseId?: string
  ) => void;

  updateSetResult: (
    exerciseId: string,
    setIndex: number,
    updates: Partial<
      Pick<SetResult, "weight" | "reps">
    >
  ) => void;

  completeSet: (
    exerciseId: string,
    setIndex: number
  ) => void;

  uncompleteSet: (
    exerciseId: string,
    setIndex: number
  ) => void;

  finishWorkout: () => void;
};

/*
 * =========================================
 * CONTEXT
 * =========================================
 */

const WorkoutContext =
  createContext<WorkoutContextType | null>(
    null
  );

/*
 * =========================================
 * PROVIDER
 * =========================================
 */

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
   * =========================================
   * SET RESULTS
   * =========================================
   */

  const [
    setResults,
    setSetResults,
  ] = useState<SetResult[]>([]);

  /*
   * =========================================
   * ACTIVE FIREBASE SESSION
   * =========================================
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
      initialWorkoutFinished = false,
      initialSetResults: SetResult[] = []
    ) => {
      setCurrentWorkout(workout);

      setWorkoutStarted(true);

      setWorkoutFinished(
        initialWorkoutFinished
      );

      setCompletedExerciseIds(
        initialCompletedExerciseIds
      );

      /*
       * Restore saved set results.
       */

      setSetResults(
        initialSetResults
      );

      setStartTime(Date.now());

      /*
       * Firebase session details.
       */

      setActiveUid(
        uid ?? null
      );

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
   * COMPLETED EXERCISES
   * =========================================
   */

  const completedExercises =
    completedExerciseIds.filter(
      (id) =>
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
   * SAVE SET RESULTS
   * =========================================
   */

  const persistSetResults = useCallback(
    (results: SetResult[]) => {
      if (
        !activeUid ||
        !activeWorkoutType
      ) {
        return;
      }

      saveDailyWorkoutSetResults(
        activeUid,
        activeWorkoutType,
        results
      ).catch((error) => {
        console.error(
          "Failed to save set results:",
          error
        );
      });
    },
    [
      activeUid,
      activeWorkoutType,
    ]
  );

  /*
   * =========================================
   * UPDATE SET RESULT
   * =========================================
   */

  const updateSetResult =
    useCallback(
      (
        exerciseId: string,
        setIndex: number,
        updates: Partial<
          Pick<
            SetResult,
            "weight" | "reps"
          >
        >
      ) => {
        setSetResults(
          (previous) => {
            let nextResults: SetResult[];

            const existingIndex =
              previous.findIndex(
                (result) =>
                  result.exerciseId ===
                    exerciseId &&
                  result.setIndex ===
                    setIndex
              );

            /*
             * Existing set
             * → update it
             */

            if (
              existingIndex !== -1
            ) {
              nextResults =
                previous.map(
                  (result, index) =>
                    index ===
                    existingIndex
                      ? {
                          ...result,
                          ...updates,
                        }
                      : result
                );
            } else {
              /*
               * New set
               * → create it
               */

              nextResults = [
                ...previous,
                {
                  exerciseId,
                  setIndex,
                  weight:
                    updates.weight ??
                    null,
                  reps:
                    updates.reps ??
                    null,
                  completed: false,
                },
              ];
            }

            /*
             * Save immediately to Firebase.
             */

            persistSetResults(
              nextResults
            );

            return nextResults;
          }
        );
      },
      [persistSetResults]
    );

  /*
   * =========================================
   * COMPLETE SET
   * =========================================
   */

  const completeSet = useCallback(
    (
      exerciseId: string,
      setIndex: number
    ) => {
      setSetResults(
        (previous) => {
          let nextResults: SetResult[];

          const existingIndex =
            previous.findIndex(
              (result) =>
                result.exerciseId ===
                  exerciseId &&
                result.setIndex ===
                  setIndex
            );

          /*
           * Existing set
           * → mark completed
           */

          if (
            existingIndex !== -1
          ) {
            nextResults =
              previous.map(
                (result, index) =>
                  index ===
                  existingIndex
                    ? {
                        ...result,
                        completed: true,
                      }
                    : result
              );
          } else {
            /*
             * Set doesn't exist
             * → create completed set
             */

            nextResults = [
              ...previous,
              {
                exerciseId,
                setIndex,
                weight: null,
                reps: null,
                completed: true,
              },
            ];
          }

          /*
           * Save to Firebase.
           */

          persistSetResults(
            nextResults
          );

          return nextResults;
        }
      );
    },
    [persistSetResults]
  );

  /*
   * =========================================
   * UNCOMPLETE SET
   * =========================================
   */

  const uncompleteSet = useCallback(
    (
      exerciseId: string,
      setIndex: number
    ) => {
      setSetResults(
        (previous) => {
          const nextResults =
            previous.map(
              (result) =>
                result.exerciseId ===
                  exerciseId &&
                result.setIndex ===
                  setIndex
                  ? {
                      ...result,
                      completed: false,
                    }
                  : result
            );

          /*
           * Save to Firebase.
           */

          persistSetResults(
            nextResults
          );

          return nextResults;
        }
      );
    },
    [persistSetResults]
  );

  /*
   * =========================================
   * COMPLETE / UNCOMPLETE EXERCISE
   * =========================================
   */

  const completeExercise =
    useCallback(
      (exerciseId?: string) => {
        if (!exerciseId) {
          return;
        }

        setCompletedExerciseIds(
          (previous) => {
            let nextIds: string[];

            /*
             * Already completed
             * → uncomplete
             */

            if (
              previous.includes(
                exerciseId
              )
            ) {
              nextIds =
                previous.filter(
                  (id) =>
                    id !==
                    exerciseId
                );
            } else {
              /*
               * Not completed
               * → complete
               */

              nextIds = [
                ...previous,
                exerciseId,
              ];
            }

            /*
             * Check all exercises.
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
             * Save exercise progress
             * + current set results.
             */

            if (
              activeUid &&
              activeWorkoutType
            ) {
              saveDailyWorkoutProgress(
                activeUid,
                activeWorkoutType,
                nextIds,
                setResults
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
        setResults,
      ]
    );

  /*
   * =========================================
   * FINISH WORKOUT
   * =========================================
   */

  const finishWorkout =
    useCallback(
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
            setResults
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
        setResults,
      ]
    );

  /*
   * =========================================
   * PROVIDER
   * =========================================
   */

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

        setResults,

        startWorkout,

        completeExercise,

        updateSetResult,

        completeSet,

        uncompleteSet,

        finishWorkout,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

/*
 * =========================================
 * HOOK
 * =========================================
 */

export function useWorkout() {
  const context =
    useContext(
      WorkoutContext
    );

  if (!context) {
    throw new Error(
      "useWorkout must be used inside WorkoutProvider"
    );
  }

  return context;
}