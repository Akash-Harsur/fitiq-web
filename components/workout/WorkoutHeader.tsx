"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface WorkoutHeaderProps {
  workoutName: string;
  currentExercise: number;
  totalExercises: number;
  workoutType: string;
}

export default function WorkoutHeader({
  workoutName,
  currentExercise,
  totalExercises,
  workoutType,
}: WorkoutHeaderProps) {
  const router = useRouter();

  const progress = (currentExercise / totalExercises) * 100;

  return (
    <div className="mb-8">

      <div className="mb-8 flex items-center justify-between">

        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-zinc-300 transition hover:bg-zinc-800"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-300">
          {workoutType}
        </div>

      </div>

      <h1 className="text-4xl font-bold tracking-tight text-white">
        {workoutName}
      </h1>

      <p className="mt-2 text-zinc-400">
        Exercise {currentExercise} of {totalExercises}
      </p>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-zinc-800">

        <div
          className="h-full rounded-full bg-white transition-all duration-500"
          style={{ width: `${progress}%` }}
        />

      </div>

    </div>
  );
}