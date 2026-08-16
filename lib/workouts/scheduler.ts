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

import { generateArmsShouldersWorkout } from "./armsShoulders";
import { generateLegsArmsWorkout } from "./legsArms";
import { generateSquatWorkout } from "./squat";
import { generateBenchWorkout } from "./bench";
import { generateDeadliftWorkout } from "./deadlift";

import {
  generatePowerlifting3Workout,
} from "./powerlifting3";

import {
  generatePowerlifting6Workout,
} from "./powerlifting6";

import { WorkoutDay } from "./types";

/*
 * =========================================
 * PROGRAM NAME NORMALIZATION
 * =========================================
 *
 * Only legacy / old program names
 * are mapped here.
 *
 * Programs that already exist inside
 * weekSchedule use their own schedule.
 */

function normalizeProgram(
  selectedProgram: string
): keyof typeof weekSchedule {
  const programMap: Record<
    string,
    keyof typeof weekSchedule
  > = {
    /*
     * Legacy program support
     */

    "push-pull-legs": "ppl",
  };

  return (
    programMap[selectedProgram] ??
    (selectedProgram as keyof typeof weekSchedule)
  );
}

/*
 * =========================================
 * GET TODAY'S WORKOUT TYPE
 * =========================================
 *
 * JavaScript day indexes:
 *
 * Sunday    = 0
 * Monday    = 1
 * Tuesday   = 2
 * Wednesday = 3
 * Thursday  = 4
 * Friday    = 5
 * Saturday  = 6
 *
 * Our weekSchedule uses:
 *
 * Monday    = index 0
 * Tuesday   = index 1
 * Wednesday = index 2
 * Thursday  = index 3
 * Friday    = index 4
 * Saturday  = index 5
 * Sunday    = index 6
 */

export function getTodaysWorkoutType(
  selectedProgram: string,
  dayIndex: number
): string {
  const normalizedProgram =
    normalizeProgram(selectedProgram);

  const schedule =
    weekSchedule[normalizedProgram] ??
    weekSchedule["ppl"];

  if (!schedule) {
    console.error(
      "Schedule not found:",
      selectedProgram
    );

    return "rest";
  }

  /*
   * Convert JavaScript Sunday-based
   * index into our Monday-based index.
   *
   * Sunday (0)    -> 6
   * Monday (1)    -> 0
   * Tuesday (2)   -> 1
   * Wednesday (3) -> 2
   * Thursday (4)  -> 3
   * Friday (5)    -> 4
   * Saturday (6)  -> 5
   */

  const mondayBasedDayIndex =
    (dayIndex + 6) % 7;

  return (
    schedule[mondayBasedDayIndex] ??
    "rest"
  );
}

/*
 * =========================================
 * GET TODAY'S WORKOUT
 * =========================================
 */

export function getTodaysWorkout(
  selectedProgram: string,
  dayIndex: number
): WorkoutDay {
  const workoutType =
    getTodaysWorkoutType(
      selectedProgram,
      dayIndex
    );

  return getWorkoutByType(
    workoutType
  );
}

/*
 * =========================================
 * MANUAL WORKOUT SELECTION
 * =========================================
 */

export function getWorkoutByType(
  workoutType: string
): WorkoutDay {
  switch (workoutType) {
    case "push":
      return generatePushWorkout();

    case "powerlifting-3-mon":
      return generatePowerlifting3Workout(0);

    case "powerlifting-3-wed":
      return generatePowerlifting3Workout(1);

    case "powerlifting-3-fri":
      return generatePowerlifting3Workout(2);

    case "powerlifting-6-mon":
      return generatePowerlifting6Workout(0);

    case "powerlifting-6-tue":
      return generatePowerlifting6Workout(1);

    case "powerlifting-6-wed":
      return generatePowerlifting6Workout(2);

    case "powerlifting-6-thu":
      return generatePowerlifting6Workout(3);

    case "powerlifting-6-fri":
      return generatePowerlifting6Workout(4);

    case "powerlifting-6-sat":
      return generatePowerlifting6Workout(5);

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

    case "arms-shoulders":
      return generateArmsShouldersWorkout();

    case "legs-arms":
      return generateLegsArmsWorkout();

    case "squat":
      return generateSquatWorkout();

    case "bench":
      return generateBenchWorkout();

    case "deadlift":
      return generateDeadliftWorkout();

    case "full-body":
      return generateFullBodyWorkout();

    case "chest-back":
      return generateChestWorkout();

    case "shoulders-arms":
      return generateShouldersWorkout();

    case "rest":
      return {
        id: crypto.randomUUID(),
        name: "Rest Day",
        estimatedDuration: 0,
        exercises: [],
      };

    default:
      console.warn(
        "Unknown workout type:",
        workoutType
      );

      return getWorkoutByType(
        "push"
      );
  }
}