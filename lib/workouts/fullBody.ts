import { generatePushWorkout } from "./generator";

import { WorkoutDay } from "./types";

export const fullBodyProgram: WorkoutDay[] = [
  generatePushWorkout(),
  generatePushWorkout(),
  generatePushWorkout(),
];