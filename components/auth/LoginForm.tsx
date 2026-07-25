"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      setEmail("");
      setPassword("");

      router.push("/dashboard");
    } catch (error: any) {
      switch (error.code) {
        case "auth/user-not-found":
          setError("No account found with this email.");
          break;

        case "auth/wrong-password":
        case "auth/invalid-credential":
          setError("Invalid email or password.");
          break;

        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;

        default:
          setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setError("If an account exists for this email, we've sent a password reset link. Please check your Inbox and Spam/Junk folder if you don't see it within a few minutes.");
    } catch (error: any) {
      switch (error.code) {
        case "auth/user-not-found":
          setError("No account found with this email.");
          break;

        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;

        default:
          setError("Failed to send reset email.");
      }
    }
  };

  return (
    <form onSubmit={handleLogin} className="mt-8">
      {/* Email */}

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
        />
      </div>

      {/* Password */}

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Password
        </label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none transition focus:border-black"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>
      </div>

      {/* Error / Success Message */}

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Forgot Password */}

      <div className="mt-3 flex justify-end">
        <button
          type="button"
          disabled={loading}
          onClick={handleForgotPassword}
          className="text-sm font-medium text-gray-500 transition hover:text-black disabled:cursor-not-allowed"
        >
          Forgot Password?
        </button>
      </div>
      {/* Sign In */}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 flex w-full items-center justify-center rounded-xl bg-black py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (
          <>
            <svg
              className="mr-2 h-5 w-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />

              <path
                className="opacity-75"
                fill="currentColor"
                d="M12 2a10 10 0 00-10 10h4a6 6 0 016-6V2z"
              />
            </svg>

            Signing In...
          </>
        ) : (
          "Sign In"
        )}
      </button>

      {/* Divider */}

      <div className="my-6 flex items-center">
        <div className="h-px flex-1 bg-gray-300"></div>

        <span className="px-4 text-sm text-gray-500">
          OR
        </span>

        <div className="h-px flex-1 bg-gray-300"></div>
      </div>

      {/* Google */}

      <button
        type="button"
        disabled={loading}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 py-3 font-semibold transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="h-5 w-5"
        />

        Continue with Google
      </button>
    </form>
  );
}