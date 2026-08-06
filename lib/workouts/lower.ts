import { generateWorkoutFromRule } from "./ruleGenerator";
import { lowerRule } from "../workout-rules/lower";
import { WorkoutDay } from "./types";

export function generateLowerWorkout(): WorkoutDay {
  const exercises = generateWorkoutFromRule(lowerRule);

  return {
    id: crypto.randomUUID(),
    name: "Lower Body",
    estimatedDuration: 65,
    exercises,
  };
}