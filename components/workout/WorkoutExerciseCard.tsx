"use client";

import Image from "next/image";
import { ChevronDown, ChevronUp, Clock3, Lightbulb } from "lucide-react";
import { useMemo, useState } from "react";
import { WorkoutExercise } from "@/types/workout";

type Props = {
    exercise: WorkoutExercise;
};

export default function WorkoutExerciseCard({ exercise }: Props) {
    const [expanded, setExpanded] = useState(exercise.expanded ?? false);
    const [completedSets, setCompletedSets] = useState<boolean[]>(
        exercise.workingSets.map(() => false)
    );

    const [weights, setWeights] = useState<string[]>(
        exercise.workingSets.map(() => "")
    );

    const completedExercise = useMemo(() => {
        return completedSets.every(Boolean);
    }, [completedSets]);

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
                className="flex w-full items-center justify-between px-6 py-4 hover:bg-zinc-50 transition-colors"
            >
                <div className="flex items-center gap-3">

                    <h2 className="text-xl font-semibold text-zinc-900">
                        {exercise.name}
                    </h2>

                    {completedExercise && (

                        <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">

                            ✓ Completed

                        </span>

                    )}

                </div>

                {expanded ? (
                    <ChevronUp size={22} />
                ) : (
                    <ChevronDown size={22} />
                )}
            </button>



            {expanded && (
                <>
                    <div className="border-t border-zinc-300 hidden lg:grid grid-cols-[260px_1fr_340px]">

                        {/* Image */}

                        <div className="border-r border-zinc-300 flex items-center justify-center p-4">

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

                        <div className="border-r border-zinc-300 p-6 space-y-4">

                            {exercise.warmup && (

                                <div className="grid grid-cols-[140px_1fr]">

                                    <p className="text-zinc-600">
                                        Warm-up
                                    </p>

                                    <div className="flex gap-5 flex-wrap">

                                        {exercise.warmup.map((set) => (

                                            <p key={set.percent}>

                                                {set.percent}% of Working Set × {set.reps}

                                            </p>

                                        ))}

                                    </div>

                                </div>

                            )}

                            <div className="grid grid-cols-[140px_1fr]">

                                <p className="text-zinc-600">
                                    Working Set
                                </p>

                                <div className="space-y-3">

                                    {exercise.workingSets.map((set, index) => (

                                        <div
                                            key={set.label}
                                            className="flex items-center gap-3 rounded-lg border border-zinc-200 px-3 py-2"
                                        >

                                            <input
                                                type="checkbox"
                                                checked={completedSets[index]}
                                                onChange={(e) => {

                                                    const copy = [...completedSets];

                                                    copy[index] = e.target.checked;

                                                    setCompletedSets(copy);

                                                }}
                                                className="h-5 w-5"
                                            />

                                            <span className="w-14 font-medium">

                                                {set.label}

                                            </span>

                                            <div className="flex items-center gap-2">

                                                <input
                                                    type="number"
                                                    value={weights[index]}
                                                    onChange={(e) => {
                                                        const copy = [...weights];
                                                        copy[index] = e.target.value;
                                                        setWeights(copy);
                                                    }}
                                                    placeholder=""
                                                    className="w-16 rounded-md border border-zinc-300 px-2 py-1 text-center outline-none focus:border-black"
                                                />

                                                <span className="font-medium">
                                                    kg × {set.reps}
                                                </span>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            </div>

                            {exercise.backoff && (

                                <div className="grid grid-cols-[140px_1fr]">

                                    <p className="text-zinc-600">
                                        Back-off Set
                                    </p>

                                    <p>

                                        {exercise.backoff.percent}% less than Last Working Set ×{" "}
                                        {exercise.backoff.reps}

                                    </p>

                                </div>

                            )}

                        </div>

                        {/* Notes */}

                        <div className="p-6">

                            <h3 className="text-lg font-semibold mb-4">
                                Coach Notes
                            </h3>

                            {exercise.rest && (

                                <p className="mb-4 font-medium text-zinc-700">

                                    Rest: {exercise.rest}

                                </p>

                            )}

                            {exercise.notes && (

                                <ul className="space-y-3 text-zinc-700">

                                    {exercise.notes.split(". ").map((note, index) => (

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

                    <div className="lg:hidden border-t border-zinc-300">

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

                        <div className="px-5 pb-5 space-y-4">

                            {exercise.warmup && (

                                <div>

                                    <h3 className="font-semibold mb-2">

                                        Warm-up

                                    </h3>

                                    {exercise.warmup.map((set) => (

                                        <p key={set.percent}>

                                            {set.percent}% of Working Set × {set.reps}

                                        </p>

                                    ))}

                                </div>

                            )}

                            <div>

                                <h3 className="font-semibold mb-2">

                                    Working Set

                                </h3>

                                <div className="space-y-3">

                                    {exercise.workingSets.map((set, index) => (

                                        <div
                                            key={set.label}
                                            className="flex items-center justify-between rounded-lg border border-zinc-200 px-4 py-3"
                                        >

                                            <div className="flex items-center gap-3">

                                                <input
                                                    type="checkbox"
                                                    checked={completedSets[index]}
                                                    onChange={(e) => {

                                                        const copy = [...completedSets];

                                                        copy[index] = e.target.checked;

                                                        setCompletedSets(copy);

                                                    }}
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
                                                    onChange={(e) => {

                                                        const copy = [...weights];

                                                        copy[index] = e.target.value;

                                                        setWeights(copy);

                                                    }}
                                                    placeholder="kg"
                                                    className="w-16 rounded-md border border-zinc-300 px-2 py-1 text-center outline-none"
                                                />

                                                <span className="text-sm text-zinc-500">

                                                    kg × {set.reps}

                                                </span>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            </div>

                            {exercise.backoff && (

                                <div>

                                    <h3 className="font-semibold mb-2">

                                        Back-off Set

                                    </h3>

                                    <p>

                                        {exercise.backoff.percent}% less than Last Working Set ×{" "}
                                        {exercise.backoff.reps}

                                    </p>

                                </div>

                            )}

                            {(exercise.notes || exercise.rest) && (

                                <div className="border-t border-zinc-300 pt-5">

                                    <h3 className="font-semibold mb-4">

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