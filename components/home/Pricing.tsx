import Link from "next/link";
import {
  Dumbbell,
  Flame,
  Calculator,
  Camera,
  ChartNoAxesCombined,
  History,
  Target,
  Headphones,
  Star,
  Apple,
  Wrench,
  Rocket,
  ShieldCheck,
  CalendarDays,
  RotateCcw,
  Tag,
} from "lucide-react";

const proFeatures = [
  {
    icon: Dumbbell,
    title: "Unlimited Workout Programs",
    description: "Access unlimited workout plans.",
  },
  {
    icon: Flame,
    title: "Personalized Nutrition Guidance",
    description: "Get nutrition advice tailored to your goals.",
  },
  {
    icon: Calculator,
    title: "Smart Macro Calculator",
    description: "Calculate your macros with ease.",
  },
  {
    icon: Camera,
    title: "Progress Photos — 2× / month",
    description: "Track your physique with progress photos.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Detailed Progress Tracking",
    description: "Monitor your performance over time.",
  },
  {
    icon: History,
    title: "Workout & Strength History",
    description: "View your past workouts and stats.",
  },
  {
    icon: Target,
    title: "Body Recomposition Programs",
    description: "Specialized plans to transform your body.",
  },
  {
    icon: Headphones,
    title: "Priority Support",
    description: "Get faster help whenever you need it.",
  },
];

const premiumFeatures = [
  {
    icon: Star,
    title: "Everything in Pro",
    description: "All Pro features are included.",
  },
  {
    icon: Dumbbell,
    title: "Fully Personalized Workout Plans",
    description: "Custom workouts designed just for you.",
  },
  {
    icon: Apple,
    title: "Fully Personalized Nutrition Plans",
    description: "Meal plans tailored to your lifestyle.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Advanced Body & Progress Analytics",
    description: "Deep insights to optimize your results.",
  },
  {
    icon: Wrench,
    title: "Custom Workout Builder",
    description: "Create and save your own workouts.",
  },
  {
    icon: Camera,
    title: "Unlimited Progress Photos",
    description: "Capture and track your transformation.",
  },
  {
    icon: Target,
    title: "Personalized Goal Optimization",
    description: "Optimize your plan as you progress.",
  },
  {
    icon: Rocket,
    title: "Early Access to New Features",
    description: "Be the first to try new updates.",
  },
  {
    icon: Headphones,
    title: "Premium Priority Support",
    description: "Top-level support, always.",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-8">

        {/* ================= HEADING ================= */}

        <div className="text-center">
          <span className="inline-flex rounded-full border border-gray-200 bg-white px-5 py-2 text-xs font-semibold tracking-[0.25em] text-gray-600">
            SIMPLE PRICING
          </span>

          <h2 className="mt-5 text-4xl font-black tracking-tight text-black md:text-5xl">
            Start Your Transformation
          </h2>

          <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-gray-600 md:text-lg">
            Get complete access to personalized training, nutrition guidance
            and progress tracking.
          </p>
        </div>

        {/* ================= PRICING CARDS ================= */}

        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-7 lg:grid-cols-2">

          {/* ================= PRO ================= */}

          <div className="relative flex flex-col rounded-[28px] bg-black p-7 text-white shadow-xl md:p-8">

            {/* MOST POPULAR */}

            <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-6 py-2.5 text-xs font-bold tracking-[0.12em] text-black shadow-md">
              <span className="flex items-center gap-2">
                <Star size={13} fill="currentColor" />
                MOST POPULAR
              </span>
            </div>

            {/* BEST VALUE */}

            <div>
              <span className="inline-flex rounded-full bg-white/10 px-3.5 py-2 text-xs font-semibold uppercase tracking-widest text-gray-300">
                BEST VALUE
              </span>
            </div>

            {/* TITLE */}

            <h3 className="mt-5 text-3xl font-bold">
              Pro
            </h3>

            <p className="mt-1.5 text-base text-gray-400">
              For serious, consistent progress.
            </p>

            {/* ================= PRICE ================= */}

            <div className="mt-7 flex items-center gap-4">

              {/* OLD PRICE */}

              <span className="text-xl font-bold text-gray-400 line-through">
                ₹1,499
              </span>

              {/* NEW PRICE */}

              <span className="text-5xl font-black tracking-tight text-white">
                ₹1,111
              </span>

              {/* DISCOUNT */}

              <span className="rounded-xl bg-yellow-400 px-4 py-2.5 text-sm font-black text-black">
                20% OFF
              </span>

              {/* MONTH */}

              <span className="text-base text-gray-400">
                /month
              </span>

            </div>

            {/* CTA */}

            <Link
              href="/auth"
              className="mt-7 flex w-full items-center justify-center rounded-full bg-white py-4 text-base font-semibold text-black transition hover:bg-gray-200"
            >
              Get Started →
            </Link>

            {/* DIVIDER */}

            <div className="my-7 border-t border-gray-800" />

            {/* FEATURES */}

            <ul className="space-y-4">

              {proFeatures.map((feature) => {
                const Icon = feature.icon;

                return (
                  <li
                    key={feature.title}
                    className="flex items-start gap-4"
                  >

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <Icon size={18} />
                    </div>

                    <div className="pt-0.5">
                      <p className="text-sm font-semibold leading-5 text-white">
                        {feature.title}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-gray-400">
                        {feature.description}
                      </p>
                    </div>

                  </li>
                );
              })}

            </ul>
          </div>

          {/* ================= PREMIUM ================= */}

          <div className="relative flex flex-col rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-black hover:shadow-xl md:p-8">

            <span className="inline-flex w-fit rounded-full bg-gray-100 px-3.5 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700">
              ULTIMATE EXPERIENCE
            </span>

            <h3 className="mt-5 text-3xl font-bold text-black">
              Premium
            </h3>

            <p className="mt-1.5 text-base text-gray-500">
              For complete personalized transformation.
            </p>

            {/* PRICE */}

            <div className="mt-7 flex items-end gap-2">

              <span className="text-5xl font-black tracking-tight text-black">
                ₹4,999
              </span>

              <span className="mb-1 text-base text-gray-500">
                /month
              </span>

            </div>

            {/* CTA */}

            <Link
              href="/auth"
              className="group mt-7 flex w-full items-center justify-center rounded-full border border-black py-4 text-base font-semibold text-black transition hover:bg-black hover:text-white"
            >
              Get Started
              <span className="ml-2 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>

            {/* DIVIDER */}

            <div className="my-7 border-t border-gray-200" />

            {/* FEATURES */}

            <ul className="space-y-4">

              {premiumFeatures.map((feature) => {
                const Icon = feature.icon;

                return (
                  <li
                    key={feature.title}
                    className="flex items-start gap-4"
                  >

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-black">
                      <Icon size={18} />
                    </div>

                    <div className="pt-0.5">
                      <p className="text-sm font-semibold leading-5 text-gray-900">
                        {feature.title}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        {feature.description}
                      </p>
                    </div>

                  </li>
                );
              })}

            </ul>
          </div>
        </div>

        {/* ================= TRUST BAR ================= */}

        <div className="mx-auto mt-9 grid max-w-5xl grid-cols-2 overflow-hidden rounded-2xl border border-gray-200 bg-white md:grid-cols-4">

          <div className="flex items-center gap-3 border-b border-gray-200 p-5 md:border-b-0 md:border-r">
            <CalendarDays size={21} className="shrink-0" />

            <div>
              <p className="text-sm font-semibold">
                3-Day Free Trial
              </p>

              <p className="text-xs text-gray-500">
                No credit card required
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-b border-gray-200 p-5 md:border-b-0 md:border-r">
            <RotateCcw size={21} className="shrink-0" />

            <div>
              <p className="text-sm font-semibold">
                Cancel Anytime
              </p>

              <p className="text-xs text-gray-500">
                Hassle-free cancellation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-b border-gray-200 p-5 md:border-b-0 md:border-r">
            <ShieldCheck size={21} className="shrink-0" />

            <div>
              <p className="text-sm font-semibold">
                Secure Payments
              </p>

              <p className="text-xs text-gray-500">
                100% safe & secure
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-5">
            <Tag size={21} className="shrink-0" />

            <div>
              <p className="text-sm font-semibold">
                No Hidden Charges
              </p>

              <p className="text-xs text-gray-500">
                Transparent pricing
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}