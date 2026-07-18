export default function Pricing() {
  return (
    <section id="pricing" className="bg-gray-50 py-32">

      <div className="mx-auto max-w-7xl px-6">

        <h2 className="text-center text-5xl font-black text-black">
          One Simple Plan
        </h2>

        <p className="mt-5 text-center text-xl text-gray-600">
          No confusion. No hidden charges.
        </p>

        <div className="mx-auto mt-20 max-w-xl rounded-[40px] border border-gray-200 bg-white p-12 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

          <div className="mb-6 flex justify-center">
            <span className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white">
              MOST POPULAR
            </span>
          </div>

          <h3 className="text-center text-3xl font-bold">
            FitIQ Membership
          </h3>

          <div className="mt-8 text-center">

            <span className="text-7xl font-black">
              ₹499
            </span>

            <span className="ml-2 text-xl text-gray-500">
              /month
            </span>

          </div>

          <div className="mt-12 space-y-5 text-lg">

            <p>✔ Unlimited Workout Programs</p>

            <p>✔ Progress Tracking</p>

            <p>✔ Nutrition Guidance</p>

            <p>✔ New Programs Every Month</p>

            <p>✔ Cancel Anytime</p>

          </div>

          <button className="mt-12 w-full rounded-full bg-black py-5 text-lg font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-gray-800">
            Start Membership
          </button>

          <p className="mt-6 text-center text-sm text-gray-500">
            Secure payments • Cancel anytime • No hidden charges
          </p>

        </div>

      </div>

    </section>
  );
}