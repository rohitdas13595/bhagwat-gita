"use client";

import {
  ArrowRight,
  Bookmark,
  Clock,
  Activity,
  Loader2,
  Sparkles,
  Infinity,
  Quote,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 pb-12 animate-in fade-in duration-700">
      {/* Verse of the Day Card */}
      <section className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-[#222] bg-white dark:bg-gradient-to-br dark:from-[#121212] dark:to-[#1a1a1a] p-10 md:p-14 shadow-xl dark:shadow-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 md:opacity-50 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent absolute" />
          {/* We'll use a placeholder for the lotus image as I don't have the exact image */}
          <Image
            src={"/flower.png"}
            height={400}
            width={600}
            alt="Bhagwat gita"
            className="absolute right-0 top-1/2 -translate-y-1/2 text-[200px] text-zinc-800/10 rotate-12 select-none"
          />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-wider text-[#A87FFB] bg-[#A87FFB]/10 rounded-full">
            VERSE OF THE DAY
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 drop-shadow-md">
            Chapter 2, Verse 47
          </h2>
          <p className="text-2xl md:text-3xl italic font-serif text-zinc-700 dark:text-zinc-300 mb-8 leading-relaxed">
            &quot;karmaṇy-evādhikāras te mā phaleṣhu kadāchana...&quot;
          </p>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed max-w-xl">
            You have a right to perform your prescribed duties, but you are not
            entitled to the fruits of your actions. Never consider yourself to
            be the cause of the results of your activities, nor be attached to
            inaction.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/chapters/2/verse/47"
              className="flex items-center gap-2 px-6 py-3 font-semibold text-black bg-[#A87FFB] hover:bg-[#b592fb] rounded-lg transition-colors shadow-[0_0_20px_rgba(168,127,251,0.3)] hover:shadow-[0_0_30px_rgba(168,127,251,0.5)]"
            >
              Explore Chapter <ArrowRight className="w-4 h-4" />
            </Link>
            {/* <button className="flex items-center gap-2 px-6 py-3 font-semibold text-white border border-zinc-700 bg-black/40 hover:bg-zinc-800 rounded-lg transition-colors">
              <Bookmark className="w-4 h-4" /> Save Verse
            </button> */}
          </div>
        </div>
      </section>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Significance */}
        <section className="lg:col-span-2 rounded-2xl border border-zinc-200 dark:border-[#222] bg-white dark:bg-[#121212] p-8 md:p-10 flex flex-col justify-between shadow-sm dark:shadow-none">
          <div>
            <div className="flex items-center gap-2 text-[#2ECC71] mb-6 text-sm font-bold tracking-widest uppercase">
              <Sparkles className="w-4 h-4" /> Significance
            </div>
            <h3 className="text-3xl font-bold font-serif mb-6 text-black dark:text-white">
              The Manual of Life
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-10">
              The Bhagavad Gita is not just a spiritual text; it is a profound
              psychological and philosophical discourse delivered on the edge of
              a battlefield. It addresses the universal human experience of
              doubt, duty, and the nature of existence with mathematical
              precision and timeless clarity.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "CHAPTERS", value: "18" },
              { label: "VERSES", value: "700" },
              { label: "YEARS OLD", value: "5K+" },
              {
                label: "WISDOM",
                value: <Infinity className="w-8 h-8 text-[#A87FFB]" />,
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex flex-col items-center justify-center text-center hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <div className="text-3xl font-bold mb-2 text-black dark:text-white">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Continue Reading */}
        <section className="rounded-2xl border border-zinc-200 dark:border-[#222] bg-white dark:bg-[#121212] p-8 md:p-10 flex flex-col justify-between shadow-sm dark:shadow-none">
          <div>
            <h3 className="text-2xl font-bold font-serif mb-6 text-black dark:text-white">
              Continue Reading
            </h3>
            <div className="flex flex-col gap-4">
              {/* Reading Card 1 */}
              <Link
                href="/chapters/4/verse/12"
                className="block p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-[#A87FFB] px-2 py-1 bg-[#A87FFB]/10 rounded uppercase">
                    Ch 4.12
                  </span>
                  <Clock className="w-4 h-4 text-zinc-400 dark:text-zinc-500 group-hover:text-black dark:group-hover:text-zinc-300 transition-colors" />
                </div>
                <h4 className="font-semibold text-lg mb-1 text-black dark:text-white">
                  The Path of Knowledge
                </h4>
                <p className="text-sm text-zinc-500">Read 2 days ago</p>
              </Link>

              {/* Reading Card 2 */}
              <Link
                href="/chapters/1/verse/1"
                className="block p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-[#A87FFB] px-2 py-1 bg-[#A87FFB]/10 rounded uppercase">
                    Ch 1.1
                  </span>
                  <Activity className="w-4 h-4 text-zinc-400 dark:text-zinc-500 group-hover:text-black dark:group-hover:text-zinc-300 transition-colors" />
                </div>
                <h4 className="font-semibold text-lg mb-1 text-black dark:text-white">
                  The Yoga of Dejection
                </h4>
                <p className="text-sm text-zinc-500">
                  Start from the beginning
                </p>
              </Link>
            </div>
          </div>

          <Link
            href="/history"
            className="mt-8 flex items-center justify-center gap-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors py-4"
          >
            View Reading History <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>

      {/* Wisdom Tags */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold font-serif text-black dark:text-white">
            WISDOM TAGS
          </h3>
          <Link
            href="/search"
            className="text-sm font-semibold text-[#A87FFB] hover:text-[#b592fb] transition-colors"
          >
            Browse all topics
          </Link>
        </div>
        <div className="flex flex-wrap gap-3">
          {[
            "Karma",
            "Dharma",
            "Meditation",
            "Bhakti Yoga",
            "Self-Realization",
            "Duty",
            "Mind Control",
          ].map((tag) => (
            <Link
              key={tag}
              href={`/search?q=${tag}`}
              className="px-5 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121212] text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white transition-colors shadow-sm dark:shadow-none"
            >
              {tag}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
