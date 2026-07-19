export default function Pricing() {
  return (
    <section id="pricing" className="bg-gray-50 py-24">
      <div className="mx-auto max-w-6xl px-8">

        {/* Heading */}

        <div className="text-center">
          <h2 className="text-5xl font-black">
            Choose Your Plan
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Start your fitness journey with a 7-Day Free Trial.
          </p>
        </div>

        {/* Pricing Cards */}

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Basic */}

          <div className="flex flex-col rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-black hover:shadow-xl">

            <span className="text-sm font-semibold uppercase tracking-widest text-gray-500">
              Best for Beginners
            </span>

            <h3 className="mt-3 text-3xl font-bold">
              Basic
            </h3>

            <p className="mt-2 text-gray-500">
              Everything you need to start training.
            </p>

            <div className="mt-6 flex items-end">
              <span className="text-5xl font-black">₹99</span>
              <span className="mb-1 ml-2 text-gray-500">/month</span>
            </div>

            <button className="mt-6 w-full rounded-full border border-black py-3 font-semibold transition hover:bg-black hover:text-white">
              Start Free Trial
            </button>

            <div className="my-7 border-t border-gray-200"></div>

            <ul className="flex-1 space-y-4 text-[15px] text-gray-700">
              <li>7-Day Free Trial</li>
              <li>2 Workout Programs</li>
              <li>Home & Gym Workouts</li>
              <li>Progress Tracking</li>
              <li>BMI Calculator</li>
              <li>Community Access</li>
              <li>Monthly Program Updates</li>
            </ul>

          </div>

          {/* PRO */}

          <div className="relative flex flex-col rounded-3xl bg-black p-8 text-white shadow-2xl transition-all duration-300 hover:-translate-y-2">

            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-1.5 text-xs font-bold tracking-wider text-black">
              MOST POPULAR
            </div>

            <span className="text-sm font-semibold uppercase tracking-widest text-gray-400">
              Best Value
            </span>

            <h3 className="mt-3 text-3xl font-bold">
              Pro
            </h3>

            <p className="mt-2 text-gray-300">
              Designed for consistent progress.
            </p>

            <div className="mt-6 flex items-end">
              <span className="text-5xl font-black">₹499</span>
              <span className="mb-1 ml-2 text-gray-400">/month</span>
            </div>

            <button className="mt-6 w-full rounded-full bg-white py-3 font-semibold text-black transition hover:bg-gray-200">
              Start Free Trial
            </button>

            <div className="my-7 border-t border-gray-700"></div>

            <ul className="flex-1 space-y-4 text-[15px] text-gray-200">
              <li>Everything in Basic</li>
              <li>Unlimited Workout Programs</li>
              <li>Nutrition Guidance</li>
              <li>Macro Calculator</li>
              <li>Progress Photos</li>
              <li>Workout History</li>
              <li>Strength Programs</li>
              <li>Body Recomposition Plans</li>
              <li>Priority Support</li>
            </ul>

          </div>

          {/* Premium */}

          <div className="flex flex-col rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-black hover:shadow-xl">

            <span className="text-sm font-semibold uppercase tracking-widest text-gray-500">
              Ultimate Experience
            </span>

            <h3 className="mt-3 text-3xl font-bold">
              Premium
            </h3>

            <p className="mt-2 text-gray-500">
              Personalized fitness without limits.
            </p>

            <div className="mt-6 flex items-end">
              <span className="text-5xl font-black">₹999</span>
              <span className="mb-1 ml-2 text-gray-500">/month</span>
            </div>

            <button className="mt-6 w-full rounded-full border border-black py-3 font-semibold transition hover:bg-black hover:text-white">
              Start Free Trial
            </button>

            <div className="my-7 border-t border-gray-200"></div>

            <ul className="flex-1 space-y-4 text-[15px] text-gray-700">
              <li>Everything in Pro</li>
              <li>Personalized Workout Plans</li>
              <li>Personalized Nutrition Plans</li>
              <li>Advanced Analytics</li>
              <li>Custom Workout Builder</li>
              <li>Priority Support</li>
              <li>Early Access Features</li>
              <li>AI Coach <span className="text-xs text-gray-500">(Coming Soon)</span></li>
            </ul>

          </div>

        </div>

        {/* Footer */}

        <div className="mt-12 border-t border-gray-200 pt-8">

          <div className="flex flex-col items-center justify-center gap-2 text-sm text-gray-500 md:flex-row md:gap-8">

            <span>7-Day Free Trial</span>

            <span>Cancel Anytime</span>

            <span>Secure Payments</span>

            <span>No Hidden Charges</span>

          </div>

        </div>

      </div>
    </section>
  );
}