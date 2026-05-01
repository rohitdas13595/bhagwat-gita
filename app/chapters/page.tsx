import { ArrowRight, BookOpen, Eye, ListVideo } from "lucide-react";
import Link from "next/link";
import chaptersData from "@/data/chapters.json";

export default function ChaptersPage() {
  return (
    <div className="flex flex-col gap-10 pb-24 animate-in fade-in duration-700">
      {/* Header */}
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">
          The Eighteen Chapters
        </h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          A comprehensive index of the sacred dialogue between Sri Krishna and
          Arjuna, categorized by the three pillars of Yoga: Karma, Bhakti, and
          Jnana.
        </p>
      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chaptersData.map((chapter) => {
          // Special Featured Full-width Card for Chapter 11
          if (chapter.chapter_number === 11) {
            return (
              <div
                key={chapter.id}
                className="lg:col-span-2 relative overflow-hidden rounded-2xl border border-[#222] bg-gradient-to-br from-[#1b1229] to-[#0A0A0A] p-8 md:p-10 group"
              >
                <div className="absolute inset-0 bg-[url('/flower.png')] opacity-10 bg-cover bg-center mix-blend-screen transition-opacity duration-700 group-hover:opacity-20" />

                <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-[#2ECC71] bg-[#2ECC71]/10 px-3 py-1 rounded uppercase tracking-widest">
                      FEATURED: CHAPTER {chapter.chapter_number}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-semibold tracking-wider uppercase">
                      <ListVideo className="w-4 h-4" /> {chapter.verses_count}{" "}
                      Verses
                    </div>
                  </div>

                  <div>
                    <h2 className="text-3xl lg:text-4xl font-bold font-serif mb-3 text-white">
                      {chapter.name_translation}
                    </h2>
                    <p className="text-zinc-300 text-lg mb-8 max-w-xl">
                      Arjuna beholds the Universal Form of Sri Krishna,
                      encompassing all universes, beings, and times in a single
                      cosmic revelation.
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Link
                      href={`/chapters/${chapter.chapter_number}`}
                      className="flex items-center gap-2 px-6 py-3 font-semibold text-black bg-[#A87FFB] hover:bg-[#b592fb] rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" /> Explore Universal Form
                    </Link>
                  </div>
                </div>
              </div>
            );
          }

          // Regular Chapter Cards
          return (
            <Link
              key={chapter.id}
              href={`/chapters/${chapter.chapter_number}`}
              className="group flex flex-col justify-between p-7 rounded-2xl border border-[#222] bg-[#121212] hover:bg-zinc-900 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-900/10"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-xs font-bold text-[#A87FFB] bg-[#A87FFB]/10 px-3 py-1 rounded uppercase tracking-widest">
                    CHAPTER{" "}
                    {chapter.chapter_number < 10
                      ? `0${chapter.chapter_number}`
                      : chapter.chapter_number}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-semibold tracking-wider uppercase">
                    <BookOpen className="w-4 h-4" /> {chapter.verses_count}{" "}
                    Verses
                  </div>
                </div>

                <h2 className="text-2xl font-bold font-serif mb-2 text-zinc-100 group-hover:text-white transition-colors">
                  {chapter.name_translation}
                </h2>
                <p className="text-sm font-serif italic text-zinc-400 group-hover:text-zinc-300 transition-colors">
                  {chapter.name_meaning}
                </p>
              </div>

              <div className="mt-12 flex items-center justify-between border-t border-zinc-800/50 pt-5">
                <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold group-hover:text-zinc-400 transition-colors">
                  {getChapterCategory(chapter.chapter_number)}
                </span>
                <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-[#A87FFB] transition-colors" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <button className="px-8 py-3 rounded-full border border-[#222] bg-[#0A0A0A] hover:bg-zinc-900 text-sm font-semibold transition-colors">
          View All 18 Chapters
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-[#222] flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
        <div className="flex gap-8">
          <Link href="#" className="hover:text-zinc-300 transition-colors">
            Privacy
          </Link>
          <Link href="#" className="hover:text-zinc-300 transition-colors">
            Documentation
          </Link>
          <Link href="#" className="hover:text-zinc-300 transition-colors">
            API
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <span>Obsidian Gita © 2024</span>
          <span className="w-2 h-2 rounded-full bg-[#2ECC71]"></span>
          <span className="text-[#2ECC71]">Synchronized V2.4.0</span>
        </div>
      </footer>
    </div>
  );
}

function getChapterCategory(chapterNumber: number) {
  if (chapterNumber >= 1 && chapterNumber <= 6) return "Karma Yoga";
  if (chapterNumber >= 7 && chapterNumber <= 12) return "Bhakti Yoga";
  return "Jnana Yoga";
}
