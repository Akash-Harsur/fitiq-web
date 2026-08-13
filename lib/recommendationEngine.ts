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

/*
 * =========================================
 * EXPERIENCE RANK
 * =========================================
 *
 * Used to prefer programs that match the
 * user's training level exactly.
 */

const experienceRank: Record<
  Experience,
  number
> = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
};

/*
 * =========================================
 * GOAL PRIORITY
 * =========================================
 *
 * Some programs are especially suitable
 * for certain goals.
 */

const goalPriority: Record<
  Goal,
  string[]
> = {
  "fat-loss": [
    "full-body-2",
    "full-body",
    "upper-lower",
    "upper-lower-arms",
    "ppl",
  ],

  "muscle-gain": [
    "full-body",
    "upper-lower",
    "upper-lower-arms",
    "ppl-upper-lower",
    "bodybuilding-5",
    "ppl",
    "arnold",
    "ppl-arms",
  ],

  "body-recomposition": [
    "full-body",
    "upper-lower",
    "upper-lower-arms",
    "ppl-upper-lower",
    "bodybuilding-5",
    "ppl",
  ],

  strength: [
    "upper-lower-strength",
    "powerbuilding",
    "upper-lower",
    "ppl",
    "arnold",
  ],

  "general-fitness": [
    "full-body-2",
    "full-body",
    "beginner-ppl",
    "upper-lower",
  ],
};

/*
 * =========================================
 * GET RECOMMENDED PROGRAMS
 * =========================================
 */

export function getRecommendedPrograms({
  experience,
  goal,
  trainingDays,
}: RecommendationInput): WorkoutProgram[] {
  /*
   * Score every program.
   */

  const scoredPrograms =
    workoutPrograms.map((program) => {
      let score = 0;

      /*
       * =====================================
       * TRAINING DAYS
       * =====================================
       *
       * Exact frequency is the most important
       * factor.
       */

      if (
        program.frequency.includes(
          trainingDays
        )
      ) {
        score += 50;
      } else {
        /*
         * Give a small score to programs
         * that are close to the requested
         * number of days.
         */

        const closestDifference =
          Math.min(
            ...program.frequency.map(
              (frequency) =>
                Math.abs(
                  frequency -
                    trainingDays
                )
            )
          );

        if (closestDifference === 1) {
          score += 20;
        } else if (
          closestDifference === 2
        ) {
          score += 5;
        }
      }

      /*
       * =====================================
       * EXPERIENCE
       * =====================================
       */

      if (
        program.levels.includes(
          experience
        )
      ) {
        score += 30;
      } else {
        /*
         * Avoid recommending programs
         * that are far above the user's level.
         */

        const userLevel =
          experienceRank[experience];

        const programLevels =
          program.levels.map(
            (level) =>
              experienceRank[level]
          );

        const closestLevelDifference =
          Math.min(
            ...programLevels.map(
              (level) =>
                Math.abs(
                  level -
                    userLevel
                )
            )
          );

        if (
          closestLevelDifference === 1
        ) {
          score += 5;
        }
      }

      /*
       * =====================================
       * GOAL
       * =====================================
       */

      if (
        program.goals.includes(goal)
      ) {
        score += 15;
      }

      /*
       * =====================================
       * GOAL-SPECIFIC PRIORITY
       * =====================================
       */

      const priorityList =
        goalPriority[goal];

      const priorityIndex =
        priorityList.indexOf(
          program.id
        );

      if (priorityIndex !== -1) {
        /*
         * Higher priority programs
         * receive more points.
         */

        score += Math.max(
          10 - priorityIndex,
          2
        );
      }

      /*
       * =====================================
       * RECOVERY
       * =====================================
       *
       * Beginners get preference for
       * lower recovery demand.
       */

      if (
        experience === "beginner"
      ) {
        if (
          program.recovery === "Low"
        ) {
          score += 8;
        }

        if (
          program.recovery ===
          "Moderate"
        ) {
          score += 3;
        }

        if (
          program.recovery === "High"
        ) {
          score -= 8;
        }
      }

      /*
       * Intermediate users
       */

      if (
        experience === "intermediate"
      ) {
        if (
          program.recovery ===
          "Moderate"
        ) {
          score += 6;
        }

        if (
          program.recovery === "Low"
        ) {
          score += 3;
        }
      }

      /*
       * Advanced users
       */

      if (
        experience === "advanced"
      ) {
        if (
          program.recovery === "High"
        ) {
          score += 6;
        }

        if (
          program.recovery ===
          "Moderate"
        ) {
          score += 3;
        }
      }

      return {
        program,
        score,
      };
    });

  /*
   * =========================================
   * SORT
   * =========================================
   */

  scoredPrograms.sort(
    (a, b) => b.score - a.score
  );

  /*
   * =========================================
   * REMOVE UNSUITABLE PROGRAMS
   * =========================================
   *
   * Do not recommend programs that are
   * completely mismatched to experience.
   */

  const suitablePrograms =
    scoredPrograms.filter(
      ({ program, score }) => {
        const levelMatch =
          program.levels.includes(
            experience
          );

        const exactFrequency =
          program.frequency.includes(
            trainingDays
          );

        /*
         * Exact experience match + exact
         * training frequency is always safe.
         */

        if (
          levelMatch &&
          exactFrequency
        ) {
          return true;
        }

        /*
         * Allow a close frequency fallback
         * when an exact program doesn't exist.
         */

        if (
          levelMatch &&
          score >= 45
        ) {
          return true;
        }

        return false;
      }
    );

  /*
   * =========================================
   * RETURN TOP RECOMMENDATIONS
   * =========================================
   *
   * Maximum 3 programs.
   */

  return suitablePrograms
    .slice(0, 3)
    .map(
      ({ program }) => program
    );
}