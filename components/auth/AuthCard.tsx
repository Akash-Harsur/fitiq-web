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
          className="fitiq-logo h-auto w-auto"
        />
      </div>

      {/* Tabs */}
      <div className="mt-8">
        <AuthTabs
          isLogin={isLogin}
          setIsLogin={setIsLogin}
        />
      </div>

      {/* Forms */}
      <div className="mt-8">
        {isLogin ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
}