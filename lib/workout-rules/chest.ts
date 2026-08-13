import { WorkoutRule } from "./types";

export const chestRule: WorkoutRule = {
  name: "Chest Workout",

  muscles: [
    {
      muscle: "chest",

      rules: [
        {
          movement: "horizontal-press",
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
          movement: "incline-press",
          count: 2,

          warmup: [
            {
              percent: 40,
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
          movement: "fly",
          count: 2,

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
  ],
};