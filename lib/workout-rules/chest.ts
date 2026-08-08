import { WorkoutRule } from "./types";

export const chestRule: WorkoutRule = {
  name: "Chest Workout",

  muscles: [
    {
      muscle: "chest",

      rules: [
        {
          movement: "horizontal-press",
          count: 2,
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
  ],
};