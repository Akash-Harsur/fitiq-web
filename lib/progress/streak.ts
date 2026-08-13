import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

function getDateKey(date: Date) {
  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export async function getWorkoutStreak(
  uid: string
): Promise<number> {
  try {
    const workoutsRef = collection(
      db,
      "users",
      uid,
      "dailyWorkouts"
    );

    const snapshot =
      await getDocs(workoutsRef);

    const completedDates = new Set<string>();

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();

      if (
        data.workoutFinished === true &&
        typeof data.date === "string"
      ) {
        completedDates.add(data.date);
      }
    });

    if (completedDates.size === 0) {
      return 0;
    }

    const today = new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );

    /*
     * If today's workout isn't completed,
     * start checking from yesterday.
     */

    if (
      !completedDates.has(
        getDateKey(today)
      )
    ) {
      today.setDate(
        today.getDate() - 1
      );
    }

    let streak = 0;

    while (
      completedDates.has(
        getDateKey(today)
      )
    ) {
      streak++;

      today.setDate(
        today.getDate() - 1
      );
    }

    return streak;
  } catch (error) {
    console.error(
      "Failed to calculate workout streak:",
      error
    );

    return 0;
  }
}