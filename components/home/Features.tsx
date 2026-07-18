export default function Features() {
  return (
    <section className="bg-gray-50 py-28">
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="text-center text-5xl font-black text-black">
          Why FitIQ?
        </h2>

        <p className="mt-5 text-center text-xl text-gray-600">
          Everything you need to build your best physique.
        </p>

        <div className="mt-20 grid gap-8 md:grid-cols-3">

          <div className="rounded-3xl bg-white p-10 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
            <div className="text-5xl">🏋️</div>

            <h3 className="mt-6 text-2xl font-bold">
              Workout Programs
            </h3>

            <p className="mt-4 text-gray-600">
              Science-based workout plans for beginners and advanced lifters.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-10 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
            <div className="text-5xl">📈</div>

            <h3 className="mt-6 text-2xl font-bold">
              Progress Tracking
            </h3>

            <p className="mt-4 text-gray-600">
              Track every workout and measure your improvement over time.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-10 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
            <div className="text-5xl">🥗</div>

            <h3 className="mt-6 text-2xl font-bold">
              Nutrition Guidance
            </h3>

            <p className="mt-4 text-gray-600">
              Follow simple nutrition plans designed to support your goals.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}