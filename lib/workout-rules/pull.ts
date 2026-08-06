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
        },
        {
          movement: "horizontal-row",
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
        {
          movement: "hammer-curl",
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