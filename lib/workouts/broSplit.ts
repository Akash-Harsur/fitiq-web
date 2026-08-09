import { generatePushWorkout } from "./push";
import { generatePullWorkout } from "./pull";
import { generateLegWorkout } from "./legs";

import { WorkoutDay } from "./types";

export const broSplitProgram: WorkoutDay[] = [
  generatePushWorkout(), // Chest
  generatePullWorkout(), // Back
  generateLegWorkout(),  // Legs
  generatePushWorkout(), // Shoulders
  generatePullWorkout(), // Arms
];