import {
  generatePushWorkout,
  generatePullWorkout,
  generateLegWorkout,
} from "./ruleGenerator.ts";

import { WorkoutDay } from "./types";

export const arnoldProgram: WorkoutDay[] = [
  generatePushWorkout(),
  generatePullWorkout(),
  generateLegWorkout(),
  generatePushWorkout(),
  generatePullWorkout(),
  generateLegWorkout(),
];