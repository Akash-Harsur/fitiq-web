import Image from "next/image";
import { getDailyQuote } from "@/lib/quotes";

interface HeroCardProps {
  greeting: string;
  name: string;
}

export default function HeroCard({
  greeting,
  name,
}: HeroCardProps) {
  const quote = getDailyQuote();

  return (
    <div className="rounded-3xl bg-white px-8 py-5">

      <div className="flex flex-col-reverse gap-6 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div className="flex-1 text-center lg:text-left">

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900">
            {greeting},{" "}
            <span>{name}</span>
          </h1>

          <div className="mt-5">

            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
              Quote of the Day
            </p>

            <p className="mt-3 max-w-xl text-base md:text-lg italic leading-8 text-zinc-600">
              "{quote}"
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex w-full justify-center lg:w-80 lg:justify-end">

          <Image
            src="/image/logo.jpeg"
            alt="FitIQ Logo"
            width={380}
            height={150}
            priority
            className="h-auto w-48 md:w-56 lg:w-80 object-contain"
          />

        </div>

      </div>

    </div>
  );
}