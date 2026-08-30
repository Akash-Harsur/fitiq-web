"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import PhoneLoginForm from "./PhoneLoginForm";
import { auth, googleProvider, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneLogin, setPhoneLogin] = useState(false);

  const router = useRouter();

  const redirectAfterLogin = async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));

      if (
        !userDoc.exists() ||
        !userDoc.data()?.onboardingCompleted
      ) {
        router.push("/onboarding");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Firestore redirect error:", error);

      setError(
        "Login successful, but we couldn't load your profile. Please try again."
      );
    }
  };

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError("");

    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          cleanEmail,
          password
        );

      if (!userCredential.user.emailVerified) {
        await signOut(auth);

        setError(
          "Please verify your email before signing in. Please check your inbox."
        );

        return;
      }

      setEmail("");
      setPassword("");

      await redirectAfterLogin(
        userCredential.user.uid
      );
    } catch (error: any) {
      console.error("EMAIL LOGIN ERROR:", error);

      switch (error?.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
          setError("Invalid email or password.");
          break;

        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;

        case "auth/user-disabled":
          setError("This account has been disabled.");
          break;

        case "auth/too-many-requests":
          setError(
            "Too many failed attempts. Please try again later."
          );
          break;

        case "auth/network-request-failed":
          setError(
            "Network error. Please check your internet connection."
          );
          break;

        default:
          setError(
            error?.message ||
              "Something went wrong. Please try again."
          );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError("");

    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      await sendPasswordResetEmail(
        auth,
        cleanEmail
      );

      setError(
        "Password reset email sent. Please check your Inbox and Spam/Junk folder."
      );
    } catch (error: any) {
      console.error(
        "PASSWORD RESET ERROR:",
        error
      );

      switch (error?.code) {
        case "auth/user-not-found":
          setError(
            "No account found with this email."
          );
          break;

        case "auth/invalid-email":
          setError(
            "Please enter a valid email address."
          );
          break;

        case "auth/network-request-failed":
          setError(
            "Network error. Please check your internet connection."
          );
          break;

        default:
          setError(
            error?.message ||
              "Failed to send reset email."
          );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");

    try {
      setLoading(true);

      const result = await signInWithPopup(
        auth,
        googleProvider
      );

      await redirectAfterLogin(
        result.user.uid
      );
    } catch (error: any) {
      console.error(
        "GOOGLE LOGIN ERROR:",
        error
      );

      switch (error?.code) {
        case "auth/popup-closed-by-user":
        case "auth/cancelled-popup-request":
          setError(
            "Google sign-in was cancelled."
          );
          break;

        case "auth/popup-blocked":
          setError(
            "Your browser blocked the Google sign-in popup. Please allow popups for FitIQ."
          );
          break;

        case "auth/account-exists-with-different-credential":
          setError(
            "An account already exists with this email using another sign-in method."
          );
          break;

        case "auth/network-request-failed":
          setError(
            "Network error. Please check your internet connection."
          );
          break;

        default:
          setError(
            error?.message ||
              "Google Sign-In failed."
          );
      }
    } finally {
      setLoading(false);
    }
  };

  /*
   * PHONE OTP SCREEN
   */
  if (phoneLogin) {
    return (
      <PhoneLoginForm
        onBack={() => {
          setPhoneLogin(false);
          setError("");
        }}
      />
    );
  }

  return (
    <form
      onSubmit={handleLogin}
      className="mt-8"
    >
      {/* EMAIL */}

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          autoComplete="email"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
        />
      </div>

      {/* PASSWORD */}

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Password
        </label>

        <div className="relative">
          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            autoComplete="current-password"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none transition focus:border-black"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>
      </div>

      {/* ERROR */}

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* FORGOT PASSWORD */}

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

      {/* SIGN IN */}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 flex w-full items-center justify-center rounded-xl bg-black py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading
          ? "Signing In..."
          : "Sign In"}
      </button>

      {/* DIVIDER */}

      <div className="my-6 flex items-center">
        <div className="h-px flex-1 bg-gray-300" />

        <span className="px-4 text-sm text-gray-500">
          OR
        </span>

        <div className="h-px flex-1 bg-gray-300" />
      </div>

      {/* PHONE OTP */}

      <button
        type="button"
        disabled={loading}
        onClick={() => {
          setError("");
          setPhoneLogin(true);
        }}
        className="flex w-full items-center justify-center rounded-xl border border-gray-300 py-3 font-semibold transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-70"
      >
        Continue with Phone OTP
      </button>

      {/* GOOGLE */}

      <button
        type="button"
        disabled={loading}
        onClick={handleGoogleLogin}
        className="mt-3 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 py-3 font-semibold transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-70"
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