"use client";

import Link from "next/link";
import { Mail, RefreshCw } from "lucide-react";
import { useState } from "react";

import { auth } from "@/lib/firebase";
import { sendEmailVerification } from "firebase/auth";

export default function VerifyEmailPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleResend = async () => {
    if (!auth.currentUser) {
      setMessage(
        "Please sign in again if you need another verification email."
      );
      return;
    }

    try {
      setLoading(true);

      await sendEmailVerification(auth.currentUser);

      setMessage(
        "Verification email sent successfully. Please check your Inbox and Spam/Junk folder."
      );
    } catch {
      setMessage(
        "Unable to send verification email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">
        <div className="mb-8 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <Mail
              size={40}
              className="text-green-600"
            />
          </div>
        </div>

        <h1 className="text-center text-4xl font-bold text-gray-900">
          Verify Your Email
        </h1>

        <p className="mt-5 text-center leading-7 text-gray-600">
          We've sent a verification link to your email address.
          <br />
          Please verify your email before signing in.
        </p>

        <p className="mt-3 text-center text-sm text-gray-500">
          If you don't see the email, check your Inbox,
          Spam or Junk folder.
        </p>

        {message && (
          <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-center text-sm text-green-700">
            {message}
          </div>
        )}

        <button
          onClick={handleResend}
          disabled={loading}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-black py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <RefreshCw
            size={18}
            className={loading ? "animate-spin" : ""}
          />

          {loading
            ? "Sending..."
            : "Resend Verification Email"}
        </button>

        <Link
          href="/auth"
          className="mt-4 flex w-full items-center justify-center rounded-xl border border-gray-300 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
        >
          Back to Login
        </Link>
      </div>
    </main>
  );
}