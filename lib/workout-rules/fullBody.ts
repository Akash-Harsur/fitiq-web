import { WorkoutRule } from "./types";

export const fullBodyRule: WorkoutRule = {
  name: "Full Body Workout",

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
      muscle: "back",

      rules: [
        {
          movement: "horizontal-row",
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
            percent: 15,
            reps: 12,
          },

          rest: "90 sec",
        },

        {
          movement: "vertical-pull",
          count: 1,

          warmup: [
            {
              percent: 40,
              reps: 10,
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

          rest: "90 sec",
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
            percent: 15,
            reps: 10,
          },

          rest: "90 sec",
        },
      ],
    },

    {
      muscle: "legs",

      rules: [
        {
          movement: "squat",
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
            sets: 2,
            reps: 10,
          },

          backoff: {
            percent: 15,
            reps: 12,
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
              percent: 50,
              reps: 12,
            },
          ],

          workingSets: {
            sets: 2,
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