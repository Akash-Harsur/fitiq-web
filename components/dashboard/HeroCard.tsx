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

      <div className="flex items-center justify-between">

        {/* Left */}

        <div className="flex-1">

          <h1 className="text-5xl font-bold tracking-tight text-zinc-900">
            {greeting},{" "}
            <span>{name}</span>
          </h1>

          <div className="mt-8">

            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
              Quote of the Day
            </p>

            <p className="mt-3 max-w-xl text-lg italic leading-8 text-zinc-600">
              "{quote}"
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex w-64 shrink-0 items-center justify-center">

          <Image
            src="/image/logo.jpeg"
            alt="FitIQ Logo"
            width={220}
            height={90}
            priority
            className="h-auto w-1000 object-contain"
          />

        </div>

      </div>

    </div>
  );
}