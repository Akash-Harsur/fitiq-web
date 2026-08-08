import { generateWorkoutFromRule } from "./ruleGenerator";
import { backRule } from "../workout-rules/back";
import { WorkoutDay } from "./types";

export function generateBackWorkout(): WorkoutDay {
  const exercises = generateWorkoutFromRule(backRule);

  return {
    id: crypto.randomUUID(),
    name: "Back Workout",
    estimatedDuration: 50,
    exercises,
  };
}