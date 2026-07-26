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
  frequency: number[];
  levels: Experience[];
  goals: Goal[];
  recovery: Recovery;
  duration: string;
  badge: string;
  description: string;
};

export const workoutPrograms: WorkoutProgram[] = [
  {
    id: "full-body",

    name: "Full Body",

    frequency: [2, 3],

    levels: ["beginner"],

    goals: [
      "fat-loss",
      "muscle-gain",
      "general-fitness",
    ],

    recovery: "Low",

    duration: "45–60 min",

    badge: "Best for Beginners",

    description:
      "Train the entire body every workout with maximum recovery.",
  },

  {
    id: "upper-lower",

    name: "Upper / Lower",

    frequency: [4],

    levels: ["beginner", "intermediate"],

    goals: [
      "muscle-gain",
      "strength",
      "body-recomposition",
    ],

    recovery: "Moderate",

    duration: "60–75 min",

    badge: "Most Popular",

    description:
      "Balanced training volume with excellent recovery.",
  },

  {
    id: "upper-lower-arms",

    name: "Upper / Lower + Arms",

    frequency: [5],

    levels: ["intermediate"],

    goals: [
      "muscle-gain",
      "body-recomposition",
    ],

    recovery: "Moderate",

    duration: "60–75 min",

    badge: "Balanced",

    description:
      "Upper Lower split with an additional arm-focused day.",
  },

  {
    id: "beginner-ppl",

    name: "Beginner Push Pull Legs",

    frequency: [3],

    levels: ["beginner"],

    goals: [
      "muscle-gain",
      "general-fitness",
    ],

    recovery: "Low",

    duration: "60 min",

    badge: "Recommended",

    description:
      "An easy introduction to the Push Pull Legs routine.",
  },

  {
    id: "ppl",

    name: "Push Pull Legs",

    frequency: [6],

    levels: ["intermediate", "advanced"],

    goals: [
      "muscle-gain",
      "strength",
    ],

    recovery: "Moderate",

    duration: "75–90 min",

    badge: "Most Popular",

    description:
      "High-frequency training for muscle growth and strength.",
  },

  {
    id: "bro-split",

    name: "Bro Split",

    frequency: [5, 6],

    levels: ["intermediate", "advanced"],

    goals: [
      "muscle-gain",
    ],

    recovery: "Moderate",

    duration: "60–75 min",

    badge: "Classic",

    description:
      "One major muscle group per workout.",
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
      "High-volume bodybuilding split inspired by Arnold.",
  },

  {
    id: "powerbuilding",

    name: "Powerbuilding",

    frequency: [4, 5],

    levels: ["advanced"],

    goals: [
      "strength",
      "muscle-gain",
    ],

    recovery: "High",

    duration: "75–90 min",

    badge: "Strength Focus",

    description:
      "Combine powerlifting and hypertrophy training.",
  },
];