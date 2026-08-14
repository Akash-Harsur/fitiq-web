import { WorkoutDay } from "./types";

/*
 * =========================================
 * POWERBUILDING — DEADLIFT DAY
 * =========================================
 */

export function generateDeadliftWorkout(): WorkoutDay {
  return {
    id: crypto.randomUUID(),

    name: "Deadlift Day",

    estimatedDuration: 75,

    exercises: [
      {
        id: crypto.randomUUID(),

        name: "Conventional Deadlift",

        image: "",

        warmup: [
          {
            percent: 40,
            reps: 8,
          },
          {
            percent: 60,
            reps: 5,
          },
        ],

        workingSets: [
          {
            label: "Set 1",
            reps: 5,
          },
          {
            label: "Set 2",
            reps: 5,
          },
          {
            label: "Set 3",
            reps: 4,
          },
        ],

        backoff: {
          percent: 85,
          reps: 6,
        },

        rest: "180 sec",

        notes:
          "Brace hard, keep the bar close and maintain a neutral spine.",
      },

      {
        id: crypto.randomUUID(),

        name: "Hack Squat",

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
          "Controlled descent with strong quad drive.",
      },

      {
        id: crypto.randomUUID(),

        name: "Seated Leg Curl",

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
          "Keep tension on the hamstrings throughout the movement.",
      },

      {
        id: crypto.randomUUID(),

        name: "Barbell Row",

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
          "Maintain a stable torso and drive the elbows back.",
      },

      {
        id: crypto.randomUUID(),

        name: "Hanging Leg Raise",

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
          "Control the movement and avoid swinging.",
      },
    ],
  };
}