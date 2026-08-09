import { WorkoutRule } from "./types";

export const shouldersRule: WorkoutRule = {
  name: "Shoulder Workout",

  muscles: [
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
        {
          movement: "rear-delt",
          count: 1,
        },
      ],
    },
  ],
};