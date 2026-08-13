"use client";

import { useEffect, useState } from "react";

import {
  Check,
  Clock3,
  Dumbbell,
  Sparkles,
} from "lucide-react";

import {
  Experience,
  Goal,
  WorkoutProgram,
} from "@/lib/workoutData";

import { getRecommendedPrograms } from "@/lib/recommendationEngine";

type RecommendationStepProps = {
  experience: Experience;
  goal: Goal;
  trainingDays: number;
  selectedProgram: string;
  onChange: (field: string, value: string) => void;
};

export default function RecommendationStep({
  experience,
  goal,
  trainingDays,
  selectedProgram,
  onChange,
}: RecommendationStepProps) {
  const [programs, setPrograms] =
    useState<WorkoutProgram[]>([]);

  /*
   * =========================================
   * GET RECOMMENDATIONS
   * =========================================
   */

  useEffect(() => {
    const recommendations =
      getRecommendedPrograms({
        experience,
        goal,
        trainingDays,
      });

    setPrograms(recommendations);

    /*
     * Automatically select the best match.
     *
     * Only do this when there is no existing
     * selection so we don't overwrite a user's
     * manual choice.
     */

    if (
      recommendations.length > 0 &&
      !selectedProgram
    ) {
      onChange(
        "selectedProgram",
        recommendations[0].id
      );
    }
  }, [
    experience,
    goal,
    trainingDays,
    selectedProgram,
    onChange,
  ]);

  /*
   * =========================================
   * FORMAT GOAL
   * =========================================
   */

  function formatGoal(goalValue: Goal) {
    const goalMap: Record<
      Goal,
      string
    > = {
      "fat-loss": "Fat Loss",
      "muscle-gain": "Muscle Gain",
      "body-recomposition":
        "Body Recomposition",
      strength: "Strength",
      "general-fitness":
        "General Fitness",
    };

    return goalMap[goalValue];
  }

  /*
   * =========================================
   * TRAINING DAYS LABEL
   * =========================================
   */

  const trainingDaysLabel =
    trainingDays === 1
      ? "1 Day"
      : `${trainingDays} Days`;

  return (
    <div className="space-y-8">

      {/* =====================================
          HEADER
      ====================================== */}

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
          YOUR PROGRAM
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
          Your recommended workouts
        </h2>

        <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-500">
          Based on your experience, goal and
          available training days, FitIQ has
          selected the programs that fit you best.
        </p>
      </div>

      {/* =====================================
          PROFILE SUMMARY
      ====================================== */}

      <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 md:p-6">

        <div className="mb-5 flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
            <Dumbbell size={19} />
          </div>

          <div>
            <p className="text-sm font-semibold text-zinc-900">
              Your Profile
            </p>

            <p className="text-xs text-zinc-500">
              Used to personalize your program
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* Experience */}

          <div className="rounded-2xl border border-zinc-200 bg-white p-4">

            <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
              Experience
            </p>

            <p className="mt-2 text-base font-semibold capitalize text-zinc-900">
              {experience}
            </p>

          </div>

          {/* Goal */}

          <div className="rounded-2xl border border-zinc-200 bg-white p-4">

            <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
              Goal
            </p>

            <p className="mt-2 text-base font-semibold text-zinc-900">
              {formatGoal(goal)}
            </p>

          </div>

          {/* Training Days */}

          <div className="rounded-2xl border border-zinc-200 bg-white p-4">

            <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
              Training
            </p>

            <p className="mt-2 text-base font-semibold text-zinc-900">
              {trainingDaysLabel}
            </p>

          </div>

        </div>

      </div>

      {/* =====================================
          RECOMMENDATIONS
      ====================================== */}

      {programs.length > 0 ? (
        <div className="space-y-5">

          {/* Recommendation heading */}

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-white">
              <Sparkles size={17} />
            </div>

            <div>
              <h3 className="text-lg font-bold text-zinc-900">
                Recommended for You
              </h3>

              <p className="text-sm text-zinc-500">
                Choose the program that feels right
                for you.
              </p>
            </div>

          </div>

          {/* Program cards */}

          <div className="space-y-4">

            {programs.map(
              (program, index) => {
                const selected =
                  selectedProgram ===
                  program.id;

                const bestMatch =
                  index === 0;

                return (
                  <button
                    key={program.id}
                    type="button"
                    onClick={() =>
                      onChange(
                        "selectedProgram",
                        program.id
                      )
                    }
                    className={`group relative w-full rounded-3xl border p-5 text-left transition-all duration-200 md:p-6 ${
                      selected
                        ? "border-black bg-white shadow-lg"
                        : "border-zinc-200 bg-white hover:border-zinc-400 hover:shadow-md"
                    }`}
                  >

                    {/* Best Match Badge */}

                    {bestMatch && (
                      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-black px-3 py-1.5 text-xs font-semibold text-white">
                        <Sparkles size={13} />
                        Best Match
                      </div>
                    )}

                    <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

                      {/* Left */}

                      <div className="min-w-0 flex-1">

                        <div className="flex items-start gap-3">

                          {/* Selection */}

                          <div
                            className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition ${
                              selected
                                ? "border-black bg-black text-white"
                                : "border-zinc-300 bg-white text-transparent"
                            }`}
                          >
                            <Check size={14} />
                          </div>

                          <div className="min-w-0">

                            <h4 className="text-xl font-bold tracking-tight text-zinc-900 md:text-2xl">
                              {program.name}
                            </h4>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
                              {program.description}
                            </p>

                          </div>

                        </div>

                        {/* Details */}

                        <div className="mt-5 flex flex-wrap gap-2 pl-9">

                          <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-700">
                            <Dumbbell size={13} />
                            {program.frequency.join(
                              " / "
                            )}{" "}
                            Days
                          </span>

                          <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-700">
                            <Clock3 size={13} />
                            {program.duration}
                          </span>

                          <span className="rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-700">
                            {program.badge}
                          </span>

                        </div>

                      </div>

                      {/* Right */}

                      <div className="shrink-0 md:pt-1">

                        <div
                          className={`flex h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold transition ${
                            selected
                              ? "bg-black text-white"
                              : "bg-zinc-100 text-zinc-700 group-hover:bg-zinc-200"
                          }`}
                        >
                          {selected
                            ? "Selected"
                            : "Select"}
                        </div>

                      </div>

                    </div>

                  </button>
                );
              }
            )}

          </div>

        </div>
      ) : (

        /* ===================================
           NO RECOMMENDATION
        ==================================== */

        <div className="rounded-3xl border border-zinc-200 bg-white p-8 text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100">
            <Dumbbell className="h-6 w-6 text-zinc-500" />
          </div>

          <h3 className="mt-5 text-xl font-bold text-zinc-900">
            No exact match found
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
            We couldn't find an exact program
            for your profile yet. We'll use the
            closest available training option.
          </p>

        </div>
      )}

      {/* =====================================
          SELECTION MESSAGE
      ====================================== */}

      {selectedProgram && (
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4">

          <div className="flex items-start gap-3">

            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black text-white">
              <Check size={14} />
            </div>

            <div>

              <p className="text-sm font-semibold text-zinc-900">
                Program selected
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                You can change your program above
                before continuing.
              </p>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}