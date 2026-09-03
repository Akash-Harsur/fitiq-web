"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

export type UserProfile = {
  fullName: string;
  age: number;
  gender: string;

  height: number;
  weight: number;

  goal: string;
  experience: string;

  trainingDays: number;
  selectedProgram: string;

  onboardingCompleted: boolean;
};

export function useUserProfile() {
  const { user, loading: authLoading } =
    useAuth();

  const [profile, setProfile] =
    useState<UserProfile | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (authLoading) return;

      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(
          db,
          "users",
          user.uid
        );

        const docSnap =
          await getDoc(docRef);

        if (docSnap.exists()) {
          setProfile(
            docSnap.data() as UserProfile
          );
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error(
          "Failed to fetch profile:",
          error
        );

        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, authLoading]);

  return {
    profile,
    loading,
    setProfile,
  };
}