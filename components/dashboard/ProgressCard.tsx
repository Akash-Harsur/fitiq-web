export default function ProgressCard() {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">

      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
        Workout Timeline
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-3">

        {/* Last Workout */}

        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 transition-all duration-300 hover:bg-white hover:shadow-md">

          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-400">
            Last Workout
          </p>

          <h3 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900">
            Leg Day
          </h3>

        </div>

        {/* Current Workout */}

        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 transition-all duration-300 hover:bg-white hover:shadow-md">

          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-400">
            Current Workout
          </p>

          <h3 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900">
            Push Day
          </h3>

        </div>

        {/* Next Workout */}

        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 transition-all duration-300 hover:bg-white hover:shadow-md">

          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-400">
            Next Workout
          </p>

          <h3 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900">
            Pull Day
          </h3>

        </div>

      </div>

    </div>
  );
}