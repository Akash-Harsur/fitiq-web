"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

import { WorkoutDay } from "@/lib/workouts/types";
import { useWorkout } from "@/contexts/WorkoutContext";
import { useAuth } from "@/contexts/AuthContext";

import { getDailyWorkoutProgress } from "@/lib/workouts/dailyWorkout";

interface WorkoutCardProps {
  workout: WorkoutDay;
  workoutType: string;
}

export default function WorkoutCard({
  workout,
  workoutType,
}: WorkoutCardProps) {
  const router = useRouter();

  const { user } = useAuth();
  const { startWorkout } = useWorkout();

  const [workoutCompleted, setWorkoutCompleted] =
    useState(false);

  const [checkingProgress, setCheckingProgress] =
    useState(true);

  /*
   * =========================================
   * CHECK TODAY'S WORKOUT PROGRESS
   * =========================================
   */

  useEffect(() => {
    if (!user || !workoutType) {
      setCheckingProgress(false);
      return;
    }

    let cancelled = false;

    const checkProgress = async () => {
      try {
        setCheckingProgress(true);

        const progress =
          await getDailyWorkoutProgress(
            user.uid,
            workoutType
          );

        if (!cancelled) {
          setWorkoutCompleted(
            progress.workoutFinished
          );
        }
      } catch (error) {
        console.error(
          "Failed to check workout progress:",
          error
        );

        if (!cancelled) {
          setWorkoutCompleted(false);
        }
      } finally {
        if (!cancelled) {
          setCheckingProgress(false);
        }
      }
    };

    checkProgress();

    return () => {
      cancelled = true;
    };
  }, [user, workoutType]);

  /*
   * =========================================
   * START WORKOUT
   * =========================================
   */

  function handleStartWorkout() {
    if (workoutCompleted) {
      return;
    }

    startWorkout(
      workout,
      user?.uid,
      workoutType
    );

    router.push(
      `/workout?type=${encodeURIComponent(
        workoutType
      )}`
    );
  }

  /*
   * =========================================
   * REST DAY
   * =========================================
   */

  const isRestDay =
    workoutType === "rest";

  /*
   * =========================================
   * UI
   * =========================================
   */

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">

      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">

        {/* =========================
            LEFT
        ========================== */}

        <div className="flex-1">

          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
            TODAY&apos;S WORKOUT
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900">
            {workout.name}
          </h2>

          {isRestDay ? (
            <p className="mt-4 text-base text-zinc-500">
              Recovery is part of progress.
            </p>
          ) : (
            <p className="mt-4 text-base text-zinc-500">
              {workout.exercises.length} Exercises •{" "}
              {workout.estimatedDuration} mins
            </p>
          )}

        </div>

        {/* =========================
            RIGHT
        ========================== */}

        {isRestDay ? (

          <div className="flex h-16 w-full items-center justify-center rounded-2xl bg-zinc-100 px-8 text-lg font-semibold text-zinc-600 md:h-20 md:w-64 md:rounded-3xl md:text-xl">
            Rest & Recover
          </div>

        ) : workoutCompleted ? (

          <div className="flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-zinc-100 px-8 text-lg font-semibold text-zinc-700 md:h-20 md:w-64 md:rounded-3xl md:text-xl">

            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
              <Check size={16} />
            </div>

            Workout Completed

          </div>

        ) : checkingProgress ? (

          <div className="flex h-16 w-full items-center justify-center rounded-2xl bg-zinc-100 px-8 text-lg font-semibold text-zinc-400 md:h-20 md:w-64 md:rounded-3xl md:text-xl">
            Checking...
          </div>

        ) : (

          <button
            type="button"
            onClick={handleStartWorkout}
            className="flex h-16 w-full items-center justify-center rounded-2xl bg-black px-8 text-lg font-semibold text-white transition-all duration-300 hover:bg-zinc-800 hover:shadow-lg md:h-20 md:w-64 md:rounded-3xl md:text-xl"
          >
            Start Workout
          </button>

        )}

      </div>

    </div>
  );
}