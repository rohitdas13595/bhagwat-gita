"use client";

import { use, useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Share2,
  Copy,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import chaptersData from "@/data/chapters.json";
import versesData from "@/data/verse.json";
import translationData from "@/data/translation.json";
import commentaryData from "@/data/commentary.json";
import { useGitaStore } from "@/store/useGitaStore";

export default function VerseDetailsPage({
  params,
}: {
  params: Promise<{ chapterId: string; verseId: string }>;
}) {
  const { chapterId, verseId } = use(params);
  const chapterIdNum = parseInt(chapterId);
  const verseIdNum = parseInt(verseId);

  const bookmarks = useGitaStore((state) => state.bookmarks);
  const addBookmark = useGitaStore((state) => state.addBookmark);
  const removeBookmark = useGitaStore((state) => state.removeBookmark);
  const setProgress = useGitaStore((state) => state.setProgress);

  // Audio Player State
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    // Save progress automatically when user views this verse page
    setProgress(chapterIdNum, verseIdNum);
    // Reset audio state safely
    setIsPlaying(false);
    setCurrentTime(0);
  }, [chapterIdNum, verseIdNum, setProgress]);

  const chapter = chaptersData.find((c) => c.chapter_number === chapterIdNum);
  const verse = versesData.find(
    (v) => v.chapter_number === chapterIdNum && v.verse_number === verseIdNum,
  );

  if (!chapter || !verse) {
    return <div className="text-black dark:text-white">Verse not found</div>;
  }

  const translations = (translationData as any[]).filter(
    (t) => t.verse_id === verse.id && t.lang === "english",
  );
  const defaultTranslation =
    translations[0]?.description || "Translation not available.";

  const commentaries = (commentaryData as any[]).filter(
    (c) => c.verse_id === verse.id && c.lang === "english",
  );
  const defaultCommentary =
    commentaries[0]?.description || "Commentary not available.";

  // Navigation Logic
  const prevVerse = verseIdNum > 1 ? verseIdNum - 1 : null;
  const nextVerse = verseIdNum < chapter.verses_count ? verseIdNum + 1 : null;

  const bookmarked = bookmarks.some(
    (b) => b.chapterId === chapterIdNum && b.verseId === verseIdNum,
  );
  const handleBookmarkToggle = () => {
    if (bookmarked) {
      removeBookmark(chapterIdNum, verseIdNum);
    } else {
      addBookmark(chapterIdNum, verseIdNum);
    }
  };

  // Audio Helper Functions
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Fallback to text to speech
          const utterance = new SpeechSynthesisUtterance(verse.text);
          utterance.lang = "hi-IN"; // Hindi/Sanskrit
          window.speechSynthesis.speak(utterance);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div className="flex flex-col gap-12 pb-24 animate-in fade-in duration-700 max-w-5xl mx-auto w-full">
      {/* Top Header / Breadcrumb */}
      <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 font-medium text-sm md:text-base">
        <div className="flex items-center gap-1 md:gap-2">
          <Link
            href="/chapters"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            Chapters
          </Link>
          <span>/</span>
          <Link
            href={`/chapters/${chapterIdNum}`}
            className="hover:text-black dark:hover:text-white transition-colors whitespace-nowrap"
          >
            Chapter {chapterIdNum}
          </Link>
          <span>/</span>
          <span className="text-[#A87FFB] whitespace-nowrap">
            Verse {verseIdNum}
          </span>
        </div>
        <div className="text-xs md:text-sm whitespace-nowrap pl-2">
          {verseIdNum} of {chapter.verses_count} Verses
        </div>
      </div>

      {/* Main Verse Section */}
      <div className="flex flex-col items-center text-center gap-8 bg-white dark:bg-gradient-to-b dark:from-[#1b1229] dark:to-[#0A0A0A] p-6 md:p-14 rounded-3xl border border-zinc-200 dark:border-[#222] shadow-sm dark:shadow-none">
        {/* Content */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl text-[#A87FFB] dark:text-[#A0C0FF] font-serif leading-tight whitespace-pre-line drop-shadow-sm dark:drop-shadow-lg p-2">
          {verse.text}
        </h1>
        <p className="text-lg md:text-2xl text-zinc-600 dark:text-zinc-400 font-serif leading-relaxed whitespace-pre-line max-w-3xl mb-4">
          {verse.transliteration}
        </p>

        {/* Feature Rich Audio Player Integration */}
        <div className="flex flex-col w-full max-w-xl mx-auto">
          {/* Audio Engine */}
          <audio
            ref={audioRef}
            src={`/verse_recitation/${chapterIdNum}/${verseIdNum}.mp3`}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
          />

          <div className="bg-zinc-100 dark:bg-[#121212] border border-zinc-200 dark:border-[#333] rounded-3xl p-6 shadow-sm flex flex-col gap-5 relative overflow-hidden">
            {/* Progress Bar */}
            <div className="flex items-center gap-4 w-full">
              <span className="text-xs font-bold text-zinc-500 w-10 text-right select-none">
                {formatTime(currentTime)}
              </span>
              <div
                onClick={handleProgressBarClick}
                className="flex-1 h-2.5 bg-zinc-300 dark:bg-[#2A2A2A] rounded-full overflow-hidden cursor-pointer relative"
              >
                <div
                  className="absolute top-0 left-0 h-full bg-[#A87FFB] transition-all duration-75 ease-linear pointer-events-none"
                  style={{
                    width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                  }}
                />
              </div>
              <span className="text-xs font-bold text-zinc-500 w-10 text-left select-none">
                {formatTime(duration)}
              </span>
            </div>

            {/* Media Controls */}
            <div className="flex items-center justify-center gap-8">
              {prevVerse ? (
                <Link
                  href={`/chapters/${chapterIdNum}/verse/${prevVerse}`}
                  className="text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                  title="Previous Verse"
                >
                  <SkipBack className="w-8 h-8 fill-current" />
                </Link>
              ) : (
                <div className="w-8 h-8 opacity-20">
                  <SkipBack className="w-8 h-8 fill-current" />
                </div>
              )}

              <button
                onClick={togglePlay}
                className="w-16 h-16 rounded-full bg-[#A87FFB] hover:bg-[#9265f0] shadow-lg shadow-[#A87FFB]/20 flex items-center justify-center text-white transition-transform hover:scale-105 active:scale-95"
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 fill-current" />
                ) : (
                  <Play className="w-7 h-7 fill-current ml-1" />
                )}
              </button>

              {nextVerse ? (
                <Link
                  href={`/chapters/${chapterIdNum}/verse/${nextVerse}`}
                  className="text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                  title="Next Verse"
                >
                  <SkipForward className="w-8 h-8 fill-current" />
                </Link>
              ) : (
                <div className="w-8 h-8 opacity-20">
                  <SkipForward className="w-8 h-8 fill-current" />
                </div>
              )}
            </div>
          </div>

          {/* Sub-Actions (Bookmark, Share, Copy) */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={handleBookmarkToggle}
              className={`flex items-center justify-center w-12 h-12 rounded-full border transition-colors ${
                bookmarked
                  ? "border-[#A87FFB] bg-[#A87FFB]/10 text-[#A87FFB] hover:border-[#9265f0]"
                  : "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-[#121212] hover:border-zinc-400 dark:hover:border-zinc-500 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white shadow-sm"
              }`}
              title="Bookmark"
            >
              {bookmarked ? (
                <BookmarkCheck className="w-5 h-5" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={async () => {
                if (navigator.share) {
                  try {
                    await navigator.share({
                      title: `Bhagavad Gita ${chapterIdNum}.${verseIdNum}`,
                      text: `${verse.text}\n\n- Bhagavad Gita ${chapterIdNum}.${verseIdNum}`,
                      url: window.location.href,
                    });
                  } catch (err) {}
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied!");
                }
              }}
              className="flex items-center justify-center w-12 h-12 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-[#121212] hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white shadow-sm"
              title="Share"
            >
              <Share2 className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `${verse.text}\n\n${verse.transliteration}\n\n- Bhagavad Gita ${chapterIdNum}.${verseIdNum}`,
                );
                alert("Verse copied to clipboard!");
              }}
              className="flex items-center justify-center w-12 h-12 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-[#121212] hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white shadow-sm"
              title="Copy"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Word Meaning */}
      {verse.word_meanings && (
        <div className="bg-white dark:bg-[#121212] border border-zinc-200 dark:border-[#222] rounded-2xl p-6 md:p-8 shadow-sm dark:shadow-none">
          <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-6">
            Word Meanings
          </h3>
          <p className="text-base md:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-serif">
            {verse.word_meanings}
          </p>
        </div>
      )}

      {/* Translation & Navigation Bar */}
      <div className="relative bg-white dark:bg-[#121212] border border-zinc-200 dark:border-[#222] rounded-2xl overflow-hidden shadow-sm dark:shadow-none">
        {/* Navigation Bar inside the block */}
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-[#222] bg-zinc-50 dark:bg-[#0A0A0A] p-4 text-xs md:text-sm font-bold tracking-widest uppercase text-zinc-500 dark:text-zinc-400">
          <div className="flex-1">
            {prevVerse ? (
              <Link
                href={`/chapters/${chapterIdNum}/verse/${prevVerse}`}
                className="flex items-center gap-1 md:gap-2 hover:text-black dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />{" "}
                <span className="hidden sm:inline">Verse</span> {prevVerse}
              </Link>
            ) : (
              <div />
            )}
          </div>

          <div className="flex-1 text-center text-black dark:text-white">
            {chapterIdNum}.{verseIdNum}
          </div>

          <div className="flex-1 flex justify-end">
            {nextVerse ? (
              <Link
                href={`/chapters/${chapterIdNum}/verse/${nextVerse}`}
                className="flex items-center gap-1 md:gap-2 hover:text-black dark:hover:text-white transition-colors"
              >
                <span className="hidden sm:inline">Verse</span> {nextVerse}{" "}
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>

        <div className="p-6 md:p-12">
          <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-6">
            Translation
          </h3>
          <p className="text-xl md:text-2xl text-black dark:text-white font-serif leading-relaxed">
            {defaultTranslation}
          </p>
        </div>
      </div>

      {/* Meaning / Purport */}
      <div className="bg-white dark:bg-[#121212] border border-zinc-200 dark:border-[#222] rounded-2xl p-6 md:p-12 shadow-sm dark:shadow-none">
        <h3 className="text-sm font-bold text-[#A87FFB] uppercase tracking-widest mb-6">
          Purport / Commentary
        </h3>
        <div className="prose prose-zinc dark:prose-invert prose-lg font-serif text-zinc-700 dark:text-zinc-300 max-w-none">
          <p className="whitespace-pre-line leading-loose">
            {defaultCommentary}
          </p>
        </div>
      </div>

      {/* Bottom Navigation for Mobile / Extra Convenience */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 border-t border-zinc-200 dark:border-[#222] pt-8">
        {prevVerse ? (
          <Link
            href={`/chapters/${chapterIdNum}/verse/${prevVerse}`}
            className="flex items-center gap-3 px-6 py-3 rounded-full border border-zinc-200 dark:border-[#222] hover:bg-zinc-100 dark:hover:bg-white text-black dark:text-white dark:hover:text-black transition-all font-bold w-full sm:w-auto justify-center"
          >
            <ArrowLeft className="w-5 h-5" /> Previous Verse
          </Link>
        ) : (
          <div className="w-full sm:w-auto" />
        )}

        {nextVerse ? (
          <Link
            href={`/chapters/${chapterIdNum}/verse/${nextVerse}`}
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all font-bold shadow-lg w-full sm:w-auto justify-center"
          >
            Next Verse <ArrowRight className="w-5 h-5" />
          </Link>
        ) : (
          <div className="w-full sm:w-auto" />
        )}
      </div>
    </div>
  );
}
