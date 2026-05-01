"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  Bookmark,
  Search,
  Settings,
  Sparkles,
} from "lucide-react";
import { cn } from "@/utils/cn";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Chapters", href: "/chapters", icon: BookOpen },
  { name: "Bookmarks", href: "/bookmarks", icon: Bookmark },
  { name: "Search", href: "/search", icon: Search },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[280px] h-screen bg-zinc-50 dark:bg-[#0A0A0A] border-r border-zinc-200 dark:border-[#222] flex flex-col justify-between fixed left-0 top-0 text-black dark:text-white font-sans transition-colors duration-300">
      <div className="flex flex-col">
        {/* Logo */}
        <div className="p-8 flex items-center gap-4">
          <div className="w-10 h-10 bg-[#A87FFB] rounded-md flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Bhagavad Gita</h1>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold mt-1">
              Precision in Wisdom
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-8 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href === "/chapters" && pathname.startsWith("/chapters"));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 px-8 py-3 text-sm font-medium transition-colors border-l-2",
                  isActive
                    ? "text-[#A87FFB] border-[#A87FFB] bg-gradient-to-r from-[rgba(168,127,251,0.1)] to-transparent"
                    : "text-zinc-500 dark:text-zinc-400 border-transparent hover:text-black dark:hover:text-zinc-200 hover:bg-black/5 dark:hover:bg-zinc-900/50",
                )}
              >
                <item.icon
                  className="w-5 h-5"
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Settings */}
      <div className="pb-8">
        <Link
          href="/settings"
          className="flex items-center gap-4 px-8 py-3 text-sm font-medium text-zinc-500 dark:text-zinc-400 border-l-2 border-transparent hover:text-black dark:hover:text-zinc-200 hover:bg-black/5 dark:hover:bg-zinc-900/50 transition-colors"
        >
          <Settings className="w-5 h-5" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
