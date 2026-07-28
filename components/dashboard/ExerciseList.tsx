import { WorkoutDay } from "@/lib/workouts/types";

interface ExerciseListProps {
  workout: WorkoutDay;
}

export default function ExerciseList({
  workout,
}: ExerciseListProps) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold">
        Today's Exercises
      </h2>

      <div className="space-y-4">
        {workout.exercises.map((exercise, index) => (
          <div
            key={exercise.id}
            className="flex items-center justify-between rounded-2xl border border-gray-200 p-5 transition hover:border-black hover:shadow-md"
          >
            <div>
              <h3 className="text-lg font-semibold">
                {index + 1}. {exercise.name}
              </h3>

              <p className="mt-1 text-sm capitalize text-gray-500">
                {exercise.muscle} • {exercise.equipment}
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                exercise.category === "compound"
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {exercise.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}