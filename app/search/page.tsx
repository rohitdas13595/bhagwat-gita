import Link from "next/link";
import { Search as SearchIcon, BookOpen, Quote } from "lucide-react";
import chaptersData from "@/data/chapters.json";
import versesData from "@/data/verse.json";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.toLowerCase() || "";

  // 1. Search through Chapters
  const matchedChapters = query
    ? chaptersData.filter(
        (c) =>
          c.name_translation.toLowerCase().includes(query) ||
          c.chapter_summary.toLowerCase().includes(query) ||
          c.name_meaning.toLowerCase().includes(query),
      )
    : [];

  // 2. Search through Verses
  // Limiting verse results to 50 for performance and UI sanity
  const matchedVerses = query
    ? versesData
        .filter(
          (v) =>
            v.text?.toLowerCase().includes(query) ||
            v.transliteration?.toLowerCase().includes(query) ||
            v.word_meanings?.toLowerCase().includes(query),
        )
        .slice(0, 50)
    : [];

  return (
    <div className="flex flex-col gap-10 pb-24 animate-in fade-in duration-700 max-w-5xl mx-auto w-full">
      {/* Search Header Form */}
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-[#222] bg-white dark:bg-gradient-to-br dark:from-[#1b1229] dark:to-[#0A0A0A] p-10 md:p-14 shadow-lg dark:shadow-none">
        <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6 text-black dark:text-white text-center">
          Search the Gita
        </h1>
        <form
          className="relative max-w-2xl mx-auto"
          action="/search"
          method="GET"
        >
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <SearchIcon className="w-6 h-6 text-zinc-500" />
          </div>
          <input
            type="text"
            name="q"
            defaultValue={q || ""}
            className="w-full bg-zinc-50 dark:bg-[#121212] border border-zinc-300 dark:border-[#333] text-black dark:text-white text-lg rounded-full focus:ring-[#A87FFB] focus:border-[#A87FFB] block pl-12 pr-4 py-4 shadow-xl transition-all outline-none"
            placeholder="Search for Karma, Yoga, Dharma, Arjuna..."
            required
          />
          <button
            type="submit"
            className="absolute right-2 top-2 bottom-2 bg-[#A87FFB] hover:bg-[#9265f0] text-white font-bold rounded-full px-6 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {!query ? (
        <div className="flex flex-col items-center justify-center py-20 text-center text-zinc-500">
          <SearchIcon className="w-16 h-16 mb-4 opacity-50" />
          <p className="text-xl font-serif">
            Enter a term to search the Bhagavad Gita
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-12">
          {/* Results Summary */}
          <div className="text-xl text-zinc-700 dark:text-zinc-300 font-serif border-b border-zinc-200 dark:border-[#222] pb-4">
            Found{" "}
            <span className="text-[#A87FFB] font-bold">
              {matchedChapters.length}
            </span>{" "}
            chapters and{" "}
            <span className="text-[#A87FFB] font-bold">
              {matchedVerses.length}
            </span>{" "}
            verses matching "{q}"
          </div>

          {/* Chapters Results */}
          {matchedChapters.length > 0 && (
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-bold font-serif flex items-center gap-2 text-black dark:text-white">
                <BookOpen className="text-[#A87FFB]" /> Chapters
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matchedChapters.map((chapter) => (
                  <Link
                    key={`chapter-${chapter.id}`}
                    href={`/chapters/${chapter.chapter_number}`}
                    className="p-6 rounded-xl border border-zinc-200 dark:border-[#222] bg-white dark:bg-[#121212] hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all hover:-translate-y-1 group shadow-sm dark:shadow-none"
                  >
                    <div className="text-[#A87FFB] font-bold text-sm mb-2 uppercase tracking-widest">
                      Chapter {chapter.chapter_number}
                    </div>
                    <h3 className="text-xl font-serif text-black dark:text-white mb-2 group-hover:text-[#A87FFB] transition-colors">
                      {chapter.name_translation}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-3 leading-relaxed">
                      {chapter.chapter_summary}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Verses Results */}
          {matchedVerses.length > 0 && (
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-bold font-serif flex items-center gap-2 text-black dark:text-white">
                <Quote className="text-[#A87FFB]" /> Verses
              </h2>
              <div className="flex flex-col gap-4">
                {matchedVerses.map((verse) => (
                  <Link
                    key={`verse-${verse.id}`}
                    href={`/chapters/${verse.chapter_number}/verse/${verse.verse_number}`}
                    className="flex flex-col md:flex-row items-start gap-4 p-6 rounded-xl border border-zinc-200 dark:border-[#222] bg-white dark:bg-[#121212] hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all hover:-translate-y-1 group shadow-sm dark:shadow-none"
                  >
                    <div className="text-white dark:text-black bg-black dark:bg-white rounded flex items-center justify-center font-bold px-3 py-1 text-sm whitespace-nowrap">
                      {verse.chapter_number}.{verse.verse_number}
                    </div>
                    <div className="flex-1">
                      <p className="font-serif text-lg text-black dark:text-white mb-2 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
                        {verse.transliteration}
                      </p>
                      <p className="text-zinc-500 text-sm whitespace-pre-line line-clamp-2">
                        {verse.word_meanings}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {matchedChapters.length === 0 && matchedVerses.length === 0 && (
            <div className="text-center text-zinc-500 py-10 bg-zinc-50 dark:bg-[#121212] border border-zinc-200 dark:border-[#222] rounded-xl shadow-sm dark:shadow-none">
              No results found for your search. Try adjusting the keywords.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
