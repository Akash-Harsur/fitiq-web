import { Exercise } from "../exercises/types";
import { exerciseDatabase } from "../exercises";
import { WorkoutRule } from "../workout-rules/types";
import { WorkoutExercise } from "@/types/workout";

function shuffle<T>(array: T[]): T[] {
  const items = [...array];

  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

function convertExercise(
  exercise: Exercise,
  options?: {
    dropSet?: boolean;

    superset?: {
      id?: string;
      name: string;
      reps: number;
    };
  }
): WorkoutExercise {
  return {
    id: exercise.id,

    name: exercise.name,

    image: "/exercise-images/bench-press.png",

    // =========================
    // WARM-UP
    // =========================

    warmup: [
      {
        percent: 40,
        reps: 12,
      },
      {
        percent: 60,
        reps: 8,
      },
    ],

    // =========================
    // WORKING SETS
    // =========================

    workingSets: [
      {
        label: "Set 1",
        reps: 10,
      },
      {
        label: "Set 2",
        reps: 10,
      },
      {
        label: "Set 3",
        reps: 8,
      },
      {
        label: "Set 4",
        reps: 8,
      },
    ],

    // =========================
    // BACK-OFF SET
    // =========================

    backoff: {
      percent: 20,
      reps: 12,
    },

    // =========================
    // DROP SET
    // Only added when required
    // =========================

    ...(options?.dropSet
      ? {
          dropSet: [
            {
              percent: 20,
              reps: 8,
            },
            {
              percent: 20,
              reps: 8,
            },
          ],
        }
      : {}),

    // =========================
    // SUPERSET
    // Only added when required
    // =========================

    ...(options?.superset
      ? {
          superset: {
            id:
              options.superset.id ??
              `superset_${exercise.id}`,

            name: options.superset.name,

            reps: options.superset.reps,
          },
        }
      : {}),

    // =========================
    // REST
    // =========================

    rest: "90 sec",

    // =========================
    // NOTES
    // =========================

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
          convertExercise(exercise, {
            dropSet: rule.dropSet,

            superset: rule.superset
              ? {
                  id: `superset_${exercise.id}`,
                  name: rule.superset.name,
                  reps: rule.superset.reps,
                }
              : undefined,
          })
        )
      );
    }
  }

  return exercises;
}