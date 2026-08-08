import { generateWorkoutFromRule } from "./ruleGenerator";
import { chestRule } from "../workout-rules/chest";
import { WorkoutDay } from "./types";

export function generateChestWorkout(): WorkoutDay {
  const exercises = generateWorkoutFromRule(chestRule);

  return {
    id: crypto.randomUUID(),
    name: "Chest Workout",
    estimatedDuration: 50,
    exercises,
  };
}