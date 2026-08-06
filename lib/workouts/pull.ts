import { generateWorkoutFromRule } from "./ruleGenerator";
import { pullRule } from "../workout-rules/pull";
import { WorkoutDay } from "./types";

export function generatePullWorkout(): WorkoutDay {
  const exercises = generateWorkoutFromRule(pullRule);

  return {
    id: crypto.randomUUID(),
    name: "Pull Day",
    estimatedDuration: 60,
    exercises,
  };
}