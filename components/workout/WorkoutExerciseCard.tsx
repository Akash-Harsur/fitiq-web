"use client";

import Image from "next/image";
import {
  ChevronDown,
  ChevronUp,
  Check,
  Dumbbell,
} from "lucide-react";
import { useState } from "react";

import { WorkoutExercise } from "@/types/workout";
import { useWorkout } from "@/contexts/WorkoutContext";

type Props = {
  exercise: WorkoutExercise;
};

export default function WorkoutExerciseCard({
  exercise,
}: Props) {
  const [expanded, setExpanded] = useState(
    exercise.expanded ?? false
  );

  const {
    completedExerciseIds,
    completeExercise,
  } = useWorkout();

  const isCompleted =
    completedExerciseIds.includes(exercise.id);

  /*
   * =========================================
   * COMPLETE EXERCISE
   * =========================================
   *
   * When the user completes an exercise:
   *
   * 1. Save the completion
   * 2. Collapse the current exercise
   * 3. Scroll to the next exercise
   */

  const handleCompleteExercise = () => {
    completeExercise(exercise.id);

    // Collapse current exercise
    setExpanded(false);

    /*
     * Give React a moment to update the UI
     * before scrolling to the next exercise.
     */

    setTimeout(() => {
      const exercises = Array.from(
        document.querySelectorAll(
          "[data-workout-exercise]"
        )
      );

      const currentIndex = exercises.findIndex(
        (element) =>
          element.getAttribute(
            "data-workout-exercise"
          ) === exercise.id
      );

      const nextExercise =
        exercises[currentIndex + 1];

      if (nextExercise) {
        nextExercise.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 150);
  };

  /*
   * =========================================
   * EXERCISE IMAGE CHECK
   * =========================================
   *
   * Some exercises such as Squat, Bench and
   * Deadlift currently don't have an image.
   *
   * Never pass an empty string to Next/Image.
   */

  const hasExerciseImage =
    typeof exercise.image === "string" &&
    exercise.image.trim() !== "";

  return (
    <div
      data-workout-exercise={exercise.id}
      className="overflow-hidden rounded-xl border border-zinc-300 bg-white"
    >

      {/* =========================================
          HEADER
      ========================================= */}

      <button
        type="button"
        onClick={() =>
          setExpanded((prev) => !prev)
        }
        className="flex w-full items-start justify-between px-5 py-4 text-left transition hover:bg-zinc-50 md:px-6"
      >
        <div className="min-w-0">

          <h2
            className={`text-xl font-bold tracking-tight md:text-2xl ${
              isCompleted
                ? "text-zinc-500"
                : "text-zinc-900"
            }`}
          >
            {exercise.name}
          </h2>

          <div className="mt-2 flex flex-wrap gap-2">

            {/* WORKING SET COUNT */}

            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
              {exercise.workingSets.length} Sets
            </span>

            {/* WARM-UP */}

            {exercise.warmup &&
              exercise.warmup.length > 0 && (
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                  Warm-up
                </span>
              )}

            {/* BACK-OFF */}

            {exercise.backoff && (
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                Back-off
              </span>
            )}

            {/* DROP SET */}

            {exercise.dropSet &&
              exercise.dropSet.length > 0 && (
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                  Drop Set
                </span>
              )}

            {/* SUPERSET */}

            {exercise.superset && (
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                Superset
              </span>
            )}

            {/* REST */}

            {exercise.rest && (
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                Rest {exercise.rest}
              </span>
            )}

          </div>
        </div>

        {/* EXPAND ICON */}

        <span className="ml-4 shrink-0">
          {expanded ? (
            <ChevronUp size={22} />
          ) : (
            <ChevronDown size={22} />
          )}
        </span>
      </button>

      {/* =========================================
          EXPANDED CONTENT
      ========================================= */}

      {expanded && (
        <div className="border-t border-zinc-200">

          {/* =========================================
              MOBILE IMAGE
          ========================================= */}

          <div className="flex justify-center border-b border-zinc-200 p-5 lg:hidden">

            <div className="relative aspect-square w-56">

              {hasExerciseImage ? (
                <Image
                  src={exercise.image}
                  alt={exercise.name}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-2xl bg-zinc-100">
                  <Dumbbell
                    size={64}
                    className="text-zinc-300"
                  />
                </div>
              )}

            </div>
          </div>

          <div className="lg:grid lg:grid-cols-[260px_1fr]">

            {/* =========================================
                DESKTOP IMAGE
            ========================================= */}

            <div className="hidden items-center justify-center border-r border-zinc-200 p-6 lg:flex">

              <div className="relative aspect-square w-48">

                {hasExerciseImage ? (
                  <Image
                    src={exercise.image}
                    alt={exercise.name}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-2xl bg-zinc-100">
                    <Dumbbell
                      size={56}
                      className="text-zinc-300"
                    />
                  </div>
                )}

              </div>

            </div>

            {/* =========================================
                DETAILS
            ========================================= */}

            <div>

              {/* =========================================
                  WARM-UP
              ========================================= */}

              {exercise.warmup &&
                exercise.warmup.length > 0 && (
                  <div className="border-b border-zinc-200 p-5 md:p-6">

                    <h3 className="mb-4 text-lg font-bold text-zinc-900">
                      Warm-up
                    </h3>

                    <div className="space-y-3">

                      {exercise.warmup.map(
                        (set, index) => (
                          <div
                            key={index}
                            className="flex flex-wrap items-center gap-4 border-b border-zinc-100 pb-3 last:border-0 last:pb-0"
                          >

                            <span className="font-semibold text-zinc-900">
                              Set {index + 1}
                            </span>

                            <span className="text-zinc-700">
                              × {set.reps} reps
                            </span>

                            <span className="text-sm text-zinc-500">
                              ({set.percent}% of Working Set)
                            </span>

                          </div>
                        )
                      )}

                    </div>
                  </div>
                )}

              {/* =========================================
                  WORKING SETS
              ========================================= */}

              <div className="border-b border-zinc-200 p-5 md:p-6">

                <h3 className="mb-4 text-lg font-bold text-zinc-900">
                  Working Sets
                </h3>

                <div className="space-y-3">

                  {exercise.workingSets.map(
                    (set) => (
                      <div
                        key={set.label}
                        className="flex items-center gap-5 border-b border-zinc-100 pb-3 last:border-0 last:pb-0"
                      >

                        <span className="font-semibold text-zinc-900">
                          {set.label}
                        </span>

                        <span className="text-zinc-700">
                          × {set.reps} reps
                        </span>

                      </div>
                    )
                  )}

                </div>
              </div>

              {/* =========================================
                  BACK-OFF
              ========================================= */}

              {exercise.backoff && (
                <div className="border-b border-zinc-200 p-5 md:p-6">

                  <h3 className="mb-4 text-lg font-bold text-zinc-900">
                    Back-off
                  </h3>

                  <div className="flex flex-wrap items-center gap-5">

                    <span className="font-semibold text-zinc-900">
                      Set 1
                    </span>

                    <span className="text-zinc-700">
                      × {exercise.backoff.reps} reps
                    </span>

                    <span className="text-sm text-zinc-500">
                      ({100 - exercise.backoff.percent}% of Last Working Set)
                    </span>

                  </div>

                </div>
              )}

              {/* =========================================
                  DROP SET
              ========================================= */}

              {exercise.dropSet &&
                exercise.dropSet.length > 0 && (
                  <div className="border-b border-zinc-200 p-5 md:p-6">

                    <h3 className="mb-4 text-lg font-bold text-zinc-900">
                      Drop Set
                    </h3>

                    <div className="space-y-3">

                      {exercise.dropSet.map(
                        (set, index) => (
                          <div
                            key={index}
                            className="flex flex-wrap items-center gap-5 border-b border-zinc-100 pb-3 last:border-0 last:pb-0"
                          >

                            <span className="font-semibold text-zinc-900">
                              Set {index + 1}
                            </span>

                            <span className="text-zinc-700">
                              × {set.reps} reps
                            </span>

                            <span className="text-sm text-zinc-500">
                              {100 - set.percent}% of previous set
                            </span>

                          </div>
                        )
                      )}

                    </div>
                  </div>
                )}

              {/* =========================================
                  SUPERSET
              ========================================= */}

              {exercise.superset && (
                <div className="border-b border-zinc-200 p-5 md:p-6">

                  <h3 className="mb-4 text-lg font-bold text-zinc-900">
                    Superset
                  </h3>

                  <div className="rounded-2xl bg-zinc-50 p-4">

                    <p className="font-semibold text-zinc-900">
                      {exercise.superset.name}
                    </p>

                    <p className="mt-1 text-sm text-zinc-500">
                      {exercise.superset.reps} reps
                    </p>

                  </div>
                </div>
              )}

              {/* =========================================
                  NOTES
              ========================================= */}

              {exercise.notes && (
                <div className="border-b border-zinc-200 p-5 md:p-6">

                  <h3 className="mb-2 text-lg font-bold text-zinc-900">
                    Notes
                  </h3>

                  <p className="text-sm leading-6 text-zinc-600">
                    {exercise.notes}
                  </p>

                </div>
              )}

              {/* =========================================
                  REST
              ========================================= */}

              {exercise.rest && (
                <div className="border-b border-zinc-200 p-5 md:p-6">

                  <p className="text-sm text-zinc-600">
                    Rest {exercise.rest} between sets
                  </p>

                </div>
              )}

              {/* =========================================
                  COMPLETE BUTTON
              ========================================= */}

              <div className="p-5 md:p-6">

                <button
                  type="button"
                  onClick={handleCompleteExercise}
                  className={`flex w-full items-center justify-center gap-2 rounded-2xl border px-5 py-4 text-sm font-semibold transition-all md:text-base ${
                    isCompleted
                      ? "border-black bg-black text-white hover:bg-zinc-800"
                      : "border-zinc-300 bg-white text-black hover:border-black hover:bg-zinc-50"
                  }`}
                >

                  {isCompleted && (
                    <Check size={18} />
                  )}

                  {isCompleted
                    ? "Exercise Completed"
                    : "Complete Exercise"}

                </button>

              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}