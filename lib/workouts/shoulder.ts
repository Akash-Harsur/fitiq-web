import { generateWorkoutFromRule } from "./ruleGenerator";
import { shouldersRule } from "../workout-rules/shoulder";
import { WorkoutDay } from "./types";

export function generateShouldersWorkout(): WorkoutDay {
  const exercises = generateWorkoutFromRule(shouldersRule);

  return {
    id: crypto.randomUUID(),
    name: "Shoulder Workout",
    estimatedDuration: 50,
    exercises,
  };
}