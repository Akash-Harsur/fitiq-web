"use client";

import { Check } from "lucide-react";

interface ExerciseCardProps {
  name: string;
  video: string;
  primary: string;
  secondary: string;
  sets: number;
  reps: string;
  rest: string;

  exerciseNumber?: number;
  totalExercises?: number;
  workoutName?: string;

  completed?: boolean;
  onComplete?: () => void;
}

export default function ExerciseCard({
  name,
  video,
  primary,
  secondary,
  sets,
  reps,
  rest,
  exerciseNumber = 1,
  totalExercises = 6,
  workoutName = "Workout",
  completed = false,
  onComplete,
}: ExerciseCardProps) {
  return (
    <div className="mx-auto w-full max-w-5xl rounded-3xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl">

      {/* =========================
          HEADER
      ========================== */}

      <div className="mb-8 flex items-center justify-between gap-4">

        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Exercise {exerciseNumber} of {totalExercises}
          </p>

          <h1 className="mt-2 text-4xl font-bold text-white">
            {name}
          </h1>
        </div>

        <div className="shrink-0 rounded-full bg-zinc-800 px-5 py-2 text-sm text-white">
          {workoutName}
        </div>

      </div>

      {/* =========================
          VIDEO
      ========================== */}

      <div className="overflow-hidden rounded-2xl border border-zinc-800">

        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          className="h-[420px] w-full object-cover"
        />

      </div>

      {/* =========================
          MUSCLES
      ========================== */}

      <div className="mt-8 grid gap-5 md:grid-cols-2">

        <div className="rounded-2xl bg-zinc-900 p-6">

          <p className="text-xs uppercase tracking-widest text-zinc-500">
            Primary Muscle
          </p>

          <h3 className="mt-3 text-2xl font-semibold text-white">
            {primary}
          </h3>

        </div>

        <div className="rounded-2xl bg-zinc-900 p-6">

          <p className="text-xs uppercase tracking-widest text-zinc-500">
            Secondary Muscles
          </p>

          <h3 className="mt-3 text-2xl font-semibold text-white">
            {secondary}
          </h3>

        </div>

      </div>

      {/* =========================
          WORKOUT DETAILS
      ========================== */}

      <div className="mt-8 grid grid-cols-3 gap-5">

        <div className="rounded-2xl bg-zinc-900 p-6 text-center">

          <p className="text-sm text-zinc-500">
            Sets
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            {sets}
          </h2>

        </div>

        <div className="rounded-2xl bg-zinc-900 p-6 text-center">

          <p className="text-sm text-zinc-500">
            Reps
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            {reps}
          </h2>

        </div>

        <div className="rounded-2xl bg-zinc-900 p-6 text-center">

          <p className="text-sm text-zinc-500">
            Rest
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            {rest}
          </h2>

        </div>

      </div>

      {/* =========================
          COMPLETE EXERCISE
      ========================== */}

      <button
        type="button"
        onClick={onComplete}
        disabled={completed}
        className={`mt-10 flex w-full items-center justify-center gap-3 rounded-2xl py-5 text-lg font-bold transition ${
          completed
            ? "cursor-default bg-zinc-800 text-white"
            : "bg-white text-black hover:bg-zinc-200"
        }`}
      >

        {completed ? (
          <>
            <Check size={22} />
            Exercise Completed
          </>
        ) : (
          "Exercise Completed →"
        )}

      </button>

    </div>
  );
}