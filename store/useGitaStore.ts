import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Bookmark {
  chapterId: number;
  verseId: number;
}

interface GitaState {
  bookmarks: Bookmark[];
  progress: Bookmark | null;
  addBookmark: (chapterId: number, verseId: number) => void;
  removeBookmark: (chapterId: number, verseId: number) => void;
  isBookmarked: (chapterId: number, verseId: number) => boolean;
  setProgress: (chapterId: number, verseId: number) => void;
  clearProgress: () => void;
  clearBookmarks: () => void;
}

export const useGitaStore = create<GitaState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      progress: null,
      addBookmark: (chapterId, verseId) =>
        set((state) => ({
          bookmarks: [...state.bookmarks, { chapterId, verseId }],
        })),
      removeBookmark: (chapterId, verseId) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter(
            (b) => !(b.chapterId === chapterId && b.verseId === verseId),
          ),
        })),
      isBookmarked: (chapterId, verseId) => {
        return get().bookmarks.some(
          (b) => b.chapterId === chapterId && b.verseId === verseId,
        );
      },
      setProgress: (chapterId, verseId) =>
        set({ progress: { chapterId, verseId } }),
      clearProgress: () => set({ progress: null }),
      clearBookmarks: () => set({ bookmarks: [] }),
    }),
    {
      name: "gita-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
