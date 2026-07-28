interface HeroCardProps {
  title: string;
  subtitle: string;
}

export default function HeroCard({
  title,
  subtitle,
}: HeroCardProps) {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-zinc-900 via-black to-zinc-800 p-10 text-white shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            {title}
          </h1>

          <p className="mt-3 text-lg text-gray-300">
            {subtitle}
          </p>
        </div>

        <div className="hidden md:flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
          💪
        </div>
      </div>
    </div>
  );
}