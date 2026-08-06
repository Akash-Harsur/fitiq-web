import { generateWorkoutFromRule } from "./ruleGenerator";
import { upperRule } from "../workout-rules/upper";
import { WorkoutDay } from "./types";

export function generateUpperWorkout(): WorkoutDay {
  const exercises = generateWorkoutFromRule(upperRule);

  return {
    id: crypto.randomUUID(),
    name: "Upper Body",
    estimatedDuration: 65,
    exercises,
  };
}