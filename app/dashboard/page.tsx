"use client";

import { useEffect, useState } from "react";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import OnboardingGuard from "@/components/auth/OnboardingGuard";

import {
  getTodaysWorkout,
  getTodaysWorkoutType,
  getWorkoutByType,
} from "@/lib/workouts/scheduler";

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

  useEffect(() => {
    setGreeting(getGreeting());
  }, [profile, user]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  const selectedProgram =
    profile?.selectedProgram ?? "push-pull-legs";

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
   * Generate today's scheduled workout.
   */
  const scheduledWorkout =
    getTodaysWorkout(
      selectedProgram,
      today
    );

  /*
   * If user manually selects a workout,
   * use that workout.
   *
   * Otherwise use the scheduled workout.
   */
  const workout = manualWorkout
    ? getWorkoutByType(manualWorkout)
    : scheduledWorkout;

  /*
   * This is the actual workout type
   * that will be passed to WorkoutCard.
   */
  const workoutType =
    manualWorkout ?? scheduledWorkoutType;

  console.log(
    "Selected Program:",
    selectedProgram
  );

  console.log(
    "Scheduled Workout Type:",
    scheduledWorkoutType
  );

  console.log(
    "Final Workout Type:",
    workoutType
  );

  return (
    <ProtectedRoute>
      <OnboardingGuard>

        <div className="flex min-h-screen bg-zinc-50">

          <Sidebar />

          <main className="flex-1 space-y-4 p-3 md:space-y-6 md:p-6">

            {/* Hero */}

            <HeroCard
              greeting={greeting.title}
              name={
                profile?.fullName?.split(" ")[0] ||
                user?.displayName?.split(" ")[0] ||
                "Athlete"
              }
            />

            {/* Stats */}

            <StatsCards
              goal={profile?.goal ?? "-"}
              weight={profile?.weight ?? 0}
              level={profile?.experience ?? "-"}
              workoutSplit={
                profile?.selectedProgram ?? "-"
              }
            />

            {/* Progress */}

            <ProgressCard />

            {/* Choose Today's Workout */}

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

            {/* Today's Workout */}

            <WorkoutCard
              workout={workout}
              workoutType={workoutType}
            />

          </main>

        </div>

      </OnboardingGuard>
    </ProtectedRoute>
  );
}