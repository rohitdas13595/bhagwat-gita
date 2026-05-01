# 🪷 Obsidian Gita - Precision in Wisdom

A highly immersive, premium, and feature-rich Bhagavad Gita web application crafted with an "Obsidian" dark-themed aesthetic. It leverages cutting edge web technologies to provide a lightning-fast chapter indexing, real-time search, and a beautiful verse reading experience equipped with authentic Sanskrit dictation playbacks.

## ✨ Features

- **Immersive Obsidian Aesthetic**: Carefully crafted UI using a custom Next-Themes setup alongside Tailwind CSS v4, providing beautifully rich transitions between Light, Dark, and System states.
- **Dynamic Search Engine**: Powerful, instantaneous semantic searching built-in. Type any keyword (like "Arjuna", "Karma", "Duty") to immediately scan through massive JSON dictionaries of all chapter translations, multi-author commentaries, and exact Sanskrit text transliterations.
- **Modern Audio Station**: Read along seamlessly while streaming pure Mp3 verse recitations. Features full navigation (Skip Forward/Back), accurate visual scrubbing/seeking, and auto-fallback to native local Text-To-Speech systems.
- **Persistent Storage**: Utilizes `Zustand` with `localStorage` binding. Your application actively saves your progress (meaning you can always jump right back to your last read Chapter/Verse), and provides instantaneous bookmarking mechanics without needing a database.
- **Share & Dictate Ecosystem**: One-click functionality to trigger robust OS-native `navigator.share` APIs, Copy-to-Clipboard payloads, and Bookmark logs directly under every verse.

## 🚀 Technology Stack

- **Framework**: `Next.js 15` (App Router)
- **Language**: `TypeScript` / `React 19`
- **Styling**: `Tailwind CSS v4` + `lucide-react` icons
- **State Management**: `Zustand` (Persistent Local Storage)
- **Theming**: `next-themes` (Class-based strategy via CSS variable injections)

## 📦 Setting up locally

### 1. Requirements

- Node.js `v18+`
- npm or yarn

### 2. Installations

Run the installation to generate the `node_modules` required for the application:

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

Navigate to [http://localhost:3000](http://localhost:3000) inside your browser.

## 📁 Source Architecture

- **`app/`**: Root endpoints, Next.js page router layouts, dynamic chapter-verse slugs, searching, and metadata generators.
- **`components/`**: Decoupled UI modules including the Navigation Sidebar, TopBar header overrides, Mobile Sticky Bars, and Theme Providers.
- **`data/`**: Highly structured static JSON encyclopedias bridging verses, external translators, chapter analytics, and word-by-word meanings.
- **`public/`**: Stores visual assets alongside raw MP3 dictations stored cleanly in dynamically mapped directory channels.
- **`store/`**: Configuration for Zustand local browser-storage mechanics.

## 🤝 Contribution & License

Feel free to open a Pull Request to refine endpoints, update the UI logic, or add better CSS dictations!

_Created with passion and dedication to architectural resilience._
