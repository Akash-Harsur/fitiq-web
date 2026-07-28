interface MuscleInfoProps {
  primary: string;
  secondary: string;
}

export default function MuscleInfo({
  primary,
  secondary,
}: MuscleInfoProps) {
  return (
    <div className="mt-8 grid gap-5 md:grid-cols-2">

      {/* Primary Muscle */}

      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:border-zinc-700">

        <div className="mb-3 flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-2xl">
            🎯
          </div>

          <div>
            <p className="text-sm uppercase tracking-wider text-zinc-500">
              Primary Muscle
            </p>

            <h2 className="mt-1 text-2xl font-bold text-white">
              {primary}
            </h2>
          </div>

        </div>

      </div>

      {/* Secondary Muscle */}

      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:border-zinc-700">

        <div className="mb-3 flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl">
            💪
          </div>

          <div>
            <p className="text-sm uppercase tracking-wider text-zinc-500">
              Secondary Muscles
            </p>

            <h2 className="mt-1 text-xl font-bold text-white">
              {secondary}
            </h2>
          </div>

        </div>

      </div>

    </div>
  );
}