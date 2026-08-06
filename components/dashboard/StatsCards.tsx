import {
  Flame,
  Footprints,
  Target,
  Weight,
  Trophy,
  CalendarDays,
} from "lucide-react";

interface StatsCardsProps {
  goal: string;
  weight: number;
  level: string;
  workoutSplit: string;
}

export default function StatsCards({
  goal,
  weight,
  level,
  workoutSplit,
}: StatsCardsProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

        <StatCard
          icon={<Flame className="h-5 w-5 text-orange-500" />}
          iconBg="bg-orange-100"
          title="Streak"
          value="12"
          suffix="Days"
        />

        <StatCard
          icon={<Footprints className="h-5 w-5 text-violet-600" />}
          iconBg="bg-violet-100"
          title="Steps"
          value="8,420"
          suffix="/ 10,000"
        />

        <StatCard
          icon={<Target className="h-5 w-5 text-green-600" />}
          iconBg="bg-green-100"
          title="Goal"
          value={format(goal)}
        />

        <StatCard
          icon={<Weight className="h-5 w-5 text-sky-600" />}
          iconBg="bg-sky-100"
          title="Weight"
          value={`${weight}`}
          suffix="kg"
        />

        <StatCard
          icon={<Trophy className="h-5 w-5 text-yellow-600" />}
          iconBg="bg-yellow-100"
          title="Level"
          value={format(level)}
        />

        <StatCard
          icon={<CalendarDays className="h-5 w-5 text-pink-600" />}
          iconBg="bg-pink-100"
          title="Workout Split"
          value={format(workoutSplit)}
        />

      </div>

    </div>
  );
}

interface CardProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  value: string;
  suffix?: string;
}

function StatCard({
  icon,
  iconBg,
  title,
  value,
  suffix,
}: CardProps) {
  return (
    <div className="flex items-center gap-4 border border-zinc-100 p-6 transition-all duration-300 hover:bg-zinc-50">

      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full ${iconBg}`}
      >
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-sm font-medium text-zinc-500">
          {title}
        </p>

        <div className="mt-1 flex items-end gap-1">

          <h3 className="text-2xl font-bold tracking-tight text-zinc-900">
            {value}
          </h3>

          {suffix && (
            <span className="pb-1 text-base text-zinc-500">
              {suffix}
            </span>
          )}

        </div>

      </div>

    </div>
  );
}

function format(value: string) {
  const displayMap: Record<string, string> = {
    "ppl": "Push Pull Legs",
    "beginner-ppl": "Beginner Push Pull Legs",
    "upper-lower": "Upper / Lower",
    "upper-lower-arms": "Upper / Lower + Arms",
    "bro-split": "Bro Split",
    "arnold": "Arnold Split",
    "full-body": "Full Body",
    "powerbuilding": "Powerbuilding",
  };

  return (
    displayMap[value] ??
    value
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
  );
}