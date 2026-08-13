import { WorkoutRule } from "./types";

export const lowerRule: WorkoutRule = {
  name: "Lower Body",

  muscles: [
    {
      muscle: "legs",

      rules: [
        {
          movement: "squat",
          count: 2,

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

          workingSets: {
            sets: 4,
            reps: 8,
          },

          backoff: {
            percent: 15,
            reps: 10,
          },

          rest: "120 sec",
        },

        {
          movement: "hip-hinge",
          count: 1,

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

          workingSets: {
            sets: 3,
            reps: 8,
          },

          backoff: {
            percent: 15,
            reps: 10,
          },

          rest: "120 sec",
        },

        {
          movement: "leg-curl",
          count: 1,

          warmup: [
            {
              percent: 50,
              reps: 10,
            },
          ],

          workingSets: {
            sets: 3,
            reps: 10,
          },

          backoff: {
            percent: 15,
            reps: 12,
          },

          rest: "90 sec",
        },

        {
          movement: "calf",
          count: 1,

          warmup: [
            {
              percent: 50,
              reps: 12,
            },
          ],

          workingSets: {
            sets: 3,
            reps: 12,
          },

          backoff: {
            percent: 15,
            reps: 15,
          },

          rest: "60 sec",
        },
      ],
    },

    {
      muscle: "core",

      rules: [
        {
          movement: "core",
          count: 2,

          workingSets: {
            sets: 3,
            reps: 12,
          },

          rest: "60 sec",
        },
      ],
    },
  ],
};