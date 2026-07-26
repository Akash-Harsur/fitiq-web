"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

import BodyStep from "@/components/onboarding/BodyStep";
import ExperienceStep from "@/components/onboarding/ExperienceStep";
import GoalStep from "@/components/onboarding/GoalStep";
import PersonalStep from "@/components/onboarding/PersonalStep";
import ProgressBar from "@/components/onboarding/ProgressBar";
import RecommendationStep from "@/components/onboarding/RecommendationStep";
import StepHeader from "@/components/onboarding/StepHeader";
import StepNavigation from "@/components/onboarding/StepNavigation";
import TrainingDaysStep from "@/components/onboarding/TrainingDaysStep";

const TOTAL_STEPS = 6;

type FormData = {
  fullName: string;
  age: string;
  gender: string;

  height: string;
  weight: string;

  goal:
  | "muscle-gain"
  | "fat-loss"
  | "body-recomposition"
  | "strength"
  | "";

  experience:
  | "beginner"
  | "intermediate"
  | "advanced"
  | "";

  trainingDays: number | null;

  selectedProgram: string;
};

export default function OnboardingPage() {
  const router = useRouter();

  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (authLoading) return;

      if (!user) return;

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (
          userDoc.exists() &&
          userDoc.data().onboardingCompleted
        ) {
          router.replace("/dashboard");
        }
      } catch (error) {
        console.error("Failed to check onboarding status:", error);
      }
    };

    checkOnboardingStatus();
  }, [user, authLoading, router]);

  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<FormData>({
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

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.fullName.trim() !== "" &&
          formData.age.trim() !== "" &&
          formData.gender !== ""
        );

      case 2:
        return (
          formData.height.trim() !== "" &&
          formData.weight.trim() !== ""
        );

      case 3:
        return formData.goal !== "";

      case 4:
        return formData.experience !== "";

      case 5:
        return formData.trainingDays !== null;

      case 6:
        return formData.selectedProgram !== "";

      default:
        return false;
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleNext = async () => {
    if (!isCurrentStepValid()) return;

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    if (!user) return;

    try {
      setLoading(true);

      await setDoc(
        doc(db, "users", user.uid),
        {
          fullName: formData.fullName,
          age: Number(formData.age),
          gender: formData.gender,

          height: Number(formData.height),
          weight: Number(formData.weight),

          goal: formData.goal,

          experience: formData.experience,

          trainingDays: formData.trainingDays,

          selectedProgram: formData.selectedProgram,

          onboardingCompleted: true,

          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
        {
          merge: true,
        }
      );

      router.replace("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6 py-10">
          <div className="w-full rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">
            <StepHeader
              title="Complete Your Profile"
              subtitle="Let's personalize your FitIQ experience."
            />

            <ProgressBar
              currentStep={currentStep}
              totalSteps={TOTAL_STEPS}
            />

            <div className="mt-10">
              {currentStep === 1 && (
                <PersonalStep
                  fullName={formData.fullName}
                  age={formData.age}
                  gender={formData.gender}
                  onChange={handleChange}
                />
              )}

              {currentStep === 2 && (
                <BodyStep
                  height={formData.height}
                  weight={formData.weight}
                  onChange={handleChange}
                />
              )}

              {currentStep === 3 && (
                <GoalStep
                  goal={formData.goal}
                  onChange={handleChange}
                />
              )}

              {currentStep === 4 && (
                <ExperienceStep
                  experience={
                    formData.experience as
                    | "beginner"
                    | "intermediate"
                    | "advanced"
                  }
                  onChange={handleChange}
                />
              )}

              {currentStep === 5 && (
                <TrainingDaysStep
                  experience={
                    formData.experience as
                    | "beginner"
                    | "intermediate"
                    | "advanced"
                  }
                  trainingDays={formData.trainingDays}
                  onChange={handleChange}
                />
              )}

              {currentStep === 6 &&
                formData.experience &&
                formData.goal &&
                formData.trainingDays && (
                  <RecommendationStep
                    experience={
                      formData.experience as
                      | "beginner"
                      | "intermediate"
                      | "advanced"
                    }
                    goal={formData.goal}
                    trainingDays={formData.trainingDays}
                    selectedProgram={formData.selectedProgram}
                    onChange={handleChange}
                  />
                )}
            </div>

            <div className="mt-10">
              <StepNavigation
                currentStep={currentStep}
                totalSteps={TOTAL_STEPS}
                onBack={handleBack}
                onNext={handleNext}
                loading={loading}
                disableNext={!isCurrentStepValid()}
              />
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}