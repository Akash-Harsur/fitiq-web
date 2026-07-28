import WorkoutHeader from "@/components/workout/WorkoutHeader";
import ExerciseImage from "@/components/workout/ExerciseImage";
import MuscleInfo from "@/components/workout/MuscleInfo";

export default function WorkoutPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-8">

      <div className="mx-auto max-w-5xl">

        <WorkoutHeader
          workoutName="Bench Press"
          currentExercise={1}
          totalExercises={6}
          workoutType="Push Day"
        />

        <ExerciseImage
          image="/images/exercises/chest/bench-press.webp"
          exerciseName="Bench Press"
        />

        <MuscleInfo
          primary="Chest"
          secondary="Front Delts • Triceps"
        />

      </div>

    </main>
  );
}