import { WorkoutRule } from "./types";

export const backRule: WorkoutRule = {
  name: "Back Workout",

  muscles: [
    {
      muscle: "back",

      rules: [
        {
          movement: "vertical-pull",
          count: 1,
        },
        {
          movement: "horizontal-row",
          count: 2,
        },
        {
          movement: "hip-hinge",
          count: 1,
        },
      ],
    },
  ],
};