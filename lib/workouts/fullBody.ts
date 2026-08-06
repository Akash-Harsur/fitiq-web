import { generatePushWorkout } from "./ruleGenerator.ts";

import { WorkoutDay } from "./types";

export const fullBodyProgram: WorkoutDay[] = [
  generatePushWorkout(),
  generatePushWorkout(),
  generatePushWorkout(),
];