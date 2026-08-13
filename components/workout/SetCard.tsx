"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";

import { useWorkout } from "@/contexts/WorkoutContext";

type SetCardProps = {
  exerciseId: string;
  setIndex: number;
  label: string;
  targetReps: number;
};

export default function SetCard({
  exerciseId,
  setIndex,
  label,
  targetReps,
}: SetCardProps) {
  const {
    setResults,
    updateSetResult,
    completeSet,
    uncompleteSet,
  } = useWorkout();

  const existingResult = setResults.find(
    (result) =>
      result.exerciseId === exerciseId &&
      result.setIndex === setIndex
  );

  const [weight, setWeight] = useState(
    existingResult?.weight?.toString() ?? ""
  );

  const [reps, setReps] = useState(
    existingResult?.reps?.toString() ??
      targetReps.toString()
  );

  /*
   * Keep local inputs synchronized with
   * the workout context.
   */

  useEffect(() => {
    if (existingResult) {
      setWeight(
        existingResult.weight?.toString() ?? ""
      );

      setReps(
        existingResult.reps?.toString() ??
          targetReps.toString()
      );
    }
  }, [
    existingResult?.weight,
    existingResult?.reps,
    targetReps,
  ]);

  const isCompleted =
    existingResult?.completed ?? false;

  /*
   * Save weight to WorkoutContext.
   */

  function handleWeightChange(
    value: string
  ) {
    setWeight(value);

    const numericWeight =
      value === ""
        ? null
        : Number(value);

    updateSetResult(
      exerciseId,
      setIndex,
      {
        weight: numericWeight,
      }
    );
  }

  /*
   * Save reps to WorkoutContext.
   */

  function handleRepsChange(
    value: string
  ) {
    setReps(value);

    const numericReps =
      value === ""
        ? null
        : Number(value);

    updateSetResult(
      exerciseId,
      setIndex,
      {
        reps: numericReps,
      }
    );
  }

  /*
   * Complete / uncomplete set.
   */

  function handleComplete() {
    if (isCompleted) {
      uncompleteSet(
        exerciseId,
        setIndex
      );

      return;
    }

    updateSetResult(
      exerciseId,
      setIndex,
      {
        weight:
          weight === ""
            ? null
            : Number(weight),

        reps:
          reps === ""
            ? null
            : Number(reps),
      }
    );

    completeSet(
      exerciseId,
      setIndex
    );
  }

  return (
    <div
      className={`rounded-2xl border p-4 transition-all ${
        isCompleted
          ? "border-zinc-300 bg-zinc-50"
          : "border-zinc-200 bg-white"
      }`}
    >
      {/* =========================
          SET HEADER
      ========================== */}

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-bold text-zinc-900">
            {label}
          </p>

          <p className="mt-1 text-xs text-zinc-500">
            Target: {targetReps} reps
          </p>
        </div>

        {isCompleted && (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
            <Check size={17} />
          </div>
        )}

      </div>

      {/* =========================
          INPUTS
      ========================== */}

      <div className="mt-4 grid grid-cols-2 gap-3">

        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-500">
            Weight
          </label>

          <div className="relative">

            <input
              type="number"
              min="0"
              step="0.5"
              value={weight}
              onChange={(e) =>
                handleWeightChange(
                  e.target.value
                )
              }
              disabled={isCompleted}
              placeholder="0"
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-3 pr-12 text-sm font-semibold text-zinc-900 outline-none transition focus:border-black disabled:bg-zinc-100 disabled:text-zinc-500"
            />

            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400">
              kg
            </span>

          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-500">
            Reps
          </label>

          <input
            type="number"
            min="0"
            step="1"
            value={reps}
            onChange={(e) =>
              handleRepsChange(
                e.target.value
              )
            }
            disabled={isCompleted}
            placeholder={String(
              targetReps
            )}
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-3 text-sm font-semibold text-zinc-900 outline-none transition focus:border-black disabled:bg-zinc-100 disabled:text-zinc-500"
          />
        </div>

      </div>

      {/* =========================
          COMPLETE BUTTON
      ========================== */}

      <button
        type="button"
        onClick={handleComplete}
        className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
          isCompleted
            ? "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100"
            : "bg-black text-white hover:bg-zinc-800"
        }`}
      >
        {isCompleted ? (
          <>
            <Check size={17} />
            Set Completed
          </>
        ) : (
          "Complete Set"
        )}
      </button>

    </div>
  );
}
