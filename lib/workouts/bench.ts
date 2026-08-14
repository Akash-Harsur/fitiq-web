import { WorkoutDay } from "./types";

/*
 * =========================================
 * POWERBUILDING — BENCH DAY
 * =========================================
 */

export function generateBenchWorkout(): WorkoutDay {
  return {
    id: crypto.randomUUID(),

    name: "Bench Press Day",

    estimatedDuration: 75,

    exercises: [
      {
        id: crypto.randomUUID(),

        name: "Barbell Bench Press",

        image: "",

        warmup: [
          {
            percent: 40,
            reps: 10,
          },
          {
            percent: 60,
            reps: 6,
          },
        ],

        workingSets: [
          {
            label: "Set 1",
            reps: 6,
          },
          {
            label: "Set 2",
            reps: 6,
          },
          {
            label: "Set 3",
            reps: 5,
          },
          {
            label: "Set 4",
            reps: 5,
          },
        ],

        backoff: {
          percent: 85,
          reps: 8,
        },

        rest: "180 sec",

        notes:
          "Focus on controlled descent, stable setup and strong press.",
      },

      {
        id: crypto.randomUUID(),

        name: "Incline Dumbbell Press",

        image: "",

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
        ],

        rest: "120 sec",

        notes:
          "Control the dumbbells and maintain a stable shoulder position.",
      },

      {
        id: crypto.randomUUID(),

        name: "Chest Supported Row",

        image: "",

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
        ],

        rest: "120 sec",

        notes:
          "Drive the elbows back and avoid excessive momentum.",
      },

      {
        id: crypto.randomUUID(),

        name: "Lat Pulldown",

        image: "",

        workingSets: [
          {
            label: "Set 1",
            reps: 12,
          },
          {
            label: "Set 2",
            reps: 10,
          },
          {
            label: "Set 3",
            reps: 10,
          },
        ],

        rest: "90 sec",

        notes:
          "Pull toward the upper chest and control the return.",
      },

      {
        id: crypto.randomUUID(),

        name: "Rope Tricep Pushdown",

        image: "",

        workingSets: [
          {
            label: "Set 1",
            reps: 12,
          },
          {
            label: "Set 2",
            reps: 12,
          },
          {
            label: "Set 3",
            reps: 10,
          },
        ],

        rest: "60 sec",

        notes:
          "Keep elbows stable and fully extend the arms.",
      },
    ],
  };
}