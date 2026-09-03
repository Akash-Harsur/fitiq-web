// lib/nutrition/nutritionCalculator.ts

export type Gender = "male" | "female";

export type FitnessGoal =
  | "muscle-gain"
  | "fat-loss"
  | "body-recomposition"
  | "strength";

export interface NutritionInput {
  gender: string;
  age: number;
  heightCm: number;
  weightKg: number;
  trainingDays: number;
  goal: string;
}

export interface NutritionResult {
  bmi: number;
  bmiCategory: string;

  bmr: number;
  activityMultiplier: number;
  tdee: number;

  calorieTarget: number;

  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;

  proteinCalories: number;
  carbsCalories: number;
  fatCalories: number;
}

function round(value: number): number {
  return Math.round(value);
}

function getBmiCategory(bmi: number): string {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obesity";
}

/**
 * Training days -> activity multiplier
 */
function getActivityMultiplier(
  trainingDays: number
): number {
  if (trainingDays <= 1) return 1.2;
  if (trainingDays <= 3) return 1.375;
  if (trainingDays <= 5) return 1.55;
  if (trainingDays <= 6) return 1.725;

  return 1.9;
}

export function calculateNutrition(
  input: NutritionInput
): NutritionResult {
  const {
    gender,
    age,
    heightCm,
    weightKg,
    trainingDays,
    goal,
  } = input;

  // =========================
  // SAFETY VALIDATION
  // =========================

  if (
    !Number.isFinite(age) ||
    age <= 0
  ) {
    throw new Error("Age must be greater than 0.");
  }

  if (
    !Number.isFinite(heightCm) ||
    heightCm <= 0
  ) {
    throw new Error(
      "Height must be greater than 0."
    );
  }

  if (
    !Number.isFinite(weightKg) ||
    weightKg <= 0
  ) {
    throw new Error(
      "Weight must be greater than 0."
    );
  }

  // =========================
  // BMI
  // =========================

  const heightMeters = heightCm / 100;

  const bmi =
    weightKg /
    (heightMeters * heightMeters);

  // =========================
  // BMR
  // Mifflin-St Jeor
  // =========================

  let bmr: number;

  if (gender.toLowerCase() === "male") {
    bmr =
      10 * weightKg +
      6.25 * heightCm -
      5 * age +
      5;
  } else {
    bmr =
      10 * weightKg +
      6.25 * heightCm -
      5 * age -
      161;
  }

  // =========================
  // TDEE
  // =========================

  const activityMultiplier =
    getActivityMultiplier(trainingDays);

  const tdee =
    bmr * activityMultiplier;

  // =========================
  // CALORIES BASED ON GOAL
  // =========================

  let calorieTarget: number;

  switch (goal) {
    case "fat-loss":
      calorieTarget = tdee * 0.85;
      break;

    case "muscle-gain":
      calorieTarget = tdee * 1.1;
      break;

    case "body-recomposition":
      calorieTarget = tdee * 0.95;
      break;

    case "strength":
      calorieTarget = tdee * 1.05;
      break;

    default:
      calorieTarget = tdee;
      break;
  }

  // =========================
  // PROTEIN
  // =========================

  let proteinPerKg: number;

  switch (goal) {
    case "fat-loss":
      proteinPerKg = 2.0;
      break;

    case "muscle-gain":
      proteinPerKg = 2.0;
      break;

    case "body-recomposition":
      proteinPerKg = 2.0;
      break;

    case "strength":
      proteinPerKg = 1.8;
      break;

    default:
      proteinPerKg = 1.8;
      break;
  }

  const proteinGrams =
    weightKg * proteinPerKg;

  const proteinCalories =
    proteinGrams * 4;

  // =========================
  // FAT
  // =========================

  const fatGrams =
    weightKg * 0.8;

  const fatCalories =
    fatGrams * 9;

  // =========================
  // CARBS
  // Remaining Calories
  // =========================

  const remainingCalories =
    calorieTarget -
    proteinCalories -
    fatCalories;

  const carbsGrams =
    Math.max(
      0,
      remainingCalories / 4
    );

  const carbsCalories =
    carbsGrams * 4;

  // =========================
  // RESULT
  // =========================

  return {
    bmi: round(bmi),
    bmiCategory: getBmiCategory(bmi),

    bmr: round(bmr),
    activityMultiplier,

    tdee: round(tdee),

    calorieTarget: round(
      calorieTarget
    ),

    proteinGrams: round(
      proteinGrams
    ),

    carbsGrams: round(
      carbsGrams
    ),

    fatGrams: round(
      fatGrams
    ),

    proteinCalories: round(
      proteinCalories
    ),

    carbsCalories: round(
      carbsCalories
    ),

    fatCalories: round(
      fatCalories
    ),
  };
}