export interface WarmupSet {
    percent: number;
    reps: number;
}

export interface WorkingSet {
    label: string;
    reps: number;
}

export interface BackoffSet {
    percent: number;
    reps: number;
}

export interface WorkoutExercise {
    id: string;

    name: string;

    image: string;

    warmup?: WarmupSet[];

    workingSets: WorkingSet[];

    backoff?: BackoffSet;

    notes?: string;

    rest?: string;

    expanded?: boolean;
}