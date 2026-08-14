import { WorkoutDay } from "./types";

/*
 * =========================================
 * ARMS + SHOULDERS WORKOUT
 * =========================================
 */

export function generateArmsShouldersWorkout(): WorkoutDay {
  return {
    id: crypto.randomUUID(),

    name: "Arms + Shoulders",

    estimatedDuration: 60,

    exercises: [
      {
        id: crypto.randomUUID(),

        name: "Seated Dumbbell Shoulder Press",

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
          "Controlled reps. Focus on shoulder stability.",
      },

      {
        id: crypto.randomUUID(),

        name: "Cable Lateral Raise",

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
          "Keep the movement controlled and avoid swinging.",
      },

      {
        id: crypto.randomUUID(),

        name: "Rear Delt Fly",

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
          "Focus on the rear delts rather than the upper traps.",
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

        rest: "75 sec",

        notes:
          "Keep elbows stable and avoid using momentum.",
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

        rest: "75 sec",

        notes:
          "Fully extend the elbows and control the return.",
      },

      {
        id: crypto.randomUUID(),

        name: "Hammer Curl",

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
        ],

        rest: "60 sec",

        notes:
          "Keep a neutral grip throughout the movement.",
      },

      {
        id: crypto.randomUUID(),

        name: "Overhead Rope Tricep Extension",

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
        ],

        rest: "60 sec",

        notes:
          "Keep elbows pointed forward and stretch the triceps.",
      },
    ],
  };
}