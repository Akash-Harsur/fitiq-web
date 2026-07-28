import { WorkoutDay } from "@/lib/workouts/types";

interface WorkoutCardProps {
  workout: WorkoutDay;
}

export default function WorkoutCard({
  workout,
}: WorkoutCardProps) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
            Today's Workout
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {workout.name}
          </h2>

          <p className="mt-2 text-gray-500">
            {workout.exercises.length} Exercises •{" "}
            {workout.estimatedDuration} mins
          </p>
        </div>

        <button className="rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-zinc-800">
          Start Workout
        </button>
      </div>
    </div>
  );
}