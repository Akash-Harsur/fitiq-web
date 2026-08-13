"use client";

import { useRouter } from "next/navigation";

import { WorkoutDay } from "@/lib/workouts/types";
import { useWorkout } from "@/contexts/WorkoutContext";

interface WorkoutCardProps {
  workout: WorkoutDay;
  workoutType: string;
}

export default function WorkoutCard({
  workout,
  workoutType,
}: WorkoutCardProps) {
  const router = useRouter();

  const { startWorkout } = useWorkout();

  function handleStartWorkout() {
    startWorkout(workout);

    router.push(
      `/workout?type=${encodeURIComponent(workoutType)}`
    );
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">

        {/* Left */}

        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
            TODAY&apos;S WORKOUT
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900">
            {workout.name}
          </h2>

          <p className="mt-4 text-base text-zinc-500">
            {workout.exercises.length} Exercises •{" "}
            {workout.estimatedDuration} mins
          </p>
        </div>

        {/* Right */}

        <button
          type="button"
          onClick={handleStartWorkout}
          className="flex h-16 w-full items-center justify-center rounded-2xl bg-black px-8 text-lg font-semibold text-white transition-all duration-300 hover:bg-zinc-800 hover:shadow-lg md:h-20 md:w-64 md:rounded-3xl md:text-xl"
        >
          Start Workout
        </button>

      </div>
    </div>
  );
}