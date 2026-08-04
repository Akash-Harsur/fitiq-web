import {
  generatePushWorkout,
  generatePullWorkout,
  generateLegWorkout,
} from "./generator";

import { WorkoutDay } from "./types";

export const arnoldProgram: WorkoutDay[] = [
  generatePushWorkout(),
  generatePullWorkout(),
  generateLegWorkout(),
  generatePushWorkout(),
  generatePullWorkout(),
  generateLegWorkout(),
];