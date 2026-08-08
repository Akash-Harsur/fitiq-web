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
        {
          movement: "vertical-pull",
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
      muscle: "legs",

      rules: [
        {
          movement: "squat",
          count: 1,
        },
        {
          movement: "hip-hinge",
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

    {
      muscle: "core",

      rules: [
        {
          movement: "core",
          count: 1,
        },
      ],
    },
  ],
};