import { generateWorkoutFromRule } from "./ruleGenerator";
import { legsRule } from "../workout-rules/legs";
import { WorkoutDay } from "./types";

export function generateLegWorkout(): WorkoutDay {
  const exercises = generateWorkoutFromRule(legsRule);

  return {
    id: crypto.randomUUID(),
    name: "Leg Day",
    estimatedDuration: 70,
    exercises,
  };
}