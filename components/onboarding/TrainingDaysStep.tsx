import { CalendarDays } from "lucide-react";

import {
  trainingDayGuidelines,
} from "@/lib/trainingDayGuidelines";

import SectionTitle from "./SectionTitle";
import SelectCard from "./SelectCard";

type TrainingDaysStepProps = {
  experience: "beginner" | "intermediate" | "advanced";
  trainingDays: number | null;
  onChange: (field: string, value: number) => void;
};

const trainingOptions = [
  {
    days: 2,
    title: "2 Days",
    description: "Perfect for busy schedules.",
  },
  {
    days: 3,
    title: "3 Days",
    description: "Balanced training and recovery.",
  },
  {
    days: 4,
    title: "4 Days",
    description: "One of the most popular choices.",
  },
  {
    days: 5,
    title: "5 Days",
    description: "Great for muscle growth.",
  },
  {
    days: 6,
    title: "6 Days",
    description: "High-frequency training.",
  },
  {
    days: 7,
    title: "7 Days",
    description: "Advanced training frequency.",
  },
  {
    days: 8,
    title: "8-Day Rotation",
    description: "Specialized training rotation.",
  },
];

export default function TrainingDaysStep({
  experience,
  trainingDays,
  onChange,
}: TrainingDaysStepProps) {
  const guideline =
    trainingDays !== null
      ? trainingDayGuidelines[experience][trainingDays]
      : null;

  const statusColors = {
    ideal: "border-green-200 bg-green-50 text-green-800",
    good: "border-blue-200 bg-blue-50 text-blue-800",
    moderate: "border-yellow-200 bg-yellow-50 text-yellow-800",
    high: "border-red-200 bg-red-50 text-red-800",
    advanced: "border-purple-200 bg-purple-50 text-purple-800",
  };

  return (
    <div>
      <SectionTitle
        title="Training Availability"
        subtitle="How many days can you consistently train?"
      />

      <div className="grid gap-5 md:grid-cols-2">
        {trainingOptions.map((option) => (
          <SelectCard
            key={option.days}
            title={option.title}
            description={option.description}
            icon={CalendarDays}
            selected={trainingDays === option.days}
            onClick={() =>
              onChange("trainingDays", option.days)
            }
          />
        ))}
      </div>

      {guideline && (
        <div
          className={`mt-8 rounded-2xl border p-6 ${
            statusColors[guideline.status]
          }`}
        >
          <h3 className="text-lg font-semibold">
            {guideline.title}
          </h3>

          <p className="mt-3 text-sm leading-6">
            {guideline.message}
          </p>

          {guideline.recommendedDays && (
            <button
              type="button"
              onClick={() =>
                onChange(
                  "trainingDays",
                  guideline.recommendedDays!
                )
              }
              className="mt-5 rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Switch to {guideline.recommendedDays} Days
            </button>
          )}
        </div>
      )}
    </div>
  );
}