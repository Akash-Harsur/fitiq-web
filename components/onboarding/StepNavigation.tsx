import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

type StepNavigationProps = {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  loading?: boolean;
  disableNext?: boolean;
};

export default function StepNavigation({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  loading = false,
  disableNext = false,
}: StepNavigationProps) {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="mt-10 flex items-center justify-between border-t border-gray-200 pt-6">
      <button
        type="button"
        onClick={onBack}
        disabled={isFirstStep || loading}
        className="flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={loading || disableNext}
        className="flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Saving...
          </>
        ) : (
          <>
            {isLastStep ? "Finish" : "Continue"}
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </div>
  );
}