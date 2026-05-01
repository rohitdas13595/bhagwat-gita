import Link from "next/link";
import { ArrowLeft, ArrowRight, PlayCircle } from "lucide-react";
import chaptersData from "@/data/chapters.json";
import versesData from "@/data/verse.json";

export default async function ChapterDetailsPage({
  params,
}: {
  params: Promise<{ chapterId: string }>;
}) {
  const { chapterId } = await params;
  const chapterIdNum = parseInt(chapterId);

  const chapter = chaptersData.find((c) => c.chapter_number === chapterIdNum);

  if (!chapter) {
    return <div className="text-white">Chapter not found</div>;
  }

  const verses = versesData.filter((v) => v.chapter_number === chapterIdNum);

  // Navigation logic
  const prevChapter = chapterIdNum > 1 ? chapterIdNum - 1 : null;
  const nextChapter = chapterIdNum < 18 ? chapterIdNum + 1 : null;

  return (
    <div className="flex flex-col gap-10 pb-24 animate-in fade-in duration-700">
      {/* Chapter Overview Header */}
      <div className="relative overflow-hidden rounded-2xl border border-[#222] bg-gradient-to-br from-[#1b1229] to-[#0A0A0A] p-10 md:p-14 mb-4">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518002171953-a080ee817e1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')] opacity-5 bg-cover bg-center mix-blend-screen pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold text-[#A87FFB] bg-[#A87FFB]/10 px-3 py-1 rounded uppercase tracking-widest">
              Chapter {chapter.chapter_number}
            </span>
            <span className="text-xs uppercase tracking-widest text-[#2ECC71] flex items-center gap-1 font-bold">
              <PlayCircle className="w-4 h-4" /> {chapter.verses_count} Verses
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold font-serif mb-4 text-white">
            {chapter.name_translation}
          </h1>
          <h2 className="text-xl italic font-serif text-zinc-400 mb-8 border-l-2 border-zinc-700 pl-4">
            {chapter.name_meaning}
          </h2>

          <p className="text-lg text-zinc-300 leading-relaxed">
            {chapter.chapter_summary}
          </p>

          <div className="mt-10">
            <Link
              href={`/chapters/${chapterId}/verse/1`}
              className="inline-flex items-center gap-2 px-8 py-4 font-bold text-black bg-white hover:bg-zinc-200 rounded-full transition-all hover:scale-105 shadow-xl"
            >
              Start Reading <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl w-full flex flex-col gap-12">
        {/* Quick Verse Navigation Grid */}
        <div>
          <h3 className="text-xl font-bold font-serif mb-4 text-zinc-300">
            Quick Verse Navigation
          </h3>
          <div className="flex flex-wrap gap-2">
            {verses.map((verse) => (
              <Link
                key={`grid-${verse.id}`}
                href={`/chapters/${chapterId}/verse/${verse.verse_number}`}
                className="w-10 h-10 flex items-center justify-center rounded-md border border-[#222] bg-[#121212] text-sm text-zinc-400 hover:bg-[#A87FFB]/10 hover:text-[#A87FFB] hover:border-[#A87FFB]/50 transition-all font-semibold"
              >
                {verse.verse_number}
              </Link>
            ))}
          </div>
        </div>

        {/* Verses Full List */}
        <div>
          <h3 className="text-2xl font-bold font-serif mb-6 border-b border-[#222] pb-4">
            Verses ({verses.length})
          </h3>
          <div className="flex flex-col gap-4">
            {verses.map((verse) => (
              <Link
                key={verse.id}
                href={`/chapters/${chapterId}/verse/${verse.verse_number}`}
                className="flex items-start gap-6 p-6 rounded-xl border border-[#222] bg-[#121212] hover:bg-zinc-900 transition-all hover:-translate-y-1 group"
              >
                <div className="text-[#A87FFB] font-bold text-lg min-w-16">
                  {chapterId}.{verse.verse_number}
                </div>
                <div className="flex-1">
                  <p className="font-serif text-lg text-white mb-2 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity whitespace-pre-line">
                    {verse.text}
                  </p>
                  <p className="text-zinc-500 text-sm whitespace-pre-line line-clamp-2">
                    {verse.transliteration}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Chapter Navigation */}
      <div className="flex items-center justify-between mt-12 border-t border-[#222] pt-8">
        {prevChapter ? (
          <Link
            href={`/chapters/${prevChapter}`}
            className="flex flex-col items-start group"
          >
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1 group-hover:text-zinc-400">
              Previous Chapter
            </span>
            <div className="flex items-center gap-2 text-zinc-300 group-hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-serif text-lg">Chapter {prevChapter}</span>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextChapter ? (
          <Link
            href={`/chapters/${nextChapter}`}
            className="flex flex-col items-end group"
          >
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1 group-hover:text-zinc-400">
              Next Chapter
            </span>
            <div className="flex items-center gap-2 text-zinc-300 group-hover:text-white transition-colors">
              <span className="font-serif text-lg">Chapter {nextChapter}</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
