export type Experience =
  | "beginner"
  | "intermediate"
  | "advanced";

export type Goal =
  | "fat-loss"
  | "muscle-gain"
  | "body-recomposition"
  | "strength"
  | "general-fitness";

export type Recovery =
  | "Low"
  | "Moderate"
  | "High";

export type WorkoutProgram = {
  id: string;
  name: string;

  /*
   * Number of training days per week.
   */
  frequency: number[];

  /*
   * Experience levels suitable for
   * this program.
   */
  levels: Experience[];

  /*
   * Goals suitable for this program.
   */
  goals: Goal[];

  recovery: Recovery;

  duration: string;

  badge: string;

  description: string;
};

export const workoutPrograms: WorkoutProgram[] = [

  /*
   * =========================================
   * 2 DAYS
   * =========================================
   */

  {
    id: "full-body-2",

    name: "Full Body 2-Day",

    frequency: [2],

    levels: [
      "beginner",
      "intermediate",
    ],

    goals: [
      "fat-loss",
      "muscle-gain",
      "body-recomposition",
      "general-fitness",
    ],

    recovery: "Low",

    duration: "45–60 min",

    badge: "Flexible",

    description:
      "A simple full-body program designed for people training two days per week.",
  },

  /*
   * =========================================
   * 3 DAYS
   * =========================================
   */

  {
    id: "full-body",

    name: "Full Body",

    frequency: [3],

    levels: [
      "beginner",
      "intermediate",
    ],

    goals: [
      "fat-loss",
      "muscle-gain",
      "body-recomposition",
      "general-fitness",
    ],

    recovery: "Low",

    duration: "45–60 min",

    badge: "Best for Beginners",

    description:
      "Train the entire body three times per week with balanced volume and plenty of recovery.",
  },

  {
    id: "beginner-ppl",

    name: "Beginner Push Pull Legs",

    frequency: [3],

    levels: ["beginner"],

    goals: [
      "muscle-gain",
      "body-recomposition",
      "general-fitness",
    ],

    recovery: "Low",

    duration: "55–65 min",

    badge: "Recommended",

    description:
      "An easy introduction to Push Pull Legs with recovery days between each workout.",
  },

  {
    id: "upper-lower-full-body",

    name: "Upper / Lower / Full Body",

    frequency: [3],

    levels: [
      "beginner",
      "intermediate",
    ],

    goals: [
      "muscle-gain",
      "body-recomposition",
      "general-fitness",
      "fat-loss",
    ],

    recovery: "Low",

    duration: "55–70 min",

    badge: "Balanced",

    description:
      "A balanced three-day program combining Upper Body, Lower Body and Full Body training.",
  },

  {
    id: "upper-lower-arms-shoulder",

    name: "Upper / Lower / Arms + Shoulders",

    frequency: [3],

    levels: [
      "intermediate",
      "advanced",
    ],

    goals: [
      "muscle-gain",
      "body-recomposition",
    ],

    recovery: "Moderate",

    duration: "55–70 min",

    badge: "Specialization",

    description:
      "A three-day split combining Upper Body, Lower Body and a dedicated Arms + Shoulders workout.",
  },

  /*
   * =========================================
   * 4 DAYS
   * =========================================
   */

  {
    id: "upper-lower",

    name: "Upper / Lower",

    frequency: [4],

    levels: [
      "beginner",
      "intermediate",
    ],

    goals: [
      "muscle-gain",
      "strength",
      "body-recomposition",
      "fat-loss",
    ],

    recovery: "Moderate",

    duration: "60–75 min",

    badge: "Most Popular",

    description:
      "A balanced four-day Upper / Lower split with excellent recovery and consistent weekly volume.",
  },

  {
    id: "ppl-4-arms-shoulder",

    name: "Push / Pull / Legs + Arms & Shoulders",

    frequency: [4],

    levels: [
      "intermediate",
      "advanced",
    ],

    goals: [
      "muscle-gain",
      "body-recomposition",
    ],

    recovery: "Moderate",

    duration: "60–75 min",

    badge: "Hybrid",

    description:
      "A four-day split combining Push, Pull, Legs and a dedicated Arms + Shoulders workout.",
  },

  /*
   * =========================================
   * 5 DAYS
   * =========================================
   */

  {
    id: "ppl-upper-lower",

    name: "Push / Pull / Legs + Upper / Lower",

    frequency: [5],

    levels: [
      "intermediate",
      "advanced",
    ],

    goals: [
      "muscle-gain",
      "body-recomposition",
      "strength",
    ],

    recovery: "Moderate",

    duration: "65–80 min",

    badge: "Hybrid",

    description:
      "A five-day hybrid program combining Push Pull Legs with Upper and Lower Body training.",
  },

  {
    id: "ppl-full-body-arms-shoulder",

    name: "Push / Pull / Legs + Full Body + Arms & Shoulders",

    frequency: [5],

    levels: [
      "intermediate",
      "advanced",
    ],

    goals: [
      "muscle-gain",
      "body-recomposition",
    ],

    recovery: "High",

    duration: "65–80 min",

    badge: "Specialization",

    description:
      "A five-day hybrid program combining Push, Pull, Legs, Full Body and Arms + Shoulders training.",
  },

  {
    id: "bro-split",

    name: "Bro Split",

    frequency: [5],

    levels: [
      "intermediate",
      "advanced",
    ],

    goals: [
      "muscle-gain",
    ],

    recovery: "Moderate",

    duration: "60–75 min",

    badge: "Classic",

    description:
      "A classic bodybuilding split focusing on one major muscle group per workout.",
  },

  {
    id: "bodybuilding-5",

    name: "Bodybuilding 5-Day",

    frequency: [5],

    levels: [
      "intermediate",
      "advanced",
    ],

    goals: [
      "muscle-gain",
      "body-recomposition",
    ],

    recovery: "High",

    duration: "65–80 min",

    badge: "Hypertrophy",

    description:
      "A structured five-day bodybuilding program designed around balanced muscle-group volume and hypertrophy.",
  },

  /*
   * =========================================
   * 6 DAYS
   * =========================================
   */

  {
    id: "ppl",

    name: "Push Pull Legs",

    frequency: [6],

    levels: [
      "intermediate",
      "advanced",
    ],

    goals: [
      "muscle-gain",
      "strength",
      "body-recomposition",
    ],

    recovery: "Moderate",

    duration: "70–90 min",

    badge: "Most Popular",

    description:
      "A high-frequency Push Pull Legs program designed for consistent muscle growth and strength development.",
  },

  {
    id: "arnold",

    name: "Arnold Split",

    frequency: [6],

    levels: ["advanced"],

    goals: [
      "muscle-gain",
      "strength",
    ],

    recovery: "High",

    duration: "75–90 min",

    badge: "Advanced",

    description:
      "A high-volume bodybuilding split combining Chest + Back, Shoulders + Arms and Legs.",
  },

  {
    id: "ppl-arms",

    name: "Push Pull Legs + Arms",

    frequency: [6],

    levels: ["advanced"],

    goals: [
      "muscle-gain",
      "body-recomposition",
    ],

    recovery: "High",

    duration: "70–90 min",

    badge: "Specialization",

    description:
      "A high-frequency Push Pull Legs program with additional Arms specialization on the final training day.",
  },

  /*
   * =========================================
   * POWERBUILDING
   * =========================================
   */

  {
    id: "powerbuilding",

    name: "Powerbuilding",

    frequency: [4],

    levels: [
      "intermediate",
      "advanced",
    ],

    goals: [
      "strength",
      "muscle-gain",
    ],

    recovery: "High",

    duration: "75–90 min",

    badge: "Strength + Size",

    description:
      "A powerbuilding program combining Squat, Bench Press, Deadlift and Arms + Shoulders training.",
  },
];