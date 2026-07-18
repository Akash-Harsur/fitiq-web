export default function Programs() {
  return (
    <section id="programs" className="bg-white py-28">

      <div className="mx-auto max-w-7xl px-6">

        <h2 className="text-center text-5xl font-black text-black">
          Choose Your Goal
        </h2>

        <p className="mt-5 text-center text-xl text-gray-600">
          Pick a training program designed for your fitness journey.
        </p>

        <div className="mt-20 grid gap-8 md:grid-cols-3">

          {/* Card 1 */}
          <div className="rounded-3xl border border-gray-200 p-10 transition-all duration-300 hover:-translate-y-2 hover:border-black hover:shadow-xl">

            <div className="text-5xl">💪</div>

            <h3 className="mt-6 text-3xl font-bold">
              Muscle Gain
            </h3>

            <p className="mt-4 text-gray-600">
              Build lean muscle with progressive overload and structured workouts.
            </p>

            <button className="mt-8 rounded-full bg-black px-6 py-3 text-white">
              Explore
            </button>

          </div>

          {/* Card 2 */}
          <div className="rounded-3xl border border-gray-200 p-10 transition-all duration-300 hover:-translate-y-2 hover:border-black hover:shadow-xl">

            <div className="text-5xl">🔥</div>

            <h3 className="mt-6 text-3xl font-bold">
              Fat Loss
            </h3>

            <p className="mt-4 text-gray-600">
              Burn fat while maintaining muscle with smart training.
            </p>

            <button className="mt-8 rounded-full bg-black px-6 py-3 text-white">
              Explore
            </button>

          </div>

          {/* Card 3 */}
          <div className="rounded-3xl border border-gray-200 p-10 transition-all duration-300 hover:-translate-y-2 hover:border-black hover:shadow-xl">

            <div className="text-5xl">⚡</div>

            <h3 className="mt-6 text-3xl font-bold">
              Strength
            </h3>

            <p className="mt-4 text-gray-600">
              Increase your strength with compound lifts and proven programming.
            </p>

            <button className="mt-8 rounded-full bg-black px-6 py-3 text-white">
              Explore
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}