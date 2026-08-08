"use client";

import Image from "next/image";
import {
    ChevronDown,
    ChevronUp,
    Link2,
} from "lucide-react";
import { useMemo, useState } from "react";

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

    const [completedSets, setCompletedSets] = useState<boolean[]>(
        exercise.workingSets.map(() => false)
    );

    const [weights, setWeights] = useState<string[]>(
        exercise.workingSets.map(() => "")
    );

    const completedExercise = useMemo(() => {
        return completedSets.every(Boolean);
    }, [completedSets]);

    function toggleSet(index: number, checked: boolean) {
        const copy = [...completedSets];
        copy[index] = checked;
        setCompletedSets(copy);
    }

    function updateWeight(
        index: number,
        value: string
    ) {
        const copy = [...weights];
        copy[index] = value;
        setWeights(copy);
    }

    return (
        <div
            className={`overflow-hidden rounded-xl border bg-white transition-all duration-300 ${completedExercise
                    ? "border-green-500 shadow-md"
                    : "border-zinc-300"
                }`}
        >
            {/* Header */}

            <button
                onClick={() => setExpanded(!expanded)}
                className="relative flex w-full items-start justify-between px-6 py-3 text-left transition-colors hover:bg-zinc-50"
            >
                <div className="flex flex-col items-start">
                    <h2 className="text-xl font-bold tracking-tight text-zinc-900">
                        {exercise.name}
                    </h2>

                    <div className="mt-1.5 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                            {exercise.workingSets.length} Sets
                        </span>

                        {exercise.warmup &&
                            exercise.warmup.length > 0 && (
                                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                                    Warm-up
                                </span>
                            )}

                        {exercise.backoff && (
                            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                                Back-off
                            </span>
                        )}

                        {exercise.dropSet &&
                            exercise.dropSet.length > 0 && (
                                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                                    Drop Set
                                </span>
                            )}

                        {exercise.superset && (
                            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                                Superset
                            </span>
                        )}

                        {exercise.rest && (
                            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                                Rest {exercise.rest}
                            </span>
                        )}
                    </div>

                    {completedExercise && (
                        <span className="mt-2 rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
                            ✓ Completed
                        </span>
                    )}
                </div>

                <span className="ml-4 mt-1 shrink-0">
                    {expanded ? (
                        <ChevronUp size={22} />
                    ) : (
                        <ChevronDown size={22} />
                    )}
                </span>
            </button>

            {expanded && (
                <>
                    {/* Desktop */}

                    <div className="hidden border-t border-zinc-300 lg:grid lg:grid-cols-[260px_1fr_340px]">
                        {/* Image */}

                        <div className="flex items-center justify-center border-r border-zinc-300 p-4">
                            <div className="relative aspect-square w-48">
                                <Image
                                    src={exercise.image}
                                    alt={exercise.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        {/* Workout */}

                        <div className="space-y-5 border-r border-zinc-300 p-6">
                            {/* Warm-up */}

                            {exercise.warmup &&
                                exercise.warmup.length > 0 && (
                                    <div className="grid grid-cols-[140px_1fr]">
                                        <p className="text-zinc-600">
                                            Warm-up
                                        </p>

                                        <div className="space-y-2">
                                            {exercise.warmup.map(
                                                (set, index) => (
                                                    <p key={index}>
                                                        {set.percent}% of Working
                                                        Set × {set.reps}
                                                    </p>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}

                            {/* Working Sets */}

                            <div className="grid grid-cols-[140px_1fr]">
                                <p className="text-zinc-600">
                                    Working Sets
                                </p>

                                <div className="space-y-3">
                                    {exercise.workingSets.map(
                                        (set, index) => (
                                            <div
                                                key={set.label}
                                                className="flex items-center gap-3 rounded-lg border border-zinc-200 px-3 py-2"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        completedSets[index]
                                                    }
                                                    onChange={(e) =>
                                                        toggleSet(
                                                            index,
                                                            e.target.checked
                                                        )
                                                    }
                                                    className="h-5 w-5"
                                                />

                                                <span className="w-14 font-medium">
                                                    {set.label}
                                                </span>

                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="number"
                                                        value={weights[index]}
                                                        onChange={(e) =>
                                                            updateWeight(
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-16 rounded-md border border-zinc-300 px-2 py-1 text-center outline-none focus:border-black"
                                                    />

                                                    <span className="font-medium">
                                                        kg × {set.reps}
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Back-off */}

                            {exercise.backoff && (
                                <div className="grid grid-cols-[140px_1fr]">
                                    <p className="text-zinc-600">
                                        Back-off Set
                                    </p>

                                    <p>
                                        {exercise.backoff.percent}% less
                                        than Last Working Set ×{" "}
                                        {exercise.backoff.reps}
                                    </p>
                                </div>
                            )}

                            {/* Drop Set */}

                            {exercise.dropSet &&
                                exercise.dropSet.length > 0 && (
                                    <div className="grid grid-cols-[140px_1fr]">
                                        <p className="text-zinc-600">
                                            Drop Set
                                        </p>

                                        <div className="space-y-2">
                                            {exercise.dropSet.map(
                                                (set, index) => (
                                                    <div
                                                        key={index}
                                                        className="rounded-lg border border-zinc-200 px-3 py-2"
                                                    >
                                                        <span className="font-medium">
                                                            Drop {index + 1}
                                                        </span>

                                                        <span className="ml-3 text-zinc-600">
                                                            -{set.percent}% ×{" "}
                                                            {set.reps} reps
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}

                            {/* Superset */}

                            {exercise.superset && (
                                <div className="grid grid-cols-[140px_1fr]">
                                    <p className="text-zinc-600">
                                        Superset
                                    </p>

                                    <div className="rounded-lg border border-zinc-200 p-3">
                                        <div className="flex items-center gap-2">
                                            <Link2 size={17} />

                                            <span className="font-semibold">
                                                {exercise.superset.name}
                                            </span>
                                        </div>

                                        <p className="mt-1 text-sm text-zinc-500">
                                            {exercise.superset.reps} reps
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Notes */}

                        <div className="p-6">
                            <h3 className="mb-4 text-lg font-semibold">
                                Coach Notes
                            </h3>

                            {exercise.rest && (
                                <p className="mb-4 font-medium text-zinc-700">
                                    Rest: {exercise.rest}
                                </p>
                            )}

                            {exercise.notes && (
                                <ul className="space-y-3 text-zinc-700">
                                    {exercise.notes
                                        .split(". ")
                                        .map((note, index) => (
                                            <li
                                                key={index}
                                                className="flex gap-2"
                                            >
                                                <span>•</span>
                                                <span>{note}</span>
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Mobile */}

                    <div className="border-t border-zinc-300 lg:hidden">
                        {/* Image */}

                        <div className="flex justify-center p-5">
                            <div className="relative aspect-square w-56">
                                <Image
                                    src={exercise.image}
                                    alt={exercise.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        <div className="space-y-5 px-5 pb-5">
                            {/* Warm-up */}

                            {exercise.warmup &&
                                exercise.warmup.length > 0 && (
                                    <div>
                                        <h3 className="mb-2 font-semibold">
                                            Warm-up
                                        </h3>

                                        {exercise.warmup.map(
                                            (set, index) => (
                                                <p key={index}>
                                                    {set.percent}% of Working
                                                    Set × {set.reps}
                                                </p>
                                            )
                                        )}
                                    </div>
                                )}

                            {/* Working Sets */}

                            <div>
                                <h3 className="mb-2 font-semibold">
                                    Working Sets
                                </h3>

                                <div className="space-y-3">
                                    {exercise.workingSets.map(
                                        (set, index) => (
                                            <div
                                                key={set.label}
                                                className="flex items-center justify-between rounded-lg border border-zinc-200 px-4 py-3"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={
                                                            completedSets[index]
                                                        }
                                                        onChange={(e) =>
                                                            toggleSet(
                                                                index,
                                                                e.target.checked
                                                            )
                                                        }
                                                        className="h-5 w-5"
                                                    />

                                                    <span className="font-medium">
                                                        {set.label}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="number"
                                                        value={weights[index]}
                                                        onChange={(e) =>
                                                            updateWeight(
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="kg"
                                                        className="w-16 rounded-md border border-zinc-300 px-2 py-1 text-center outline-none"
                                                    />

                                                    <span className="text-sm text-zinc-500">
                                                        kg × {set.reps}
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Back-off */}

                            {exercise.backoff && (
                                <div>
                                    <h3 className="mb-2 font-semibold">
                                        Back-off Set
                                    </h3>

                                    <p>
                                        {exercise.backoff.percent}% less
                                        than Last Working Set ×{" "}
                                        {exercise.backoff.reps}
                                    </p>
                                </div>
                            )}

                            {/* Drop Set */}

                            {exercise.dropSet &&
                                exercise.dropSet.length > 0 && (
                                    <div>
                                        <h3 className="mb-2 font-semibold">
                                            Drop Set
                                        </h3>

                                        <div className="space-y-2">
                                            {exercise.dropSet.map(
                                                (set, index) => (
                                                    <div
                                                        key={index}
                                                        className="rounded-lg border border-zinc-200 px-4 py-3"
                                                    >
                                                        <span className="font-medium">
                                                            Drop {index + 1}
                                                        </span>

                                                        <span className="ml-3 text-zinc-500">
                                                            -{set.percent}% ×{" "}
                                                            {set.reps} reps
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}

                            {/* Superset */}

                            {exercise.superset && (
                                <div>
                                    <h3 className="mb-2 flex items-center gap-2 font-semibold">
                                        <Link2 size={17} />
                                        Superset
                                    </h3>

                                    <div className="rounded-lg border border-zinc-200 px-4 py-3">
                                        <p className="font-medium">
                                            {exercise.superset.name}
                                        </p>

                                        <p className="mt-1 text-sm text-zinc-500">
                                            {exercise.superset.reps} reps
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Notes */}

                            {(exercise.notes || exercise.rest) && (
                                <div className="border-t border-zinc-300 pt-5">
                                    <h3 className="mb-4 font-semibold">
                                        Notes
                                    </h3>

                                    {exercise.rest && (
                                        <p className="mb-3">
                                            Rest: {exercise.rest}
                                        </p>
                                    )}

                                    {exercise.notes && (
                                        <p className="leading-6">
                                            {exercise.notes}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}