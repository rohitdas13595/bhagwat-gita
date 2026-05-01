"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Search, Settings } from "lucide-react";
import { cn } from "@/utils/cn";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Chapters", href: "/chapters", icon: BookOpen },
  { name: "Search", href: "/search", icon: Search },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="flex md:hidden items-center justify-around bg-white/90 dark:bg-[#0A0A0A]/90 backdrop-blur-md border-t border-zinc-200 dark:border-[#222] pb-safe pt-2 px-2 text-xs">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href === "/chapters" && pathname.startsWith("/chapters"));
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors",
              isActive
                ? "text-[#A87FFB]"
                : "text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white",
            )}
          >
            <item.icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
            <span className="font-medium">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
