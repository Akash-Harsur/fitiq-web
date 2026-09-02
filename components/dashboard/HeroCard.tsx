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
    <div className="rounded-3xl bg-white px-4 py-4 md:px-8 md:py-5 shadow-sm">

      <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:justify-between">

        {/* Mobile Logo */}
        <div className="flex justify-center lg:hidden">
          <Image
            src="/image/logo.jpeg"
            alt="FitIQ Logo"
            width={220}
            height={80}
            priority
            className="fitiq-logo h-auto w-40 object-contain"
          />
        </div>

        {/* Left */}
        <div className="flex-1 text-center lg:text-left">

          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 md:text-4xl lg:text-5xl">
            {greeting},{" "}
            <span>{name}</span>
          </h1>

          <div className="mt-5">

            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-400 md:text-xs">
              Quote of the Day
            </p>

            <p className="mt-2 text-sm italic text-zinc-600 md:text-lg">
              "{quote}"
            </p>

          </div>

        </div>

        {/* Desktop Logo */}
        <div className="hidden w-72 shrink-0 justify-center lg:flex">

          <Image
            src="/image/logo.jpeg"
            alt="FitIQ Logo"
            width={320}
            height={100}
            priority
            className="fitiq-logo h-auto w-72 object-contain"
          />

        </div>

      </div>

    </div>
  );
}