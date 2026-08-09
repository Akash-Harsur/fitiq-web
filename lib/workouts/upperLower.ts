import { generatePushWorkout } from "./push";
import { generateLegWorkout } from "./legs";

import { WorkoutDay } from "./types";

export const upperLowerProgram: WorkoutDay[] = [
  generatePushWorkout(), // Upper
  generateLegWorkout(),  // Lower
  generatePushWorkout(), // Upper
  generateLegWorkout(),  // Lower
];