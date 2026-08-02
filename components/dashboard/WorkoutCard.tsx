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
    <div className="rounded-3xl border border-zinc-200 bg-white px-10 py-5 shadow-sm">

      <div className="flex items-center justify-between gap-16">

        {/* Left */}

        <div className="flex-1">

          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
            TODAY'S WORKOUT
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900">
            {workout.name}
          </h2>

          <p className="mt-4 text-1g text-zinc-500">
            {workout.exercises.length} Exercises •{" "}
            {workout.estimatedDuration} mins
          </p>

        </div>

        {/* Right */}

        <button
          onClick={handleStartWorkout}
          className="flex h-20 w-64 items-center justify-center rounded-3xl bg-black text-xl font-semibold text-white transition-all duration-300 hover:bg-zinc-800 hover:shadow-lg"
        >
          Start Workout
        </button>

      </div>

    </div>
  );
}