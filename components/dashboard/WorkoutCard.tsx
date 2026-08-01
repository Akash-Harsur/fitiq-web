"use client";

import { useRouter } from "next/navigation";

import { WorkoutDay } from "@/lib/workouts/types";
import { useWorkout } from "@/contexts/WorkoutContext";

interface WorkoutCardProps {
  workout: WorkoutDay;
}

export default function WorkoutCard({
  workout,
}: WorkoutCardProps) {
  const router = useRouter();

  const { startWorkout } = useWorkout();

  function handleStartWorkout() {
    startWorkout(workout.exercises.length);
    router.push("/workout");
  }

  return (
    <div className="rounded-3xl bg-white px-12 py-6 shadow-sm">

      <div className="flex items-center justify-between">

        {/* Left */}

        <div>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            Today's Workout
          </p>

          <h2 className="mt-3 text-5xl font-bold tracking-tight text-zinc-900">
            {workout.name}
          </h2>

          <p className="mt-4 text-xl font-medium text-zinc-500">
            {workout.exercises.length} Exercises •{" "}
            {workout.estimatedDuration} mins
          </p>

        </div>

        {/* Right */}

        <button
          onClick={handleStartWorkout}
          className="rounded-2xl bg-black px-10 py-5 text-xl font-semibold tracking-tight text-white transition-all duration-300 hover:bg-zinc-800 hover:shadow-lg active:scale-95"
        >
          Start Workout
        </button>

      </div>

    </div>
  );
}