"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useGitaStore } from "@/store/useGitaStore";
import { Bookmark, ArrowRight, BookOpen } from "lucide-react";
import versesData from "@/data/verse.json";

export default function BookmarksPage() {
  const [mounted, setMounted] = useState(false);
  const bookmarks = useGitaStore((state) => state.bookmarks);
  const removeBookmark = useGitaStore((state) => state.removeBookmark);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Map bookmarks to their verse data
  const bookmarkedVerses = bookmarks.map((b) => {
    const verseObj = versesData.find(
      (v) => v.chapter_number === b.chapterId && v.verse_number === b.verseId,
    );
    return {
      ...b,
      verseText: verseObj?.text,
      transliteration: verseObj?.transliteration,
    };
  });

  return (
    <div className="flex flex-col gap-10 pb-24 animate-in fade-in duration-700 max-w-5xl mx-auto w-full">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-[#222] bg-zinc-50 dark:bg-gradient-to-br dark:from-[#1b1229] dark:to-[#0A0A0A] p-10 md:p-14 mb-4 shadow-sm dark:shadow-none">
        <div className="flex items-center gap-4 mb-4">
          <Bookmark className="w-10 h-10 text-[#A87FFB]" />
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-black dark:text-white">
            Saved Verses
          </h1>
        </div>
        <p className="text-lg text-zinc-600 dark:text-zinc-300">
          Your personal collection of significant shlokas from the Bhagavad
          Gita.
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-16 text-center text-zinc-500 border border-zinc-200 dark:border-[#222] rounded-xl bg-zinc-50 dark:bg-[#121212]">
          <BookOpen className="w-16 h-16 mb-6 opacity-30" />
          <p className="text-2xl font-serif text-black dark:text-white mb-2">
            No bookmarks yet
          </p>
          <p className="text-lg mb-8 max-w-md">
            As you read through the chapters, tap the bookmark icon to save
            verses that resonate with you for easy access later.
          </p>
          <Link
            href="/chapters"
            className="bg-[#A87FFB] hover:bg-[#9265f0] text-white px-8 py-3 rounded-full font-bold transition-colors"
          >
            Start Reading
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="text-lg font-medium text-zinc-500 mb-2">
            You have {bookmarks.length} saved{" "}
            {bookmarks.length === 1 ? "verse" : "verses"}.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookmarkedVerses.map((verse, idx) => (
              <div
                key={`bookmark-${verse.chapterId}-${verse.verseId}-${idx}`}
                className="relative group p-6 rounded-xl border border-zinc-200 dark:border-[#222] bg-white dark:bg-[#121212] hover:-translate-y-1 transition-transform flex flex-col justify-between shadow-sm dark:shadow-none"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[#A87FFB] font-bold text-sm uppercase tracking-widest bg-[#A87FFB]/10 px-3 py-1 rounded">
                      Ch {verse.chapterId} • V {verse.verseId}
                    </span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeBookmark(verse.chapterId, verse.verseId);
                      }}
                      className="text-zinc-400 hover:text-red-500 transition-colors p-2 z-10"
                      title="Remove Bookmark"
                    >
                      <Bookmark className="w-5 h-5 fill-current" />
                    </button>
                  </div>

                  <p className="font-serif text-xl text-black dark:text-white leading-relaxed mb-4 line-clamp-3">
                    {verse.transliteration || "Transliteration not available"}
                  </p>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm opacity-80 group-hover:opacity-100 transition-opacity whitespace-pre-line line-clamp-2">
                    {verse.verseText || ""}
                  </p>
                </div>

                <Link
                  href={`/chapters/${verse.chapterId}/verse/${verse.verseId}`}
                  className="mt-6 flex items-center gap-2 text-sm font-bold text-black dark:text-white transition-colors group-hover:text-[#A87FFB]"
                >
                  Read full verse <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
