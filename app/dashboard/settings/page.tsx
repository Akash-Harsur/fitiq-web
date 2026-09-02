"use client";

import { useEffect, useState } from "react";
import {
    User,
    Lock,
    Dumbbell,
    Timer,
    Bell,
    TrendingUp,
    HelpCircle,
    MessageCircle,
    LogOut,
    Trash2,
    ChevronRight,
} from "lucide-react";

import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

import { auth } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "@/components/dashboard/Sidebar";

type WeightUnit = "kg" | "lb";

export default function SettingsPage() {
    const router = useRouter();
    const { user } = useAuth();

    const [weightUnit, setWeightUnit] =
        useState<WeightUnit>("kg");

    const [restTimer, setRestTimer] =
        useState("90");

    const [warmupSets, setWarmupSets] =
        useState(true);

    const [workoutReminders, setWorkoutReminders] =
        useState(true);

    const [progressReminders, setProgressReminders] =
        useState(true);

    /*
     * =========================================
     * LOAD SAVED PREFERENCES
     * =========================================
     */

    useEffect(() => {
        const savedUnit =
            localStorage.getItem("weightUnit");

        const savedRest =
            localStorage.getItem("restTimer");

        const savedWarmup =
            localStorage.getItem("warmupSets");

        const savedWorkoutReminder =
            localStorage.getItem("workoutReminders");

        const savedProgressReminder =
            localStorage.getItem("progressReminders");

        if (
            savedUnit === "kg" ||
            savedUnit === "lb"
        ) {
            setWeightUnit(savedUnit);
        }

        if (savedRest) {
            setRestTimer(savedRest);
        }

        if (savedWarmup !== null) {
            setWarmupSets(
                savedWarmup === "true"
            );
        }

        if (savedWorkoutReminder !== null) {
            setWorkoutReminders(
                savedWorkoutReminder === "true"
            );
        }

        if (savedProgressReminder !== null) {
            setProgressReminders(
                savedProgressReminder === "true"
            );
        }
    }, []);

    /*
     * =========================================
     * PREFERENCE HELPERS
     * =========================================
     */

    const updateWeightUnit = (
        value: WeightUnit
    ) => {
        setWeightUnit(value);

        localStorage.setItem(
            "weightUnit",
            value
        );
    };

    const updateRestTimer = (
        value: string
    ) => {
        setRestTimer(value);

        localStorage.setItem(
            "restTimer",
            value
        );
    };

    const updateWarmupSets = (
        value: boolean
    ) => {
        setWarmupSets(value);

        localStorage.setItem(
            "warmupSets",
            String(value)
        );
    };

    const updateWorkoutReminders = (
        value: boolean
    ) => {
        setWorkoutReminders(value);

        localStorage.setItem(
            "workoutReminders",
            String(value)
        );
    };

    const updateProgressReminders = (
        value: boolean
    ) => {
        setProgressReminders(value);

        localStorage.setItem(
            "progressReminders",
            String(value)
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
        } catch {
            // Keep UI clean without console errors
        }
    };

    /*
     * =========================================
     * REUSABLE SETTING ROW
     * =========================================
     */

    const SettingRow = ({
        icon: Icon,
        title,
        description,
        children,
    }: {
        icon: any;
        title: string;
        description?: string;
        children?: React.ReactNode;
    }) => {
        return (
            <div className="flex items-center justify-between gap-6 border-b border-zinc-100 px-5 py-5 last:border-b-0">

                <div className="flex min-w-0 items-center gap-4">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700">
                        <Icon size={20} />
                    </div>

                    <div className="min-w-0">

                        <p className="font-semibold text-zinc-900">
                            {title}
                        </p>

                        {description && (
                            <p className="mt-1 text-sm text-zinc-500">
                                {description}
                            </p>
                        )}

                    </div>

                </div>

                {children}

            </div>
        );
    };

    /*
     * =========================================
     * TOGGLE
     * =========================================
     */

    const Toggle = ({
        checked,
        onChange,
    }: {
        checked: boolean;
        onChange: (
            value: boolean
        ) => void;
    }) => {
        return (
            <button
                type="button"
                onClick={() =>
                    onChange(!checked)
                }
                className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                    checked
                        ? "bg-black"
                        : "bg-zinc-300"
                }`}
                aria-pressed={checked}
            >
                <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                        checked
                            ? "left-6"
                            : "left-1"
                    }`}
                />
            </button>
        );
    };

    return (
        <div className="flex min-h-screen bg-zinc-50">

            {/* =========================================
                SIDEBAR
            ========================================== */}

            <Sidebar />

            {/* =========================================
                MAIN CONTENT
            ========================================== */}

            <main className="min-w-0 flex-1">

                <div className="px-4 py-6 md:px-8 md:py-8">

                    <div className="mx-auto max-w-5xl">

                        {/* =========================================
                            HEADER
                        ========================================== */}

                        <div className="mb-8">

                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
                                FitIQ
                            </p>

                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
                                Settings
                            </h1>

                            <p className="mt-2 text-sm text-zinc-500 md:text-base">
                                Manage your account, workout preferences,
                                notifications and app settings.
                            </p>

                        </div>

                        {/* =========================================
                            ACCOUNT
                        ========================================== */}

                        <section className="mb-6">

                            <h2 className="mb-3 px-1 text-lg font-bold text-zinc-900">
                                Account
                            </h2>

                            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">

                                <SettingRow
                                    icon={User}
                                    title="Profile Information"
                                    description={
                                        user?.displayName ||
                                        "Manage your personal information"
                                    }
                                >

                                    <button
                                        type="button"
                                        onClick={() =>
                                            router.push("/profile")
                                        }
                                        className="flex items-center gap-1 text-sm font-semibold text-zinc-700 hover:text-black"
                                    >
                                        Edit
                                        <ChevronRight size={16} />
                                    </button>

                                </SettingRow>

                                <SettingRow
                                    icon={Lock}
                                    title="Password & Security"
                                    description="Manage your login and security"
                                >

                                    <button
                                        type="button"
                                        onClick={() =>
                                            router.push(
                                                "/dashboard/settings/security"
                                            )
                                        }
                                        className="flex items-center gap-1 text-sm font-semibold text-zinc-700 hover:text-black"
                                    >
                                        Manage
                                        <ChevronRight size={16} />
                                    </button>

                                </SettingRow>

                            </div>

                        </section>

                        {/* =========================================
                            WORKOUT PREFERENCES
                        ========================================== */}

                        <section className="mb-6">

                            <h2 className="mb-3 px-1 text-lg font-bold text-zinc-900">
                                Workout Preferences
                            </h2>

                            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">

                                <SettingRow
                                    icon={Dumbbell}
                                    title="Weight Unit"
                                    description="Choose how weights are displayed"
                                >

                                    <select
                                        value={weightUnit}
                                        onChange={(e) =>
                                            updateWeightUnit(
                                                e.target.value as WeightUnit
                                            )
                                        }
                                        className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-black"
                                    >
                                        <option value="kg">
                                            KG
                                        </option>

                                        <option value="lb">
                                            LB
                                        </option>
                                    </select>

                                </SettingRow>

                                <SettingRow
                                    icon={Timer}
                                    title="Rest Timer"
                                    description="Default rest duration between sets"
                                >

                                    <select
                                        value={restTimer}
                                        onChange={(e) =>
                                            updateRestTimer(
                                                e.target.value
                                            )
                                        }
                                        className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-black"
                                    >
                                        <option value="30">
                                            30 sec
                                        </option>

                                        <option value="60">
                                            60 sec
                                        </option>

                                        <option value="90">
                                            90 sec
                                        </option>

                                        <option value="120">
                                            120 sec
                                        </option>

                                        <option value="180">
                                            180 sec
                                        </option>
                                    </select>

                                </SettingRow>

                                <SettingRow
                                    icon={Dumbbell}
                                    title="Warm-up Sets"
                                    description="Include warm-up sets in workouts"
                                >

                                    <Toggle
                                        checked={warmupSets}
                                        onChange={
                                            updateWarmupSets
                                        }
                                    />

                                </SettingRow>

                            </div>

                        </section>

                        {/* =========================================
                            NOTIFICATIONS
                        ========================================== */}

                        <section className="mb-6">

                            <h2 className="mb-3 px-1 text-lg font-bold text-zinc-900">
                                Notifications
                            </h2>

                            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">

                                <SettingRow
                                    icon={Bell}
                                    title="Workout Reminders"
                                    description="Get reminded about your workouts"
                                >

                                    <Toggle
                                        checked={
                                            workoutReminders
                                        }
                                        onChange={
                                            updateWorkoutReminders
                                        }
                                    />

                                </SettingRow>

                                <SettingRow
                                    icon={TrendingUp}
                                    title="Progress Reminders"
                                    description="Get reminders to track your progress"
                                >

                                    <Toggle
                                        checked={
                                            progressReminders
                                        }
                                        onChange={
                                            updateProgressReminders
                                        }
                                    />

                                </SettingRow>

                            </div>

                        </section>

                        {/* =========================================
                            SUPPORT
                        ========================================== */}

                        <section className="mb-6">

                            <h2 className="mb-3 px-1 text-lg font-bold text-zinc-900">
                                Support
                            </h2>

                            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">

                                <button
                                    type="button"
                                    className="flex w-full items-center justify-between border-b border-zinc-100 px-5 py-5 text-left transition hover:bg-zinc-50"
                                >

                                    <div className="flex items-center gap-4">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700">
                                            <HelpCircle size={20} />
                                        </div>

                                        <div>

                                            <p className="font-semibold text-zinc-900">
                                                Help & FAQ
                                            </p>

                                            <p className="mt-1 text-sm text-zinc-500">
                                                Find answers to common questions
                                            </p>

                                        </div>

                                    </div>

                                    <ChevronRight
                                        size={20}
                                        className="text-zinc-400"
                                    />

                                </button>

                                <button
                                    type="button"
                                    className="flex w-full items-center justify-between px-5 py-5 text-left transition hover:bg-zinc-50"
                                >

                                    <div className="flex items-center gap-4">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700">
                                            <MessageCircle size={20} />
                                        </div>

                                        <div>

                                            <p className="font-semibold text-zinc-900">
                                                Contact Support
                                            </p>

                                            <p className="mt-1 text-sm text-zinc-500">
                                                Get help from the FitIQ team
                                            </p>

                                        </div>

                                    </div>

                                    <ChevronRight
                                        size={20}
                                        className="text-zinc-400"
                                    />

                                </button>

                            </div>

                        </section>

                        {/* =========================================
                            ACCOUNT ACTIONS
                        ========================================== */}

                        <section className="mb-10">

                            <h2 className="mb-3 px-1 text-lg font-bold text-red-600">
                                Account Actions
                            </h2>

                            <div className="overflow-hidden rounded-2xl border border-red-100 bg-white">

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-4 px-5 py-5 text-left transition hover:bg-red-50"
                                >

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                                        <LogOut size={20} />
                                    </div>

                                    <div>

                                        <p className="font-semibold text-red-600">
                                            Logout
                                        </p>

                                        <p className="mt-1 text-sm text-zinc-500">
                                            Sign out of your FitIQ account
                                        </p>

                                    </div>

                                </button>

                                <button
                                    type="button"
                                    className="flex w-full items-center gap-4 border-t border-red-100 px-5 py-5 text-left transition hover:bg-red-50"
                                >

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                                        <Trash2 size={20} />
                                    </div>

                                    <div>

                                        <p className="font-semibold text-red-600">
                                            Delete Account
                                        </p>

                                        <p className="mt-1 text-sm text-zinc-500">
                                            Permanently delete your FitIQ account
                                        </p>

                                    </div>

                                </button>

                            </div>

                        </section>

                    </div>

                </div>

            </main>

        </div>
    );
}