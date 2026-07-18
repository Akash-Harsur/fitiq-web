import Navbar from "../layout/Navbar";

export default function Hero() {
  return (
    <>
      <Navbar />

      <section className="flex min-h-screen flex-col items-center justify-center bg-white px-6 pt-28">

        <h1 className="text-8xl md:text-9xl font-black tracking-tight text-black">
          FITIQ
        </h1>

        <p className="mt-6 max-w-2xl text-center text-xl text-gray-600 md:text-2xl">
          Train Smart, Track Progress & Transform.
        </p>

        <button className="mt-10 rounded-full bg-black px-8 py-4 text-lg font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-gray-800">
          Start Your Journey
        </button>

      </section>
    </>
  );
}