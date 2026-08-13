"use client";

import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";

import { getTodaysWorkoutType } from "@/lib/workouts/scheduler";

type TimelineData = {
  lastWorkout: string;
  currentWorkout: string;
  nextWorkout: string;
};

export default function ProgressCard() {
  const { user } = useAuth();

  const {
    profile,
    loading: profileLoading,
  } = useUserProfile();

  const [timeline, setTimeline] =
    useState<TimelineData>({
      lastWorkout: "—",
      currentWorkout: "—",
      nextWorkout: "—",
    });

  const [loading, setLoading] =
    useState(true);

  /*
   * =========================================
   * FORMAT WORKOUT NAME
   * =========================================
   */

  function formatWorkoutName(
    workoutType: string
  ) {
    if (!workoutType) {
      return "—";
    }

    const names: Record<
      string,
      string
    > = {
      push: "Push Day",
      pull: "Pull Day",
      legs: "Leg Day",

      upper: "Upper Body",
      lower: "Lower Body",

      chest: "Chest Day",
      back: "Back Day",
      shoulders: "Shoulders Day",
      arms: "Arms Day",

      "full-body":
        "Full Body",

      "chest-back":
        "Chest + Back",

      "shoulders-arms":
        "Shoulders + Arms",

      rest: "Rest Day",
    };

    return (
      names[workoutType] ??
      workoutType
        .replace(/[-_]/g, " ")
        .replace(
          /\b\w/g,
          (char) =>
            char.toUpperCase()
        )
    );
  }

  /*
   * =========================================
   * LOAD WORKOUT TIMELINE
   * =========================================
   */

  useEffect(() => {
    if (profileLoading) {
      return;
    }

    if (!user || !profile) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const loadTimeline = async () => {
      try {
        setLoading(true);

        const selectedProgram =
          profile.selectedProgram ||
          "push-pull-legs";

        /*
         * =====================================
         * TODAY
         * =====================================
         */

        const today =
          new Date().getDay();

        const currentType =
          getTodaysWorkoutType(
            selectedProgram,
            today
          );

        /*
         * =====================================
         * NEXT DAY
         *
         * IMPORTANT:
         * Rest Day is NOT skipped.
         *
         * Example:
         *
         * Friday  → Lower
         * Saturday → Rest Day
         * Sunday   → Rest Day
         * Monday   → Push
         * =====================================
         */

        const nextDay =
          (today + 1) % 7;

        const nextType =
          getTodaysWorkoutType(
            selectedProgram,
            nextDay
          );

        /*
         * =====================================
         * LAST COMPLETED WORKOUT
         * =====================================
         */

        let lastWorkout =
          "No workout yet";

        const workoutsRef =
          collection(
            db,
            "users",
            user.uid,
            "dailyWorkouts"
          );

        const snapshot =
          await getDocs(
            workoutsRef
          );

        const completedWorkouts =
          snapshot.docs
            .map((docSnap) => {
              const data =
                docSnap.data();

              const workout =
                data.workout;

              return {
                date:
                  typeof data.date ===
                  "string"
                    ? data.date
                    : "",

                workoutFinished:
                  data.workoutFinished ===
                  true,

                workoutName:
                  workout?.name ||
                  data.workoutType ||
                  "",
              };
            })
            .filter(
              (item) =>
                item.workoutFinished &&
                item.date &&
                item.workoutName
            )
            .sort(
              (a, b) =>
                b.date.localeCompare(
                  a.date
                )
            );

        if (
          completedWorkouts.length > 0
        ) {
          lastWorkout =
            completedWorkouts[0]
              .workoutName;
        }

        /*
         * =====================================
         * UPDATE UI
         * =====================================
         */

        if (!cancelled) {
          setTimeline({
            lastWorkout,
            currentWorkout:
              formatWorkoutName(
                currentType
              ),
            nextWorkout:
              formatWorkoutName(
                nextType
              ),
          });
        }
      } catch (error) {
        console.error(
          "Failed to load workout timeline:",
          error
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadTimeline();

    return () => {
      cancelled = true;
    };
  }, [
    user,
    profile,
    profileLoading,
  ]);

  /*
   * =========================================
   * LOADING
   * =========================================
   */

  if (loading) {
    return (
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
          Workout Timeline
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <TimelineSkeleton />
          <TimelineSkeleton />
          <TimelineSkeleton />
        </div>
      </div>
    );
  }

  /*
   * =========================================
   * UI
   * =========================================
   */

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
        Workout Timeline
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-3">

        {/* LAST WORKOUT */}

        <TimelineCard
          title="Last Workout"
          value={
            timeline.lastWorkout
          }
        />

        {/* CURRENT WORKOUT */}

        <TimelineCard
          title="Current Workout"
          value={
            timeline.currentWorkout
          }
        />

        {/* NEXT WORKOUT */}

        <TimelineCard
          title="Next Workout"
          value={
            timeline.nextWorkout
          }
        />

      </div>
    </div>
  );
}

/*
 * =========================================
 * TIMELINE CARD
 * =========================================
 */

function TimelineCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-md">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-400">
        {title}
      </p>

      <h3 className="mt-5 truncate text-2xl font-bold tracking-tight text-zinc-900">
        {value}
      </h3>
    </div>
  );
}

/*
 * =========================================
 * SKELETON
 * =========================================
 */

function TimelineSkeleton() {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-7">
      <div className="h-3 w-24 animate-pulse rounded bg-zinc-200" />

      <div className="mt-5 h-8 w-32 animate-pulse rounded bg-zinc-200" />
    </div>
  );
}