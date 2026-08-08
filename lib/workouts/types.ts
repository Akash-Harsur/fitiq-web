import { WorkoutExercise } from "@/types/workout";

export interface WorkoutDay {
  id: string;
  name: string;
  estimatedDuration: number;
  exercises: WorkoutExercise[];
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