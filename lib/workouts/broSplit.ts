import {
  generatePushWorkout,
  generatePullWorkout,
  generateLegWorkout,
} from "./generator";

import { WorkoutDay } from "./types";

export const broSplitProgram: WorkoutDay[] = [
  generatePushWorkout(), // Chest
  generatePullWorkout(), // Back
  generateLegWorkout(),  // Legs
  generatePushWorkout(), // Shoulders
  generatePullWorkout(), // Arms
];