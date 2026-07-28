"use client";

import { useEffect, useState } from "react";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import OnboardingGuard from "@/components/auth/OnboardingGuard";

import Sidebar from "@/components/dashboard/Sidebar";
import HeroCard from "@/components/dashboard/HeroCard";
import WorkoutCard from "@/components/dashboard/WorkoutCard";
import ExerciseList from "@/components/dashboard/ExerciseList";
import StatsCards from "@/components/dashboard/StatsCards";
import ProgressCard from "@/components/dashboard/ProgressCard";

import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";

import { getGreeting } from "@/lib/greeting";
import { generatePushWorkout } from "@/lib/workouts/generator";

export default function DashboardPage() {
  const { user } = useAuth();
  const { profile, loading } = useUserProfile();

  const [greeting, setGreeting] = useState({
    title: "Welcome 👋",
    subtitle: "Ready to crush today's workout?",
  });

  const [workout] = useState(generatePushWorkout());

  useEffect(() => {
    const name = profile?.fullName || user?.displayName;

    if (name) {
      const firstName = name.split(" ")[0];
      setGreeting(getGreeting(firstName));
    }
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
        <div className="flex min-h-screen bg-gray-100">
          <Sidebar />

          <main className="flex-1 space-y-8 p-8">

            <HeroCard
              title={greeting.title}
              subtitle={greeting.subtitle}
            />

            <WorkoutCard workout={workout} />

            <ExerciseList workout={workout} />

            <StatsCards
              goal={profile?.goal ?? "-"}
              weight={profile?.weight ?? 0}
              trainingDays={profile?.trainingDays ?? 0}
            />

            <ProgressCard />

          </main>
        </div>
      </OnboardingGuard>
    </ProtectedRoute>
  );
}