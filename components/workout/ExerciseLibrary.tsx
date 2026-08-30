"use client";

import { useMemo, useState } from "react";
import { Search, Dumbbell } from "lucide-react";

import { exerciseDatabase } from "@/lib/exercises";

type MuscleGroup = keyof typeof exerciseDatabase;

const muscleGroups: {
    key: MuscleGroup;
    label: string;
}[] = [
        { key: "chest", label: "Chest" },
        { key: "back", label: "Back" },
        { key: "shoulders", label: "Shoulders" },
        { key: "biceps", label: "Biceps" },
        { key: "triceps", label: "Triceps" },
        { key: "legs", label: "Legs" },
        { key: "core", label: "Core" },
    ];

export default function ExerciseLibrary() {
    const [selectedMuscle, setSelectedMuscle] =
        useState<MuscleGroup>("chest");

    const [search, setSearch] = useState("");

    const exercises =
        exerciseDatabase[selectedMuscle];

    const filteredExercises = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) {
            return exercises;
        }

        return exercises.filter((exercise) =>
            [
                exercise.name,
                exercise.muscle,
                exercise.category,
                exercise.movement,
                exercise.equipment,
                exercise.difficulty,
            ]
                .join(" ")
                .toLowerCase()
                .includes(query)
        );
    }, [exercises, search]);

    return (
        <div className="min-h-screen bg-zinc-50 px-4 py-6 md:px-8 md:py-8">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
                        FitIQ Training
                    </p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
                        Exercise Library
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500 md:text-base">
                        Explore all exercises available in FitIQ.
                        Choose a muscle group to see the complete
                        exercise library.
                    </p>
                </div>

                {/* Muscle Tabs */}
                <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
                    {muscleGroups.map((muscle) => {
                        const active =
                            selectedMuscle === muscle.key;

                        return (
                            <button
                                key={muscle.key}
                                type="button"
                                onClick={() => {
                                    setSelectedMuscle(muscle.key);
                                    setSearch("");
                                }}
                                className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition ${active
                                        ? "bg-black text-white"
                                        : "border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:text-black"
                                    }`}
                            >
                                {muscle.label}
                            </button>
                        );
                    })}
                </div>

                {/* Search */}
                <div className="mb-6">
                    <div className="relative">
                        <Search
                            size={19}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder={`Search ${selectedMuscle} exercises...`}
                            className="w-full rounded-2xl border border-zinc-200 bg-white py-4 pl-11 pr-4 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-black"
                        />
                    </div>
                </div>

                {/* Section Header */}
                <div className="mb-5 flex items-end justify-between">
                    <div>
                        <h2 className="text-xl font-bold capitalize text-zinc-900">
                            {selectedMuscle}
                        </h2>

                        <p className="mt-1 text-sm text-zinc-500">
                            {filteredExercises.length}{" "}
                            {filteredExercises.length === 1
                                ? "exercise"
                                : "exercises"}
                        </p>
                    </div>
                </div>

                {/* Exercise Grid */}
                {filteredExercises.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredExercises.map(
                            (exercise) => (
                                <div
                                    key={exercise.id}
                                    className="group rounded-2xl border border-zinc-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-sm"
                                >
                                    {/* Icon */}
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700">
                                        <Dumbbell size={21} />
                                    </div>

                                    {/* Name */}
                                    <h3 className="mt-5 text-lg font-bold leading-6 text-zinc-900">
                                        {exercise.name}
                                    </h3>

                                    {/* Details */}
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium capitalize text-zinc-600">
                                            {exercise.category}
                                        </span>

                                        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium capitalize text-zinc-600">
                                            {exercise.equipment}
                                        </span>

                                        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium capitalize text-zinc-600">
                                            {exercise.difficulty}
                                        </span>
                                    </div>

                                    {/* Movement */}
                                    <div className="mt-5 border-t border-zinc-100 pt-4">
                                        <p className="text-xs uppercase tracking-wide text-zinc-400">
                                            Movement
                                        </p>

                                        <p className="mt-1 text-sm font-medium text-zinc-700">
                                            {exercise.movement}
                                        </p>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-zinc-200 bg-white p-10 text-center">
                        <p className="font-semibold text-zinc-800">
                            No exercises found
                        </p>

                        <p className="mt-1 text-sm text-zinc-500">
                            Try a different search.
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
}