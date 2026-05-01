"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function TopBar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="h-20 w-full md:w-auto flex items-center justify-between px-6 md:px-10 border-b border-zinc-200 dark:border-[#222] bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-md fixed top-0 left-0 right-0 md:static z-40 text-black dark:text-white font-serif">
      <div className="text-xl font-bold tracking-tight">Obsidian Gita</div>

      <div className="flex items-center gap-6">
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors p-2"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </header>
  );
}
