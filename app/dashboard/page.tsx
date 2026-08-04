/*"use client";

import { useEffect, useState } from "react";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import OnboardingGuard from "@/components/auth/OnboardingGuard";

import { getTodaysWorkout } from "@/lib/workouts/scheduler";

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

  const workout = getTodaysWorkout(
    profile?.selectedProgram ?? "push-pull-legs",
    new Date().getDay()
  );
  
  useEffect(() => {
    setGreeting(getGreeting());
  }, [profile, user]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <OnboardingGuard>

        <div className="flex min-h-screen bg-zinc-100">

          <Sidebar />

          <main className="flex-1 space-y-4 p-3 md:space-y-6 md:p-6">

            <HeroCard
              greeting={greeting.title}
              name={
                profile?.fullName?.split(" ")[0] ||
                user?.displayName?.split(" ")[0] ||
                "Athlete"
              }
            />

            <StatsCards
              goal={profile?.goal ?? "-"}
              weight={profile?.weight ?? 0}
              level={profile?.experience ?? "-"}
              workoutSplit={profile?.selectedProgram ?? "-"}
            />

            <ProgressCard />

            <WorkoutCard workout={workout} />

          </main>

        </div>

      </OnboardingGuard>
    </ProtectedRoute>
  );
}*/

"use client";

import { useEffect, useState } from "react";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import OnboardingGuard from "@/components/auth/OnboardingGuard";

import { getTodaysWorkout } from "@/lib/workouts/scheduler";

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

  useEffect(() => {
    setGreeting(getGreeting());
  }, [profile, user]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  const workout = getTodaysWorkout(
    profile?.selectedProgram ?? "push-pull-legs",
    new Date().getDay()
  );

  console.log("Selected Program:", profile?.selectedProgram);

  return (
    <ProtectedRoute>
      <OnboardingGuard>
        <div className="flex min-h-screen bg-zinc-100">
          <Sidebar />

          <main className="flex-1 space-y-4 p-3 md:space-y-6 md:p-6">
            <HeroCard
              greeting={greeting.title}
              name={
                profile?.fullName?.split(" ")[0] ||
                user?.displayName?.split(" ")[0] ||
                "Athlete"
              }
            />

            <StatsCards
              goal={profile?.goal ?? "-"}
              weight={profile?.weight ?? 0}
              level={profile?.experience ?? "-"}
              workoutSplit={profile?.selectedProgram ?? "-"}
            />

            <ProgressCard />

            <WorkoutCard workout={workout} />
          </main>
        </div>
      </OnboardingGuard>
    </ProtectedRoute>
  );
}

