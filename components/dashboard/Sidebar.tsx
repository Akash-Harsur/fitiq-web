import Image from "next/image";
import Link from "next/link";
import {
  Home,
  Dumbbell,
  Apple,
  ChartColumn,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
  },
  {
    title: "Workouts",
    icon: Dumbbell,
  },
  {
    title: "Nutrition",
    icon: Apple,
  },
  {
    title: "Progress",
    icon: ChartColumn,
  },
  {
    title: "Profile",
    icon: User,
  },
  {
    title: "Settings",
    icon: Settings,
  },
];
``
export default function Sidebar() {
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
          className="rounded-xl cursor-pointer"
          priority
        />
      </Link>

      {/* Navigation */}
      <nav className="mt-12 flex-1">
        <ul className="space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.title}>
                <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition hover:bg-gray-100">
                  <Icon size={20} />

                  <span className="font-medium">
                    {item.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <button className="flex items-center gap-3 rounded-xl px-4 py-3 text-red-500 transition hover:bg-red-50">
        <LogOut size={20} />

        <span className="font-medium">
          Logout
        </span>
      </button>
    </aside>
  );
}