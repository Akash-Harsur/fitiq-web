import { MovementPattern } from "../exercises/types";

export interface Rule {
  movement: MovementPattern;

  count: number;
}

export interface MuscleRule {
  muscle: string;

  rules: Rule[];
}

export interface WorkoutRule {
  name: string;

  muscles: MuscleRule[];
}