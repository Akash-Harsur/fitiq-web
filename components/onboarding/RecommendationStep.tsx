import { useEffect, useState } from "react";

import {
  Experience,
  Goal,
  WorkoutProgram,
} from "@/lib/workoutData";

import { getRecommendedPrograms } from "@/lib/recommendationEngine";

import SectionTitle from "./SectionTitle";
import WorkoutProgramCard from "./WorkoutProgramCard";

type RecommendationStepProps = {
  experience: Experience;
  goal: Goal;
  trainingDays: number;
  selectedProgram: string;
  onChange: (field: string, value: string) => void;
};

export default function RecommendationStep({
  experience,
  goal,
  trainingDays,
  selectedProgram,
  onChange,
}: RecommendationStepProps) {
  const [programs, setPrograms] = useState<WorkoutProgram[]>([]);

  useEffect(() => {
    const recommendations = getRecommendedPrograms({
      experience,
      goal,
      trainingDays,
    });

    setPrograms(recommendations);
  }, [experience, goal, trainingDays]);

  return (
    <div>
      <SectionTitle
        title="Recommended Programs"
        subtitle="Based on your profile, these programs are the best fit for you."
      />

      {/* Profile Summary */}
      <div className="mb-8 rounded-2xl border border-gray-200 bg-gray-50 p-5">
        <h3 className="mb-4 text-lg font-semibold">
          Your Profile
        </h3>

        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Experience</p>

            <p className="mt-1 font-semibold capitalize">
              {experience}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Goal</p>

            <p className="mt-1 font-semibold capitalize">
              {goal.replace("-", " ")}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Training Days</p>

            <p className="mt-1 font-semibold">
              {trainingDays}{" "}
              {trainingDays === 8
                ? "Day Rotation"
                : "Days"}
            </p>
          </div>
        </div>
      </div>

      {/* Programs */}
      <div className="space-y-6">
        {programs.map((program) => (
          <WorkoutProgramCard
            key={program.id}
            program={program}
            selected={
              selectedProgram === program.id
            }
            onSelect={() =>
              onChange(
                "selectedProgram",
                program.id
              )
            }
          />
        ))}
      </div>

      {programs.length === 0 && (
        <div className="rounded-2xl border border-gray-200 p-6 text-center">
          <h3 className="text-lg font-semibold">
            No exact match found
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Don't worry. FitIQ will recommend the
            closest available training program.
          </p>
        </div>
      )}
    </div>
  );
}