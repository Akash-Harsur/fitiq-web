import { WorkoutRule } from "./types";

export const shouldersRule: WorkoutRule = {
  name: "Shoulder Workout",

  muscles: [
    {
      muscle: "shoulders",

      rules: [
        {
          movement: "shoulder-press",
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
            percent: 20,
            reps: 10,
          },

          rest: "90 sec",
        },

        {
          movement: "side-delt",
          count: 2,

          warmup: [
            {
              percent: 40,
              reps: 12,
            },
          ],

          workingSets: {
            sets: 3,
            reps: 12,
          },

          backoff: {
            percent: 20,
            reps: 15,
          },

          rest: "60 sec",
        },

        {
          movement: "rear-delt",
          count: 2,

          warmup: [
            {
              percent: 40,
              reps: 12,
            },
          ],

          workingSets: {
            sets: 3,
            reps: 12,
          },

          backoff: {
            percent: 20,
            reps: 15,
          },

          rest: "60 sec",
        },
      ],
    },
  ],
};