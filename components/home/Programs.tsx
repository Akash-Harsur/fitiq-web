import Link from "next/link";
import {
  Dumbbell,
  Flame,
  Zap,
  Scale,
} from "lucide-react";

export default function Programs() {
  return (
    <section
      id="programs"
      className="scroll-mt-20 bg-white pt-12 pb-20"
    >
      <div className="mx-auto max-w-7xl px-8">

        {/* Heading */}

        <div className="text-center">

          <h2 className="text-5xl font-black text-black">
            Choose Your Goal
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">
            Structured training programs designed for every stage of your
            fitness journey.
          </p>

        </div>

        {/* Cards */}

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {/* Muscle Gain */}

          <div className="flex flex-col rounded-3xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:border-black hover:shadow-xl">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100">
              <Dumbbell size={22} />
            </div>

            <h3 className="mt-5 text-2xl font-bold">
              Muscle Gain
            </h3>

            <p className="mt-3 min-h-[90px] leading-7 text-gray-600">
              Build lean muscle with structured strength training and
              progressive overload.
            </p>

            <Link
              href="/auth"
              className="mt-auto pt-4 font-semibold text-black transition hover:translate-x-1"
            >
              Get Started →
            </Link>

          </div>

          {/* Fat Loss */}

          <div className="flex flex-col rounded-3xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:border-black hover:shadow-xl">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100">
              <Flame size={22} />
            </div>

            <h3 className="mt-5 text-2xl font-bold">
              Fat Loss
            </h3>

            <p className="mt-3 min-h-[90px] leading-7 text-gray-600">
              Burn fat efficiently while preserving muscle through proven
              training methods.
            </p>

            <Link
              href="/auth"
              className="mt-auto pt-4 font-semibold text-black transition hover:translate-x-1"
            >
              Get Started →
            </Link>

          </div>

          {/* Body Recomposition */}

          <div className="flex flex-col rounded-3xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:border-black hover:shadow-xl">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100">
              <Scale size={22} />
            </div>

            <h3 className="mt-5 text-2xl font-bold">
              Body Recomposition
            </h3>

            <p className="mt-3 min-h-[90px] leading-7 text-gray-600">
              Build muscle while reducing body fat using balanced training
              and nutrition.
            </p>

            <Link
              href="/auth"
              className="mt-auto pt-4 font-semibold text-black transition hover:translate-x-1"
            >
              Get Started →
            </Link>

          </div>

          {/* Strength */}

          <div className="flex flex-col rounded-3xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:border-black hover:shadow-xl">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100">
              <Zap size={22} />
            </div>

            <h3 className="mt-5 text-2xl font-bold">
              Strength
            </h3>

            <p className="mt-3 min-h-[90px] leading-7 text-gray-600">
              Increase strength with compound lifts and progressive
              strength programming.
            </p>

            <Link
              href="/auth"
              className="mt-auto pt-4 font-semibold text-black transition hover:translate-x-1"
            >
              Get Started →
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}