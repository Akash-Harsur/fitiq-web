"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("🎉 Account Created Successfully!");

      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="mt-8 space-y-4">

      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
      />

      <div className="relative">

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none focus:border-black"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showPassword ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </button>

      </div>

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
      />

      <button
        onClick={handleSignup}
        className="w-full rounded-xl bg-black py-3 font-semibold text-white transition hover:bg-gray-800"
      >
        Create Account
      </button>

    </div>
  );
}