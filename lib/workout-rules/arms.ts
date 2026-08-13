import { WorkoutRule } from "./types";

export const armsRule: WorkoutRule = {
  name: "Arms Workout",

  muscles: [
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

        {
          movement: "preacher-curl",
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
            sets: 3,
            reps: 12,
          },

          backoff: {
            percent: 15,
            reps: 15,
          },

          rest: "60 sec",
        },

        {
          movement: "overhead-extension",
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
          movement: "skull-crusher",
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
  ],
};