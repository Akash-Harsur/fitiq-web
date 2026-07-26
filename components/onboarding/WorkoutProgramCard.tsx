import {
  Award,
  CalendarDays,
  Clock3,
  HeartPulse,
  CheckCircle2,
} from "lucide-react";

import { WorkoutProgram } from "@/lib/workoutData";

type WorkoutProgramCardProps = {
  program: WorkoutProgram;
  selected: boolean;
  onSelect: () => void;
};

export default function WorkoutProgramCard({
  program,
  selected,
  onSelect,
}: WorkoutProgramCardProps) {
  return (
    <div
      className={`rounded-3xl border p-6 transition-all duration-300 ${
        selected
          ? "border-black bg-black text-white shadow-xl"
          : "border-gray-200 bg-white hover:border-black hover:shadow-lg"
      }`}
    >
      {/* Badge */}
      <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-black">
        <Award size={14} />
        {program.badge}
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold">
        {program.name}
      </h2>

      {/* Description */}
      <p
        className={`mt-3 text-sm leading-6 ${
          selected ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {program.description}
      </p>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-gray-200 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium">
            <HeartPulse size={16} />
            Recovery
          </div>

          <p className="text-sm">
            {program.recovery}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium">
            <Clock3 size={16} />
            Duration
          </div>

          <p className="text-sm">
            {program.duration}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium">
            <CalendarDays size={16} />
            Frequency
          </div>

          <p className="text-sm">
            {program.frequency.join(" / ")} Days
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium">
            <Award size={16} />
            Best For
          </div>

          <p className="text-sm capitalize">
            {program.goals[0].replace("-", " ")}
          </p>
        </div>
      </div>

      {/* Why Recommended */}
      <div className="mt-8">
        <h3 className="mb-3 font-semibold">
          Why this program?
        </h3>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} />
            <span>Matches your experience level</span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} />
            <span>Fits your training schedule</span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} />
            <span>Supports your selected goal</span>
          </div>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={onSelect}
        className={`mt-8 w-full rounded-2xl py-3 text-sm font-semibold transition ${
          selected
            ? "bg-white text-black"
            : "bg-black text-white hover:opacity-90"
        }`}
      >
        {selected
          ? "Selected"
          : "Select Program"}
      </button>
    </div>
  );
}