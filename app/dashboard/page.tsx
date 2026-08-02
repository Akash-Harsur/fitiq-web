"use client";

import { useEffect, useState } from "react";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import OnboardingGuard from "@/components/auth/OnboardingGuard";

import { useAuth } from "@/contexts/AuthContext";
import { useWorkout } from "@/contexts/WorkoutContext";
import { useUserProfile } from "@/hooks/useUserProfile";

import Sidebar from "@/components/dashboard/Sidebar";
import HeroCard from "@/components/dashboard/HeroCard";
import StatsCards from "@/components/dashboard/StatsCards";
import ProgressCard from "@/components/dashboard/ProgressCard";
import WorkoutCard from "@/components/dashboard/WorkoutCard";

import { getGreeting } from "@/lib/greeting";
import { generatePushWorkout } from "@/lib/workouts/generator";

export default function DashboardPage() {
  const { user } = useAuth();
  const { profile, loading } = useUserProfile();

  const { startWorkout } = useWorkout();

  const [greeting, setGreeting] = useState({
    title: "Welcome",
  });

  const [workout] = useState(generatePushWorkout());

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

          <main className="flex-1 space-y-4 bg-white p-3 md:space-y-6 md:bg-zinc-100 md:p-6">

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
              workoutSplit={profile?.selectedProgram ?? "-"}
            />

            {/* Workout Timeline */}

            <ProgressCard />

            {/* Today's Workout */}

            <WorkoutCard workout={workout} />

          </main>
        </div>
      </OnboardingGuard>
    </ProtectedRoute>
  );
}