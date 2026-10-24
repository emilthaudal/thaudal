<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

Personal site for thaudal.com, hosted on Vercel (deploys from `main`).

## Toolchain

- **Bun** is the package manager. Never use npm, yarn or pnpm.
- **Next.js 16**, **React 19**, **TypeScript 5** (strict).
- **Tailwind CSS v4**: CSS-first config in `src/app/globals.css`, no `tailwind.config.*`.
- **ESLint 9**: flat config in `eslint.config.mjs`. The root `.eslintrc.json` is inactive.
- **shadcn/ui**: style `radix-sera`, base color `taupe`, components in `src/components/ui`.
- **Path alias:** `@/*` → `./src/*`.

## Commands

```bash
bun install
bun run dev                   # http://localhost:3000
bun run build                 # also type-checks
bun run lint
bunx tsc --noEmit             # type-check only
bunx eslint src/app/page.tsx  # lint one file
```

There are no tests, formatter or codegen.

## Layout

- `src/app/page.tsx`: home page.
- `src/app/now/page.tsx`: `/now` page.
- `src/app/vods/page.tsx` and `src/components/vod-tracker.tsx`: spoiler-free Worlds 2026 VOD list. Data is `src/data/worlds-2026.json`, updated daily by a Claude Code scheduled task that pushes to `main`; watched state is per browser (localStorage).
- `src/app/api/github-activity/route.ts` and `src/lib/github-activity.ts`: GitHub contribution heatmap, merged across both accounts and cached for an hour.

## Environment variables

The heatmap needs these in `.env.local`:

```
GITHUB_TOKEN_PERSONAL=   # PAT for emilthaudal (scope: read:user)
GITHUB_TOKEN_WORK=       # PAT for emilthaudalwg (scope: read:user)
```

Without them the heatmap shows "Activity unavailable".

## Git

Pushing directly to `main` is fine; no branch or PR needed.

## Gotchas

- `suppressHydrationWarning` on `<html>` is intentional; next-themes needs it.
- The workflows in `.github/workflows/` are legacy (feature-branch builds and an old FTP deploy from the `static` branch). Vercel does the real deploys.
