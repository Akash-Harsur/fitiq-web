import { WorkoutTemplate } from "./types";

export const pushTemplate: WorkoutTemplate = {
  id: "push",

  name: "Push",

  muscles: [
    "chest",
    "chest",
    "shoulders",
    "shoulders",
    "triceps",
    "triceps",
  ],

  exerciseCount: 6,
};

export const pullTemplate: WorkoutTemplate = {
  id: "pull",

  name: "Pull",

  muscles: [
    "back",
    "back",
    "back",
    "rear-delts",
    "biceps",
    "biceps",
  ],

  exerciseCount: 6,
};

export const legsTemplate: WorkoutTemplate = {
  id: "legs",

  name: "Legs",

  muscles: [
    "legs",
    "legs",
    "legs",
    "legs",
    "legs",
    "core",
  ],

  exerciseCount: 6,
};