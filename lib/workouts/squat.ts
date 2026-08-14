import { WorkoutDay } from "./types";

/*
 * =========================================
 * SQUAT WORKOUT
 * =========================================
 *
 * Powerbuilding / Strength focused Squat day.
 *
 * Structure:
 *
 * Warm-up:
 * 40% × 8
 * 60% × 5
 * 70% × 3
 *
 * Working:
 * 3 × 5
 *
 * Back-off:
 * 70% × 8
 *
 * The percentages are intended to be
 * calculated from the user's Training Max
 * when weight calculation is added later.
 */

export function generateSquatWorkout(): WorkoutDay {
  return {
    id: crypto.randomUUID(),

    name: "Squat Day",

    estimatedDuration: 60,

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
        ],

        backoff: {
          percent: 70,
          reps: 8,
        },

        notes:
          "Controlled reps. Keep your core braced and maintain consistent depth.",

        rest: "2–4 min",
      },
    ],
  };
}