import { weekSchedule } from "./weekSchedule";

import { generatePushWorkout } from "./push";
import { generatePullWorkout } from "./pull";
import { generateLegWorkout } from "./legs";
import { generateUpperWorkout } from "./upper";
import { generateLowerWorkout } from "./lower";

import { generateChestWorkout } from "./chest";
import { generateBackWorkout } from "./back";
import { generateShouldersWorkout } from "./shoulder";
import { generateArmsWorkout } from "./arms";
import { generateFullBodyWorkout } from "./fullBody";

import { WorkoutDay } from "./types";

export function getTodaysWorkout(
  selectedProgram: string,
  dayIndex: number
): WorkoutDay {

  const programMap: Record<
    string,
    keyof typeof weekSchedule
  > = {
    "ppl": "push-pull-legs",
    "beginner-ppl": "push-pull-legs",
    "upper-lower-arms": "upper-lower",
    "powerbuilding": "upper-lower",
  };

  const normalizedProgram =
    programMap[selectedProgram] ??
    (selectedProgram as keyof typeof weekSchedule);

  const schedule =
    weekSchedule[normalizedProgram] ??
    weekSchedule["push-pull-legs"];

  if (!schedule) {
    console.error(
      "Schedule not found:",
      selectedProgram
    );

    return {
      id: crypto.randomUUID(),
      name: "Debug Workout",
      estimatedDuration: 0,
      exercises: [],
    };
  }

  const mondayBasedDayIndex =
    (dayIndex + 6) % 7;

  const today =
    schedule[mondayBasedDayIndex];

  switch (today) {
    case "push":
      return generatePushWorkout();

    case "pull":
      return generatePullWorkout();

    case "legs":
      return generateLegWorkout();

    case "upper":
      return generateUpperWorkout();

    case "lower":
      return generateLowerWorkout();

    case "chest":
      return generateChestWorkout();

    case "back":
      return generateBackWorkout();

    case "shoulders":
      return generateShouldersWorkout();

    case "arms":
      return generateArmsWorkout();

    case "chest-back":
      return generateChestWorkout();

    case "shoulders-arms":
      return generateShouldersWorkout();

    case "full-body":
      return generateFullBodyWorkout();

    case "rest":
      return {
        id: crypto.randomUUID(),
        name: "Rest Day",
        estimatedDuration: 0,
        exercises: [],
      };

    default:
      return generatePushWorkout();
  }
}


/* =========================================
   MANUAL WORKOUT SELECTION
========================================= */

export function getWorkoutByType(
  workoutType: string
): WorkoutDay {

  switch (workoutType) {
    case "push":
      return generatePushWorkout();

    case "pull":
      return generatePullWorkout();

    case "legs":
      return generateLegWorkout();

    case "upper":
      return generateUpperWorkout();

    case "lower":
      return generateLowerWorkout();

    case "chest":
      return generateChestWorkout();

    case "back":
      return generateBackWorkout();

    case "shoulders":
      return generateShouldersWorkout();

    case "arms":
      return generateArmsWorkout();

    case "full-body":
      return generateFullBodyWorkout();

    default:
      return getTodaysWorkout(
        "push-pull-legs",
        new Date().getDay()
      );
  }
}