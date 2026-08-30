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
  Sparkles,
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
    <section id="pricing" className="bg-gray-50 py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-8">

        {/* Heading */}

        <div className="text-center">
          <h2 className="text-4xl font-black tracking-tight md:text-5xl">
            Choose Your Plan
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Start your fitness journey with a 7-Day Free Trial.
          </p>
        </div>

        {/* Pricing Cards */}

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">

          {/* ================= PRO ================= */}

          <div className="relative flex flex-col overflow-visible rounded-3xl bg-black p-8 text-white shadow-2xl transition-all duration-300 hover:-translate-y-2">

            {/* Popular Badge */}

            <div className="absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-white px-5 py-2 text-xs font-bold tracking-wider text-black shadow-md">
              <Star size={14} fill="currentColor" />
              MOST POPULAR
            </div>

            <div className="mb-2">
              <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gray-300">
                Best Value
              </span>
            </div>

            <h3 className="mt-3 text-3xl font-bold">
              Pro
            </h3>

            <p className="mt-2 text-gray-400">
              For serious, consistent progress.
            </p>

            {/* Price */}

            <div className="mt-7 flex items-end">
              <span className="text-5xl font-black tracking-tight">
                ₹1,499
              </span>

              <span className="mb-1 ml-2 text-gray-400">
                /month
              </span>
            </div>

            {/* CTA */}

            <Link
              href="/auth"
              className="mt-7 flex w-full items-center justify-center rounded-full bg-white py-3.5 font-semibold text-black transition hover:bg-gray-200"
            >
              Start Free Trial
            </Link>

            <div className="my-7 border-t border-gray-800" />

            {/* Features */}

            <ul className="flex-1 space-y-5">
              {proFeatures.map((feature) => {
                const Icon = feature.icon;

                return (
                  <li
                    key={feature.title}
                    className="flex items-start gap-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <Icon size={19} strokeWidth={2} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-white">
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

          <div className="flex flex-col rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-black hover:shadow-xl">

            <div className="mb-2">
              <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-600">
                Ultimate Experience
              </span>
            </div>

            <h3 className="mt-3 text-3xl font-bold">
              Premium
            </h3>

            <p className="mt-2 text-gray-500">
              For complete personalized transformation.
            </p>

            {/* Price */}

            <div className="mt-7 flex items-end">
              <span className="text-5xl font-black tracking-tight">
                ₹4,999
              </span>

              <span className="mb-1 ml-2 text-gray-500">
                /month
              </span>
            </div>

            {/* CTA */}

            <Link
              href="/auth"
              className="group mt-7 flex w-full items-center justify-center gap-3 rounded-full border border-black py-3.5 font-semibold text-black transition hover:bg-black hover:text-white"
            >
              Start Free Trial

              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>

            <div className="my-7 border-t border-gray-200" />

            {/* Features */}

            <ul className="flex-1 space-y-5">
              {premiumFeatures.map((feature) => {
                const Icon = feature.icon;

                return (
                  <li
                    key={feature.title}
                    className="flex items-start gap-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <Icon size={19} strokeWidth={2} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-900">
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

        <div className="mt-12 grid grid-cols-2 overflow-hidden rounded-2xl border border-gray-200 bg-white md:grid-cols-4">

          <div className="flex items-center gap-3 border-b border-gray-200 p-5 md:border-b-0 md:border-r">
            <CalendarDays
              size={22}
              className="shrink-0"
            />

            <div>
              <p className="text-sm font-semibold">
                7-Day Free Trial
              </p>
              <p className="text-xs text-gray-500">
                No credit card required
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-b border-gray-200 p-5 md:border-b-0 md:border-r">
            <RotateCcw
              size={22}
              className="shrink-0"
            />

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
            <ShieldCheck
              size={22}
              className="shrink-0"
            />

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
            <Tag
              size={22}
              className="shrink-0"
            />

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