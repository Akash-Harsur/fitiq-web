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

/*
 * =========================================
 * PROGRAM NAME NORMALIZATION
 * =========================================
 *
 * Only programs that don't have their own
 * schedule are mapped here.
 *
 * IMPORTANT:
 * upper-lower-arms, powerbuilding,
 * ppl, beginner-ppl etc. already have
 * their own schedules in weekSchedule.
 */

function normalizeProgram(
  selectedProgram: string
): keyof typeof weekSchedule {
  const programMap: Record<
    string,
    keyof typeof weekSchedule
  > = {
    /*
     * Old / legacy program name
     * support.
     */

    "push-pull-legs":
      "ppl",
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
 * JavaScript:
 *
 * Sunday    = 0
 * Monday    = 1
 * Tuesday   = 2
 * ...
 * Saturday  = 6
 *
 * Our schedules:
 *
 * Monday    = index 0
 * Tuesday   = index 1
 * ...
 * Sunday    = index 6
 */

export function getTodaysWorkoutType(
  selectedProgram: string,
  dayIndex: number
): string {
  const normalizedProgram =
    normalizeProgram(
      selectedProgram
    );

  const schedule =
    weekSchedule[
      normalizedProgram
    ] ??
    weekSchedule["ppl"];

  if (!schedule) {
    console.error(
      "Schedule not found:",
      selectedProgram
    );

    return "rest";
  }

  /*
   * Convert JavaScript day index
   * to Monday-based index.
   *
   * Sunday (0) -> 6
   * Monday (1) -> 0
   * Tuesday (2) -> 1
   * ...
   */

  const mondayBasedDayIndex =
    (dayIndex + 6) % 7;

  return (
    schedule[
      mondayBasedDayIndex
    ] ?? "rest"
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