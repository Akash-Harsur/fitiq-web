"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

export default function OnboardingGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkOnboarding = async () => {
      if (loading) return;

      if (!user) {
        return;
      }

      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (
        !userDoc.exists() ||
        !userDoc.data().onboardingCompleted
      ) {
        router.replace("/onboarding");
        return;
      }

      setChecking(false);
    };

    checkOnboarding();
  }, [user, loading, router]);

  if (loading || checking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}