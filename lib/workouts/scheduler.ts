import { weekSchedule } from "./weekSchedule";

import {
  generatePushWorkout,
  generatePullWorkout,
  generateLegWorkout,
  generateUpperWorkout,
  generateLowerWorkout,
} from "./generator";

import { WorkoutDay } from "./types";

export function getTodaysWorkout(
    selectedProgram: string,
    dayIndex: number
): WorkoutDay {

    const schedule =
        weekSchedule[
        (selectedProgram as keyof typeof weekSchedule) ??
        "push-pull-legs"
        ];


    const mondayBasedDayIndex = (dayIndex + 6) % 7;
    const today = schedule[mondayBasedDayIndex];

    switch (today) {

        case "push":
            return generatePushWorkout();

        case "pull":
            return generatePullWorkout();

        case "legs":
            return generateLegWorkout();

        // Temporary Mapping
        case "upper":
            return generateUpperWorkout();

        case "lower":
            return generateLowerWorkout();

        case "chest":
            return generatePushWorkout();

        case "back":
            return generatePullWorkout();

        case "shoulders":
            return generatePushWorkout();

        case "arms":
            return generatePullWorkout();

        case "chest-back":
            return generatePushWorkout();

        case "shoulders-arms":
            return generatePullWorkout();

        case "full-body":
            return generatePushWorkout();

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