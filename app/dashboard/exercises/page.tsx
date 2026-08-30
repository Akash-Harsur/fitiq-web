"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import ExerciseLibrary from "@/components/workout/ExerciseLibrary";

export default function ExercisesPage() {
  return (
    <div className="flex min-h-screen bg-zinc-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="min-w-0 flex-1 overflow-x-hidden">
        <ExerciseLibrary />
      </main>
    </div>
  );
}