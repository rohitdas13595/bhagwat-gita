# Knowledge Graph Report — Bhagavad Gita Next.js Project

## Overview
| Metric | Value |
|--------|-------|
| Total Nodes | 30 |
| Total Edges | 30 |
| Hyperedges | 2 |
| Communities | 12 |

## Node Types
- **document**: 18
- **code**: 7
- **image**: 5

## Extraction Confidence
- **EXTRACTED**: 26
- **INFERRED**: 4

## Top Communities

### community_5 (13 nodes)
- Bhagavad Gita Chapter Summary
- Krishna - Supreme Personality
- Arjuna - Warrior Disciple
- Karma Yoga - Selfless Action
- Buddhi Yoga - Intelligence in Action
- Dhyana Yoga - Meditation
- Devotional Service (Bhakti)
- Three Modes of Material Nature
- Eternal Soul (Atman)
- Dharma - Sacred Duty
- Renunciation (Tyaga/Sannyasa)
- Battlefield of Kurukshetra
- Universal Form (Vishvarupa)

### community_1 (6 nodes)
- next.config.ts
- layout.tsx
- RootLayout()

### community_3 (4 nodes)
- eslint.config.mjs

### community_6 (3 nodes)
- Next.js Getting Started Guide
- Vercel Deployment
- Next.js Font Optimization (Geist)

### community_0 (2 nodes)
- next-env.d.ts

## Most Connected Nodes
- **Krishna - Supreme Personality** (document): degree 6
- **Bhagavad Gita Chapter Summary** (document): degree 5
- **layout.tsx** (code): degree 4
- **Arjuna - Warrior Disciple** (document): degree 4
- **Karma Yoga - Selfless Action** (document): degree 4
- **eslint.config.mjs** (code): degree 3
- **Devotional Service (Bhakti)** (document): degree 3
- **Dhyana Yoga - Meditation** (document): degree 2
- **Three Modes of Material Nature** (document): degree 2

## Files Analyzed
- `data/summary.md` (13 node(s))
- `README.md` (3 node(s))
- `app/layout.tsx` (2 node(s))
- `next-env.d.ts` (1 node(s))
- `next.config.ts` (1 node(s))
- `postcss.config.mjs` (1 node(s))
- `eslint.config.mjs` (1 node(s))
- `app/page.tsx` (1 node(s))
- `AGENTS.md` (1 node(s))
- `CLAUDE.md` (1 node(s))
- `public/next.svg` (1 node(s))
- `public/vercel.svg` (1 node(s))
- `public/file.svg` (1 node(s))
- `public/globe.svg` (1 node(s))
- `public/window.svg` (1 node(s))

## Hyperedges (Multi-Node Relationships)

### Yoga Paths to Self-Realization
- Karma Yoga - Selfless Action
- Buddhi Yoga - Intelligence in Action
- Dhyana Yoga - Meditation
- Devotional Service (Bhakti)

### Krishna's Core Teachings
- Krishna - Supreme Personality
- Eternal Soul (Atman)
- Dharma - Sacred Duty
- Three Modes of Material Nature
- Devotional Service (Bhakti)

## Methodology
- **AST Extraction**: Used `graphify.parsers.parse_typescript` for TypeScript/TSX files; regex-based fallback for config files
- **Semantic Extraction**: Manual analysis of all 15 files (LLM API keys unavailable)
- **Merging**: AST and semantic results merged by node ID, preserving both code and concept nodes
- **Clustering**: Connected-components algorithm on the merged graph
- **Visualization**: D3.js force-directed graph with zoom, drag, and tooltip interactions

## Notes
- External LLM extraction was unavailable (no `ANTHROPIC_API_KEY` or `MOONSHOT_API_KEY`)
- All semantic nodes extracted via direct file reading and manual analysis
