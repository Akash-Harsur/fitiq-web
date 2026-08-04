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
  | "smith"
  | "bodyweight"
  | "ez-bar"
  | "landmine"
  | "other";

export type Difficulty =
  | "beginner"
  | "intermediate"
  | "advanced";

export type Priority =
  | "primary"
  | "secondary";

export type MovementPattern =
  | "horizontal-press"
  | "incline-press"
  | "decline-press"
  | "fly"

  | "vertical-pull"
  | "horizontal-row"
  | "hip-hinge"

  | "shoulder-press"
  | "front-delt"
  | "side-delt"
  | "rear-delt"

  | "curl"
  | "hammer-curl"
  | "preacher-curl"

  | "pushdown"
  | "overhead-extension"
  | "skull-crusher"

  | "squat"
  | "lunge"
  | "leg-curl"
  | "calf"

  | "core"

  | "other";

export interface Exercise {
  id: string;

  name: string;

  muscle: MuscleGroup;

  category: ExerciseCategory;

  movement: MovementPattern;

  equipment: Equipment;

  difficulty: Difficulty;

  priority: Priority;
}