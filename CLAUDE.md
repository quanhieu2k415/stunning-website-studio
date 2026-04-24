# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Hai An Technology storefront (haiantech.vn) — Vietnamese tech retail site with a public marketing/catalog frontend and a Supabase-backed admin CMS. Originally scaffolded by Lovable; the `lovable-tagger` Vite plugin (dev-only) and round-trip to lovable.dev are still active, so edits made via Lovable will land in this repo as commits.

## Commands

- `npm run dev` — Vite dev server on **port 8080** (not 5173)
- `npm run build` — production build to `dist/`
- `npm run build:dev` — build with `mode=development` (keeps `componentTagger`)
- `npm run preview` — serve built output
- `npm run lint` — ESLint over the repo

There is **no test runner configured**. Don't claim a change is verified by tests — verify by running `npm run dev` and exercising the route, or `npm run build` for type/build sanity.

Both `bun.lockb` and `package-lock.json` are committed. Treat **npm as canonical** (per README); only use bun if the user explicitly asks.

## Architecture

### Two surfaces in one SPA
`src/App.tsx` mounts a single `BrowserRouter` with two trees:
- **Public** — Vietnamese slug routes: `/`, `/san-pham`, `/build-pc`, `/product/:id`, `/dich-vu`, `/gioi-thieu`, `/lien-he`. Wrapped with `<FloatingButtons />`.
- **Admin** — `/admin/login` and `/admin/*` (the latter gated by `ProtectedRoute` → `useAuth` → Supabase session). Admin pages live in `src/pages/admin/` and are lazy-loaded so they add nothing to the public bundle.

All page components are `lazy()` + `Suspense` — preserve this when adding routes.

### Data layer: Supabase with hardcoded fallback
The non-obvious pattern in `src/hooks/usePublicData.ts` (and the per-entity hooks beside it):
1. If `isSupabaseConfigured()` (both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` set) → fetch via `@tanstack/react-query` from Supabase.
2. Otherwise → return the hardcoded data in `src/data/products.ts`.
3. Mapper functions (`mapProduct`, `mapProductDetail`) translate snake_case DB rows into the frontend `Product` / `ProductDetail` types so components are identical in either mode.

When adding a new public entity, follow this same pattern (fetch + fallback + mapper) so the site stays usable without Supabase env vars.

`QueryClient` defaults: `staleTime: 5min`, `retry: 1` — set in `App.tsx`.

### Database
Schema lives in `supabase/migrations/00{1,2,3}_*.sql` (tables, seed data, RLS policies). **There is no migration runner script** — these SQL files are applied manually in the Supabase dashboard. If you change them, tell the user to re-run them.

Generated TypeScript types live in `src/types/database.ts` and are passed to `createClient<Database>` in `src/lib/supabase.ts`.

### Email / serverless
`api/send-email.ts` is a Vercel serverless function (Resend) used by the contact form. Two non-obvious things:
- It needs `RESEND_API_KEY` in the Vercel env. **`.env.example` does not list it** — add it if you re-document setup.
- The CORS `ALLOWED_ORIGINS` array is hard-coded (`haiantech.vn`, `www.haiantech.vn`, `localhost:8080`, `localhost:5173`). New deploy domains must be added here or requests will be rejected silently.

### UI
shadcn/ui (Radix primitives in `src/components/ui/`, slate base, CSS variables) + Tailwind. Font is **Be Vietnam Pro** (loaded by Tailwind config). Colors are HSL CSS variables defined in `src/index.css` — extend the variable, don't hardcode hex.

`@` is aliased to `src/` in both `vite.config.ts` and `tsconfig.json`. Use `@/...` imports.

### Admin authoring
`src/components/admin/RichTextEditor.tsx` wraps TipTap (starter-kit, underline, link, text-align). Image uploads go through `ImageUploader.tsx` → Supabase Storage.

## TypeScript strictness

`tsconfig.json` deliberately turns off `strictNullChecks`, `noImplicitAny`, `noUnusedLocals`, `noUnusedParameters`, and ESLint's `no-unused-vars`. Don't "fix" these by tightening them — code throughout the repo relies on the looser settings.

## Deployment

Vercel. `vercel.json` rewrites all paths to `/index.html` (SPA). The `api/` folder ships as serverless functions. Production env vars (`VITE_SUPABASE_*`, `RESEND_API_KEY`) are managed in the Vercel dashboard.

## Lovable round-trip

This repo is connected to a Lovable project. Changes pushed to git appear in Lovable; changes made via Lovable are auto-committed back. Don't rewrite the README's Lovable URLs unless asked — they are placeholders the Lovable backend may rely on.

## Security model

This project assumes Supabase self-signup (email, phone, anonymous, social) is **disabled in the dashboard** so only the single provisioned admin can authenticate. The RLS policies in `supabase/migrations/003_rls_policies.sql` grant full CRUD to any `authenticated` user and rely on that assumption. See `SECURITY.md` for the setup checklist, verification SQL, and tripwires. **Do not loosen or extend RLS**, do not enable signup, and do not add a second authenticated role until an `admins` table or a JWT-claim check (`auth.jwt() ->> 'role' = 'admin'`) is introduced and the policies are rewritten against it.
