import { generatePushWorkout } from "./push";
import { generatePullWorkout } from "./pull";
import { generateLegWorkout } from "./legs";

import { WorkoutDay } from "./types";

export const arnoldProgram: WorkoutDay[] = [
  generatePushWorkout(),
  generatePullWorkout(),
  generateLegWorkout(),
  generatePushWorkout(),
  generatePullWorkout(),
  generateLegWorkout(),
];