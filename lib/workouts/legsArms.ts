import { WorkoutDay } from "./types";

/*
 * =========================================
 * LEGS + ARMS WORKOUT
 * =========================================
 *
 * Used by:
 *
 * - PPL + Arms
 *
 * Focus:
 * - Quads
 * - Hamstrings
 * - Glutes
 * - Calves
 * - Biceps
 * - Triceps
 */

export function generateLegsArmsWorkout(): WorkoutDay {
  return {
    id: crypto.randomUUID(),

    name: "Legs + Arms",

    estimatedDuration: 70,

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
            reps: 8,
          },
          {
            label: "Set 2",
            reps: 8,
          },
          {
            label: "Set 3",
            reps: 8,
          },
          {
            label: "Set 4",
            reps: 6,
          },
        ],

        backoff: {
          percent: 85,
          reps: 10,
        },

        rest: "120 sec",

        notes:
          "Controlled depth and consistent technique.",
      },

      {
        id: crypto.randomUUID(),

        name: "Leg Press",

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

        rest: "90 sec",

        notes:
          "Controlled eccentric and full range of motion.",
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
            reps: 10,
          },
          {
            label: "Set 3",
            reps: 8,
          },
        ],

        rest: "90 sec",

        notes:
          "Keep the back neutral and focus on hamstring stretch.",
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
            reps: 15,
          },
          {
            label: "Set 3",
            reps: 12,
          },
        ],

        rest: "60 sec",

        notes:
          "Squeeze the quads at the top of every rep.",
      },

      {
        id: crypto.randomUUID(),

        name: "Seated Leg Curl",

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
          "Control the weight throughout the full movement.",
      },

      {
        id: crypto.randomUUID(),

        name: "EZ Bar Curl",

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

        rest: "60 sec",

        notes:
          "Keep elbows stable and avoid momentum.",
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
          "Fully extend the elbows and control the return.",
      },
    ],
  };
}