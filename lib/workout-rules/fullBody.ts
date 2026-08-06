import { WorkoutRule } from "./types";

export const fullBodyRule: WorkoutRule = {
  name: "Full Body",

  muscles: [
    {
      muscle: "legs",

      rules: [
        {
          movement: "squat",
          count: 1,
        },
      ],
    },

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