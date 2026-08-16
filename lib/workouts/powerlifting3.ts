import { WorkoutDay } from "./types";

/*
 * =========================================
 * POWERLIFTING — 3 DAY
 * =========================================
 *
 * Focus:
 * Squat + Bench + Deadlift strength
 *
 * Monday:
 * Squat + Bench
 *
 * Wednesday:
 * Bench + Deadlift
 *
 * Friday:
 * Squat + Deadlift
 */

export function generatePowerlifting3Workout(
  dayIndex: number
): WorkoutDay {
  const days = [
    generateSquatBenchDay,
    generateBenchDeadliftDay,
    generateSquatDeadliftDay,
  ];

  const generator =
    days[dayIndex] ?? generateSquatBenchDay;

  return generator();
}

/*
 * =========================================
 * MONDAY
 * SQUAT + BENCH
 * =========================================
 */

function generateSquatBenchDay(): WorkoutDay {
  return {
    id: crypto.randomUUID(),

    name: "Powerlifting — Squat + Bench",

    estimatedDuration: 90,

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

        rest: "3–4 min",

        notes:
          "Focus on consistent depth, bracing and controlled technique.",
      },

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
            label: "Working Set 1",
            reps: 6,
          },
          {
            label: "Working Set 2",
            reps: 6,
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
          percent: 80,
          reps: 8,
        },

        rest: "3 min",

        notes:
          "Keep your upper back tight and maintain a consistent bar path.",
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

        rest: "90 sec",

        notes:
          "Build upper-back strength to support your bench and squat setup.",
      },
    ],
  };
}

/*
 * =========================================
 * WEDNESDAY
 * BENCH + DEADLIFT
 * =========================================
 */

function generateBenchDeadliftDay(): WorkoutDay {
  return {
    id: crypto.randomUUID(),

    name: "Powerlifting — Bench + Deadlift",

    estimatedDuration: 90,

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
        ],

        backoff: {
          percent: 75,
          reps: 8,
        },

        rest: "3 min",

        notes:
          "Pause briefly on the chest and press with control.",
      },

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
            reps: 4,
          },
        ],

        backoff: {
          percent: 75,
          reps: 6,
        },

        rest: "3–4 min",

        notes:
          "Brace hard, keep the bar close and maintain a neutral spine.",
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
          "Build upper-back strength while maintaining controlled reps.",
      },
    ],
  };
}

/*
 * =========================================
 * FRIDAY
 * SQUAT + DEADLIFT
 * =========================================
 */

function generateSquatDeadliftDay(): WorkoutDay {
  return {
    id: crypto.randomUUID(),

    name: "Powerlifting — Squat + Deadlift",

    estimatedDuration: 90,

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
        ],

        workingSets: [
          {
            label: "Working Set 1",
            reps: 6,
          },
          {
            label: "Working Set 2",
            reps: 6,
          },
          {
            label: "Working Set 3",
            reps: 6,
          },
        ],

        backoff: {
          percent: 65,
          reps: 8,
        },

        rest: "3–4 min",

        notes:
          "Keep the reps controlled and focus on consistent technique.",
      },

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
        ],

        backoff: {
          percent: 70,
          reps: 6,
        },

        rest: "3–4 min",

        notes:
          "Keep the bar close and avoid losing position as fatigue increases.",
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