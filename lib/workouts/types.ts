import { Exercise } from "../exercises/types";

export interface WorkoutDay {
  id: string;

  name: string;

  estimatedDuration: number;

  exercises: Exercise[];
}

export interface WorkoutProgram {
  id: string;

  name: string;

  trainingDays: number;

  days: WorkoutDay[];
}

export interface WorkoutTemplate {
  id: string;

  name: string;

  muscles: string[];

  exerciseCount: number;
}