import {
  generatePushWorkout,
  generateLegWorkout,
} from "./ruleGenerator.ts";

import { WorkoutDay } from "./types";

export const upperLowerProgram: WorkoutDay[] = [
  generatePushWorkout(), // Upper
  generateLegWorkout(),  // Lower
  generatePushWorkout(), // Upper
  generateLegWorkout(),  // Lower
];