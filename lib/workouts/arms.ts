import { generateWorkoutFromRule } from "./ruleGenerator";
import { armsRule } from "../workout-rules/arms";
import { WorkoutDay } from "./types";

export function generateArmsWorkout(): WorkoutDay {
  const exercises = generateWorkoutFromRule(armsRule);

  return {
    id: crypto.randomUUID(),
    name: "Arms Workout",
    estimatedDuration: 45,
    exercises,
  };
}