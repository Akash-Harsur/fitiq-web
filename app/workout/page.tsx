"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";

import Sidebar from "@/components/dashboard/Sidebar";
import WorkoutExerciseCard from "@/components/workout/WorkoutExerciseCard";

import {
  getOrCreateDailyWorkout,
  getDailyWorkoutProgress,
  completeDailyWorkout,
} from "@/lib/workouts/dailyWorkout";

import { WorkoutDay } from "@/lib/workouts/types";

import { useAuth } from "@/contexts/AuthContext";
import { useWorkout } from "@/contexts/WorkoutContext";

export default function WorkoutPage() {
  const router = useRouter();

  const {
    user,
    loading: authLoading,
  } = useAuth();

  const {
    completedExerciseIds,
    startWorkout,
  } = useWorkout();

  const [workout, setWorkout] =
    useState<WorkoutDay | null>(null);

  const [workoutType, setWorkoutType] =
    useState("push");

  const [loading, setLoading] =
    useState(true);

  const [completionSaved, setCompletionSaved] =
    useState(false);

  /*
   * =========================================
   * LOAD TODAY'S WORKOUT + PROGRESS
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

    let cancelled = false;

    const loadWorkout = async () => {
      try {
        setLoading(true);

        const params =
          new URLSearchParams(
            window.location.search
          );

        const selectedWorkoutType =
          params.get("type") || "push";

        setWorkoutType(
          selectedWorkoutType
        );

        /*
         * Get today's locked workout.
         */

        const savedWorkout =
          await getOrCreateDailyWorkout(
            user.uid,
            selectedWorkoutType
          );

        if (cancelled) {
          return;
        }

        /*
         * Get saved progress.
         */

        const progress =
          await getDailyWorkoutProgress(
            user.uid,
            selectedWorkoutType
          );

        if (cancelled) {
          return;
        }

        /*
         * Set workout.
         */

        setWorkout(savedWorkout);

        /*
         * Restore existing progress.
         */

        startWorkout(
          savedWorkout,
          user.uid,
          selectedWorkoutType,
          progress.completedExerciseIds,
          progress.workoutFinished
        );

        /*
         * Prevent duplicate completion save.
         */

        setCompletionSaved(
          progress.workoutFinished
        );

        console.log(
          "Workout Type:",
          selectedWorkoutType
        );

        console.log(
          "Saved Workout:",
          savedWorkout
        );

        console.log(
          "Saved Progress:",
          progress
        );
      } catch (error) {
        console.error(
          "Failed to load workout:",
          error
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadWorkout();

    return () => {
      cancelled = true;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, authLoading]);

  /*
   * =========================================
   * PROGRESS
   * =========================================
   */

  const totalExercises =
    workout?.exercises.length ?? 0;

  const completedCount =
    completedExerciseIds.filter(
      (id) =>
        workout?.exercises.some(
          (exercise) =>
            exercise.id === id
        )
    ).length;

  const allExercisesCompleted =
    totalExercises > 0 &&
    completedCount >= totalExercises;

  const currentExerciseNumber =
    Math.min(
      completedCount + 1,
      totalExercises
    );

  const progressPercentage =
    totalExercises > 0
      ? Math.round(
          (completedCount /
            totalExercises) *
            100
        )
      : 0;

  /*
   * =========================================
   * SAVE COMPLETION TO FIREBASE
   * =========================================
   */

  useEffect(() => {
    if (
      !allExercisesCompleted ||
      !user ||
      !workout ||
      completionSaved
    ) {
      return;
    }

    let cancelled = false;

    const saveCompletion = async () => {
      try {
        await completeDailyWorkout(
          user.uid,
          workoutType
        );

        if (!cancelled) {
          setCompletionSaved(true);
        }

        console.log(
          "Workout completion saved."
        );
      } catch (error) {
        console.error(
          "Failed to save workout completion:",
          error
        );
      }
    };

    saveCompletion();

    return () => {
      cancelled = true;
    };
  }, [
    allExercisesCompleted,
    user,
    workout,
    workoutType,
    completionSaved,
  ]);

  /*
   * =========================================
   * LOADING
   * =========================================
   */

  if (loading || authLoading) {
    return (
      <div className="flex min-h-screen bg-zinc-50">

        <Sidebar />

        <main className="min-w-0 flex-1 p-4 md:p-6">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-sm text-zinc-500">
                Loading workout...
              </p>
            </div>
          </div>
        </main>

      </div>
    );
  }

  /*
   * =========================================
   * NOT LOGGED IN
   * =========================================
   */

  if (!user) {
    return (
      <div className="flex min-h-screen bg-zinc-50">

        <Sidebar />

        <main className="flex min-w-0 flex-1 items-center justify-center p-6">

          <div className="rounded-3xl bg-white p-8 text-center shadow-sm">

            <h1 className="text-xl font-bold text-zinc-900">
              Please sign in
            </h1>

            <button
              type="button"
              onClick={() =>
                router.push("/login")
              }
              className="mt-5 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white"
            >
              Go to Login
            </button>

          </div>

        </main>

      </div>
    );
  }

  /*
   * =========================================
   * WORKOUT FAILED
   * =========================================
   */

  if (!workout) {
    return (
      <div className="flex min-h-screen bg-zinc-50">

        <Sidebar />

        <main className="min-w-0 flex-1 p-4 md:p-6">

          <div className="mx-auto max-w-6xl">

            <div className="rounded-3xl border border-red-200 bg-white p-6 shadow-sm">

              <p className="font-semibold text-red-600">
                Unable to load workout
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                Please go back to the dashboard
                and try again.
              </p>

              <button
                type="button"
                onClick={() =>
                  router.push("/dashboard")
                }
                className="mt-5 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white"
              >
                Back to Dashboard
              </button>

            </div>

          </div>

        </main>

      </div>
    );
  }

  /*
   * =========================================
   * WORKOUT COMPLETE
   * =========================================
   */

  if (allExercisesCompleted) {
    return (
      <div className="flex min-h-screen bg-zinc-50">

        <Sidebar />

        <main className="min-w-0 flex-1 p-4 md:p-6">

          <div className="mx-auto flex min-h-[80vh] max-w-4xl items-center justify-center">

            <div className="w-full rounded-3xl bg-white p-8 text-center shadow-sm md:p-12">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-black text-white">
                <Check size={38} />
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
                WORKOUT COMPLETE
              </p>

              <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">
                Great Work! 💪
              </h1>

              <p className="mx-auto mt-4 max-w-md text-base leading-7 text-zinc-500">
                You completed all{" "}
                {totalExercises} exercises
                in today&apos;s workout.
              </p>

              <div className="mx-auto mt-8 max-w-md">

                <div className="flex items-center justify-between text-sm">

                  <span className="font-medium text-zinc-600">
                    Workout Progress
                  </span>

                  <span className="font-bold text-zinc-900">
                    100%
                  </span>

                </div>

                <div className="mt-3 h-3 overflow-hidden rounded-full bg-zinc-200">
                  <div className="h-full w-full rounded-full bg-black" />
                </div>

              </div>

              <button
                type="button"
                onClick={() =>
                  router.push("/dashboard")
                }
                className="mt-8 rounded-2xl bg-black px-8 py-4 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                Back to Dashboard
              </button>

            </div>

          </div>

        </main>

      </div>
    );
  }

  /*
   * =========================================
   * NORMAL WORKOUT PAGE
   * =========================================
   */

  return (
    <div className="flex min-h-screen bg-zinc-50">

      {/* =========================================
          DASHBOARD SIDEBAR
      ========================================== */}

      <Sidebar />

      {/* =========================================
          WORKOUT CONTENT
      ========================================== */}

      <main className="min-w-0 flex-1 overflow-x-hidden p-4 md:p-6">

        <div className="mx-auto max-w-6xl">

          {/* STICKY HEADER */}

          <div className="sticky top-0 z-30 mb-6 rounded-3xl border border-zinc-200 bg-white/95 p-6 shadow-sm backdrop-blur-md">

            <button
              type="button"
              onClick={() =>
                router.back()
              }
              className="mb-5 flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-black"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
              {workout.name}
            </h1>

            <p className="mt-2 text-base text-zinc-500">
              {totalExercises} Exercises •{" "}
              {workout.estimatedDuration} mins
            </p>

            {/* PROGRESS BAR */}

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-zinc-200">

              <div
                className="h-full rounded-full bg-black transition-all duration-500"
                style={{
                  width: `${progressPercentage}%`,
                }}
              />

            </div>

            <div className="mt-2 flex items-center justify-between">

              <p className="text-sm text-zinc-500">
                Exercise{" "}
                {currentExerciseNumber} of{" "}
                {totalExercises}
              </p>

              <p className="text-sm font-semibold text-zinc-900">
                {progressPercentage}%
              </p>

            </div>

          </div>

          {/* EXERCISES */}

          <div className="space-y-2">

            {workout.exercises.map(
              (exercise) => (
                <WorkoutExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                />
              )
            )}

          </div>

        </div>

      </main>

    </div>
  );
}