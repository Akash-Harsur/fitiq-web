import { Exercise } from "../exercises/types";
import { exerciseDatabase } from "../exercises";
import {
  WorkoutRule,
  Rule,
} from "../workout-rules/types";
import { WorkoutExercise } from "@/types/workout";

function shuffle<T>(array: T[]): T[] {
  const items = [...array];

  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(
      Math.random() * (i + 1)
    );

    [items[i], items[j]] = [
      items[j],
      items[i],
    ];
  }

  return items;
}

function convertExercise(
  exercise: Exercise,
  rule: Rule
): WorkoutExercise {
  const workingSets = Array.from(
    {
      length: rule.workingSets.sets,
    },
    (_, index) => ({
      label: `Set ${index + 1}`,
      reps: rule.workingSets.reps,
    })
  );

  return {
    id: exercise.id,

    name: exercise.name,

    image:
      "/exercise-images/bench-press.png",

    warmup: rule.warmup?.map((set) => ({
      percent: set.percent,
      reps: set.reps,
    })),

    workingSets,

    backoff: rule.backoff
      ? {
          percent: rule.backoff.percent,
          reps: rule.backoff.reps,
        }
      : undefined,

    rest: rule.rest,

    notes: `${exercise.equipment} • ${exercise.category} • ${exercise.difficulty}`,

    expanded: false,
  };
}

export function generateWorkoutFromRule(
  workoutRule: WorkoutRule
): WorkoutExercise[] {
  const exercises: WorkoutExercise[] = [];

  for (const muscle of workoutRule.muscles) {
    const pool =
      exerciseDatabase[
        muscle.muscle as keyof typeof exerciseDatabase
      ];

    if (!pool) {
      continue;
    }

    for (const rule of muscle.rules) {
      const matches = shuffle(
        pool.filter(
          (exercise) =>
            exercise.movement === rule.movement
        )
      ).slice(0, rule.count);

      exercises.push(
        ...matches.map((exercise) =>
          convertExercise(
            exercise,
            rule
          )
        )
      );
    }
  }

  return exercises;
}