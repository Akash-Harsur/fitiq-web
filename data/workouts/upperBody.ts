import { WorkoutExercise } from "@/types/workout";

export const upperBodyWorkout: WorkoutExercise[] = [
  {
    id: "flat-barbell-bench",

    name: "Flat Barbell Bench Press",

    image: "/exercise-images/flat-barbell-bench-press.png",

    warmup: [
      { percent: 50, reps: 15 },
      { percent: 75, reps: 8 },
    ],

    workingSets: [
      { label: "Set 1", reps: 6 },
      { label: "Set 2", reps: 6 },
      { label: "Set 3", reps: 6 },
    ],

    backoff: {
      percent: 20,
      reps: 10,
    },

    rest: "2–3 min",

    notes:
      "Retract shoulder blades. Keep feet planted. Lower under control. Touch lower chest. Drive explosively.",

    expanded: false,
  },

  {
    id: "lat-pulldown",

    name: "Wide Grip Lat Pulldown",

    image: "/exercise-images/wide-grip-lat-pulldown.png",

    warmup: [
      { percent: 40, reps: 15 },
      { percent: 60, reps: 10 },
    ],

    workingSets: [
      { label: "Set 1", reps: 8 },
      { label: "Set 2", reps: 8 },
      { label: "Set 3", reps: 8 },
    ],

    backoff: {
      percent: 20,
      reps: 12,
    },

    rest: "90 sec",

    notes:
      "Chest up. Pull elbows towards your hips. Control the eccentric. Avoid swinging.",

    expanded: false,
  },

  {
    id: "incline-db-press",

    name: "Incline Dumbbell Press",

    image: "/exercise-images/incline-dumbbell-press.png",

    warmup: [
      { percent: 40, reps: 15 },
      { percent: 70, reps: 8 },
    ],

    workingSets: [
      { label: "Set 1", reps: 8 },
      { label: "Set 2", reps: 8 },
      { label: "Set 3", reps: 8 },
    ],

    backoff: {
      percent: 20,
      reps: 12,
    },

    rest: "2 min",

    notes:
      "Keep wrists neutral. Press slightly inward. Lower slowly and under control.",

    expanded: false,
  },

  {
    id: "barbell-row",

    name: "Barbell Row",

    image: "/exercise-images/barbell-row.png",

    warmup: [
      { percent: 50, reps: 12 },
      { percent: 75, reps: 6 },
    ],

    workingSets: [
      { label: "Set 1", reps: 8 },
      { label: "Set 2", reps: 8 },
      { label: "Set 3", reps: 8 },
    ],

    backoff: {
      percent: 20,
      reps: 12,
    },

    rest: "2 min",

    notes:
      "Maintain a neutral spine. Pull the bar towards your lower chest. Squeeze your back at the top.",

    expanded: false,
  },

  {
    id: "shoulder-press",

    name: "Seated Dumbbell Shoulder Press",

    image: "/exercise-images/seated-dumbbell-shoulder-press.png",

    warmup: [
      { percent: 50, reps: 12 },
    ],

    workingSets: [
      { label: "Set 1", reps: 8 },
      { label: "Set 2", reps: 8 },
      { label: "Set 3", reps: 8 },
    ],

    rest: "90 sec",

    notes:
      "Do not arch your lower back. Press straight up and control the lowering phase.",

    expanded: false,
  },

  {
    id: "rope-pushdown",

    name: "Rope Pushdown",

    image: "/exercise-images/rope-pushdown.png",

    workingSets: [
      { label: "Set 1", reps: 12 },
      { label: "Set 2", reps: 12 },
      { label: "Set 3", reps: 12 },
    ],

    rest: "60 sec",

    notes:
      "Keep elbows fixed. Spread the rope apart at the bottom. Squeeze the triceps.",

    expanded: false,
  },

  {
    id: "ez-bar-curl",

    name: "EZ Bar Curl",

    image: "/exercise-images/ez-bar-curl.png",

    workingSets: [
      { label: "Set 1", reps: 12 },
      { label: "Set 2", reps: 12 },
      { label: "Set 3", reps: 12 },
    ],

    rest: "60 sec",

    notes:
      "Do not swing your body. Fully extend at the bottom and squeeze the biceps at the top.",

    expanded: false,
  },
];