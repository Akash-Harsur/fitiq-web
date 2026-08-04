import {
  generatePushWorkout,
  generateLegWorkout,
} from "./generator";

import { WorkoutDay } from "./types";

export const upperLowerProgram: WorkoutDay[] = [
  generatePushWorkout(), // Upper
  generateLegWorkout(),  // Lower
  generatePushWorkout(), // Upper
  generateLegWorkout(),  // Lower
];