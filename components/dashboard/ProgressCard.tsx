"use client";

import { useEffect, useState } from "react";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import { Check } from "lucide-react";

import { db } from "@/lib/firebase";

import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";

import { getTodaysWorkoutType } from "@/lib/workouts/scheduler";

type TimelineState = {
  lastWorkout: string;
  currentWorkout: string;
  nextWorkout: string;
  currentCompleted: boolean;
};

export default function ProgressCard() {
  const { user } = useAuth();

  const {
    profile,
    loading: profileLoading,
  } = useUserProfile();

  const [timeline, setTimeline] =
    useState<TimelineState>({
      lastWorkout: "—",
      currentWorkout: "—",
      nextWorkout: "—",
      currentCompleted: false,
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

    const names: Record<string, string> = {
      push: "Push Day",

      pull: "Pull Day",

      legs: "Leg Day",

      upper: "Upper Body",

      lower: "Lower Body",

      chest: "Chest Day",

      back: "Back Day",

      shoulders: "Shoulders",

      arms: "Arms Day",

      "full-body": "Full Body",

      "chest-back": "Chest + Back",

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
   * GET TODAY DATE KEY
   * =========================================
   */

  function getTodayKey() {
    const now = new Date();

    const year =
      now.getFullYear();

    const month = String(
      now.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      now.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
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

        const now = new Date();

        const today =
          now.getDay();

        const todayKey =
          getTodayKey();

        /*
         * =====================================
         * PREVIOUS DAY
         * =====================================
         *
         * JavaScript:
         *
         * Sunday = 0
         * Monday = 1
         * ...
         * Saturday = 6
         *
         * (today + 6) % 7 gives
         * the previous day.
         */

        const previousDay =
          (today + 6) % 7;

        /*
         * =====================================
         * NEXT DAY
         * =====================================
         */

        const nextDay =
          (today + 1) % 7;

        /*
         * =====================================
         * SCHEDULED WORKOUTS
         * =====================================
         *
         * Timeline is based on the program
         * schedule — NOT the last completed
         * Firebase workout.
         */

        const previousType =
          getTodaysWorkoutType(
            selectedProgram,
            previousDay
          );

        const currentType =
          getTodaysWorkoutType(
            selectedProgram,
            today
          );

        const nextType =
          getTodaysWorkoutType(
            selectedProgram,
            nextDay
          );

        /*
         * =====================================
         * CHECK TODAY'S COMPLETION
         * =====================================
         *
         * We only need today's Firebase
         * document to know whether the
         * current workout is completed.
         */

        let currentCompleted =
          false;

        /*
         * Only check Firebase when
         * there is an actual workout.
         *
         * Rest Day does not need completion.
         */

        if (
          currentType !== "rest"
        ) {
          const normalizedType =
            currentType.replace(
              /[^a-zA-Z0-9-_]/g,
              "-"
            );

          const workoutId =
            `${todayKey}_${normalizedType}`;

          const workoutRef = doc(
            db,
            "users",
            user.uid,
            "dailyWorkouts",
            workoutId
          );

          const snapshot =
            await getDoc(
              workoutRef
            );

          if (snapshot.exists()) {
            const data =
              snapshot.data();

            currentCompleted =
              data.workoutFinished ===
              true;
          }
        }

        /*
         * =====================================
         * UPDATE UI
         * =====================================
         */

        if (!cancelled) {
          setTimeline({
            /*
             * Previous DAY's scheduled
             * workout.
             *
             * Example:
             * Friday -> Thursday = Rest
             */

            lastWorkout:
              formatWorkoutName(
                previousType
              ),

            /*
             * Today's scheduled workout.
             */

            currentWorkout:
              formatWorkoutName(
                currentType
              ),

            /*
             * Next DAY's scheduled workout.
             */

            nextWorkout:
              formatWorkoutName(
                nextType
              ),

            /*
             * Only today's workout
             * controls the black card.
             */

            currentCompleted,
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

        {/* =================================
            LAST WORKOUT
        ================================= */}

        <TimelineCard
          title="Last Workout"
          value={
            timeline.lastWorkout
          }
        />

        {/* =================================
            CURRENT WORKOUT
        ================================= */}

        <TimelineCard
          title="Current Workout"
          value={
            timeline.currentWorkout
          }
          completed={
            timeline.currentCompleted
          }
        />

        {/* =================================
            NEXT WORKOUT
        ================================= */}

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
  completed = false,
}: {
  title: string;
  value: string;
  completed?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl border p-7 transition-all ${
        completed
          ? "border-black bg-black text-white shadow-lg"
          : "border-zinc-200 bg-white text-zinc-900 shadow-sm"
      }`}
    >
      <p
        className={`text-[11px] font-semibold uppercase tracking-[0.24em] ${
          completed
            ? "text-zinc-400"
            : "text-zinc-400"
        }`}
      >
        {title}
      </p>

      <div className="mt-4 flex items-center gap-3">

        {completed && (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-black">
            <Check size={18} />
          </div>
        )}

        <h3
          className={`truncate text-2xl font-bold tracking-tight ${
            completed
              ? "text-white"
              : "text-zinc-900"
          }`}
        >
          {value}
        </h3>

      </div>
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
    <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
      <div className="h-3 w-24 animate-pulse rounded bg-zinc-200" />

      <div className="mt-5 h-8 w-32 animate-pulse rounded bg-zinc-200" />
    </div>
  );
}