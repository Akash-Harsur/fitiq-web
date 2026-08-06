import { WorkoutRule } from "./types";

export const upperRule: WorkoutRule = {
  name: "Upper Body",

  muscles: [
    {
      muscle: "chest",

      rules: [
        {
          movement: "horizontal-press",
          count: 1,
        },
      ],
    },

    {
      muscle: "back",

      rules: [
        {
          movement: "horizontal-row",
          count: 1,
        },
      ],
    },

    {
      muscle: "shoulders",

      rules: [
        {
          movement: "shoulder-press",
          count: 1,
        },
      ],
    },

    {
      muscle: "biceps",

      rules: [
        {
          movement: "curl",
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
      ],
    },
  ],
};