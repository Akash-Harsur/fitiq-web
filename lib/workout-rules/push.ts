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
        },
        {
          movement: "incline-press",
          count: 1,
        },
        {
          movement: "fly",
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
        {
          movement: "side-delt",
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