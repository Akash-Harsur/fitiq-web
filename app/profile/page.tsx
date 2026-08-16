"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import {
  User,
  CalendarDays,
  Users,
  Ruler,
  Weight,
  Target,
  Trophy,
  Dumbbell,
  Save,
  X,
  Pencil,
} from "lucide-react";

import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

import WorkoutProgramGuide from "@/components/profile/WorkoutProgramGuide";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "@/components/dashboard/Sidebar";

import {
  workoutPrograms,
  Experience,
  Goal,
} from "@/lib/workoutData";

/*
 * =========================================
 * PROFILE TYPE
 * =========================================
 */

type UserProfile = {
  fullName: string;
  age: number;
  gender: string;

  height: number;
  weight: number;

  goal: string;
  experience: string;

  trainingDays: number;
  selectedProgram: string;

  onboardingCompleted: boolean;
};

/*
 * =========================================
 * FORM TYPE
 * =========================================
 */

type FormData = {
  fullName: string;
  age: string;
  gender: string;

  height: string;
  weight: string;

  goal: string;
  experience: string;

  trainingDays: number | null;

  selectedProgram: string;
};

/*
 * =========================================
 * COMPATIBLE PROGRAMS
 * =========================================
 *
 * Experience + Training Days are HARD
 * filters.
 *
 * Goal is used to PRIORITIZE programs.
 */

function getCompatiblePrograms(
  experience: string,
  trainingDays: number,
  goal: string
) {
  if (!experience || !trainingDays) {
    return [];
  }

  const compatiblePrograms =
    workoutPrograms.filter((program) => {
      const experienceMatch =
        program.levels.includes(
          experience as Experience
        );

      const trainingDaysMatch =
        program.frequency.includes(
          trainingDays
        );

      return (
        experienceMatch &&
        trainingDaysMatch
      );
    });

  /*
   * Goal-matching programs first.
   */

  const recommendedPrograms =
    compatiblePrograms.filter((program) =>
      program.goals.includes(
        goal as Goal
      )
    );

  /*
   * Other compatible programs.
   */

  const otherPrograms =
    compatiblePrograms.filter(
      (program) =>
        !program.goals.includes(
          goal as Goal
        )
    );

  return [
    ...recommendedPrograms,
    ...otherPrograms,
  ];
}

/*
 * =========================================
 * DISPLAY HELPERS
 * =========================================
 */

function formatGoal(value: string) {
  const labels: Record<string, string> = {
    "muscle-gain": "Muscle Gain",
    "fat-loss": "Fat Loss",
    "body-recomposition":
      "Body Recomposition",
    strength: "Strength",
    "general-fitness":
      "General Fitness",
  };

  return labels[value] ?? value;
}

function formatExperience(value: string) {
  const labels: Record<string, string> = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  };

  return labels[value] ?? value;
}

function formatGender(value: string) {
  if (!value) return "-";

  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  );
}

/*
 * =========================================
 * PROFILE ITEM
 * =========================================
 */

interface ProfileItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function ProfileItem({
  icon,
  label,
  value,
}: ProfileItemProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-50 text-zinc-700">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
          {label}
        </p>

        <p className="mt-1 truncate text-base font-semibold text-zinc-900">
          {value || "-"}
        </p>
      </div>
    </div>
  );
}

/*
 * =========================================
 * EDIT INPUT
 * =========================================
 */

interface EditInputProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  type?: string;
  onChange: (
    value: string
  ) => void;
}

function EditInput({
  icon,
  label,
  value,
  type = "text",
  onChange,
}: EditInputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-zinc-800">
        {label}
      </label>

      <div className="relative">
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
          {icon}
        </div>

        <input
          type={type}
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className="w-full rounded-xl border border-zinc-200 bg-white py-3 pl-12 pr-4 text-sm font-medium text-zinc-900 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
        />
      </div>
    </div>
  );
}

/*
 * =========================================
 * EDIT SELECT
 * =========================================
 */

interface EditSelectProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  options: {
    value: string;
    label: string;
  }[];
  onChange: (
    value: string
  ) => void;
  disabled?: boolean;
}

function EditSelect({
  icon,
  label,
  value,
  options,
  onChange,
  disabled = false,
}: EditSelectProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-zinc-800">
        {label}
      </label>

      <div className="relative">
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
          {icon}
        </div>

        <select
          value={value}
          disabled={disabled}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className={`w-full appearance-none rounded-xl border border-zinc-200 bg-white py-3 pl-12 pr-4 text-sm font-medium text-zinc-900 outline-none transition focus:border-black focus:ring-1 focus:ring-black ${
            disabled
              ? "cursor-not-allowed bg-zinc-100 text-zinc-400"
              : ""
          }`}
        >
          <option value="">
            Select {label}
          </option>

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

/*
 * =========================================
 * PROFILE PAGE
 * =========================================
 */

export default function ProfilePage() {
  const router = useRouter();

  const { user, loading: authLoading } =
    useAuth();

  const [profile, setProfile] =
    useState<UserProfile | null>(null);

  const [formData, setFormData] =
    useState<FormData>({
      fullName: "",
      age: "",
      gender: "",

      height: "",
      weight: "",

      goal: "",
      experience: "",

      trainingDays: null,

      selectedProgram: "",
    });

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [editing, setEditing] =
    useState(false);

  const [saved, setSaved] =
    useState(false);

  /*
   * =========================================
   * LOAD PROFILE
   * =========================================
   */

  useEffect(() => {
    const loadProfile = async () => {
      if (authLoading) return;

      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const profileRef = doc(
          db,
          "users",
          user.uid
        );

        const profileSnap =
          await getDoc(profileRef);

        if (profileSnap.exists()) {
          const data =
            profileSnap.data() as UserProfile;

          setProfile(data);

          setFormData({
            fullName:
              data.fullName ?? "",

            age:
              data.age
                ? String(data.age)
                : "",

            gender:
              data.gender ?? "",

            height:
              data.height
                ? String(data.height)
                : "",

            weight:
              data.weight
                ? String(data.weight)
                : "",

            goal:
              data.goal ?? "",

            experience:
              data.experience ?? "",

            trainingDays:
              data.trainingDays ?? null,

            selectedProgram:
              data.selectedProgram ?? "",
          });
        }
      } catch (error) {
        console.error(
          "Failed to load profile:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user, authLoading]);

  /*
   * =========================================
   * COMPATIBLE PROGRAMS
   * =========================================
   */

  const compatiblePrograms =
    useMemo(() => {
      return getCompatiblePrograms(
        formData.experience,
        formData.trainingDays ?? 0,
        formData.goal
      );
    }, [
      formData.experience,
      formData.trainingDays,
      formData.goal,
    ]);

  /*
   * =========================================
   * HANDLE CHANGE
   * =========================================
   */

  function handleChange(
    field: keyof FormData,
    value: string | number | null
  ) {
    setFormData((previous) => {
      const updated = {
        ...previous,
        [field]: value,
      };

      /*
       * When experience / training days /
       * goal changes, validate the selected
       * workout program again.
       */

      if (
        field === "experience" ||
        field === "trainingDays" ||
        field === "goal"
      ) {
        const newExperience =
          String(
            updated.experience
          );

        const newTrainingDays =
          Number(
            updated.trainingDays
          );

        const newGoal =
          String(updated.goal);

        const programs =
          getCompatiblePrograms(
            newExperience,
            newTrainingDays,
            newGoal
          );

        const currentProgramStillValid =
          programs.some(
            (program) =>
              program.id ===
              previous.selectedProgram
          );

        /*
         * If the existing program is no
         * longer compatible, automatically
         * select the first compatible program.
         */

        if (
          !currentProgramStillValid
        ) {
          updated.selectedProgram =
            programs[0]?.id ?? "";
        }
      }

      return updated;
    });

    setSaved(false);
  }

  /*
   * =========================================
   * SAVE PROFILE
   * =========================================
   */

  const handleSave = async () => {
    if (!user) return;

    if (
      !formData.fullName.trim() ||
      !formData.age ||
      !formData.height ||
      !formData.weight ||
      !formData.gender ||
      !formData.goal ||
      !formData.experience ||
      !formData.trainingDays ||
      !formData.selectedProgram
    ) {
      return;
    }

    try {
      setSaving(true);

      const updatedProfile = {
        fullName:
          formData.fullName.trim(),

        age: Number(formData.age),

        gender:
          formData.gender,

        height:
          Number(formData.height),

        weight:
          Number(formData.weight),

        goal:
          formData.goal,

        experience:
          formData.experience,

        trainingDays:
          Number(
            formData.trainingDays
          ),

        selectedProgram:
          formData.selectedProgram,

        onboardingCompleted:
          true,

        updatedAt:
          serverTimestamp(),
      };

      await setDoc(
        doc(db, "users", user.uid),
        updatedProfile,
        {
          merge: true,
        }
      );

      setProfile((previous) => ({
        ...(previous as UserProfile),
        ...updatedProfile,
        updatedAt: undefined,
      }));

      setSaved(true);
      setEditing(false);

      /*
       * Reload dashboard so the new
       * workout schedule is picked up.
       */

      setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (error) {
      console.error(
        "Failed to save profile:",
        error
      );
    } finally {
      setSaving(false);
    }
  };

  /*
   * =========================================
   * CANCEL EDIT
   * =========================================
   */

  const handleCancel = () => {
    if (!profile) return;

    setFormData({
      fullName:
        profile.fullName ?? "",

      age:
        profile.age
          ? String(profile.age)
          : "",

      gender:
        profile.gender ?? "",

      height:
        profile.height
          ? String(profile.height)
          : "",

      weight:
        profile.weight
          ? String(profile.weight)
          : "",

      goal:
        profile.goal ?? "",

      experience:
        profile.experience ?? "",

      trainingDays:
        profile.trainingDays ?? null,

      selectedProgram:
        profile.selectedProgram ?? "",
    });

    setEditing(false);
  };

  /*
   * =========================================
   * LOADING
   * =========================================
   */

  if (
    authLoading ||
    loading
  ) {
    return (
      <ProtectedRoute>
        <div className="flex min-h-screen items-center justify-center bg-zinc-50">
          <p className="text-sm text-zinc-500">
            Loading profile...
          </p>
        </div>
      </ProtectedRoute>
    );
  }

  /*
   * =========================================
   * PROGRAM NAME
   * =========================================
   */

  const selectedProgram =
    workoutPrograms.find(
      (program) =>
        program.id ===
        formData.selectedProgram
    );

  /*
   * =========================================
   * VIEW
   * =========================================
   */

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-zinc-50">
        <Sidebar />

        <main className="flex-1 p-4 md:p-8">

          <div className="mx-auto max-w-6xl space-y-6">

            {/* =================================
                HEADER
            ================================= */}

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
                  FITNESS PROFILE
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
                  Your Profile
                </h1>

                <p className="mt-2 text-sm text-zinc-500">
                  Manage your personal details
                  and training preferences.
                </p>
              </div>

              {!editing ? (
                <button
                  type="button"
                  onClick={() =>
                    setEditing(true)
                  }
                  className="flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
                >
                  <Pencil size={17} />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-3">

                  <button
                    type="button"
                    onClick={
                      handleCancel
                    }
                    disabled={saving}
                    className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 disabled:opacity-50"
                  >
                    <X size={17} />
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={
                      handleSave
                    }
                    disabled={saving}
                    className="flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Save size={17} />

                    {saving
                      ? "Saving..."
                      : "Save Changes"}
                  </button>

                </div>
              )}

            </div>

            {/* =================================
                SAVED MESSAGE
            ================================= */}

            {saved && (
              <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm font-medium text-zinc-700 shadow-sm">
                ✓ Profile updated successfully.
              </div>
            )}

            {/* =================================
                PERSONAL INFORMATION
            ================================= */}

            <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">

              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
                  PERSONAL INFORMATION
                </p>

                <h2 className="mt-2 text-2xl font-bold text-zinc-900">
                  About You
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Basic information used to
                  personalize FitIQ.
                </p>
              </div>

              {!editing ? (
                <div className="grid gap-4 md:grid-cols-2">

                  <ProfileItem
                    icon={
                      <User size={18} />
                    }
                    label="Full Name"
                    value={
                      formData.fullName
                    }
                  />

                  <ProfileItem
                    icon={
                      <CalendarDays
                        size={18}
                      />
                    }
                    label="Age"
                    value={
                      formData.age
                        ? `${formData.age} years`
                        : "-"
                    }
                  />

                  <ProfileItem
                    icon={
                      <Users size={18} />
                    }
                    label="Gender"
                    value={formatGender(
                      formData.gender
                    )}
                  />

                  <ProfileItem
                    icon={
                      <Ruler size={18} />
                    }
                    label="Height"
                    value={
                      formData.height
                        ? `${formData.height} cm`
                        : "-"
                    }
                  />

                  <ProfileItem
                    icon={
                      <Weight size={18} />
                    }
                    label="Weight"
                    value={
                      formData.weight
                        ? `${formData.weight} kg`
                        : "-"
                    }
                  />

                </div>
              ) : (
                <div className="grid gap-5 md:grid-cols-2">

                  <EditInput
                    icon={
                      <User size={18} />
                    }
                    label="Full Name"
                    value={
                      formData.fullName
                    }
                    onChange={(value) =>
                      handleChange(
                        "fullName",
                        value
                      )
                    }
                  />

                  <EditInput
                    icon={
                      <CalendarDays
                        size={18}
                      />
                    }
                    label="Age"
                    type="number"
                    value={formData.age}
                    onChange={(value) =>
                      handleChange(
                        "age",
                        value
                      )
                    }
                  />

                  <EditSelect
                    icon={
                      <Users size={18} />
                    }
                    label="Gender"
                    value={
                      formData.gender
                    }
                    onChange={(value) =>
                      handleChange(
                        "gender",
                        value
                      )
                    }
                    options={[
                      {
                        value: "male",
                        label: "Male",
                      },
                      {
                        value: "female",
                        label: "Female",
                      },
                      {
                        value: "other",
                        label: "Other",
                      },
                    ]}
                  />

                  <EditInput
                    icon={
                      <Ruler size={18} />
                    }
                    label="Height (cm)"
                    type="number"
                    value={
                      formData.height
                    }
                    onChange={(value) =>
                      handleChange(
                        "height",
                        value
                      )
                    }
                  />

                  <EditInput
                    icon={
                      <Weight size={18} />
                    }
                    label="Weight (kg)"
                    type="number"
                    value={
                      formData.weight
                    }
                    onChange={(value) =>
                      handleChange(
                        "weight",
                        value
                      )
                    }
                  />

                </div>
              )}

            </section>

            {/* =================================
                TRAINING PREFERENCES
            ================================= */}

            <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">

              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
                  FITNESS PROFILE
                </p>

                <h2 className="mt-2 text-2xl font-bold text-zinc-900">
                  Training Preferences
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Your current fitness goals
                  and training setup.
                </p>
              </div>

              {!editing ? (
                <div className="grid gap-4 md:grid-cols-2">

                  <ProfileItem
                    icon={
                      <Target size={18} />
                    }
                    label="Goal"
                    value={formatGoal(
                      formData.goal
                    )}
                  />

                  <ProfileItem
                    icon={
                      <Trophy size={18} />
                    }
                    label="Experience"
                    value={formatExperience(
                      formData.experience
                    )}
                  />

                  <ProfileItem
                    icon={
                      <CalendarDays
                        size={18}
                      />
                    }
                    label="Training Days"
                    value={
                      formData.trainingDays
                        ? `${formData.trainingDays} days / week`
                        : "-"
                    }
                  />

                  <ProfileItem
                    icon={
                      <Dumbbell size={18} />
                    }
                    label="Workout Program"
                    value={
                      selectedProgram?.name ??
                      formData.selectedProgram
                    }
                  />

                </div>
              ) : (
                <div className="grid gap-5 md:grid-cols-2">

                  {/* GOAL */}

                  <EditSelect
                    icon={
                      <Target size={18} />
                    }
                    label="Goal"
                    value={
                      formData.goal
                    }
                    onChange={(value) =>
                      handleChange(
                        "goal",
                        value
                      )
                    }
                    options={[
                      {
                        value:
                          "muscle-gain",
                        label:
                          "Muscle Gain",
                      },
                      {
                        value:
                          "fat-loss",
                        label:
                          "Fat Loss",
                      },
                      {
                        value:
                          "body-recomposition",
                        label:
                          "Body Recomposition",
                      },
                      {
                        value:
                          "strength",
                        label:
                          "Strength",
                      },
                    ]}
                  />

                  {/* EXPERIENCE */}

                  <EditSelect
                    icon={
                      <Trophy size={18} />
                    }
                    label="Experience"
                    value={
                      formData.experience
                    }
                    onChange={(value) =>
                      handleChange(
                        "experience",
                        value
                      )
                    }
                    options={[
                      {
                        value:
                          "beginner",
                        label:
                          "Beginner",
                      },
                      {
                        value:
                          "intermediate",
                        label:
                          "Intermediate",
                      },
                      {
                        value:
                          "advanced",
                        label:
                          "Advanced",
                      },
                    ]}
                  />

                  {/* TRAINING DAYS */}

                  <EditSelect
                    icon={
                      <CalendarDays
                        size={18}
                      />
                    }
                    label="Training Days"
                    value={
                      formData.trainingDays
                        ? String(
                            formData.trainingDays
                          )
                        : ""
                    }
                    onChange={(value) =>
                      handleChange(
                        "trainingDays",
                        value
                          ? Number(value)
                          : null
                      )
                    }
                    options={[
                      {
                        value: "2",
                        label:
                          "2 Days / Week",
                      },
                      {
                        value: "3",
                        label:
                          "3 Days / Week",
                      },
                      {
                        value: "4",
                        label:
                          "4 Days / Week",
                      },
                      {
                        value: "5",
                        label:
                          "5 Days / Week",
                      },
                      {
                        value: "6",
                        label:
                          "6 Days / Week",
                      },
                    ]}
                  />

                  {/* WORKOUT PROGRAM */}

                  <EditSelect
                    icon={
                      <Dumbbell size={18} />
                    }
                    label="Workout Program"
                    value={
                      formData.selectedProgram
                    }
                    onChange={(value) =>
                      handleChange(
                        "selectedProgram",
                        value
                      )
                    }
                    options={compatiblePrograms.map(
                      (program) => ({
                        value:
                          program.id,
                        label:
                          program.name,
                      })
                    )}
                    disabled={
                      !formData.experience ||
                      !formData.trainingDays
                    }
                  />

                </div>
              )}

              {/* =================================
                  PROGRAM INFO
              ================================= */}

              {editing &&
                formData.experience &&
                formData.trainingDays && (
                  <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">

                    <div className="flex items-start gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-white">
                        <Dumbbell
                          size={18}
                        />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-900">
                          Compatible Programs
                        </p>

                        <p className="mt-1 text-sm text-zinc-500">
                          Showing programs that
                          match your{" "}
                          {formatExperience(
                            formData.experience
                          )}{" "}
                          level and{" "}
                          {
                            formData.trainingDays
                          }{" "}
                          training days.
                        </p>

                        <p className="mt-2 text-xs font-medium text-zinc-400">
                          {
                            compatiblePrograms.length
                          }{" "}
                          compatible program
                          {compatiblePrograms.length !==
                          1
                            ? "s"
                            : ""}{" "}
                          available
                        </p>
                      </div>

                    </div>

                  </div>
                )}

            </section>

            {/* =================================
                CURRENT PROGRAM
            ================================= */}

            <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">

              <div className="flex items-start gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-800">
                  <Dumbbell
                    size={24}
                  />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
                    CURRENT PROGRAM
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-zinc-900">
                    {selectedProgram?.name ??
                      "No program selected"}
                  </h2>

                  <p className="mt-2 text-sm text-zinc-500">
                    {formData.trainingDays
                      ? `${formData.trainingDays} training days per week based on your current fitness profile.`
                      : "Complete your training preferences to select a program."}
                  </p>
                </div>

              </div>

              {/* Program description */}

              {selectedProgram?.description && (
                <div className="mt-6 rounded-2xl bg-zinc-50 p-4">
                  <p className="text-sm leading-6 text-zinc-600">
                    {
                      selectedProgram.description
                    }
                  </p>
                </div>
              )}

            </section>

            {/* =================================
                WORKOUT PROGRAM GUIDE
            ================================= */}

            <WorkoutProgramGuide />

            {/* =================================
                EDIT NOTE
            ================================= */}

            {editing && (
              <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm text-zinc-500">
                <span className="font-semibold text-zinc-900">
                  Tip:
                </span>{" "}
                Changing your experience or
                training days will automatically
                remove incompatible workout
                programs.
              </div>
            )}

          </div>

        </main>
      </div>
    </ProtectedRoute>
  );
}
