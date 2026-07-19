"use client";

import Image from "next/image";
import { useState } from "react";

import AuthTabs from "./AuthTabs";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export default function AuthCard() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-10 shadow-sm">

      {/* Logo */}

      <div className="flex justify-center">

        <Image
          src="/image/logo.jpeg"
          alt="FitIQ Logo"
          width={230}
          height={65}
          priority
          className="h-auto w-auto"
        />

      </div>

      {/* Heading */}

      <h2 className="mt-6 text-center text-3xl font-bold text-black">
        {isLogin ? "Welcome Back" : "Create Account"}
      </h2>

      <p className="mt-2 text-center text-gray-600">
        {isLogin
          ? "Sign in to continue your fitness journey."
          : "Join FitIQ and start your transformation today."}
      </p>

      {/* Tabs */}

      <AuthTabs
        isLogin={isLogin}
        setIsLogin={setIsLogin}
      />

      {/* Forms */}

      {isLogin ? <LoginForm /> : <SignupForm />}

    </div>
  );
}