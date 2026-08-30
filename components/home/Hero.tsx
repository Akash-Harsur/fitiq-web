import Image from "next/image";
import Link from "next/link";
import Navbar from "../layout/Navbar";

export default function Hero() {
  return (
    <>
      <Navbar />

      <section className="bg-white px-6 pt-28 pb-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center text-center">

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
          <span className="mt-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-600">
            Built for Real Progress
          </span>

          {/* Heading */}
          <h1 className="mt-8 text-5xl font-black leading-[0.95] tracking-tight text-black lg:text-6xl">
            Smarter Workouts.
            <br />
            Better Results.
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Personalized workout programs, smart nutrition guidance and
            progress tracking all in one platform to help you achieve your
            fitness goals.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <Link
              href="/auth"
              className="rounded-full bg-black px-8 py-3 font-semibold text-white transition duration-300 hover:bg-gray-800"
            >
              Start 7-Day Free Trial
            </Link>

            <Link
              href="#programs"
              className="rounded-full border border-gray-300 px-8 py-3 font-semibold transition duration-300 hover:border-black hover:bg-gray-100"
            >
              Explore Programs
            </Link>

          </div>

        </div>
      </section>
    </>
  );
}