"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export default function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const handleSignup = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError("");

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`,
      });

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError("");

      router.push("/dashboard");



    } catch (error: any) {
        switch (error.code) {
          case "auth/email-already-in-use":
            setError("An account with this email already exists.");
            break;

          case "auth/invalid-email":
            setError("Please enter a valid email address.");
            break;

          case "auth/weak-password":
            setError("Password must be at least 6 characters.");
            break;

          default:
            setError("Something went wrong. Please try again.");
        }
      } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSignup}
      className="mt-8 space-y-4"
    >

      <div className="grid grid-cols-2 gap-4">

        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) =>
            setFirstName(e.target.value)
          }
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
        />

        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) =>
            setLastName(e.target.value)
          }
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
        />

      </div>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
      />
      <div className="relative">

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none focus:border-black"
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

      <div className="relative">
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none focus:border-black"
        />

        <button
          type="button"
          onClick={() =>
            setShowConfirmPassword(!showConfirmPassword)
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showConfirmPassword ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </button>
      </div>
      {error && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center rounded-xl bg-black py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70"
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

            Creating Account...
          </>
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  );
}