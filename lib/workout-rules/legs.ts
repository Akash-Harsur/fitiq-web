import { WorkoutRule } from "./types";

export const legsRule: WorkoutRule = {
  name: "Leg Day",

  muscles: [
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
        {
          movement: "lunge",
          count: 1,
        },
        {
          movement: "leg-curl",
          count: 1,
        },
        {
          movement: "calf",
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