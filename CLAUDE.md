# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm install` — install deps
- `npm run dev` — Vite dev server on `0.0.0.0:3000`
- `npm run build` — production build
- `npm run preview` — serve built output

No test, lint, or typecheck scripts configured. TypeScript runs in `noEmit` bundler mode via Vite; run `npx tsc --noEmit` for a typecheck.

## Environment

- `.env.local` must define `GEMINI_API_KEY`. Vite injects it at build time into both `process.env.API_KEY` and `process.env.GEMINI_API_KEY` (see `vite.config.ts`). The AI chat falls back to a maintenance message when missing.

## Architecture

Single-page React 19 + Vite app — corporate site for Castillo IT Systems (Anzoátegui, VE), Spanish-language. No backend; only client + Gemini API call.

- **Routing**: `App.tsx` uses `HashRouter` with routes `/`, `/software`, `/infraestructura`, `/seguridad`, `/portfolio`, `/contacto`. Page components live in `pages/`.
- **Layout shell**: `components/Layout.tsx` wraps every route with `Navbar`, `Footer`, and the floating `AIChat` widget.
- **AI sales chat**: `components/AIChat.tsx` → `services/geminiService.ts`. Uses `@google/genai` `gemini-2.5-flash` with a hardcoded `SYSTEM_INSTRUCTION` (Spanish sales-engineer persona for Castillo IT — products: Castillo Refinery, Castillo Autosys, Castillo Gym; key talking points: speed, local support, closed-budget guarantee). Last 10 messages passed as history to bound context. Edit the prompt in `services/geminiService.ts` to change chatbot behavior.
- **Styling**: Tailwind via CDN (`cdn.tailwindcss.com` in `index.html`) — config inlined in `<script>` with custom colors `primary/accent/secondary/highlight`, `Inter` font, and custom animations. No Tailwind build step. Custom CSS includes `.reveal` scroll-reveal class driven by an `IntersectionObserver` set up in `index.html` (re-attaches on React DOM mutations) — pages opt into animations by adding `class="reveal"` to elements.
- **Module loading**: `index.html` uses an `importmap` pointing React/router/genai/lucide to `aistudiocdn.com`. Vite resolves the same packages from `node_modules` during dev/build; the importmap is for AI Studio's CDN-hosted preview.
- **Path alias**: `@/*` → repo root (both `tsconfig.json` and `vite.config.ts`).
- **Types**: shared interfaces in `types.ts` (`NavItem`, `ServiceFeature`, `PortfolioItem`, `CaseStudy`, `ChatMessage`, `ChatState` enum).

## Notes

- Project originated from Google AI Studio (see `metadata.json`, README link). Deploys there if pushed.
- All UI copy is Spanish — keep new strings in Spanish.
