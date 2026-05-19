# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Next.js dev server with Turbopack (http://localhost:3000)
- `npm run build` — production build
- `npm run start` — serve built output
- `npm run lint` — ESLint (`next/core-web-vitals` + `next/typescript`)

No test runner is configured.

## Environment

Copy `.env.example` to `.env.local`. Vars consumed:

- `NEXT_PUBLIC_N8N_CHAT_WEBHOOK` — n8n chat widget (client, `src/components/N8nChatWidget.tsx`)
- `N8N_CONTACT_WEBHOOK_URL` — server-side forward target for contact form (`src/app/api/contact/route.ts`)
- `RECAPTCHA_ENABLED` — `"true"` to enforce reCAPTCHA verification in the contact route
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` — loaded in root layout to inject the Google reCAPTCHA script tag
- `RECAPTCHA_SECRET_KEY` — server-side siteverify
- `NEXT_PUBLIC_SITE_URL` — overrides default `https://www.castilloitsystems.com` in JSON-LD

## Architecture

Next.js 15 App Router, React 19, TypeScript strict, Tailwind v4 (via `@tailwindcss/postcss`). Path alias `@/*` → `src/*`.

- `src/app/` — routes. Root layout (`layout.tsx`) injects Poppins font, conditional reCAPTCHA `<script>`, JSON-LD `ProfessionalService` schema, AOS init, and the global n8n chat widget. SEO surface lives in `sitemap.ts` + `robots.ts`.
- `src/app/page.tsx` — single landing page that composes feature sections from `src/features/landing/` (`Header`, `Hero`, `Services`, `Portfolio`, `About`, `Contact`, `Footer`). Each section is a colocated `*.tsx` + `*.module.css` pair.
- `src/app/{incamar,camabar,almivyca}/page.tsx` — client-side redirect stubs that `window.location.replace` to static HTML in `public/presupuestos/` (e.g. `incamar.html`). Edit the HTML files in `public/presupuestos/`, not the route. The companion `layout.tsx` files exist only to set per-route metadata.
- `src/app/api/contact/route.ts` — POST endpoint: validates `{name,email,message}`, optionally verifies reCAPTCHA v3 (score ≥ 0.5), then forwards to `N8N_CONTACT_WEBHOOK_URL`. No external validation libs — minimal inline checks.
- `src/components/N8nChatWidget.tsx` — global `@n8n/chat` mount, gated on `NEXT_PUBLIC_N8N_CHAT_WEBHOOK`.
- `src/features/landing/AOSInitializer.tsx` — client-side AOS animation init; pairs with `aos` CSS.
- `src/{hooks,lib,services,types,utils,styles}/` — currently empty scaffolding; add cross-cutting code there rather than under `features/`.

Static proposal/contract PDFs and HTML decks live in `public/presupuestos/`; brand assets in `public/assets/{images,video}/`.

## Conventions

- Locale `es_VE`; user-facing copy is Spanish.
- Section styling via CSS Modules colocated with components; no global utility classes beyond Tailwind base in `globals.css`.
- Prettier config at `prettier.config.js` — respect it on edits.
