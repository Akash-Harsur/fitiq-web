"use client";

import { createContext, useContext, useState } from "react";

import { WorkoutDay } from "@/lib/workouts/types";

type WorkoutContextType = {
  workoutStarted: boolean;

  workoutFinished: boolean;

  startTime: number | null;

  completedExercises: number;

  currentExercise: number;

  totalExercises: number;

  currentWorkout: WorkoutDay | null;

  startWorkout: (workout: WorkoutDay) => void;

  completeExercise: () => void;

  finishWorkout: () => void;
};

const WorkoutContext =
  createContext<WorkoutContextType | null>(null);

export function WorkoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [workoutStarted, setWorkoutStarted] =
    useState(false);

  const [workoutFinished, setWorkoutFinished] =
    useState(false);

  const [startTime, setStartTime] =
    useState<number | null>(null);

  const [completedExercises, setCompletedExercises] =
    useState(0);

  const [currentExercise, setCurrentExercise] =
    useState(0);

  const [totalExercises, setTotalExercises] =
    useState(0);

  const [currentWorkout, setCurrentWorkout] =
    useState<WorkoutDay | null>(null);

  function startWorkout(workout: WorkoutDay) {
    setCurrentWorkout(workout);

    setWorkoutStarted(true);

    setWorkoutFinished(false);

    setCompletedExercises(0);

    setCurrentExercise(0);

    setTotalExercises(workout.exercises.length);

    setStartTime(Date.now());
  }

  function completeExercise() {
    setCompletedExercises((prev) => prev + 1);

    setCurrentExercise((prev) => prev + 1);
  }

  function finishWorkout() {
    setWorkoutFinished(true);
  }

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
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error(
      "useWorkout must be used inside WorkoutProvider"
    );
  }

  return context;
}