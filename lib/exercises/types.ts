export type MuscleGroup =
  | "chest"
  | "back"
  | "shoulders"
  | "biceps"
  | "triceps"
  | "legs"
  | "core";

export type ExerciseCategory =
  | "compound"
  | "isolation";

export type Equipment =
  | "barbell"
  | "dumbbell"
  | "machine"
  | "cable"
  | "bodyweight"
  | "ez-bar"
  | "landmine"
  | "other";

export interface Exercise {
  id: string;
  name: string;
  muscle: MuscleGroup;
  category: ExerciseCategory;
  equipment: Equipment;
}