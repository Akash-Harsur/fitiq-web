import {
  Dumbbell,
  Flame,
  Zap,
} from "lucide-react";

export default function Programs() {
  return (
    <section id="programs" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-8">

        {/* Heading */}

        <div className="text-center">

          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
            PROGRAMS
          </span>

          <h2 className="mt-4 text-5xl font-black text-black">
            Choose Your Goal
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            Structured training programs designed for every stage of
            your fitness journey.
          </p>

        </div>

        {/* Cards */}

        <div className="mt-16 grid gap-6 md:grid-cols-3">

          {/* Muscle Gain */}

          <div className="rounded-3xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-black hover:shadow-xl">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">
              <Dumbbell size={24} />
            </div>

            <h3 className="mt-6 text-3xl font-bold">
              Muscle Gain
            </h3>

            <p className="mt-4 leading-7 text-gray-600">
              Build lean muscle with progressive overload and structured
              training plans.
            </p>

            <button className="mt-8 font-semibold text-black transition hover:translate-x-1">
              Learn More →
            </button>

          </div>

          {/* Fat Loss */}

          <div className="rounded-3xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-black hover:shadow-xl">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">
              <Flame size={24} />
            </div>

            <h3 className="mt-6 text-3xl font-bold">
              Fat Loss
            </h3>

            <p className="mt-4 leading-7 text-gray-600">
              Burn fat efficiently while preserving muscle with proven
              workout strategies.
            </p>

            <button className="mt-8 font-semibold text-black transition hover:translate-x-1">
              Learn More →
            </button>

          </div>

          {/* Strength */}

          <div className="rounded-3xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-black hover:shadow-xl">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">
              <Zap size={24} />
            </div>

            <h3 className="mt-6 text-3xl font-bold">
              Strength
            </h3>

            <p className="mt-4 leading-7 text-gray-600">
              Increase strength with compound movements and progressive
              strength programming.
            </p>

            <button className="mt-8 font-semibold text-black transition hover:translate-x-1">
              Learn More →
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}