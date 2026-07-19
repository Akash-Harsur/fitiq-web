import {
  Dumbbell,
  Activity,
  Apple,
} from "lucide-react";

export default function Features() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-6xl px-8">

        {/* Heading */}

        <div className="text-center">

          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
            WHY FITIQ
          </span>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            FitIQ combines structured training, nutrition and progress
            tracking into one simple platform.
          </p>

        </div>

        {/* Cards */}

        <div className="mt-16 grid gap-6 md:grid-cols-3">

          {/* Card */}

          <div className="rounded-3xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-black hover:shadow-xl">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100">
              <Dumbbell size={22} />
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              Structured Training
            </h3>

            <p className="mt-3 leading-7 text-gray-600">
              Goal-based workout programs designed for muscle gain,
              fat loss and strength.
            </p>

          </div>

          {/* Card */}

          <div className="rounded-3xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-black hover:shadow-xl">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100">
              <Activity size={22} />
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              Track Progress
            </h3>

            <p className="mt-3 leading-7 text-gray-600">
              Log workouts, monitor performance and stay consistent
              with detailed progress tracking.
            </p>

          </div>

          {/* Card */}

          <div className="rounded-3xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-black hover:shadow-xl">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100">
              <Apple size={22} />
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              Smart Nutrition
            </h3>

            <p className="mt-3 leading-7 text-gray-600">
              Simple nutrition guidance with calorie and macro support
              to match your fitness goals.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}