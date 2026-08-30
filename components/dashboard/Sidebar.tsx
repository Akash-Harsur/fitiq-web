"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";

import {
  Home,
  Dumbbell,
  Apple,
  ChartColumn,
  User,
  Settings,
  LogOut,
  Menu,
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
    title: "Exercise Library",
    icon: Dumbbell,
    href: "/dashboard/exercises",
  },
  {
    title: "Nutrition",
    icon: Apple,
    href: "#",
  },
  {
    title: "Progress",
    icon: ChartColumn,
    href: "/progress",
  },
  {
    title: "Profile",
    icon: User,
    href: "/profile",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "#",
  },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const { user } = useAuth();

  const [collapsed, setCollapsed] =
    useState(false);

  /*
   * =========================================
   * LOAD SIDEBAR STATE
   * =========================================
   */

  useEffect(() => {
    const saved =
      localStorage.getItem("sidebar");

    if (saved === "collapsed") {
      setCollapsed(true);
    }
  }, []);

  /*
   * =========================================
   * TOGGLE SIDEBAR
   * =========================================
   */

  const toggleSidebar = () => {
    const next = !collapsed;

    setCollapsed(next);

    localStorage.setItem(
      "sidebar",
      next ? "collapsed" : "expanded"
    );
  };

  /*
   * =========================================
   * LOGOUT
   * =========================================
   */

  const handleLogout = async () => {
    try {
      await signOut(auth);

      router.replace("/auth");
    } catch (error) {
      console.error(
        "Logout failed:",
        error
      );
    }
  };

  /*
   * =========================================
   * USER INITIALS
   * =========================================
   */

  const initials =
    user?.displayName
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase() || "U";

  return (
    <aside
      className={`sticky top-0 flex h-screen flex-col border-r border-zinc-200 bg-white transition-all duration-300 ease-in-out ${
        collapsed
          ? "w-20"
          : "w-72"
      }`}
    >
      {/* =========================================
          HEADER
      ========================================== */}

      <div className="sticky top-0 z-20 border-b border-zinc-200 bg-white px-5 py-5">

        <div
          className={`flex items-center ${
            collapsed
              ? "justify-center"
              : "justify-between"
          }`}
        >

          {/* FitIQ Logo */}

          {!collapsed && (
            <Link href="/dashboard">

              <Image
                src="/image/logo.jpeg"
                alt="FitIQ"
                width={150}
                height={42}
                className="cursor-pointer"
                priority
              />

            </Link>
          )}

          {/* Burger Menu */}

          <button
            type="button"
            onClick={toggleSidebar}
            className="rounded-xl p-2 transition-all duration-300 hover:bg-zinc-100 active:scale-95"
          >
            <Menu size={24} />
          </button>

        </div>

      </div>

      {/* =========================================
          USER
      ========================================== */}

      <div className="px-4 py-5">

        <div
          className={`rounded-3xl border border-zinc-200 bg-zinc-50 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg ${
            collapsed
              ? "flex justify-center p-2"
              : "flex items-center gap-4 p-4"
          }`}
        >

          {user?.photoURL ? (

            <Image
              src={user.photoURL}
              alt="Profile"
              width={56}
              height={56}
              className="rounded-full ring-2 ring-zinc-200"
            />

          ) : (

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-base font-bold tracking-wide text-white ring-2 ring-zinc-200">

              {initials}

            </div>

          )}

          {!collapsed && (

            <div className="min-w-0 flex-1">

              <h3 className="truncate text-lg font-semibold text-zinc-900">

                {user?.displayName ||
                  "FitIQ User"}

              </h3>

              <p className="truncate text-sm text-zinc-500">

                {user?.email}

              </p>

            </div>

          )}

        </div>

      </div>

      {/* =========================================
          NAVIGATION
      ========================================== */}

      <nav className="flex-1 overflow-y-auto px-4 py-4">

        <ul className="space-y-2">

          {menuItems.map((item) => {

            const Icon = item.icon;

            const active =
              pathname === item.href;

            /*
             * Disabled menu items
             */

            const disabled =
              item.href === "#";

            return (
              <li key={item.title}>

                {disabled ? (

                  <button
                    type="button"
                    disabled
                    className={`group flex w-full cursor-not-allowed items-center rounded-xl text-zinc-400 transition-all duration-300 ease-in-out ${
                      collapsed
                        ? "mx-auto h-12 w-12 justify-center"
                        : "gap-4 px-4 py-3"
                    }`}
                  >

                    <Icon
                      size={22}
                      className="shrink-0"
                    />

                    {!collapsed && (
                      <span className="font-semibold">
                        {item.title}
                      </span>
                    )}

                  </button>

                ) : (

                  <Link
                    href={item.href}
                    className={`group flex items-center rounded-xl transition-all duration-300 ease-in-out ${
                      collapsed
                        ? "mx-auto h-12 w-12 justify-center"
                        : "gap-4 px-4 py-3"
                    } ${
                      active
                        ? "bg-black text-white shadow-lg"
                        : "text-zinc-700 hover:bg-zinc-100 hover:text-black"
                    }`}
                  >

                    <Icon
                      size={22}
                      className={`shrink-0 transition-transform duration-300 ${
                        !active
                          ? "group-hover:scale-110"
                          : ""
                      }`}
                    />

                    {!collapsed && (

                      <span className="font-semibold">
                        {item.title}
                      </span>

                    )}

                  </Link>

                )}

              </li>
            );
          })}

        </ul>

      </nav>

      {/* =========================================
          LOGOUT
      ========================================== */}

      <div className="border-t border-zinc-200 p-4">

        <button
          type="button"
          onClick={handleLogout}
          className={`group flex w-full items-center rounded-xl text-red-500 transition-all duration-300 ease-in-out hover:bg-red-50 ${
            collapsed
              ? "mx-auto h-12 w-12 justify-center"
              : "gap-4 px-4 py-3"
          }`}
        >

          <LogOut
            size={22}
            className="transition-transform duration-300 group-hover:scale-110"
          />

          {!collapsed && (

            <span className="font-semibold">
              Logout
            </span>

          )}

        </button>

      </div>

    </aside>
  );
}