"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Dumbbell, Trophy } from "lucide-react";

import { workoutPrograms } from "@/lib/workoutData";

type ExperienceFilter =
  | "all"
  | "beginner"
  | "intermediate"
  | "advanced";

type DaysFilter = "all" | "2" | "3" | "4" | "5" | "6";

const experienceLabels: Record<
  Exclude<ExperienceFilter, "all">,
  string
> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export default function WorkoutProgramGuide() {
  const [daysFilter, setDaysFilter] =
    useState<DaysFilter>("all");

  const [experienceFilter, setExperienceFilter] =
    useState<ExperienceFilter>("all");

  const filteredPrograms = useMemo(() => {
    return workoutPrograms.filter((program) => {
      const daysMatch =
        daysFilter === "all" ||
        program.frequency.includes(
          Number(daysFilter)
        );

      const experienceMatch =
        experienceFilter === "all" ||
        program.levels.includes(
          experienceFilter
        );

      return daysMatch && experienceMatch;
    });
  }, [daysFilter, experienceFilter]);

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">

      {/* =========================
          HEADER
      ========================== */}

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
          PROGRAM LIBRARY
        </p>

        <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 md:text-3xl">
          Workout Program Guide
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500 md:text-base">
          Find the right workout program based on
          how many days you can train and your
          experience level.
        </p>
      </div>

      {/* =========================
          FILTERS
      ========================== */}

      <div className="mt-6 grid gap-5 md:grid-cols-2">

        {/* TRAINING DAYS */}

        <div>
          <div className="mb-3 flex items-center gap-2">
            <CalendarDays
              size={17}
              className="text-zinc-500"
            />

            <p className="text-sm font-semibold text-zinc-900">
              Training Days
            </p>
          </div>

          <div className="flex flex-wrap gap-2">

            {(
              [
                ["all", "All"],
                ["2", "2 Days"],
                ["3", "3 Days"],
                ["4", "4 Days"],
                ["5", "5 Days"],
                ["6", "6 Days"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() =>
                  setDaysFilter(value)
                }
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                  daysFilter === value
                    ? "bg-black text-white"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                }`}
              >
                {label}
              </button>
            ))}

          </div>
        </div>

        {/* EXPERIENCE */}

        <div>
          <div className="mb-3 flex items-center gap-2">
            <Trophy
              size={17}
              className="text-zinc-500"
            />

            <p className="text-sm font-semibold text-zinc-900">
              Experience
            </p>
          </div>

          <div className="flex flex-wrap gap-2">

            <button
              type="button"
              onClick={() =>
                setExperienceFilter("all")
              }
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                experienceFilter === "all"
                  ? "bg-black text-white"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
              }`}
            >
              All
            </button>

            {(
              [
                "beginner",
                "intermediate",
                "advanced",
              ] as const
            ).map((experience) => (
              <button
                key={experience}
                type="button"
                onClick={() =>
                  setExperienceFilter(
                    experience
                  )
                }
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                  experienceFilter ===
                  experience
                    ? "bg-black text-white"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                }`}
              >
                {experienceLabels[experience]}
              </button>
            ))}

          </div>
        </div>

      </div>

      {/* =========================
          RESULT COUNT
      ========================== */}

      <div className="mt-8 flex items-center justify-between border-b border-zinc-200 pb-4">

        <div className="flex items-center gap-2">
          <Dumbbell
            size={18}
            className="text-zinc-500"
          />

          <p className="text-sm font-semibold text-zinc-900">
            Available Programs
          </p>
        </div>

        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">
          {filteredPrograms.length}{" "}
          {filteredPrograms.length === 1
            ? "Program"
            : "Programs"}
        </span>

      </div>

      {/* =========================
          PROGRAM TABLE
      ========================== */}

      <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200">

        {/* DESKTOP HEADER */}

        <div className="hidden grid-cols-[minmax(0,1.7fr)_120px_minmax(0,1fr)] gap-4 bg-zinc-50 px-5 py-4 text-xs font-semibold uppercase tracking-wide text-zinc-500 md:grid">
          <span>Workout Program</span>
          <span>Days / Week</span>
          <span>Experience</span>
        </div>

        <div className="divide-y divide-zinc-200">

          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="grid gap-4 px-5 py-5 transition hover:bg-zinc-50 md:grid-cols-[minmax(0,1.7fr)_120px_minmax(0,1fr)] md:items-center"
            >

              {/* PROGRAM */}

              <div>
                <h3 className="font-semibold text-zinc-900">
                  {program.name}
                </h3>

                <p className="mt-1 text-sm leading-5 text-zinc-500">
                  {program.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">

                  <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600">
                    {program.badge}
                  </span>

                  <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600">
                    {program.duration}
                  </span>

                </div>
              </div>

              {/* DAYS */}

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-400 md:hidden">
                  Days / Week
                </p>

                <p className="mt-1 text-sm font-semibold text-zinc-900 md:mt-0">
                  {program.frequency.join(
                    " / "
                  )}{" "}
                  {program.frequency.length ===
                  1
                    ? program.frequency[0] ===
                      1
                      ? "Day"
                      : "Days"
                    : "Days"}
                </p>
              </div>

              {/* EXPERIENCE */}

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-400 md:hidden">
                  Experience
                </p>

                <div className="mt-2 flex flex-wrap gap-2 md:mt-0">

                  {program.levels.map(
                    (level) => (
                      <span
                        key={level}
                        className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-600"
                      >
                        {experienceLabels[level]}
                      </span>
                    )
                  )}

                </div>
              </div>

            </div>
          ))}

        </div>

      </div>

      {/* =========================
          NO RESULTS
      ========================== */}

      {filteredPrograms.length === 0 && (
        <div className="mt-4 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center">

          <Dumbbell
            size={28}
            className="mx-auto text-zinc-400"
          />

          <p className="mt-3 font-semibold text-zinc-900">
            No programs found
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            Try changing your training days
            or experience level.
          </p>

        </div>
      )}

      {/* =========================
          HELPER TEXT
      ========================== */}

      <div className="mt-5 rounded-2xl bg-zinc-50 p-4">
        <p className="text-sm leading-6 text-zinc-500">
          <span className="font-semibold text-zinc-900">
            Tip:
          </span>{" "}
          Choose a program that matches both
          your available training days and your
          current experience level.
        </p>
      </div>

    </section>
  );
}