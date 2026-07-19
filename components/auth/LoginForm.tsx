"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      alert("🎉 Login Successful!");

      router.push("/dashboard");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="mt-8">

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
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>

        </div>

      </div>

      {/* Forgot Password */}

      <div className="mt-3 flex justify-end">

        <button className="text-sm font-medium text-gray-500 hover:text-black">
          Forgot Password?
        </button>

      </div>

      {/* Sign In */}

      <button
        onClick={handleLogin}
        className="mt-6 w-full rounded-xl bg-black py-3 font-semibold text-white transition hover:bg-gray-800"
      >
        Sign In
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

      <button className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 py-3 font-semibold transition hover:bg-gray-100">

        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="h-5 w-5"
        />

        Continue with Google

      </button>

    </div>
  );
}