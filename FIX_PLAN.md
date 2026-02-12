# XHS Downloader Web - Fix Plan for Vercel Deployment

## Problem Summary

The project has **7 critical issues** preventing it from building and deploying on Vercel.

---

## Issue 1: Build Failure - Unknown Font `Geist`

**File**: `app/layout.tsx:5-13`
**Error**: `next/font error: Unknown font 'Geist'`
**Root Cause**: Next.js 14.2.5 does not include the `Geist` font. The `next/font/google` module in this version doesn't recognize `Geist` or `Geist_Mono` - these were added in Next.js 15.

**Fix**: Replace with `Inter` (a widely available Google font) or upgrade Next.js.

```tsx
// BEFORE (broken)
import { Geist, Geist_Mono } from "next/font/google";

// AFTER (fixed)
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
```

---

## Issue 2: Tailwind CSS v4 + Next.js 14 Incompatibility

**Files**: `package.json`, `postcss.config.mjs`, `globals.css`, `tailwind.config.ts`
**Root Cause**: The project uses Tailwind CSS v4 (`@tailwindcss/postcss: ^4`) with Next.js 14.2.5. Tailwind v4 uses a completely different configuration system:
- v4 uses `@tailwindcss/postcss` plugin (present in postcss.config.mjs)
- v4 does NOT use `@tailwind base/components/utilities` directives
- v4 does NOT use `tailwind.config.ts` (it uses CSS-based config)
- But `globals.css` still has v3-style `@tailwind` directives

**Fix Option A** (Recommended - Downgrade to Tailwind v3 for Next.js 14 compatibility):
- Replace `@tailwindcss/postcss: ^4` with `tailwindcss: ^3.4` + `autoprefixer`
- Update `postcss.config.mjs` to use `tailwindcss` and `autoprefixer` plugins
- Keep `tailwind.config.ts` as-is (v3 uses it)
- Keep `globals.css` `@tailwind` directives as-is (v3 uses them)

**Fix Option B** (Fully adopt Tailwind v4):
- Remove `tailwind.config.ts`
- Replace `globals.css` content with `@import "tailwindcss";`
- Keep `@tailwindcss/postcss` in postcss.config.mjs

---

## Issue 3: ESLint Config Incompatibility

**File**: `eslint.config.mjs`
**Root Cause**: Uses flat config format (`defineConfig`, `globalIgnores`) from ESLint 9+, but `eslint-config-next@14.2.5` expects the legacy `.eslintrc` format. The `defineConfig` import from `"eslint/config"` doesn't exist in ESLint 8.

**Fix**: Replace with a simple `.eslintrc.json` file compatible with Next.js 14:

```json
{
  "extends": "next/core-web-vitals"
}
```

---

## Issue 4: API Route Uses Local Python (Cannot Work on Vercel)

**File**: `app/api/download/route.ts:42-65`
**Root Cause**: The download API executes a local Python script via `child_process.exec()` with hardcoded Windows paths:
```
C:\Users\kin16\Documents\爬蟲\XHS-Downloader-master\venv\Scripts\python.exe
```
Vercel serverless functions:
- Cannot run Python scripts
- Cannot use `child_process.exec()`
- Have no persistent filesystem (no `temp/` directory)
- Have a 10-second timeout on hobby plan (60s on pro)

**Fix**: Rewrite the download API to use a pure Node.js/TypeScript approach:
1. Fetch the XHS page HTML directly using `fetch()`
2. Parse the page to extract the video URL from meta tags or JSON-LD data
3. Return the direct video URL to the client for download
4. Remove all Python/exec/temp-file dependencies

---

## Issue 5: File System Operations (Incompatible with Vercel)

**Files**: `lib/cleanup.ts`, `lib/download-manager.ts`, `app/api/download/[token]/route.ts`
**Root Cause**: The entire download flow depends on:
- Writing files to `temp/` directory
- In-memory Map for token storage (lost between serverless invocations)
- `setInterval` for cleanup (doesn't persist in serverless)
- File streaming from local disk

**Fix**: Since we'll extract the direct video URL (Issue 4 fix), we can:
1. Remove `lib/cleanup.ts` entirely
2. Simplify `lib/download-manager.ts` (or remove if not needed)
3. Remove the `[token]/route.ts` file-streaming endpoint
4. Return the video URL directly to the client, letting the browser handle the download

---

## Issue 6: `setInterval` at Module Top Level

**Files**: `lib/cleanup.ts:140`, `lib/download-manager.ts:107`
**Root Cause**: Both files call `setInterval()` at module scope. In serverless environments, these timers are meaningless (functions are ephemeral). They also cause issues during build.

**Fix**: Remove both `setInterval` calls. They become unnecessary once we remove the file-based download flow.

---

## Issue 7: `.env.local` Contains Hardcoded Local Paths

**File**: `.env.local`
**Root Cause**: Contains Windows-specific paths that won't exist on Vercel:
```
PYTHON_PATH=C:\Users\kin16\Documents\...
PYTHON_SCRIPT_PATH=C:\Users\kin16\Documents\...
```

**Fix**: Remove Python-related env vars. The new API approach won't need them.

---

## Implementation Plan (Ordered Steps)

### Phase 1: Fix Build Errors (Must do first)

**Step 1.1** - Fix font import in `app/layout.tsx`
- Replace `Geist`/`Geist_Mono` with `Inter`

**Step 1.2** - Fix Tailwind CSS configuration
- Downgrade to Tailwind v3 in package.json
- Update postcss.config.mjs for v3
- Add `autoprefixer` dependency
- Keep globals.css @tailwind directives (they're v3 style)

**Step 1.3** - Fix ESLint configuration
- Delete `eslint.config.mjs`
- Create `.eslintrc.json` with `{ "extends": "next/core-web-vitals" }`

**Step 1.4** - Verify build passes
- Run `npm install` then `npx next build`

### Phase 2: Rewrite API for Vercel Compatibility

**Step 2.1** - Rewrite `app/api/download/route.ts`
- Remove Python/exec dependencies
- Implement XHS page fetching with `fetch()`
- Parse HTML to extract video URL
- Return video URL in JSON response

**Step 2.2** - Remove file-based infrastructure
- Delete `app/api/download/[token]/route.ts`
- Delete `lib/cleanup.ts`
- Simplify or remove `lib/download-manager.ts`

**Step 2.3** - Update frontend `app/page.tsx`
- Instead of token-based download, use the returned video URL directly
- Open video URL in new tab or trigger browser download

### Phase 3: Clean Up for Deployment

**Step 3.1** - Clean up `.env.local`
- Remove Python-related variables
- Add any new env vars needed (e.g., user-agent string)

**Step 3.2** - Update `.gitignore`
- Ensure `.env.local` is ignored (already is)
- Remove `/temp/` entry (no longer needed)

**Step 3.3** - Clean up documentation
- Remove excessive .md files (12 documentation files is too many)
- Keep only README.md

**Step 3.4** - Test locally
- `npm run dev` and test the full flow
- `npm run build` to verify production build

### Phase 4: Deploy

**Step 4.1** - Push to GitHub
**Step 4.2** - Connect to Vercel and deploy
**Step 4.3** - Verify deployment works

---

## Files to Modify

| File | Action |
|------|--------|
| `app/layout.tsx` | Fix font imports |
| `app/page.tsx` | Update download logic |
| `app/api/download/route.ts` | Complete rewrite |
| `app/api/download/[token]/route.ts` | DELETE |
| `lib/cleanup.ts` | DELETE |
| `lib/download-manager.ts` | DELETE or simplify |
| `package.json` | Fix dependencies |
| `postcss.config.mjs` | Fix for Tailwind v3 |
| `eslint.config.mjs` | DELETE, replace with .eslintrc.json |
| `.env.local` | Remove Python paths |
| `tailwind.config.ts` | Keep (works with v3) |
| `globals.css` | Keep (works with v3) |

## Risk Assessment

- **Phase 1**: Low risk - standard config fixes
- **Phase 2**: Medium risk - XHS may block server-side requests or change their page structure. May need to add proper headers (User-Agent, cookies) to fetch XHS pages. The video URL extraction logic needs testing against real XHS URLs.
- **Phase 3-4**: Low risk - cleanup and deployment
