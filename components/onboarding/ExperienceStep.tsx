import {
  TrendingUp,
  Activity,
  Shield,
} from "lucide-react";

import SectionTitle from "./SectionTitle";
import SelectCard from "./SelectCard";

type ExperienceStepProps = {
  experience: string;
  onChange: (field: string, value: string) => void;
};

export default function ExperienceStep({
  experience,
  onChange,
}: ExperienceStepProps) {
  return (
    <div>
      <SectionTitle
        title="Training Experience"
        subtitle="Choose the option that best describes your fitness journey."
      />

      <div className="grid gap-5 md:grid-cols-3">
        <SelectCard
          title="Beginner"
          description="Less than 1 year of consistent training."
          icon={TrendingUp}
          selected={experience === "beginner"}
          onClick={() =>
            onChange("experience", "beginner")
          }
        />

        <SelectCard
          title="Intermediate"
          description="1–3 years of regular strength training."
          icon={Activity}
          selected={experience === "intermediate"}
          onClick={() =>
            onChange("experience", "intermediate")
          }
        />

        <SelectCard
          title="Advanced"
          description="3+ years of structured training experience."
          icon={Shield}
          selected={experience === "advanced"}
          onClick={() =>
            onChange("experience", "advanced")
          }
        />
      </div>

      {experience && (
        <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <h3 className="text-lg font-semibold">
            {experience === "beginner" &&
              "Beginner"}

            {experience === "intermediate" &&
              "Intermediate"}

            {experience === "advanced" &&
              "Advanced"}
          </h3>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            {experience === "beginner" &&
              "We'll prioritize learning proper technique, building consistency, and selecting programs with adequate recovery."}

            {experience === "intermediate" &&
              "We'll recommend balanced training programs that maximize muscle growth while maintaining recovery."}

            {experience === "advanced" &&
              "You'll have access to higher-volume and specialized training programs designed for experienced lifters."}
          </p>
        </div>
      )}
    </div>
  );
}