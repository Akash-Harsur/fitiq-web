import { Exercise } from "../exercises/types";
import { exerciseDatabase } from "../exercises";
import { WorkoutDay } from "./types";

type MuscleKey = keyof typeof exerciseDatabase;

function shuffle<T>(array: T[]): T[] {
  const items = [...array];

  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

function getExercises(
  muscle: MuscleKey,
  count: number,
  exclude: string[] = []
): Exercise[] {
  const pool = exerciseDatabase[muscle].filter(
    (exercise) => !exclude.includes(exercise.id)
  );

  return shuffle(pool).slice(0, count);
}

export function generatePushWorkout(): WorkoutDay {
  const exercises: Exercise[] = [];

  exercises.push(...getExercises("chest", 2));

  exercises.push(...getExercises("shoulders", 2));

  exercises.push(...getExercises("triceps", 2));

  return {
    id: crypto.randomUUID(),

    name: "Push Day",

    estimatedDuration: 60,

    exercises,
  };
}

export function generatePullWorkout(): WorkoutDay {
  const exercises: Exercise[] = [];

  exercises.push(...getExercises("back", 3));

  exercises.push(...getExercises("biceps", 2));

  exercises.push(...getExercises("core", 1));

  return {
    id: crypto.randomUUID(),

    name: "Pull Day",

    estimatedDuration: 60,

    exercises,
  };
}

export function generateLegWorkout(): WorkoutDay {
  const exercises: Exercise[] = [];

  exercises.push(...getExercises("legs", 5));

  exercises.push(...getExercises("core", 1));

  return {
    id: crypto.randomUUID(),

    name: "Leg Day",

    estimatedDuration: 70,

    exercises,
  };
}

export function generateUpperWorkout(): WorkoutDay {
  const exercises: Exercise[] = [];

  exercises.push(...getExercises("chest", 2));
  exercises.push(...getExercises("back", 2));
  exercises.push(...getExercises("shoulders", 1));
  exercises.push(...getExercises("biceps", 1));

  return {
    id: crypto.randomUUID(),
    name: "Upper Body",
    estimatedDuration: 60,
    exercises,
  };
}

export function generateLowerWorkout(): WorkoutDay {
  const exercises: Exercise[] = [];

  exercises.push(...getExercises("legs", 5));
  exercises.push(...getExercises("core", 1));

  return {
    id: crypto.randomUUID(),
    name: "Lower Body",
    estimatedDuration: 60,
    exercises,
  };
}