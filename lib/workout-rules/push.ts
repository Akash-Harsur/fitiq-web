import { WorkoutRule } from "./types";

export const pushRule: WorkoutRule = {
  name: "Push Day",

  muscles: [
    {
      muscle: "chest",

      rules: [
        {
          movement: "horizontal-press",
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
            sets: 4,
            reps: 8,
          },

          backoff: {
            percent: 20,
            reps: 10,
          },

          rest: "120 sec",
        },

        {
          movement: "incline-press",
          count: 1,

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
            percent: 20,
            reps: 12,
          },

          rest: "90 sec",
        },

        {
          movement: "fly",
          count: 1,

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

    {
      muscle: "shoulders",

      rules: [
        {
          movement: "shoulder-press",
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
            percent: 20,
            reps: 10,
          },

          rest: "90 sec",
        },

        {
          movement: "side-delt",
          count: 1,

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

    {
      muscle: "triceps",

      rules: [
        {
          movement: "pushdown",
          count: 1,

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