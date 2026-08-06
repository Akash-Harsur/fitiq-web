import { weekSchedule } from "./weekSchedule";

import { generatePushWorkout } from "./push";
import { generatePullWorkout } from "./pull";
import { generateLegWorkout } from "./legs";
import { generateUpperWorkout } from "./upper";
import { generateLowerWorkout } from "./lower";

import { WorkoutDay } from "./types";

export function getTodaysWorkout(
    selectedProgram: string,
    dayIndex: number
): WorkoutDay {

    const programMap: Record<string, keyof typeof weekSchedule> = {
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
        console.error("Schedule not found:", selectedProgram);

        return {
            id: crypto.randomUUID(),
            name: "Debug Workout",
            estimatedDuration: 0,
            exercises: [],
        };
    }

    const mondayBasedDayIndex = (dayIndex + 6) % 7;
    const today = schedule[mondayBasedDayIndex];

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