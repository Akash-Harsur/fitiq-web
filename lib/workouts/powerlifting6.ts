import { WorkoutDay } from "./types";

/*
 * =========================================
 * POWERLIFTING — 6 DAY
 * =========================================
 *
 * Monday:
 * Squat + Bench
 *
 * Tuesday:
 * Deadlift + Bench
 *
 * Wednesday:
 * Squat
 *
 * Thursday:
 * Bench + Squat Variation
 *
 * Friday:
 * Deadlift + Bench
 *
 * Saturday:
 * Squat + Bench Variation
 *
 * Sunday:
 * Rest
 */

export function generatePowerlifting6Workout(
  dayIndex: number
): WorkoutDay {
  const days = [
    generateSquatBenchHeavy,
    generateDeadliftBenchVolume,
    generateSquatVolume,
    generateBenchSquatVariation,
    generateDeadliftBenchTechnique,
    generateSquatBenchVariation,
  ];

  const generator =
    days[dayIndex] ?? generateSquatBenchHeavy;

  return generator();
}

/*
 * =========================================
 * MONDAY
 * SQUAT + BENCH
 * =========================================
 */

function generateSquatBenchHeavy(): WorkoutDay {
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
          { percent: 40, reps: 8 },
          { percent: 60, reps: 5 },
          { percent: 70, reps: 3 },
        ],

        workingSets: [
          { label: "Working Set 1", reps: 5 },
          { label: "Working Set 2", reps: 5 },
          { label: "Working Set 3", reps: 5 },
          { label: "Working Set 4", reps: 5 },
        ],

        backoff: {
          percent: 70,
          reps: 8,
        },

        rest: "3–4 min",

        notes:
          "Heavy strength-focused squat work. Maintain consistent technique.",
      },

      {
        id: crypto.randomUUID(),

        name: "Barbell Bench Press",

        image: "",

        warmup: [
          { percent: 40, reps: 10 },
          { percent: 60, reps: 6 },
        ],

        workingSets: [
          { label: "Working Set 1", reps: 6 },
          { label: "Working Set 2", reps: 6 },
          { label: "Working Set 3", reps: 5 },
          { label: "Working Set 4", reps: 5 },
        ],

        backoff: {
          percent: 80,
          reps: 8,
        },

        rest: "3 min",

        notes:
          "Keep your upper back tight and maintain a consistent bar path.",
      },
    ],
  };
}

/*
 * =========================================
 * TUESDAY
 * DEADLIFT + BENCH
 * =========================================
 */

function generateDeadliftBenchVolume(): WorkoutDay {
  return {
    id: crypto.randomUUID(),

    name: "Powerlifting — Deadlift + Bench",

    estimatedDuration: 85,

    exercises: [
      {
        id: crypto.randomUUID(),

        name: "Conventional Deadlift",

        image: "",

        warmup: [
          { percent: 40, reps: 8 },
          { percent: 60, reps: 5 },
        ],

        workingSets: [
          { label: "Working Set 1", reps: 5 },
          { label: "Working Set 2", reps: 5 },
          { label: "Working Set 3", reps: 4 },
        ],

        backoff: {
          percent: 70,
          reps: 6,
        },

        rest: "3–4 min",

        notes:
          "Focus on position, bracing and keeping the bar close.",
      },

      {
        id: crypto.randomUUID(),

        name: "Barbell Bench Press",

        image: "",

        workingSets: [
          { label: "Set 1", reps: 8 },
          { label: "Set 2", reps: 8 },
          { label: "Set 3", reps: 8 },
        ],

        rest: "2–3 min",

        notes:
          "Volume-focused bench work. Keep every rep controlled.",
      },

      {
        id: crypto.randomUUID(),

        name: "Chest Supported Row",

        image: "",

        workingSets: [
          { label: "Set 1", reps: 10 },
          { label: "Set 2", reps: 10 },
          { label: "Set 3", reps: 8 },
        ],

        rest: "90 sec",

        notes:
          "Build upper-back strength for better bench stability.",
      },
    ],
  };
}

/*
 * =========================================
 * WEDNESDAY
 * SQUAT VOLUME
 * =========================================
 */

function generateSquatVolume(): WorkoutDay {
  return {
    id: crypto.randomUUID(),

    name: "Powerlifting — Squat Volume",

    estimatedDuration: 65,

    exercises: [
      {
        id: crypto.randomUUID(),

        name: "Barbell Back Squat",

        image: "",

        warmup: [
          { percent: 40, reps: 8 },
          { percent: 60, reps: 5 },
        ],

        workingSets: [
          { label: "Set 1", reps: 6 },
          { label: "Set 2", reps: 6 },
          { label: "Set 3", reps: 6 },
        ],

        backoff: {
          percent: 65,
          reps: 8,
        },

        rest: "3 min",

        notes:
          "Volume-focused squat session. Prioritize clean technique.",
      },

      {
        id: crypto.randomUUID(),

        name: "Romanian Deadlift",

        image: "",

        workingSets: [
          { label: "Set 1", reps: 10 },
          { label: "Set 2", reps: 10 },
          { label: "Set 3", reps: 8 },
        ],

        rest: "120 sec",

        notes:
          "Controlled eccentric and strong hamstring tension.",
      },

      {
        id: crypto.randomUUID(),

        name: "Hanging Leg Raise",

        image: "",

        workingSets: [
          { label: "Set 1", reps: 15 },
          { label: "Set 2", reps: 12 },
          { label: "Set 3", reps: 12 },
        ],

        rest: "60 sec",

        notes:
          "Control the movement without swinging.",
      },
    ],
  };
}

/*
 * =========================================
 * THURSDAY
 * BENCH + SQUAT VARIATION
 * =========================================
 */

function generateBenchSquatVariation(): WorkoutDay {
  return {
    id: crypto.randomUUID(),

    name: "Powerlifting — Bench + Squat Variation",

    estimatedDuration: 75,

    exercises: [
      {
        id: crypto.randomUUID(),

        name: "Paused Bench Press",

        image: "",

        warmup: [
          { percent: 40, reps: 10 },
          { percent: 60, reps: 6 },
        ],

        workingSets: [
          { label: "Set 1", reps: 5 },
          { label: "Set 2", reps: 5 },
          { label: "Set 3", reps: 5 },
        ],

        backoff: {
          percent: 70,
          reps: 8,
        },

        rest: "2–3 min",

        notes:
          "Pause briefly on the chest before pressing.",
      },

      {
        id: crypto.randomUUID(),

        name: "Paused Squat",

        image: "",

        warmup: [
          { percent: 40, reps: 8 },
          { percent: 60, reps: 5 },
        ],

        workingSets: [
          { label: "Set 1", reps: 5 },
          { label: "Set 2", reps: 5 },
          { label: "Set 3", reps: 5 },
        ],

        rest: "3 min",

        notes:
          "Pause at the bottom while maintaining a strong brace.",
      },

      {
        id: crypto.randomUUID(),

        name: "Lat Pulldown",

        image: "",

        workingSets: [
          { label: "Set 1", reps: 12 },
          { label: "Set 2", reps: 10 },
          { label: "Set 3", reps: 10 },
        ],

        rest: "90 sec",

        notes:
          "Control the eccentric and keep your torso stable.",
      },
    ],
  };
}

/*
 * =========================================
 * FRIDAY
 * DEADLIFT + BENCH
 * =========================================
 */

function generateDeadliftBenchTechnique(): WorkoutDay {
  return {
    id: crypto.randomUUID(),

    name: "Powerlifting — Deadlift + Bench",

    estimatedDuration: 75,

    exercises: [
      {
        id: crypto.randomUUID(),

        name: "Conventional Deadlift",

        image: "",

        warmup: [
          { percent: 40, reps: 8 },
          { percent: 60, reps: 5 },
        ],

        workingSets: [
          { label: "Set 1", reps: 4 },
          { label: "Set 2", reps: 4 },
          { label: "Set 3", reps: 4 },
        ],

        backoff: {
          percent: 70,
          reps: 6,
        },

        rest: "3–4 min",

        notes:
          "Focus on efficient technique and controlled reps.",
      },

      {
        id: crypto.randomUUID(),

        name: "Barbell Bench Press",

        image: "",

        workingSets: [
          { label: "Set 1", reps: 6 },
          { label: "Set 2", reps: 6 },
          { label: "Set 3", reps: 6 },
        ],

        rest: "2–3 min",

        notes:
          "Smooth bar path and consistent setup on every rep.",
      },

      {
        id: crypto.randomUUID(),

        name: "Barbell Row",

        image: "",

        workingSets: [
          { label: "Set 1", reps: 10 },
          { label: "Set 2", reps: 8 },
          { label: "Set 3", reps: 8 },
        ],

        rest: "120 sec",

        notes:
          "Maintain a stable torso and drive the elbows back.",
      },
    ],
  };
}

/*
 * =========================================
 * SATURDAY
 * SQUAT + BENCH VARIATION
 * =========================================
 */

function generateSquatBenchVariation(): WorkoutDay {
  return {
    id: crypto.randomUUID(),

    name: "Powerlifting — Squat + Bench Variation",

    estimatedDuration: 75,

    exercises: [
      {
        id: crypto.randomUUID(),

        name: "Barbell Back Squat",

        image: "",

        workingSets: [
          { label: "Set 1", reps: 5 },
          { label: "Set 2", reps: 5 },
          { label: "Set 3", reps: 5 },
        ],

        rest: "3 min",

        notes:
          "Keep this session controlled and avoid unnecessary fatigue.",
      },

      {
        id: crypto.randomUUID(),

        name: "Close Grip Bench Press",

        image: "",

        workingSets: [
          { label: "Set 1", reps: 8 },
          { label: "Set 2", reps: 8 },
          { label: "Set 3", reps: 8 },
        ],

        rest: "2–3 min",

        notes:
          "Use a controlled descent and keep elbows comfortably tucked.",
      },

      {
        id: crypto.randomUUID(),

        name: "Cable Row",

        image: "",

        workingSets: [
          { label: "Set 1", reps: 12 },
          { label: "Set 2", reps: 10 },
          { label: "Set 3", reps: 10 },
        ],

        rest: "90 sec",

        notes:
          "Focus on upper-back control and avoid excessive momentum.",
      },
    ],
  };
}