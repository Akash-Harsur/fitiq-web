"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import {
  Home,
  Dumbbell,
  Apple,
  ChartColumn,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import { auth } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    title: "Workouts",
    icon: Dumbbell,
    href: "#",
  },
  {
    title: "Nutrition",
    icon: Apple,
    href: "#",
  },
  {
    title: "Progress",
    icon: ChartColumn,
    href: "#",
  },
  {
    title: "Profile",
    icon: User,
    href: "#",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "#",
  },
];

export default function Sidebar() {
  const router = useRouter();

  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);

      router.replace("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside className="flex h-screen w-72 flex-col border-r bg-white px-6 py-8">
      {/* Logo */}
      <Link
        href="/dashboard"
        className="flex items-center justify-center"
      >
        <Image
          src="/image/logo.jpeg"
          alt="FitIQ Logo"
          width={160}
          height={50}
          className="cursor-pointer rounded-xl"
          priority
        />
      </Link>

      {/* User */}
      <div className="mt-8 flex items-center gap-3 rounded-2xl bg-gray-50 p-4">
        {user?.photoURL ? (
          <Image
            src={user.photoURL}
            alt="Profile"
            width={50}
            height={50}
            className="rounded-full"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-lg font-bold text-white">
            {user?.displayName?.charAt(0).toUpperCase() ??
              user?.email?.charAt(0).toUpperCase() ??
              "U"}
          </div>
        )}

        <div className="overflow-hidden">
          <h3 className="truncate font-semibold">
            {user?.displayName || "FitIQ User"}
          </h3>

          <p className="truncate text-sm text-gray-500">
            {user?.email}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-10 flex-1">
        <ul className="space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-gray-100"
                >
                  <Icon size={20} />

                  <span className="font-medium">
                    {item.title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 rounded-xl px-4 py-3 text-red-500 transition hover:bg-red-50"
      >
        <LogOut size={20} />

        <span className="font-medium">
          Logout
        </span>
      </button>
    </aside>
  );
}