"use client";

import { createContext, useContext, useState } from "react";

type WorkoutContextType = {
  workoutStarted: boolean;

  workoutFinished: boolean;

  startTime: number | null;

  completedExercises: number;

  currentExercise: number;

  totalExercises: number;

  startWorkout: (totalExercises: number) => void;

  completeExercise: () => void;

  finishWorkout: () => void;
};

const WorkoutContext = createContext<WorkoutContextType | null>(null);

export function WorkoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [workoutStarted, setWorkoutStarted] = useState(false);

  const [workoutFinished, setWorkoutFinished] = useState(false);

  const [startTime, setStartTime] = useState<number | null>(null);

  const [completedExercises, setCompletedExercises] = useState(0);

  const [currentExercise, setCurrentExercise] = useState(0);

  const [totalExercises, setTotalExercises] = useState(0);

  function startWorkout(total: number) {
    setWorkoutStarted(true);

    setWorkoutFinished(false);

    setCompletedExercises(0);

    setCurrentExercise(0);

    setTotalExercises(total);

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
    throw new Error("useWorkout must be used inside WorkoutProvider");
  }

  return context;
}