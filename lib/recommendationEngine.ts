import {
  Experience,
  Goal,
  WorkoutProgram,
  workoutPrograms,
} from "./workoutData";

type RecommendationInput = {
  experience: Experience;
  goal: Goal;
  trainingDays: number;
};

export function getRecommendedPrograms({
  experience,
  goal,
  trainingDays,
}: RecommendationInput): WorkoutProgram[] {
  let programs = workoutPrograms.filter((program) => {
    return (
      program.levels.includes(experience) &&
      program.goals.includes(goal) &&
      program.frequency.includes(trainingDays)
    );
  });

  if (programs.length > 0) {
    return programs;
  }

  // Relax Goal Filter
  programs = workoutPrograms.filter((program) => {
    return (
      program.levels.includes(experience) &&
      program.frequency.includes(trainingDays)
    );
  });

  if (programs.length > 0) {
    return programs;
  }

  // Relax Training Days Filter
  programs = workoutPrograms.filter((program) => {
    return program.levels.includes(experience);
  });

  return programs;
}