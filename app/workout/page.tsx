"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import WorkoutExerciseCard from "@/components/workout/WorkoutExerciseCard";
import { getWorkoutByType } from "@/lib/workouts/scheduler";
import { WorkoutDay } from "@/lib/workouts/types";

export default function WorkoutPage() {
  const router = useRouter();

  const [workout, setWorkout] =
    useState<WorkoutDay | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    const workoutType =
      params.get("type") || "push";

    const generatedWorkout =
      getWorkoutByType(workoutType);

    setWorkout(generatedWorkout);
  }, []);

  if (!workout) {
    return (
      <main className="min-h-screen bg-zinc-50">
        <div className="mx-auto max-w-7xl p-6">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <p className="text-zinc-500">
              Loading workout...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-7xl p-6">

        {/* =========================
            HEADER
        ========================== */}

        <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm">

          <button
            onClick={() => router.back()}
            className="mb-5 flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-black"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            {workout.name}
          </h1>

          <p className="mt-2 text-base text-zinc-500">
            {workout.exercises.length} Exercises •{" "}
            {workout.estimatedDuration} mins
          </p>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-zinc-200">
            <div className="h-full w-0 rounded-full bg-black" />
          </div>

          <p className="mt-2 text-sm text-zinc-500">
            Exercise 1 of {workout.exercises.length}
          </p>
        </div>

        {/* =========================
            EXERCISES
        ========================== */}

        <div className="space-y-2">
          {workout.exercises.map((exercise) => (
            <WorkoutExerciseCard
              key={exercise.id}
              exercise={exercise}
            />
          ))}
        </div>

      </div>
    </main>
  );
}