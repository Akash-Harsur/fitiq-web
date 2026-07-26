import { Experience } from "./workoutData";

export type TrainingDayGuideline = {
  status: "ideal" | "good" | "moderate" | "high" | "advanced";

  title: string;

  message: string;

  recommendedDays?: number;
};

export const trainingDayGuidelines: Record<
  Experience,
  Record<number, TrainingDayGuideline>
> = {
  beginner: {
    2: {
      status: "ideal",
      title: "Ideal",
      message:
        "Perfect for building consistency and learning proper exercise technique.",
    },

    3: {
      status: "ideal",
      title: "Highly Recommended",
      message:
        "Excellent balance between training stimulus and recovery.",
    },

    4: {
      status: "ideal",
      title: "Recommended",
      message:
        "Great option if you can recover well and stay consistent.",
    },

    5: {
      status: "moderate",
      title: "Moderate Recovery Demand",
      message:
        "Possible for motivated beginners, but recovery becomes more important.",
    },

    6: {
      status: "high",
      title: "High Recovery Demand",
      message:
        "Training 6 days per week is demanding for most beginners. We recommend starting with 4 days.",
      recommendedDays: 4,
    },

    7: {
      status: "high",
      title: "Very High Recovery Demand",
      message:
        "Training every day is generally not recommended for beginners.",
      recommendedDays: 4,
    },

    8: {
      status: "advanced",
      title: "Advanced Program",
      message:
        "An 8-day rotation is designed for experienced lifters and is not recommended for beginners.",
      recommendedDays: 4,
    },
  },

  intermediate: {
    2: {
      status: "moderate",
      title: "Low Frequency",
      message:
        "Suitable if your schedule is limited.",
    },

    3: {
      status: "good",
      title: "Good Choice",
      message:
        "Balanced frequency with solid recovery.",
    },

    4: {
      status: "ideal",
      title: "Recommended",
      message:
        "One of the best options for intermediate lifters.",
    },

    5: {
      status: "ideal",
      title: "Excellent",
      message:
        "Great balance for muscle growth and recovery.",
    },

    6: {
      status: "moderate",
      title: "Moderate Recovery Demand",
      message:
        "Suitable if sleep, nutrition and recovery are managed well.",
    },

    7: {
      status: "moderate",
      title: "High Frequency",
      message:
        "Include lighter sessions or active recovery to manage fatigue.",
    },

    8: {
      status: "advanced",
      title: "Advanced Program",
      message:
        "8-day rotations are better suited for advanced trainees.",
      recommendedDays: 5,
    },
  },

  advanced: {
    2: {
      status: "moderate",
      title: "Maintenance",
      message:
        "Good for maintenance phases or busy schedules.",
    },

    3: {
      status: "good",
      title: "Good Choice",
      message:
        "Allows high intensity with plenty of recovery.",
    },

    4: {
      status: "ideal",
      title: "Recommended",
      message:
        "Excellent balance between performance and recovery.",
    },

    5: {
      status: "ideal",
      title: "Excellent",
      message:
        "Great choice for most advanced lifters.",
    },

    6: {
      status: "ideal",
      title: "High Performance",
      message:
        "Perfect for Push Pull Legs or Arnold Split routines.",
    },

    7: {
      status: "ideal",
      title: "Elite Frequency",
      message:
        "Suitable when recovery and nutrition are well managed.",
    },

    8: {
      status: "ideal",
      title: "Specialized Training",
      message:
        "Ideal for high-volume or specialized training rotations.",
    },
  },
};