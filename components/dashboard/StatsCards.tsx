"use client";

import { useEffect, useState } from "react";

import {
  Flame,
  Footprints,
  Target,
  Weight,
  Trophy,
  CalendarDays,
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { getWorkoutStreak } from "@/lib/progress/streak";

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
  const { user } = useAuth();

  const [streak, setStreak] = useState(0);
  const [streakLoading, setStreakLoading] = useState(true);

  /*
   * =========================================
   * LOAD REAL STREAK
   * =========================================
   */

  useEffect(() => {
    if (!user) {
      setStreak(0);
      setStreakLoading(false);
      return;
    }

    let cancelled = false;

    const loadStreak = async () => {
      try {
        setStreakLoading(true);

        const value = await getWorkoutStreak(user.uid);

        if (!cancelled) {
          setStreak(value);
        }
      } catch (error) {
        console.error("Failed to load streak:", error);
      } finally {
        if (!cancelled) {
          setStreakLoading(false);
        }
      }
    };

    loadStreak();

    return () => {
      cancelled = true;
    };
  }, [user]);

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

      {/* =================================
          ROW 1
          Streak | Steps | Weight
      ================================= */}

      {/* STREAK */}

      <StatCard
        icon={
          <Flame className="h-5 w-5 text-orange-500" />
        }
        iconBg="bg-orange-100"
        title="Streak"
        value={streakLoading ? "—" : String(streak)}
        suffix="Days"
      />

      {/* STEPS */}

      <StatCard
        icon={
          <Footprints className="h-5 w-5 text-violet-600" />
        }
        iconBg="bg-violet-100"
        title="Steps"
        value="—"
        suffix="/ 10,000"
      />

      {/* WEIGHT */}

      <StatCard
        icon={
          <Weight className="h-5 w-5 text-sky-600" />
        }
        iconBg="bg-sky-100"
        title="Weight"
        value={weight > 0 ? String(weight) : "—"}
        suffix={weight > 0 ? "kg" : undefined}
      />

      {/* =================================
          ROW 2
          Level | Goal | Workout Split
      ================================= */}

      {/* LEVEL */}

      <StatCard
        icon={
          <Trophy className="h-5 w-5 text-yellow-600" />
        }
        iconBg="bg-yellow-100"
        title="Level"
        value={format(level)}
      />

      {/* GOAL */}

      <StatCard
        icon={
          <Target className="h-5 w-5 text-green-600" />
        }
        iconBg="bg-green-100"
        title="Goal"
        value={format(goal)}
      />

      {/* WORKOUT SPLIT */}

      <StatCard
        icon={
          <CalendarDays className="h-5 w-5 text-pink-600" />
        }
        iconBg="bg-pink-100"
        title="Workout Split"
        value={format(workoutSplit)}
      />

    </div>
  );
}

/*
 * =========================================
 * STAT CARD
 * =========================================
 */

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
    <div className="flex h-[135px] items-center gap-4 rounded-2xl border border-zinc-200 bg-white px-6 py-5 shadow-sm transition-all duration-300 hover:shadow-md">

      {/* ICON */}

      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${iconBg}`}
      >
        {icon}
      </div>

      {/* CONTENT */}

      <div className="min-w-0 flex-1">

        <p className="text-sm font-medium text-zinc-500">
          {title}
        </p>

        <div className="mt-1 flex min-w-0 items-end gap-1">

          <h3 className="truncate text-2xl font-bold tracking-tight text-zinc-900">
            {value}
          </h3>

          {suffix && (
            <span className="shrink-0 pb-1 text-base text-zinc-500">
              {suffix}
            </span>
          )}

        </div>

      </div>

    </div>
  );
}

/*
 * =========================================
 * FORMAT VALUES
 * =========================================
 */

function format(value: string) {
  if (!value) {
    return "—";
  }

  const displayMap: Record<string, string> = {
    /*
     * =====================================
     * WORKOUT PROGRAMS
     * =====================================
     */

    ppl: "Push Pull Legs",

    "push-pull-legs":
      "Push Pull Legs",

    "beginner-ppl":
      "Beginner Push Pull Legs",

    "full-body-2":
      "Full Body 2-Day",

    "full-body":
      "Full Body",

    "upper-lower":
      "Upper / Lower",

    "upper-lower-strength":
      "Upper / Lower Strength",

    "upper-lower-arms":
      "Upper / Lower + Arms",

    "bro-split":
      "Bro Split",

    "ppl-upper-lower":
      "PPL + Upper / Lower",

    "bodybuilding-5":
      "Bodybuilding 5-Day",

    arnold:
      "Arnold Split",

    "ppl-arms":
      "PPL + Arms",

    powerbuilding:
      "Powerbuilding",

    /*
     * =====================================
     * GOALS
     * =====================================
     */

    "muscle-gain":
      "Muscle Gain",

    "fat-loss":
      "Fat Loss",

    "body-recomposition":
      "Body Recomposition",

    strength:
      "Strength",

    "general-fitness":
      "General Fitness",

    /*
     * =====================================
     * EXPERIENCE
     * =====================================
     */

    beginner:
      "Beginner",

    intermediate:
      "Intermediate",

    advanced:
      "Advanced",
  };

  return (
    displayMap[value] ??
    value
      .replace(/[-_]/g, " ")
      .replace(
        /\b\w/g,
        (c) => c.toUpperCase()
      )
  );
}