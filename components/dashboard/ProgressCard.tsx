export default function ProgressCard() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg">
      <h2 className="text-2xl font-bold">
        Progress
      </h2>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div>
          <p className="text-gray-500">
            Current Streak
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            🔥 0 Days
          </h3>
        </div>

        <div>
          <p className="text-gray-500">
            Last Workout
          </p>

          <h3 className="mt-2 text-xl font-semibold">
            —
          </h3>
        </div>

        <div>
          <p className="text-gray-500">
            Weekly Workouts
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            0 / 7
          </h3>
        </div>
      </div>
    </div>
  );
}