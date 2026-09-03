"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import OnboardingGuard from "@/components/auth/OnboardingGuard";

import { useUserProfile } from "@/hooks/useUserProfile";

import Sidebar from "@/components/dashboard/Sidebar";

import {
  calculateNutrition,
} from "@/lib/nutrition/nutritionCalculator";

import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

export default function NutritionPage() {
  const {
    profile,
    loading,
    setProfile,
  } = useUserProfile();

  const { user } = useAuth();

  // =========================================
  // EDITABLE BODY STATS
  // =========================================

  const [weightInput, setWeightInput] =
    useState("");

  const [heightInput, setHeightInput] =
    useState("");

  const [selectedGoal, setSelectedGoal] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const [saveMessage, setSaveMessage] =
    useState("");

  // =========================================
  // LOAD PROFILE VALUES INTO EDITABLE FIELDS
  // =========================================

  useEffect(() => {
    if (!profile) return;

    setWeightInput(
      profile.weight
        ? String(profile.weight)
        : ""
    );

    setHeightInput(
      profile.height
        ? String(profile.height)
        : ""
    );

    setSelectedGoal(
      profile.goal || ""
    );
  }, [profile]);

  // =========================================
  // VALIDATION
  // =========================================

  const weightError = useMemo(() => {
    if (weightInput.trim() === "") {
      return "Weight is required.";
    }

    const weight =
      Number(weightInput);

    if (!Number.isFinite(weight)) {
      return "Please enter a valid weight.";
    }

    if (weight <= 0) {
      return "Weight must be greater than 0 kg.";
    }

    if (weight > 500) {
      return "Please enter a valid weight.";
    }

    return "";
  }, [weightInput]);

  const heightError = useMemo(() => {
    if (heightInput.trim() === "") {
      return "Height is required.";
    }

    const height =
      Number(heightInput);

    if (!Number.isFinite(height)) {
      return "Please enter a valid height.";
    }

    if (height <= 0) {
      return "Height must be greater than 0 cm.";
    }

    if (height > 300) {
      return "Please enter a valid height.";
    }

    return "";
  }, [heightInput]);

  const goalError = useMemo(() => {
    if (!selectedGoal) {
      return "Please select a fitness goal.";
    }

    return "";
  }, [selectedGoal]);

  // =========================================
  // CHECK IF FORM IS VALID
  // =========================================

  const isFormValid =
    !weightError &&
    !heightError &&
    !goalError;

  // =========================================
  // CALCULATE NUTRITION
  // =========================================

  const nutrition = useMemo(() => {
    if (!profile) return null;

    if (!isFormValid) {
      return null;
    }

    const weight =
      Number(weightInput);

    const height =
      Number(heightInput);

    try {
      return calculateNutrition({
        gender: profile.gender,
        age: profile.age,
        heightCm: height,
        weightKg: weight,
        trainingDays:
          profile.trainingDays,
        goal: selectedGoal,
      });
    } catch (error) {
      console.error(
        "Nutrition calculation failed:",
        error
      );

      return null;
    }
  }, [
    profile,
    weightInput,
    heightInput,
    selectedGoal,
    isFormValid,
  ]);

  // =========================================
  // CHECK WHETHER VALUES CHANGED
  // =========================================

  const hasChanges =
    profile &&
    (
      Number(weightInput) !==
        profile.weight ||
      Number(heightInput) !==
        profile.height ||
      selectedGoal !==
        profile.goal
    );

  // =========================================
  // SAVE CHANGES
  // =========================================

  const handleSave = async () => {
    if (!user) return;

    if (!isFormValid) {
      return;
    }

    try {
      setSaving(true);
      setSaveMessage("");

      const newWeight =
        Number(weightInput);

      const newHeight =
        Number(heightInput);

      await updateDoc(
        doc(db, "users", user.uid),
        {
          weight: newWeight,
          height: newHeight,
          goal: selectedGoal,
          updatedAt:
            serverTimestamp(),
        }
      );

      // Update local profile immediately
      if (profile) {
        setProfile({
          ...profile,
          weight: newWeight,
          height: newHeight,
          goal: selectedGoal,
        });
      }

      setSaveMessage(
        "Changes saved successfully."
      );
    } catch (error) {
      console.error(
        "Failed to save nutrition changes:",
        error
      );

      setSaveMessage(
        "Failed to save changes. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <p className="text-sm text-zinc-500">
          Loading nutrition...
        </p>
      </div>
    );
  }

  // =========================================
  // PROFILE ERROR
  // =========================================

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <p className="text-sm text-zinc-500">
          Unable to load profile data.
        </p>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <OnboardingGuard>
        <div className="flex min-h-screen bg-zinc-50">

          {/* =========================================
              SIDEBAR
          ========================================== */}

          <Sidebar />

          {/* =========================================
              MAIN
          ========================================== */}

          <main className="min-w-0 flex-1 p-3 md:p-6">

            <div className="mx-auto max-w-6xl space-y-6">

              {/* =========================================
                  HEADER
              ========================================== */}

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-400">
                  NUTRITION
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">
                  Your Nutrition
                </h1>

                <p className="mt-2 text-sm text-zinc-500">
                  Personalized targets based on your
                  profile and training.
                </p>
              </div>

              {/* =========================================
                  CALORIE TARGET
              ========================================== */}

              {nutrition ? (
                <div className="rounded-3xl bg-black p-6 text-white shadow-sm">

                  <p className="text-sm font-medium text-zinc-400">
                    DAILY CALORIE TARGET
                  </p>

                  <div className="mt-3 flex items-end gap-2">

                    <span className="text-5xl font-bold tracking-tight">
                      {nutrition.calorieTarget}
                    </span>

                    <span className="mb-2 text-sm text-zinc-400">
                      kcal / day
                    </span>

                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3">

                    <div>
                      <p className="text-xs text-zinc-500">
                        BMR
                      </p>

                      <p className="mt-1 text-lg font-semibold">
                        {nutrition.bmr}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-zinc-500">
                        TDEE
                      </p>

                      <p className="mt-1 text-lg font-semibold">
                        {nutrition.tdee}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-zinc-500">
                        BMI
                      </p>

                      <p className="mt-1 text-lg font-semibold">
                        {nutrition.bmi}
                      </p>
                    </div>

                  </div>
                </div>
              ) : (
                <div className="rounded-3xl border border-red-200 bg-red-50 p-6">

                  <p className="font-semibold text-red-600">
                    Nutrition targets unavailable
                  </p>

                  <p className="mt-1 text-sm text-red-500">
                    Please enter valid body stats
                    to calculate your calories
                    and macros.
                  </p>

                </div>
              )}

              {/* =========================================
                  MACROS
              ========================================== */}

              {nutrition && (
                <div className="grid gap-4 md:grid-cols-3">

                  {/* PROTEIN */}

                  <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">

                    <p className="text-sm font-medium text-zinc-500">
                      PROTEIN
                    </p>

                    <p className="mt-3 text-4xl font-bold text-zinc-900">
                      {nutrition.proteinGrams}

                      <span className="ml-1 text-lg font-medium text-zinc-400">
                        g
                      </span>
                    </p>

                    <p className="mt-2 text-sm text-zinc-500">
                      {nutrition.proteinCalories} kcal
                    </p>

                  </div>

                  {/* CARBS */}

                  <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">

                    <p className="text-sm font-medium text-zinc-500">
                      CARBS
                    </p>

                    <p className="mt-3 text-4xl font-bold text-zinc-900">
                      {nutrition.carbsGrams}

                      <span className="ml-1 text-lg font-medium text-zinc-400">
                        g
                      </span>
                    </p>

                    <p className="mt-2 text-sm text-zinc-500">
                      {nutrition.carbsCalories} kcal
                    </p>

                  </div>

                  {/* FAT */}

                  <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">

                    <p className="text-sm font-medium text-zinc-500">
                      FAT
                    </p>

                    <p className="mt-3 text-4xl font-bold text-zinc-900">
                      {nutrition.fatGrams}

                      <span className="ml-1 text-lg font-medium text-zinc-400">
                        g
                      </span>
                    </p>

                    <p className="mt-2 text-sm text-zinc-500">
                      {nutrition.fatCalories} kcal
                    </p>

                  </div>

                </div>
              )}

              {/* =========================================
                  BODY STATS
              ========================================== */}

              <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">

                <h2 className="text-lg font-bold text-zinc-900">
                  Body Stats
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Update your body stats to recalculate
                  your nutrition targets.
                </p>

                {/* =========================================
                    EDITABLE FIELDS
                ========================================== */}

                <div className="mt-5 grid gap-5 md:grid-cols-3">

                  {/* WEIGHT */}

                  <div>

                    <label className="text-xs font-semibold text-zinc-400">
                      WEIGHT
                    </label>

                    <div
                      className={`mt-2 flex items-center rounded-2xl border bg-white ${
                        weightError
                          ? "border-red-400 ring-2 ring-red-100"
                          : "border-zinc-200"
                      }`}
                    >

                      <input
                        type="number"
                        min="1"
                        max="500"
                        step="0.1"
                        value={weightInput}
                        onChange={(e) => {
                          setWeightInput(
                            e.target.value
                          );
                          setSaveMessage("");
                        }}
                        className="w-full rounded-2xl bg-transparent px-4 py-4 text-lg font-semibold text-zinc-900 outline-none"
                        placeholder="Enter weight"
                      />

                      <span className="pr-4 text-sm text-zinc-400">
                        kg
                      </span>

                    </div>

                    {weightError && (
                      <p className="mt-2 text-sm font-medium text-red-500">
                        {weightError}
                      </p>
                    )}

                  </div>

                  {/* HEIGHT */}

                  <div>

                    <label className="text-xs font-semibold text-zinc-400">
                      HEIGHT
                    </label>

                    <div
                      className={`mt-2 flex items-center rounded-2xl border bg-white ${
                        heightError
                          ? "border-red-400 ring-2 ring-red-100"
                          : "border-zinc-200"
                      }`}
                    >

                      <input
                        type="number"
                        min="1"
                        max="300"
                        step="0.1"
                        value={heightInput}
                        onChange={(e) => {
                          setHeightInput(
                            e.target.value
                          );
                          setSaveMessage("");
                        }}
                        className="w-full rounded-2xl bg-transparent px-4 py-4 text-lg font-semibold text-zinc-900 outline-none"
                        placeholder="Enter height"
                      />

                      <span className="pr-4 text-sm text-zinc-400">
                        cm
                      </span>

                    </div>

                    {heightError && (
                      <p className="mt-2 text-sm font-medium text-red-500">
                        {heightError}
                      </p>
                    )}

                  </div>

                  {/* FITNESS GOAL */}

                  <div>

                    <label className="text-xs font-semibold text-zinc-400">
                      FITNESS GOAL
                    </label>

                    <select
                      value={selectedGoal}
                      onChange={(e) => {
                        setSelectedGoal(
                          e.target.value
                        );
                        setSaveMessage("");
                      }}
                      className={`mt-2 w-full rounded-2xl border bg-white px-4 py-4 text-base font-semibold text-zinc-900 outline-none ${
                        goalError
                          ? "border-red-400 ring-2 ring-red-100"
                          : "border-zinc-200"
                      }`}
                    >

                      <option value="">
                        Select your goal
                      </option>

                      <option value="muscle-gain">
                        Muscle Gain
                      </option>

                      <option value="fat-loss">
                        Fat Loss
                      </option>

                      <option value="body-recomposition">
                        Body Recomposition
                      </option>

                      <option value="strength">
                        Strength
                      </option>

                    </select>

                    {goalError && (
                      <p className="mt-2 text-sm font-medium text-red-500">
                        {goalError}
                      </p>
                    )}

                  </div>

                </div>

                {/* =========================================
                    GOAL DESCRIPTION
                ========================================== */}

                {selectedGoal && (
                  <div className="mt-5 rounded-2xl bg-zinc-50 p-5">

                    {selectedGoal ===
                      "muscle-gain" && (
                      <>
                        <p className="font-semibold text-zinc-900">
                          Muscle Gain
                        </p>

                        <p className="mt-1 text-sm text-zinc-500">
                          Build muscle with a
                          controlled calorie surplus.
                        </p>
                      </>
                    )}

                    {selectedGoal ===
                      "fat-loss" && (
                      <>
                        <p className="font-semibold text-zinc-900">
                          Fat Loss
                        </p>

                        <p className="mt-1 text-sm text-zinc-500">
                          Reduce body fat while
                          maintaining muscle.
                        </p>
                      </>
                    )}

                    {selectedGoal ===
                      "body-recomposition" && (
                      <>
                        <p className="font-semibold text-zinc-900">
                          Body Recomposition
                        </p>

                        <p className="mt-1 text-sm text-zinc-500">
                          Build muscle while reducing
                          body fat.
                        </p>
                      </>
                    )}

                    {selectedGoal ===
                      "strength" && (
                      <>
                        <p className="font-semibold text-zinc-900">
                          Strength
                        </p>

                        <p className="mt-1 text-sm text-zinc-500">
                          Support strength performance
                          and training recovery.
                        </p>
                      </>
                    )}

                  </div>
                )}

                {/* =========================================
                    CALCULATED BMI
                ========================================== */}

                <div className="mt-5 rounded-2xl border border-zinc-200 bg-white p-5">

                  <div className="flex items-center justify-between gap-4">

                    <div>

                      <p className="text-xs font-semibold text-zinc-400">
                        BMI
                      </p>

                      {nutrition ? (
                        <>
                          <p className="mt-1 text-2xl font-bold text-zinc-900">
                            {nutrition.bmi}
                          </p>

                          <p className="mt-1 text-sm text-zinc-500">
                            {nutrition.bmiCategory}
                          </p>
                        </>
                      ) : (
                        <p className="mt-1 text-sm text-red-500">
                          Enter valid height and weight
                        </p>
                      )}

                    </div>

                    <p className="text-right text-xs text-zinc-400">
                      Calculated from current
                      <br />
                      height & weight
                    </p>

                  </div>

                </div>

                {/* =========================================
                    SAVE AREA
                ========================================== */}

                <div className="mt-5 flex flex-col items-end gap-3 sm:flex-row sm:justify-end">

                  {saveMessage && (
                    <p
                      className={`text-sm font-medium ${
                        saveMessage.includes(
                          "successfully"
                        )
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {saveMessage}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={
                      saving ||
                      !isFormValid ||
                      !hasChanges
                    }
                    className={`rounded-2xl px-6 py-3 text-sm font-semibold transition ${
                      saving ||
                      !isFormValid ||
                      !hasChanges
                        ? "cursor-not-allowed bg-zinc-200 text-zinc-400"
                        : "bg-black text-white shadow-sm hover:bg-zinc-800 active:scale-[0.98]"
                    }`}
                  >
                    {saving
                      ? "Saving..."
                      : "Save Changes"}
                  </button>

                </div>

              </div>

              {/* =========================================
                  INVALID DATA MESSAGE
              ========================================== */}

              {!nutrition && (
                <div className="rounded-3xl border border-red-200 bg-red-50 p-5">

                  <p className="font-semibold text-red-600">
                    Please fix your body stats
                  </p>

                  <p className="mt-1 text-sm text-red-500">
                    Calories and macros will be
                    calculated automatically once
                    your height, weight and goal
                    are valid.
                  </p>

                </div>
              )}

            </div>
          </main>
        </div>
      </OnboardingGuard>
    </ProtectedRoute>
  );
}