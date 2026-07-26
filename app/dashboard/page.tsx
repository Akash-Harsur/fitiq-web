"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import OnboardingGuard from "@/components/auth/OnboardingGuard";

import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "@/components/dashboard/Sidebar";

import { getGreeting } from "@/lib/greeting";

export default function DashboardPage() {
  const [greeting, setGreeting] = useState({
    title: "Welcome 👋",
    subtitle: "Ready to crush today's workout?",
  });

  const { user } = useAuth();

  useEffect(() => {
    if (user?.displayName) {
      const firstName = user.displayName.split(" ")[0];
      setGreeting(getGreeting(firstName));
    }
  }, [user]);

  return (
    <ProtectedRoute>
    <OnboardingGuard>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />

        <main className="flex-1 p-10">
          <div className="rounded-3xl bg-white p-10 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold">
                  {greeting.title}
                </h1>

                <p className="mt-2 text-gray-500">
                  {greeting.subtitle}
                </p>
              </div>

              <Image
                src="/image/logo.jpeg"
                alt="FitIQ Logo"
                width={140}
                height={45}
              />
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6">
              <div className="rounded-2xl border bg-gray-50 p-6">
                <h3 className="text-lg font-semibold">
                  Today's Workout
                </h3>

                <p className="mt-3 text-gray-500">
                  Upper Body Strength
                </p>
              </div>

              <div className="rounded-2xl border bg-gray-50 p-6">
                <h3 className="text-lg font-semibold">
                  Calories
                </h3>

                <p className="mt-3 text-gray-500">
                  2450 kcal
                </p>
              </div>

              <div className="rounded-2xl border bg-gray-50 p-6">
                <h3 className="text-lg font-semibold">
                  Current Plan
                </h3>

                <p className="mt-3 text-gray-500">
                  Free Trial
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </OnboardingGuard>
  </ProtectedRoute>
  );
}