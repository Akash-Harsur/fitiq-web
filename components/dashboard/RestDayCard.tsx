"use client";

import { Moon } from "lucide-react";

export default function RestDayCard() {
  return (
    <div className="rounded-3xl bg-black p-6 text-white shadow-sm md:p-8">

      <div className="flex items-start gap-4">

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-black">
          <Moon size={24} />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
            REST DAY
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Recover & Reset
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300 md:text-base">
            Your muscles need recovery to grow.
            Today is about staying active without
            putting your body through another hard
            workout. Do some cardio, mobility or light
            activity to keep your body moving and your
            mind sharp.
          </p>
        </div>

      </div>

    </div>
  );
}