"use client";

import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

import { WorkoutExercise } from "@/types/workout";

type Props = {
  exercise: WorkoutExercise;
};

export default function WorkoutExerciseCard({
  exercise,
}: Props) {
  const [expanded, setExpanded] = useState(
    exercise.expanded ?? false
  );

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-300 bg-white">
      {/* =========================
          HEADER
      ========================== */}

      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="relative flex w-full items-start justify-between px-5 py-4 text-left transition-colors hover:bg-zinc-50 md:px-6"
      >
        <div className="flex min-w-0 flex-col items-start">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 md:text-2xl">
            {exercise.name}
          </h2>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            {/* Working Sets */}

            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
              {exercise.workingSets.length} Sets
            </span>

            {/* Warm-up */}

            {exercise.warmup &&
              exercise.warmup.length > 0 && (
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                  Warm-up
                </span>
              )}

            {/* Back-off */}

            {exercise.backoff && (
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                Back-off
              </span>
            )}

            {/* Rest */}

            {exercise.rest && (
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                Rest {exercise.rest}
              </span>
            )}
          </div>
        </div>

        <span className="ml-4 mt-1 shrink-0">
          {expanded ? (
            <ChevronUp size={22} />
          ) : (
            <ChevronDown size={22} />
          )}
        </span>
      </button>

      {/* =========================
          EXPANDED CONTENT
      ========================== */}

      {expanded && (
        <div className="border-t border-zinc-200">
          {/* =========================
              DESKTOP
          ========================== */}

          <div className="hidden lg:grid lg:grid-cols-[260px_1fr]">
            {/* Exercise Image */}

            <div className="flex items-center justify-center border-r border-zinc-200 p-6">
              <div className="relative aspect-square w-48">
                <Image
                  src={exercise.image}
                  alt={exercise.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Workout Details */}

            <div>
              {/* =========================
                  WARM-UP
              ========================== */}

              {exercise.warmup &&
                exercise.warmup.length > 0 && (
                  <div className="border-b border-zinc-200 p-6">
                    <h3 className="mb-4 text-lg font-bold text-zinc-900">
                      Warm-up
                    </h3>

                    <div className="space-y-3">
                      {exercise.warmup.map(
                        (set, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-6 border-b border-zinc-100 pb-3 last:border-0 last:pb-0"
                          >
                            <span className="w-16 font-semibold text-zinc-900">
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

              {/* =========================
                  WORKING SETS
              ========================== */}

              <div className="border-b border-zinc-200 p-6">
                <h3 className="mb-4 text-lg font-bold text-zinc-900">
                  Working Sets
                </h3>

                <div className="space-y-3">
                  {exercise.workingSets.map(
                    (set, index) => (
                      <div
                        key={set.label}
                        className="flex items-center gap-6 border-b border-zinc-100 pb-3 last:border-0 last:pb-0"
                      >
                        <span className="w-16 font-semibold text-zinc-900">
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

              {/* =========================
                  BACK-OFF
              ========================== */}

              {exercise.backoff && (
                <div className="border-b border-zinc-200 p-6">
                  <h3 className="mb-4 text-lg font-bold text-zinc-900">
                    Back-off
                  </h3>

                  <div className="flex items-center gap-6">
                    <span className="w-16 font-semibold text-zinc-900">
                      Set 1
                    </span>

                    <span className="text-zinc-700">
                      × {exercise.backoff.reps} reps
                    </span>

                    <span className="text-sm text-zinc-500">
                      ({100 - exercise.backoff.percent}% of Last
                      Working Set)
                    </span>
                  </div>
                </div>
              )}

              {/* =========================
                  REST
              ========================== */}

              {exercise.rest && (
                <div className="p-6">
                  <p className="text-zinc-600">
                    Rest {exercise.rest} between sets
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* =========================
              MOBILE
          ========================== */}

          <div className="lg:hidden">
            {/* Exercise Image */}

            <div className="flex justify-center border-b border-zinc-200 p-5">
              <div className="relative aspect-square w-56">
                <Image
                  src={exercise.image}
                  alt={exercise.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Details */}

            <div>
              {/* =========================
                  WARM-UP
              ========================== */}

              {exercise.warmup &&
                exercise.warmup.length > 0 && (
                  <div className="border-b border-zinc-200 p-5">
                    <h3 className="mb-3 font-bold text-zinc-900">
                      Warm-up
                    </h3>

                    <div className="space-y-3">
                      {exercise.warmup.map(
                        (set, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 border-b border-zinc-100 pb-3 last:border-0 last:pb-0"
                          >
                            <span className="font-semibold text-zinc-900">
                              Set {index + 1}
                            </span>

                            <span className="text-zinc-700">
                              × {set.reps} reps
                            </span>

                            <span className="text-sm text-zinc-500">
                              ({set.percent}%)
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* =========================
                  WORKING SETS
              ========================== */}

              <div className="border-b border-zinc-200 p-5">
                <h3 className="mb-3 font-bold text-zinc-900">
                  Working Sets
                </h3>

                <div className="space-y-3">
                  {exercise.workingSets.map(
                    (set) => (
                      <div
                        key={set.label}
                        className="flex items-center gap-4 border-b border-zinc-100 pb-3 last:border-0 last:pb-0"
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

              {/* =========================
                  BACK-OFF
              ========================== */}

              {exercise.backoff && (
                <div className="border-b border-zinc-200 p-5">
                  <h3 className="mb-3 font-bold text-zinc-900">
                    Back-off
                  </h3>

                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-zinc-900">
                      Set 1
                    </span>

                    <span className="text-zinc-700">
                      × {exercise.backoff.reps} reps
                    </span>

                    <span className="text-sm text-zinc-500">
                      ({100 - exercise.backoff.percent}%)
                    </span>
                  </div>
                </div>
              )}

              {/* =========================
                  REST
              ========================== */}

              {exercise.rest && (
                <div className="p-5">
                  <p className="text-sm text-zinc-600">
                    Rest {exercise.rest} between sets
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}