import Image from "next/image";
import Navbar from "../layout/Navbar";

export default function Hero() {
  return (
    <>
      <Navbar />

      <section className="flex min-h-[75vh] items-center bg-white px-6 pt-16 pb-12">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">

          {/* Logo */}

          <Image
            src="/image/logo.jpeg"
            alt="FitIQ Logo"
            width={480}
            height={110}
            priority
            className="h-auto w-auto"
          />

          {/* Badge */}

          <span className="mt-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-600">
            Built for Real Progress
          </span>

          {/* Heading */}

          <h1 className="mt-7 text-5xl font-black leading-[0.95] tracking-tight text-black lg:text-4xl">
            Smarter Workouts Better Results.
          </h1>

          {/* Description */}

          <p className="mt-5 max-w-lg text-base leading-7 text-gray-600 md:text-lg">
            Personalized workout programs, smart nutrition guidance and
            progress tracking all in one platform to help you achieve
            your fitness goals.
          </p>

          {/* CTA Buttons */}

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">

            <button className="rounded-full bg-black px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-gray-800">
              Start 7-Day Free Trial
            </button>

            <button className="rounded-full border border-gray-300 px-8 py-3 font-semibold transition-all duration-300 hover:border-black hover:bg-gray-100">
              Explore Programs
            </button>

          </div>

        </div>
      </section>
    </>
  );
}