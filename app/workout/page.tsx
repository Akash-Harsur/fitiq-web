import WorkoutExerciseCard from "@/components/workout/WorkoutExerciseCard";
import { upperBodyWorkout } from "@/data/workouts/upperBody";

export default function WorkoutPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-8">
      <h1 className="mb-8 text-5xl font-bold">
        Upper Body
      </h1>

      <div className="space-y-5">
        {upperBodyWorkout.map((exercise) => (
          <WorkoutExerciseCard
            key={exercise.id}
            exercise={exercise}
          />
        ))}
      </div>
    </main>
  );
}