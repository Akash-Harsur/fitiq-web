import { WorkoutRule } from "./types";

export const pullRule: WorkoutRule = {
  name: "Pull Day",

  muscles: [
    {
      muscle: "back",

      rules: [
        {
          movement: "vertical-pull",
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
            percent: 15,
            reps: 10,
          },

          rest: "120 sec",
        },

        {
          movement: "horizontal-row",
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
          count: 1,

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

    {
      muscle: "biceps",

      rules: [
        {
          movement: "curl",
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

          rest: "75 sec",
        },

        {
          movement: "hammer-curl",
          count: 1,

          warmup: [
            {
              percent: 50,
              reps: 10,
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
          count: 1,

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