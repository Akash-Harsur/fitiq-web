import { WorkoutDay } from "./types";

/*
 * =========================================
 * POWERBUILDING — SQUAT DAY
 * =========================================
 */

export function generateSquatWorkout(): WorkoutDay {
  return {
    id: crypto.randomUUID(),

    name: "Squat Day",

    estimatedDuration: 75,

    exercises: [
      {
        id: crypto.randomUUID(),

        name: "Back Squat",

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
            reps: 6,
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
          "Focus on strength, depth and consistent technique.",
      },

      {
        id: crypto.randomUUID(),

        name: "Leg Press",

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
          "Controlled reps with full range of motion.",
      },

      {
        id: crypto.randomUUID(),

        name: "Romanian Deadlift",

        image: "",

        workingSets: [
          {
            label: "Set 1",
            reps: 10,
          },
          {
            label: "Set 2",
            reps: 8,
          },
          {
            label: "Set 3",
            reps: 8,
          },
        ],

        rest: "120 sec",

        notes:
          "Focus on hamstring tension and controlled eccentric.",
      },

      {
        id: crypto.randomUUID(),

        name: "Leg Extension",

        image: "",

        workingSets: [
          {
            label: "Set 1",
            reps: 15,
          },
          {
            label: "Set 2",
            reps: 12,
          },
          {
            label: "Set 3",
            reps: 12,
          },
        ],

        rest: "60 sec",

        notes:
          "Controlled movement with a strong quad squeeze.",
      },

      {
        id: crypto.randomUUID(),

        name: "Standing Calf Raise",

        image: "",

        workingSets: [
          {
            label: "Set 1",
            reps: 15,
          },
          {
            label: "Set 2",
            reps: 15,
          },
          {
            label: "Set 3",
            reps: 12,
          },
        ],

        rest: "60 sec",

        notes:
          "Pause briefly at the top and stretch at the bottom.",
      },
    ],
  };
}