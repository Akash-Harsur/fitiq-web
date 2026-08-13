import { WorkoutRule } from "./types";

export const backRule: WorkoutRule = {
  name: "Back Workout",

  muscles: [
    {
      muscle: "back",

      rules: [
        {
          movement: "vertical-pull",
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
          movement: "horizontal-row",
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
          movement: "hip-hinge",
          count: 2,

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
      ],
    },
  ],
};