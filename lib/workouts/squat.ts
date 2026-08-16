import { WorkoutDay } from "./types";

/*
 * =========================================
 * POWERBUILDING — SQUAT DAY
 * =========================================
 */

export function generateSquatWorkout(): WorkoutDay {
  return {
    id: crypto.randomUUID(),

    name: "Squat + Lower Body",

    estimatedDuration: 75,

    exercises: [
      {
        id: crypto.randomUUID(),

        name: "Barbell Back Squat",

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
          {
            percent: 70,
            reps: 3,
          },
        ],

        workingSets: [
          {
            label: "Working Set 1",
            reps: 5,
          },
          {
            label: "Working Set 2",
            reps: 5,
          },
          {
            label: "Working Set 3",
            reps: 5,
          },
          {
            label: "Working Set 4",
            reps: 5,
          },
        ],

        backoff: {
          percent: 70,
          reps: 8,
        },

        rest: "2–4 min",

        notes:
          "Control the descent, brace your core and maintain consistent depth.",
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
          "Use a controlled descent and drive through the mid-foot.",
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

        rest: "120 sec",

        notes:
          "Keep the bar close and maintain tension through the hamstrings.",
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

        rest: "75 sec",

        notes:
          "Control both the lifting and lowering phases.",
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
          "Use a full stretch and controlled contraction.",
      },
    ],
  };
}