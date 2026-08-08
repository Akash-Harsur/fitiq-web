"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import WorkoutExerciseCard from "@/components/workout/WorkoutExerciseCard";
import { getWorkoutByType } from "@/lib/workouts/scheduler";

export default function WorkoutPage() {
  const router = useRouter();

  // Temporary: current workout
  // Next step mein dashboard se selected workout dynamically pass karenge.
  const workout = getWorkoutByType("upper");

  return (
    <main className="min-h-screen bg-zinc-100">
      <div className="mx-auto max-w-7xl p-6">

        {/* Header */}
        <div className="mb-8 rounded-3xl bg-white p-8 shadow-sm">

          <button
            onClick={() => router.back()}
            className="mb-6 flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-black"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
            {workout.name}
          </h1>

          <p className="mt-2 text-lg text-zinc-500">
            {workout.exercises.length} Exercises •{" "}
            {workout.estimatedDuration} mins
          </p>

          <div className="mt-6 h-2 overflow-hidden rounded-full bg-zinc-200">
            <div className="h-full w-1/6 rounded-full bg-black" />
          </div>

          <p className="mt-2 text-sm text-zinc-500">
            Exercise 1 of {workout.exercises.length}
          </p>

        </div>

        {/* Exercises */}
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