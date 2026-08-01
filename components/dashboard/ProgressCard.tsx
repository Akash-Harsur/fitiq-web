export default function ProgressCard() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">

      <h2 className="text-4xl font-bold tracking-tight text-zinc-900">
        Workout Timeline
      </h2>

      <div className="mt-10 grid gap-8 md:grid-cols-3">

        {/* Last Workout */}

        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            Last Workout
          </p>

          <h3 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900">
            Leg Day
          </h3>

        </div>

        {/* Current Workout */}

        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            Current Workout
          </p>

          <h3 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900">
            Push Day
          </h3>

        </div>

        {/* Next Workout */}

        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            Next Workout
          </p>

          <h3 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900">
            Pull Day
          </h3>

        </div>

      </div>

    </div>
  );
}