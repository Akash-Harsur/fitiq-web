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
        },
        {
          movement: "hammer-curl",
          count: 1,
        },
        {
          movement: "preacher-curl",
          count: 1,
        },
      ],
    },

    {
      muscle: "triceps",

      rules: [
        {
          movement: "pushdown",
          count: 1,
        },
        {
          movement: "overhead-extension",
          count: 1,
        },
        {
          movement: "skull-crusher",
          count: 1,
        },
      ],
    },
  ],
};