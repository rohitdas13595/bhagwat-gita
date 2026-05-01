# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-05-02

### Added

- **Global Structure & Architecture**: Migrated fully to Next.js 15 App router.
- **Dynamic Theming**: Integrated `next-themes` wrapped in Tailwind CSS v4's new variant handlers to enable rich Dark/Light mode flipping.
- **Persistence Layer**: Implemented robust lightweight local storage synchronization using `Zustand`.
- **Media Engine**: Constructed a brand-new Media Control Center allowing users to play, pause, seek, and auto-navigate verses seamlessly natively.
- **Semantic Text Search**: Highly optimized static JSON aggregators allow instantaneous queries across all Translations, Authors, and pure Sanskrit formats without external database limits.
- **Navigational Revamps**: A responsive sticky bottom bar for mobile contexts, and desktop sidebar workflows.
- **Metadata Additions**: Rich SVG Favicon dynamically generated via `next/og` alongside comprehensive open-source Documentation architectures.

### Changed

- Re-architected Verse detailed pages to contain elegant UI buckets separating word meanings, purports, and transliterations.

### Fixed

- Stabilized hydration and theme rendering clashes on standard web layouts.
- Squashed invisible icon mapping overlaps in Tailwind inheritance variants.
