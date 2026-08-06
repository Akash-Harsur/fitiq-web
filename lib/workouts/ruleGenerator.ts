import { Exercise } from "../exercises/types";
import { exerciseDatabase } from "../exercises";
import { WorkoutRule } from "../workout-rules/types";

function shuffle<T>(array: T[]): T[] {
  const items = [...array];

  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

export function generateWorkoutFromRule(
  workoutRule: WorkoutRule
): Exercise[] {
  const exercises: Exercise[] = [];

  for (const muscle of workoutRule.muscles) {
    const pool =
      exerciseDatabase[
        muscle.muscle as keyof typeof exerciseDatabase
      ];

    for (const rule of muscle.rules) {
      const matches = shuffle(
        pool.filter(
          (exercise) =>
            exercise.movement === rule.movement
        )
      ).slice(0, rule.count);

      exercises.push(...matches);
    }
  }

  return exercises;
}