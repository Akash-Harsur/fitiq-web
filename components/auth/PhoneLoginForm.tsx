"use client";

import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function PhoneLoginForm({
  onBack,
}: {
  onBack: () => void;
}) {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] =
    useState<any>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const redirectAfterLogin = async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));

      if (
        !userDoc.exists() ||
        !userDoc.data().onboardingCompleted
      ) {
        router.push("/onboarding");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Profile loading error:", error);

      setError(
        "Login successful, but we couldn't load your profile. Please try again."
      );
    }
  };

  /*
   * ============================================================
   * SEND OTP
   * ============================================================
   *
   * Phone OTP is temporarily disabled because Firebase Phone Auth
   * requires billing to be enabled.
   *
   * The UI remains fully functional.
   *
   * When Firebase billing is enabled later, replace the temporary
   * block below with the real Firebase signInWithPhoneNumber()
   * implementation.
   */

  const handleSendOTP = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setMessage("");

    // Validate phone number
    const cleanedPhone = phone.replace(/\D/g, "");

    if (!cleanedPhone) {
      setError("Please enter your mobile number.");
      return;
    }

    if (cleanedPhone.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      setLoading(true);

      /*
       * TEMPORARY PHONE OTP DISABLED
       *
       * Firebase is currently returning:
       *
       * auth/billing-not-enabled
       *
       * We are intentionally not calling Firebase here until
       * billing is enabled.
       */

      await new Promise((resolve) =>
        setTimeout(resolve, 400)
      );

      setMessage(
        "Phone OTP is temporarily unavailable. Please use Email or Google Sign In."
      );

      return;
    } finally {
      setLoading(false);
    }
  };

  /*
   * ============================================================
   * VERIFY OTP
   * ============================================================
   *
   * This remains ready for when Phone Auth is enabled.
   */

  const handleVerifyOTP = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }

    if (otp.length !== 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    if (!confirmationResult) {
      setError("Please request a new OTP.");
      return;
    }

    try {
      setLoading(true);

      const result =
        await confirmationResult.confirm(otp);

      setMessage(
        "Phone number verified successfully."
      );

      await redirectAfterLogin(result.user.uid);
    } catch (error: any) {
      console.error("OTP verification error:", error);

      switch (error.code) {
        case "auth/invalid-verification-code":
          setError(
            "Invalid OTP. Please check and try again."
          );
          break;

        case "auth/code-expired":
          setError(
            "This OTP has expired. Please request a new one."
          );
          break;

        default:
          setError(
            "OTP verification failed. Please try again."
          );
      }
    } finally {
      setLoading(false);
    }
  };

  /*
   * ============================================================
   * CHANGE NUMBER
   * ============================================================
   */

  const handleChangeNumber = () => {
    setConfirmationResult(null);
    setOtp("");
    setError("");
    setMessage("");
  };

  return (
    <div>
      {!confirmationResult ? (
        <>
          {/* ================= PHONE FORM ================= */}

          <form onSubmit={handleSendOTP}>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Mobile Number
              </label>

              <div className="flex">
                {/* Country Code */}

                <div className="flex items-center rounded-l-xl border border-r-0 border-gray-300 bg-gray-50 px-4 text-sm font-medium text-gray-700">
                  +91
                </div>

                {/* Phone Number */}

                <input
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="Enter 10-digit mobile number"
                  value={phone}
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10);

                    setPhone(value);

                    // Clear old errors while typing
                    if (error) {
                      setError("");
                    }

                    if (message) {
                      setMessage("");
                    }
                  }}
                  className="w-full rounded-r-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                />
              </div>
            </div>

            {/* Error */}

            {error && (
              <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </p>
            )}

            {/* Info Message */}

            {message && (
              <p className="mt-4 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
                {message}
              </p>
            )}

            {/* Send OTP */}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center rounded-xl bg-black py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Checking..." : "Send OTP"}
            </button>
          </form>

          {/* Back */}

          <button
            type="button"
            onClick={onBack}
            disabled={loading}
            className="mt-4 w-full text-sm font-medium text-gray-500 transition hover:text-black"
          >
            ← Back to Email Login
          </button>
        </>
      ) : (
        <>
          {/* ================= OTP FORM ================= */}

          <form onSubmit={handleVerifyOTP}>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Enter OTP
              </label>

              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 6);

                  setOtp(value);

                  if (error) {
                    setError("");
                  }
                }}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-center text-xl tracking-[0.4em] outline-none transition focus:border-black"
              />
            </div>

            {/* Success Message */}

            {message && (
              <p className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                {message}
              </p>
            )}

            {/* Error */}

            {error && (
              <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </p>
            )}

            {/* Verify */}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center rounded-xl bg-black py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading
                ? "Verifying..."
                : "Verify & Sign In"}
            </button>
          </form>

          {/* Change Number */}

          <button
            type="button"
            onClick={handleChangeNumber}
            disabled={loading}
            className="mt-4 w-full text-sm font-medium text-gray-500 transition hover:text-black"
          >
            ← Change Mobile Number
          </button>
        </>
      )}
    </div>
  );
}