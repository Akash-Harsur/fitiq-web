import { MovementPattern } from "../exercises/types";

export interface WarmupRule {
  percent: number;
  reps: number;
}

export interface WorkingSetRule {
  sets: number;
  reps: number;
}

export interface BackoffRule {
  percent: number;
  reps: number;
}

export interface Rule {
  movement: MovementPattern;

  count: number;

  warmup?: WarmupRule[];

  workingSets: WorkingSetRule;

  backoff?: BackoffRule;

  rest?: string;
}

export interface MuscleRule {
  muscle: string;

  rules: Rule[];
}

export interface WorkoutRule {
  name: string;

  muscles: MuscleRule[];
}