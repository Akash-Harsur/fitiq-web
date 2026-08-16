"use client";

import { useEffect, useState } from "react";

import {
  Check,
  Dumbbell,
  Flame,
  CalendarDays,
  Trophy,
  ArrowLeft,
} from "lucide-react";

import { useRouter } from "next/navigation";

import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { useAuth } from "@/contexts/AuthContext";

import Sidebar from "@/components/dashboard/Sidebar";

/*
 * =========================================
 * WORKOUT HISTORY TYPE
 * =========================================
 */

type WorkoutHistory = {
  id: string;
  date: string;
  workoutType: string;
  workoutName: string;
  completedExerciseIds: string[];
  workoutFinished: boolean;
  totalExercises: number;
};

/*
 * =========================================
 * PAGE
 * =========================================
 */

export default function ProgressPage() {
  const router = useRouter();

  const {
    user,
    loading: authLoading,
  } = useAuth();

  const [workouts, setWorkouts] =
    useState<WorkoutHistory[]>([]);

  const [loading, setLoading] =
    useState(true);

  /*
   * =========================================
   * LOAD WORKOUT DATA
   * =========================================
   */

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      setLoading(false);
      return;
    }

    const loadProgress = async () => {
      try {
        setLoading(true);

        const workoutsRef =
          collection(
            db,
            "users",
            user.uid,
            "dailyWorkouts"
          );

        const workoutsQuery =
          query(
            workoutsRef,
            orderBy("date", "desc")
          );

        const snapshot =
          await getDocs(
            workoutsQuery
          );

        const results:
          WorkoutHistory[] = [];

        snapshot.forEach(
          (docSnap) => {
            const data =
              docSnap.data();

            const workout =
              data.workout;

            if (!workout) {
              return;
            }

            const completedExerciseIds =
              Array.isArray(
                data.completedExerciseIds
              )
                ? data.completedExerciseIds
                : [];

            results.push({
              id: docSnap.id,

              date:
                data.date || "",

              workoutType:
                data.workoutType || "",

              workoutName:
                workout.name ||
                "Workout",

              completedExerciseIds,

              workoutFinished:
                data.workoutFinished ===
                true,

              totalExercises:
                Array.isArray(
                  workout.exercises
                )
                  ? workout.exercises.length
                  : 0,
            });
          }
        );

        setWorkouts(
          results
        );

      } catch (error) {
        console.error(
          "Failed to load progress:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadProgress();

  }, [
    user,
    authLoading,
  ]);

  /*
   * =========================================
   * LOADING
   * =========================================
   */

  if (
    loading ||
    authLoading
  ) {
    return (
      <main className="min-h-screen bg-zinc-50 p-4 md:p-6">

        <div className="mx-auto max-w-6xl">

          <div className="rounded-3xl bg-white p-8 shadow-sm">

            <p className="text-sm text-zinc-500">
              Loading progress...
            </p>

          </div>

        </div>

      </main>
    );
  }

  /*
   * =========================================
   * CALCULATE STATS
   * =========================================
   */

  const completedWorkouts =
    workouts.filter(
      (workout) =>
        workout.workoutFinished
    );

  const totalCompleted =
    completedWorkouts.length;

  /*
   * =========================================
   * THIS WEEK
   * =========================================
   */

  const now =
    new Date();

  const startOfWeek =
    new Date(now);

  const day =
    startOfWeek.getDay();

  const mondayOffset =
    day === 0
      ? 6
      : day - 1;

  startOfWeek.setDate(
    startOfWeek.getDate() -
      mondayOffset
  );

  startOfWeek.setHours(
    0,
    0,
    0,
    0
  );

  const startOfWeekKey =
    `${startOfWeek.getFullYear()}-${String(
      startOfWeek.getMonth() + 1
    ).padStart(2, "0")}-${String(
      startOfWeek.getDate()
    ).padStart(2, "0")}`;

  const thisWeekWorkouts =
    completedWorkouts.filter(
      (workout) =>
        workout.date >=
        startOfWeekKey
    ).length;

  /*
   * =========================================
   * COMPLETION RATE
   * =========================================
   */

  const completionRate =
    workouts.length > 0
      ? Math.round(
          (totalCompleted /
            workouts.length) *
            100
        )
      : 0;

  /*
   * =========================================
   * STREAK
   * =========================================
   */

  const completedDates =
    new Set(
      completedWorkouts.map(
        (workout) =>
          workout.date
      )
    );

  let streak = 0;

  const streakDate =
    new Date();

  streakDate.setHours(
    0,
    0,
    0,
    0
  );

  /*
   * If today's workout isn't
   * complete, check from yesterday.
   */

  const todayKey =
    `${streakDate.getFullYear()}-${String(
      streakDate.getMonth() + 1
    ).padStart(2, "0")}-${String(
      streakDate.getDate()
    ).padStart(2, "0")}`;

  if (
    !completedDates.has(
      todayKey
    )
  ) {
    streakDate.setDate(
      streakDate.getDate() - 1
    );
  }

  while (true) {
    const key =
      `${streakDate.getFullYear()}-${String(
        streakDate.getMonth() + 1
      ).padStart(2, "0")}-${String(
        streakDate.getDate()
      ).padStart(2, "0")}`;

    if (
      !completedDates.has(
        key
      )
    ) {
      break;
    }

    streak++;

    streakDate.setDate(
      streakDate.getDate() - 1
    );
  }

  /*
   * =========================================
   * FORMAT DATE
   * =========================================
   */

  const formatDate = (
    dateString: string
  ) => {
    if (!dateString) {
      return "-";
    }

    const date =
      new Date(
        `${dateString}T00:00:00`
      );

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  /*
   * =========================================
   * WORKOUT TYPE LABEL
   * =========================================
   */

  const formatWorkoutType = (
    type: string
  ) => {
    if (!type) {
      return "Workout";
    }

    return type
      .split("-")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      )
      .join(" ");
  };

  /*
   * =========================================
   * PAGE
   * =========================================
   */

  return (
    <div className="flex min-h-screen bg-zinc-50">

      <Sidebar />

      <main className="flex-1 space-y-6 p-4 md:p-6">

        <div className="mx-auto max-w-6xl">

          {/* =================================
              HEADER
          ================================= */}

          <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm md:p-8">

            <button
              type="button"
              onClick={() =>
                router.push(
                  "/dashboard"
                )
              }
              className="mb-5 flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-black"
            >
              <ArrowLeft
                size={18}
              />

              Dashboard
            </button>

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
                YOUR JOURNEY
              </p>

              <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-900">
                Progress
              </h1>

              <p className="mt-2 text-base text-zinc-500">
                Track your consistency
                and workout progress.
              </p>

            </div>

          </div>

          {/* =================================
              STATS
          ================================= */}

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

            {/* STREAK */}

            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">

                  <Flame
                    size={24}
                  />

                </div>

                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Streak
                </span>

              </div>

              <p className="mt-5 text-3xl font-bold text-zinc-900">
                {streak}
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                {streak === 1
                  ? "Day"
                  : "Days"}
              </p>

            </div>

            {/* WORKOUTS */}

            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-500">

                  <Dumbbell
                    size={24}
                  />

                </div>

                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Workouts
                </span>

              </div>

              <p className="mt-5 text-3xl font-bold text-zinc-900">
                {totalCompleted}
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                Completed
              </p>

            </div>

            {/* THIS WEEK */}

            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-500">

                  <CalendarDays
                    size={24}
                  />

                </div>

                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  This Week
                </span>

              </div>

              <p className="mt-5 text-3xl font-bold text-zinc-900">
                {thisWeekWorkouts}
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                Completed workouts
              </p>

            </div>

            {/* COMPLETION */}

            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600">

                  <Trophy
                    size={24}
                  />

                </div>

                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Completion
                </span>

              </div>

              <p className="mt-5 text-3xl font-bold text-zinc-900">
                {completionRate}%
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                Workout completion rate
              </p>

            </div>

          </div>

          {/* =================================
              WORKOUT HISTORY
          ================================= */}

          <div className="mt-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">

            <div className="mb-6">

              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
                WORKOUT HISTORY
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900">
                Recent Workouts
              </h2>

            </div>

            {workouts.length ===
            0 ? (

              <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-10 text-center">

                <Dumbbell
                  size={32}
                  className="mx-auto text-zinc-400"
                />

                <p className="mt-4 font-semibold text-zinc-900">
                  No workout history yet
                </p>

                <p className="mt-1 text-sm text-zinc-500">
                  Complete your first
                  workout to see your
                  progress here.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      "/dashboard"
                    )
                  }
                  className="mt-5 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white"
                >
                  Start Workout
                </button>

              </div>

            ) : (

              <div className="space-y-3">

                {workouts
                  .slice(0, 20)
                  .map(
                    (workout) => {

                      const completed =
                        workout.workoutFinished;

                      const completedSets =
                        workout
                          .completedExerciseIds
                          .length;

                      return (
                        <div
                          key={
                            workout.id
                          }
                          className="flex flex-col gap-4 rounded-2xl border border-zinc-200 p-4 transition hover:shadow-sm md:flex-row md:items-center md:justify-between"
                        >

                          {/* LEFT */}

                          <div className="flex items-center gap-4">

                            <div
                              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                                completed
                                  ? "bg-black text-white"
                                  : "bg-zinc-100 text-zinc-500"
                              }`}
                            >

                              {completed ? (
                                <Check
                                  size={
                                    22
                                  }
                                />
                              ) : (
                                <Dumbbell
                                  size={
                                    22
                                  }
                                />
                              )}

                            </div>

                            <div>

                              <h3 className="font-semibold text-zinc-900">
                                {
                                  workout.workoutName
                                }
                              </h3>

                              <p className="mt-1 text-sm text-zinc-500">

                                {formatDate(
                                  workout.date
                                )}

                                {" • "}

                                {formatWorkoutType(
                                  workout.workoutType
                                )}

                              </p>

                            </div>

                          </div>

                          {/* RIGHT */}

                          <div className="flex items-center justify-between gap-6 md:justify-end">

                            <div className="text-right">

                              <p className="text-sm font-semibold text-zinc-900">

                                {
                                  completedSets
                                }

                                {" / "}

                                {
                                  workout.totalExercises
                                }

                              </p>

                              <p className="text-xs text-zinc-500">
                                Exercises
                              </p>

                            </div>

                            <div
                              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                                completed
                                  ? "bg-black text-white"
                                  : "bg-zinc-100 text-zinc-600"
                              }`}
                            >

                              {completed
                                ? "Completed"
                                : "In Progress"}

                            </div>

                          </div>

                        </div>
                      );
                    }
                  )}

              </div>

            )}

          </div>

        </div>

      </main>

    </div>
  );
}