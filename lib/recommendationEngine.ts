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
 * Programs are ordered from higher priority
 * to lower priority for each goal.
 */

const goalPriority: Record<
  Goal,
  string[]
> = {
  "fat-loss": [
    "full-body-2",
    "full-body",
    "upper-lower",
    "upper-lower-arms-shoulder",
    "ppl-upper-lower",
    "ppl",
  ],

  "muscle-gain": [
    "full-body",
    "upper-lower",
    "upper-lower-arms-shoulder",
    "ppl-upper-lower",
    "bodybuilding-5",
    "ppl",
    "arnold",
    "ppl-arms",
  ],

  "body-recomposition": [
    "full-body",
    "upper-lower",
    "upper-lower-arms-shoulder",
    "ppl-upper-lower",
    "bodybuilding-5",
    "ppl",
    "ppl-arms",
  ],

  strength: [
    /*
     * Powerlifting gets highest priority
     * for a strength goal.
     *
     * Training-day matching will determine
     * whether 3-Day or 6-Day wins.
     */
    "powerlifting-3",
    "powerlifting-6",

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
       * Exact frequency is extremely important.
       */

      const exactFrequency =
        program.frequency.includes(
          trainingDays
        );

      if (exactFrequency) {
        score += 50;
      } else {
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

      const levelMatch =
        program.levels.includes(
          experience
        );

      if (levelMatch) {
        score += 30;
      } else {
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

      const goalMatch =
        program.goals.includes(goal);

      if (goalMatch) {
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
        score += Math.max(
          10 - priorityIndex,
          2
        );
      }

      /*
       * =====================================
       * POWERLIFTING SPECIAL PRIORITY
       * =====================================
       *
       * For Strength:
       *
       * 3 days -> Powerlifting 3-Day
       * 6 days -> Powerlifting 6-Day
       *
       * Exact training frequency and
       * experience match are required.
       */

      if (
        goal === "strength" &&
        levelMatch &&
        exactFrequency
      ) {
        if (
          trainingDays === 3 &&
          program.id ===
            "powerlifting-3"
        ) {
          score += 25;
        }

        if (
          trainingDays === 6 &&
          program.id ===
            "powerlifting-6"
        ) {
          score += 25;
        }
      }

      /*
       * =====================================
       * RECOVERY
       * =====================================
       *
       * Beginners prefer lower recovery
       * demands.
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
       * =====================================
       * INTERMEDIATE RECOVERY
       * =====================================
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
       * =====================================
       * ADVANCED RECOVERY
       * =====================================
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
   * We prefer exact experience +
   * exact training frequency.
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
         * Exact experience + exact
         * training frequency.
         */

        if (
          levelMatch &&
          exactFrequency
        ) {
          return true;
        }

        /*
         * Close frequency fallback.
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
   * RETURN TOP 3
   * =========================================
   */

  return suitablePrograms
    .slice(0, 3)
    .map(
      ({ program }) => program
    );
}