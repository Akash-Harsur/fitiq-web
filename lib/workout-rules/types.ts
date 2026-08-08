import { MovementPattern } from "../exercises/types";

export interface SupersetRule {
  name: string;
  reps: number;
}

export interface Rule {
  movement: MovementPattern;
  count: number;

  // Optional: sirf jis exercise ko drop set chahiye
  dropSet?: boolean;

  // Optional: sirf jis exercise ko superset chahiye
  superset?: SupersetRule;
}

export interface MuscleRule {
  muscle: string;
  rules: Rule[];
}

export interface WorkoutRule {
  name: string;
  muscles: MuscleRule[];
}