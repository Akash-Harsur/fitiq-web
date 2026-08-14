"use client";

import { useEffect, useState } from "react";

import RestDayCard from "@/components/dashboard/RestDayCard";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import OnboardingGuard from "@/components/auth/OnboardingGuard";

import {
  getTodaysWorkoutType,
} from "@/lib/workouts/scheduler";

import {
  getOrCreateDailyWorkout,
} from "@/lib/workouts/dailyWorkout";

import { WorkoutDay } from "@/lib/workouts/types";

import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";

import Sidebar from "@/components/dashboard/Sidebar";
import HeroCard from "@/components/dashboard/HeroCard";
import StatsCards from "@/components/dashboard/StatsCards";
import ProgressCard from "@/components/dashboard/ProgressCard";
import WorkoutCard from "@/components/dashboard/WorkoutCard";

import { getGreeting } from "@/lib/greeting";

export default function DashboardPage() {
  const { user } = useAuth();
  const { profile, loading } = useUserProfile();

  const [greeting, setGreeting] = useState({
    title: "Welcome",
  });

  const [manualWorkout, setManualWorkout] =
    useState<string | null>(null);

  const [dailyWorkout, setDailyWorkout] =
    useState<WorkoutDay | null>(null);

  const [dailyWorkoutType, setDailyWorkoutType] =
    useState<string>("");

  const [workoutLoading, setWorkoutLoading] =
    useState(true);

  /*
   * Greeting
   */

  useEffect(() => {
    setGreeting(getGreeting());
  }, [profile, user]);

  /*
   * Selected program
   */

  const selectedProgram =
    profile?.selectedProgram ?? "push-pull-legs";

  /*
   * Current day
   */

  const today = new Date().getDay();

  /*
   * Get today's scheduled workout type.
   *
   * Example:
   * PPL + Monday -> push
   * PPL + Tuesday -> pull
   * PPL + Wednesday -> legs
   */

  const scheduledWorkoutType =
    getTodaysWorkoutType(
      selectedProgram,
      today
    );

  /*
   * Load today's workout.
   *
   * If today's workout already exists in Firebase,
   * use the exact same workout.
   *
   * If it doesn't exist, generate it once
   * and save it to Firebase.
   */

  useEffect(() => {
    if (!user || !profile) {
      return;
    }

    const selectedType =
      manualWorkout ?? scheduledWorkoutType;

    const loadDailyWorkout = async () => {
      try {
        setWorkoutLoading(true);

        const savedWorkout =
          await getOrCreateDailyWorkout(
            user.uid,
            selectedType
          );

        setDailyWorkout(savedWorkout);

        setDailyWorkoutType(selectedType);

        console.log(
          "Selected Program:",
          selectedProgram
        );

        console.log(
          "Scheduled Workout Type:",
          scheduledWorkoutType
        );

        console.log(
          "Daily Workout Type:",
          selectedType
        );

        console.log(
          "Daily Workout:",
          savedWorkout
        );
      } catch (error) {
        console.error(
          "Failed to load daily workout:",
          error
        );

        setDailyWorkout(null);
        setDailyWorkoutType("");
      } finally {
        setWorkoutLoading(false);
      }
    };

    loadDailyWorkout();
  }, [
    user,
    profile,
    manualWorkout,
    scheduledWorkoutType,
    selectedProgram,
  ]);

  /*
   * Loading profile
   *
   * IMPORTANT:
   * This comes AFTER all hooks.
   * This prevents React Hook order errors.
   */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <p className="text-sm text-zinc-500">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <OnboardingGuard>

        <div className="flex min-h-screen bg-zinc-50">

          <Sidebar />

          <main className="flex-1 space-y-4 p-3 md:space-y-6 md:p-6">

            {/* =========================
                HERO
            ========================== */}

            <HeroCard
              greeting={greeting.title}
              name={
                profile?.fullName?.split(" ")[0] ||
                user?.displayName?.split(" ")[0] ||
                "Athlete"
              }
            />

            {/* =========================
                STATS
            ========================== */}

            <StatsCards
              goal={profile?.goal ?? "-"}
              weight={profile?.weight ?? 0}
              level={profile?.experience ?? "-"}
              workoutSplit={
                profile?.selectedProgram ?? "-"
              }
            />

            {/* =========================
                PROGRESS
            ========================== */}

            <ProgressCard />

            {/* =========================
                CHOOSE TODAY'S WORKOUT
            ========================== */}

            <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">

              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div>
                  <p className="text-sm font-semibold text-zinc-900">
                    Choose Today&apos;s Workout
                  </p>

                  <p className="mt-1 text-sm text-zinc-500">
                    Want to do something different today?
                  </p>
                </div>

                <select
                  value={manualWorkout ?? ""}
                  onChange={(e) =>
                    setManualWorkout(
                      e.target.value || null
                    )
                  }
                  className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-900 outline-none focus:border-black"
                >

                  <option value="">
                    Use Scheduled Workout
                  </option>

                  <option value="push">
                    Push
                  </option>

                  <option value="pull">
                    Pull
                  </option>

                  <option value="legs">
                    Legs
                  </option>

                  <option value="chest">
                    Chest
                  </option>

                  <option value="back">
                    Back
                  </option>

                  <option value="shoulders">
                    Shoulders
                  </option>

                  <option value="arms">
                    Arms
                  </option>

                  <option value="upper">
                    Upper Body
                  </option>

                  <option value="lower">
                    Lower Body
                  </option>

                  <option value="full-body">
                    Full Body
                  </option>

                </select>

              </div>

            </div>

            {/* =========================
                TODAY'S WORKOUT
            ========================== */}

            {workoutLoading ? (

              <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">

                <p className="text-sm font-semibold text-zinc-900">
                  Preparing your workout...
                </p>

                <p className="mt-1 text-sm text-zinc-500">
                  Creating your workout for today.
                </p>

              </div>

            ) : dailyWorkoutType === "rest" ? (

              <RestDayCard />

            ) : dailyWorkout ? (

              <WorkoutCard
                workout={dailyWorkout}
                workoutType={dailyWorkoutType}
              />

            ) : (

              <div className="rounded-3xl border border-red-200 bg-white p-6 shadow-sm">

                <p className="text-sm font-semibold text-red-600">
                  Unable to load workout
                </p>

                <p className="mt-1 text-sm text-zinc-500">
                  Please refresh the page and try again.
                </p>

              </div>

            )}

          </main>

        </div>

      </OnboardingGuard>
    </ProtectedRoute>
  );
}
