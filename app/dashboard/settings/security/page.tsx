"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";

import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

import { auth } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

export default function SecurityPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /*
   * =========================================
   * AUTHENTICATION PROVIDER
   * =========================================
   */

  const authProvider = useMemo(() => {
    if (!user) {
      return null;
    }

    const providers = user.providerData.map(
      (provider) => provider.providerId
    );

    if (providers.includes("password")) {
      return "password";
    }

    if (providers.includes("google.com")) {
      return "google";
    }

    if (providers.includes("phone")) {
      return "phone";
    }

    return "other";
  }, [user]);

  /*
   * =========================================
   * CLEAR SUCCESS MESSAGE
   * =========================================
   */

  useEffect(() => {
    if (!success) {
      return;
    }

    const timer = setTimeout(() => {
      setSuccess("");
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [success]);

  /*
   * =========================================
   * CHANGE PASSWORD
   * =========================================
   */

  const handleChangePassword = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    /*
     * User check
     */

    if (!user) {
      setError(
        "You must be logged in to change your password."
      );
      return;
    }

    /*
     * Current password validation
     */

    if (!currentPassword.trim()) {
      setError(
        "Please enter your current password."
      );
      return;
    }

    /*
     * New password validation
     */

    if (!newPassword.trim()) {
      setError(
        "Please enter a new password."
      );
      return;
    }

    if (newPassword.length < 6) {
      setError(
        "New password must be at least 6 characters."
      );
      return;
    }

    /*
     * Confirm password validation
     */

    if (!confirmPassword.trim()) {
      setError(
        "Please confirm your new password."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(
        "New passwords do not match."
      );
      return;
    }

    /*
     * Same password validation
     */

    if (currentPassword === newPassword) {
      setError(
        "New password must be different from your current password."
      );
      return;
    }

    /*
     * Email check
     */

    if (!user.email) {
      setError(
        "No email address is associated with this account."
      );
      return;
    }

    try {
      setLoading(true);

      /*
       * =========================================
       * RE-AUTHENTICATE
       * =========================================
       *
       * Firebase requires the user to prove
       * their current password before changing it.
       */

      const credential =
        EmailAuthProvider.credential(
          user.email,
          currentPassword
        );

      await reauthenticateWithCredential(
        user,
        credential
      );

      /*
       * =========================================
       * UPDATE PASSWORD
       * =========================================
       */

      await updatePassword(
        user,
        newPassword
      );

      /*
       * =========================================
       * SUCCESS
       * =========================================
       */

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setShowCurrent(false);
      setShowNew(false);
      setShowConfirm(false);

      setError("");

      setSuccess(
        "Password changed successfully."
      );
    } catch (error: any) {
      /*
       * IMPORTANT:
       *
       * Don't use console.error here.
       * Firebase authentication errors are handled
       * through the UI instead.
       */

      const errorCode = error?.code;

      switch (errorCode) {
        /*
         * Wrong current password
         */

        case "auth/wrong-password":
        case "auth/invalid-credential":
          setError(
            "Current password is incorrect."
          );
          break;

        /*
         * Weak password
         */

        case "auth/weak-password":
          setError(
            "Please choose a stronger password."
          );
          break;

        /*
         * Recent login required
         */

        case "auth/requires-recent-login":
          setError(
            "For security, please log out and log in again before changing your password."
          );
          break;

        /*
         * Account disabled
         */

        case "auth/user-disabled":
          setError(
            "This account has been disabled."
          );
          break;

        /*
         * User not found
         */

        case "auth/user-not-found":
          setError(
            "Account could not be found. Please sign in again."
          );
          break;

        /*
         * Network error
         */

        case "auth/network-request-failed":
          setError(
            "Network error. Please check your internet connection and try again."
          );
          break;

        /*
         * Default
         */

        default:
          setError(
            "Unable to change password. Please try again."
          );
      }
    } finally {
      setLoading(false);
    }
  };

  /*
   * =========================================
   * NOT LOGGED IN
   * =========================================
   */

  if (!user) {
    return (
      <main className="min-h-screen bg-zinc-50 px-4 py-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-zinc-200 bg-white p-8 text-center">
          <p className="font-semibold text-zinc-900">
            Please log in to manage security.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-3xl">

        {/* =========================================
            BACK
        ========================================== */}

        <button
          type="button"
          onClick={() =>
            router.push("/dashboard/settings")
          }
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-zinc-600 transition hover:text-black"
        >
          <ArrowLeft size={18} />
          Back to Settings
        </button>

        {/* =========================================
            HEADER
        ========================================== */}

        <div className="mb-8">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
            <ShieldCheck size={24} />
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
            Account Security
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
            Password & Security
          </h1>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Manage how you sign in and keep your
            FitIQ account secure.
          </p>

        </div>

        {/* =========================================
            EMAIL / PASSWORD ACCOUNT
        ========================================== */}

        {authProvider === "password" && (
          <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">

            {/* Section Header */}

            <div className="border-b border-zinc-100 px-5 py-5">

              <div className="flex items-center gap-4">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700">
                  <Lock size={20} />
                </div>

                <div>

                  <h2 className="font-bold text-zinc-900">
                    Change Password
                  </h2>

                  <p className="mt-1 text-sm text-zinc-500">
                    Update the password used to sign
                    in to FitIQ.
                  </p>

                </div>

              </div>

            </div>

            {/* Form */}

            <form
              onSubmit={handleChangePassword}
              className="space-y-5 p-5"
            >

              {/* =====================================
                  CURRENT PASSWORD
              ====================================== */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-zinc-700">
                  Current Password
                </label>

                <div className="relative">

                  <input
                    type={
                      showCurrent
                        ? "text"
                        : "password"
                    }
                    value={currentPassword}
                    onChange={(e) => {
                      setCurrentPassword(
                        e.target.value
                      );

                      setError("");
                      setSuccess("");
                    }}
                    placeholder="Enter current password"
                    autoComplete="current-password"
                    disabled={loading}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 pr-12 text-sm outline-none transition focus:border-black disabled:cursor-not-allowed disabled:bg-zinc-50"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowCurrent(
                        !showCurrent
                      )
                    }
                    disabled={loading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 transition hover:text-black disabled:cursor-not-allowed"
                    aria-label={
                      showCurrent
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showCurrent ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>

                </div>

              </div>

              {/* =====================================
                  NEW PASSWORD
              ====================================== */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-zinc-700">
                  New Password
                </label>

                <div className="relative">

                  <input
                    type={
                      showNew
                        ? "text"
                        : "password"
                    }
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(
                        e.target.value
                      );

                      setError("");
                      setSuccess("");
                    }}
                    placeholder="Enter new password"
                    autoComplete="new-password"
                    disabled={loading}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 pr-12 text-sm outline-none transition focus:border-black disabled:cursor-not-allowed disabled:bg-zinc-50"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowNew(!showNew)
                    }
                    disabled={loading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 transition hover:text-black disabled:cursor-not-allowed"
                    aria-label={
                      showNew
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showNew ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>

                </div>

                <p className="mt-2 text-xs text-zinc-400">
                  Password must contain at least
                  6 characters.
                </p>

              </div>

              {/* =====================================
                  CONFIRM PASSWORD
              ====================================== */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-zinc-700">
                  Confirm New Password
                </label>

                <div className="relative">

                  <input
                    type={
                      showConfirm
                        ? "text"
                        : "password"
                    }
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(
                        e.target.value
                      );

                      setError("");
                      setSuccess("");
                    }}
                    placeholder="Confirm new password"
                    autoComplete="new-password"
                    disabled={loading}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 pr-12 text-sm outline-none transition focus:border-black disabled:cursor-not-allowed disabled:bg-zinc-50"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirm(
                        !showConfirm
                      )
                    }
                    disabled={loading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 transition hover:text-black disabled:cursor-not-allowed"
                    aria-label={
                      showConfirm
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showConfirm ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>

                </div>

              </div>

              {/* =====================================
                  ERROR
              ====================================== */}

              {error && (
                <div
                  role="alert"
                  className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
                >
                  {error}
                </div>
              )}

              {/* =====================================
                  SUCCESS
              ====================================== */}

              {success && (
                <div
                  role="status"
                  className="rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
                >
                  {success}
                </div>
              )}

              {/* =====================================
                  SUBMIT
              ====================================== */}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-xl bg-black py-3.5 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Changing Password..."
                  : "Change Password"}
              </button>

            </form>

          </section>
        )}

        {/* =========================================
            GOOGLE ACCOUNT
        ========================================== */}

        {authProvider === "google" && (
          <section className="rounded-2xl border border-zinc-200 bg-white p-6">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-100">
                <ShieldCheck
                  size={22}
                  className="text-zinc-700"
                />
              </div>

              <div>

                <h2 className="font-bold text-zinc-900">
                  Google Account
                </h2>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Your FitIQ account is using Google
                  authentication. Your password is
                  managed by Google and cannot be
                  changed from FitIQ.
                </p>

              </div>

            </div>

          </section>
        )}

        {/* =========================================
            PHONE ACCOUNT
        ========================================== */}

        {authProvider === "phone" && (
          <section className="rounded-2xl border border-zinc-200 bg-white p-6">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-100">
                <ShieldCheck
                  size={22}
                  className="text-zinc-700"
                />
              </div>

              <div>

                <h2 className="font-bold text-zinc-900">
                  Phone Authentication
                </h2>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Your FitIQ account uses phone
                  verification instead of a password.
                  You will receive an OTP whenever
                  phone verification is required.
                </p>

              </div>

            </div>

          </section>
        )}

        {/* =========================================
            OTHER AUTHENTICATION
        ========================================== */}

        {authProvider === "other" && (
          <section className="rounded-2xl border border-zinc-200 bg-white p-6">

            <h2 className="font-bold text-zinc-900">
              Authentication
            </h2>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Your account uses an authentication
              method that does not support changing
              a password from FitIQ.
            </p>

          </section>
        )}

      </div>
    </main>
  );
}