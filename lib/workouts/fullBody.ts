import { generateWorkoutFromRule } from "./ruleGenerator";
import { fullBodyRule } from "../workout-rules/fullBody";
import { WorkoutDay } from "./types";

export function generateFullBodyWorkout(): WorkoutDay {
  const exercises = generateWorkoutFromRule(fullBodyRule);

  return {
    id: crypto.randomUUID(),
    name: "Full Body Workout",
    estimatedDuration: 60,
    exercises,
  };
}