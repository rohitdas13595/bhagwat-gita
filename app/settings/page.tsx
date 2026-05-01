"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useGitaStore } from "@/store/useGitaStore";
import { Trash2, Moon, Sun, Monitor } from "lucide-react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const clearProgress = useGitaStore((state) => state.clearProgress);
  const clearBookmarks = useGitaStore((state) => state.clearBookmarks);
  const progress = useGitaStore((state) => state.progress);
  const bookmarks = useGitaStore((state) => state.bookmarks);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleClearProgress = () => {
    if (confirm("Are you sure you want to clear your reading progress?")) {
      clearProgress();
    }
  };

  const handleClearBookmarks = () => {
    if (confirm("Are you sure you want to clear all your bookmarks?")) {
      clearBookmarks();
    }
  };

  return (
    <div className="flex flex-col gap-10 pb-24 animate-in fade-in duration-700 max-w-4xl w-full mx-auto">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-[#222] bg-white dark:bg-gradient-to-br dark:from-[#1b1229] dark:to-[#0A0A0A] p-10 md:p-14 mb-4 shadow-sm dark:shadow-none">
        <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4 text-black dark:text-white">
          Settings
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-300">
          Manage your application preferences, reading progress, and saved
          verses here.
        </p>
      </div>

      <div className="flex flex-col gap-12">
        {/* Appearance Settings */}
        <div>
          <h2 className="text-2xl font-bold font-serif mb-6 text-black dark:text-white flex items-center gap-2 border-b border-zinc-200 dark:border-[#222] pb-4">
            Appearance
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => setTheme("light")}
              className={`flex flex-col items-center justify-center p-6 border rounded-xl gap-4 transition-all ${
                theme === "light"
                  ? "border-[#A87FFB] bg-[#A87FFB]/10 text-[#A87FFB]"
                  : "border-zinc-200 dark:border-[#222] bg-white dark:bg-[#121212] text-zinc-500 hover:border-[#A87FFB]/50"
              }`}
            >
              <Sun className="w-8 h-8" />
              <span className="font-bold">Light Mode</span>
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`flex flex-col items-center justify-center p-6 border rounded-xl gap-4 transition-all ${
                theme === "dark"
                  ? "border-[#A87FFB] bg-[#A87FFB]/10 text-[#A87FFB]"
                  : "border-zinc-200 dark:border-[#222] bg-white dark:bg-[#121212] text-zinc-500 hover:border-[#A87FFB]/50"
              }`}
            >
              <Moon className="w-8 h-8" />
              <span className="font-bold">Dark Mode</span>
            </button>
            <button
              onClick={() => setTheme("system")}
              className={`flex flex-col items-center justify-center p-6 border rounded-xl gap-4 transition-all ${
                theme === "system"
                  ? "border-[#A87FFB] bg-[#A87FFB]/10 text-[#A87FFB]"
                  : "border-zinc-200 dark:border-[#222] bg-white dark:bg-[#121212] text-zinc-500 hover:border-[#A87FFB]/50"
              }`}
            >
              <Monitor className="w-8 h-8" />
              <span className="font-bold">System Default</span>
            </button>
          </div>
        </div>

        {/* Data Settings */}
        <div>
          <h2 className="text-2xl font-bold font-serif mb-6 text-black dark:text-white flex items-center gap-2 border-b border-zinc-200 dark:border-[#222] pb-4">
            Data Management
          </h2>

          <div className="flex flex-col gap-4">
            <div className="p-6 border border-zinc-200 dark:border-[#222] bg-white dark:bg-[#121212] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm dark:shadow-none">
              <div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-1">
                  Clear Reading Progress
                </h3>
                <p className="text-zinc-500 text-sm">
                  {progress
                    ? `Currently last read: Chapter ${progress.chapterId}, Verse ${progress.verseId}.`
                    : "No reading progress saved yet."}
                </p>
              </div>
              <button
                onClick={handleClearProgress}
                disabled={!progress}
                className="flex items-center gap-2 px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold rounded-lg transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 className="w-4 h-4" /> Clear Progress
              </button>
            </div>

            <div className="p-6 border border-zinc-200 dark:border-[#222] bg-white dark:bg-[#121212] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm dark:shadow-none">
              <div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-1">
                  Clear Bookmarks
                </h3>
                <p className="text-zinc-500 text-sm">
                  You currently have {bookmarks.length} saved bookmarks.
                </p>
              </div>
              <button
                onClick={handleClearBookmarks}
                disabled={bookmarks.length === 0}
                className="flex items-center gap-2 px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold rounded-lg transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 className="w-4 h-4" /> Clear Bookmarks
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
