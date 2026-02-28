# Fix & Clean Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix all broken functionality on xhsvideodownloader.com and clean the repo for public release.

**Architecture:** Replace yt-dlp (not available on Vercel serverless) with a direct HTTP fetch approach to extract XHS video URLs. Fix Tailwind v4 config. Remove all dev .md clutter. Verify ads.txt serves correctly.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind v4, Vercel serverless

---

### Task 1: Delete all dev .md clutter

**Files:**
- Delete: all `.md` files in root except `README.md`
- Delete: `docs/AUTH_SYSTEM.md`

**Step 1: Remove dev markdown files**

```bash
cd /c/Users/user/xhs-video-downloader
rm ANALYSIS_FEATURES.md API_EXAMPLES.md API_REFERENCE.md ARCHITECTURE.md \
   COMPLETE.md COMPLETION_REPORT.md DEPLOYMENT.md DEPLOYMENT_GUIDE.md \
   DEVELOPMENT_SUMMARY.md FEATURES.md FINAL_DELIVERY.md FINAL_DELIVERY_REPORT.md \
   FINAL_STATUS.md FINAL_SUMMARY.md FINAL_VERIFICATION.md FIXES_APPLIED.md \
   HANDOFF.md IMPLEMENTATION_COMPLETE.md IMPLEMENTATION_REPORT.md \
   IMPLEMENTATION_SUMMARY.md PAYMENT_FIX_PLAN.md PROJECT_COMPLETION_SUMMARY.md \
   QUICK_REFERENCE.md QUICK_START.md README_IMPLEMENTATION.md REPO_MERGE_PLAN.md \
   START_HERE.md STRIPE_SETUP.md TESTING_GUIDE.md TEST_CASES.md TEST_GUIDE.md \
   deploy-trigger.md docs/AUTH_SYSTEM.md
```

**Step 2: Clean up other dev artifacts**

```bash
rm START.bat deploy-vercel.sh .redeploy .vercel-deploy 2>/dev/null || true
```

**Step 3: Update README.md to be user-facing**

Replace contents of `README.md` with:

```markdown
# XHS Video Downloader

Free online tool to download Xiaohongshu (小红书) videos without watermark.

🌐 **Live site:** https://xhsvideodownloader.com

## Features
- Download XHS videos without watermark
- No registration required
- Free to use
- Works on mobile and desktop
```

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove dev artifacts, clean repo for public release"
```

---

### Task 2: Fix the download API (replace yt-dlp with serverless-compatible fetch)

**Files:**
- Modify: `app/api/download/route.ts`

**Context:** Vercel serverless functions cannot run system binaries like `yt-dlp`. The fix is to use Node.js `fetch` to call the XHS API directly and extract the video URL from the response.

**Step 1: Replace route.ts with serverless-compatible implementation**

```typescript
// app/api/download/route.ts
import { NextRequest, NextResponse } from 'next/server';

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.0',
  'Referer': 'https://www.xiaohongshu.com/',
  'Accept': 'application/json, text/plain, */*',
};

async function resolveXhslinkUrl(url: string): Promise<string> {
  const res = await fetch(url, { method: 'GET', redirect: 'follow', headers: HEADERS });
  return res.url;
}

async function extractVideoUrl(postUrl: string): Promise<{ videoUrl: string; title: string }> {
  // Extract post ID from URL
  const idMatch = postUrl.match(/\/(?:explore|discovery\/item)\/([a-zA-Z0-9]+)/);
  if (!idMatch) throw new Error('无法解析链接');
  const noteId = idMatch[1];

  // Fetch the page HTML
  const res = await fetch(`https://www.xiaohongshu.com/explore/${noteId}`, {
    headers: HEADERS,
  });
  const html = await res.text();

  // Extract __INITIAL_STATE__ JSON from page
  const stateMatch = html.match(/window\.__INITIAL_STATE__\s*=\s*(\{.+?\});?\s*<\/script>/s);
  if (!stateMatch) throw new Error('无法提取视频数据');

  const state = JSON.parse(stateMatch[1]);
  const note = state?.note?.noteDetailMap?.[noteId]?.note;
  if (!note) throw new Error('找不到视频信息');

  const videoUrl = note?.video?.media?.stream?.h264?.[0]?.masterUrl
    || note?.video?.media?.stream?.h265?.[0]?.masterUrl;

  if (!videoUrl) throw new Error('该内容不包含视频或视频不可用');

  return { videoUrl, title: note?.title || 'xhs-video' };
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    if (!url) return NextResponse.json({ error: '请提供视频链接' }, { status: 400 });

    // Extract URL from share text
    const urlMatch = url.match(/https?:\/\/[^\s]+/);
    let cleanUrl = urlMatch ? urlMatch[0] : url.trim();

    // Resolve xhslink.com short URLs
    if (cleanUrl.includes('xhslink.com')) {
      cleanUrl = await resolveXhslinkUrl(cleanUrl);
    }

    if (!cleanUrl.includes('xiaohongshu.com')) {
      return NextResponse.json({ error: '请提供有效的小红书链接' }, { status: 400 });
    }

    const { videoUrl, title } = await extractVideoUrl(cleanUrl);

    return NextResponse.json({
      success: true,
      videoUrl,
      title,
      message: '视频准备就绪',
    });

  } catch (error: any) {
    console.error('[Download] Error:', error);
    return NextResponse.json(
      { error: error.message || '服务器错误，请稍后重试' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok' });
}
```

**Step 2: Update the frontend to use direct videoUrl instead of token**

In `app/page.tsx`, replace the download handler block (lines 58–78) with:

```typescript
const response = await fetch('/api/download', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ url }),
});
const data = await response.json();
if (data.success && data.videoUrl) {
  recordDownload();
  setUsage(getUsageStatus());
  setCooldown(15);
  const link = document.createElement('a');
  link.href = data.videoUrl;
  link.download = `${data.title || 'xhs-video'}.mp4`;
  link.target = '_blank';
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setUrl('');
} else {
  alert(t.error.downloadFailed + ': ' + (data.error || t.error.unknown));
}
```

**Step 3: Delete unused files**

```bash
rm app/api/download/route-windows-backup.ts
rm app/api/download/\[token\]/route.ts
```

**Step 4: Commit**

```bash
git add -A
git commit -m "fix: replace yt-dlp with serverless-compatible XHS video extraction"
```

---

### Task 3: Fix Tailwind v4 config

**Files:**
- Modify: `app/globals.css`
- Modify: `postcss.config.mjs`

**Step 1: Check globals.css imports**

Ensure `app/globals.css` starts with:

```css
@import "tailwindcss";
```

Not the old v3 syntax:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Step 2: Verify postcss.config.mjs**

Should be:

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

**Step 3: Commit if changes were needed**

```bash
git add app/globals.css postcss.config.mjs
git commit -m "fix: correct Tailwind v4 CSS imports"
```

---

### Task 4: Verify ads.txt serves correctly

**Files:**
- Check: `public/ads.txt`
- Check: `app/ads.txt/route.ts`

**Step 1: Confirm public/ads.txt content**

File should contain exactly:
```
google.com, pub-7935038704820292, DIRECT, f08c47fec0942fa0
```

**Step 2: Remove the duplicate API route (public/ads.txt takes priority)**

```bash
rm -rf app/ads.txt
```

Next.js serves `public/` files as static assets at the root — `public/ads.txt` will be served at `/ads.txt` automatically. The API route is redundant and can conflict.

**Step 3: Commit**

```bash
git add -A
git commit -m "fix: remove duplicate ads.txt API route, use static public/ads.txt"
```

---

### Task 5: Remove unused pages and routes

**Files:**
- Delete: `app/analyze/page.tsx` (broken, not linked)
- Delete: `app/api/analyze/route.ts`
- Delete: `app/api/export/route.ts`
- Delete: `app/api/statistics/route.ts`
- Delete: `app/api/success/route.ts`
- Delete: `app/api/telegram/` (whole dir)
- Delete: `app/api/webhooks/` (whole dir)
- Delete: `app/history/page.tsx`
- Delete: `app/stats/page.tsx`
- Delete: `app/page-multilang.tsx`
- Delete: `app/layout-seo.tsx`
- Delete: `app/privacy/page.tsx` (duplicate of `app/legal/privacy-policy/`)
- Delete: `app/terms/page.tsx` (duplicate of `app/legal/terms/`)
- Delete: `lib/stripe-integration.ts`
- Delete: `lib/post-analyzer.ts`
- Delete: `lib/statistics-engine.ts`
- Delete: `lib/data-exporter.ts`
- Delete: `lib/analysis-history.ts`
- Delete: `__tests__/`

**Step 1: Delete all unused files**

```bash
cd /c/Users/user/xhs-video-downloader
rm -rf app/analyze app/api/analyze app/api/export app/api/statistics \
       app/api/success app/api/telegram app/api/webhooks \
       app/history app/stats app/page-multilang.tsx app/layout-seo.tsx \
       app/privacy app/terms \
       lib/stripe-integration.ts lib/post-analyzer.ts lib/statistics-engine.ts \
       lib/data-exporter.ts lib/analysis-history.ts \
       __tests__
```

**Step 2: Commit**

```bash
git add -A
git commit -m "chore: remove unused pages, APIs, and lib files"
```

---

### Task 6: Final push and verify

**Step 1: Push all commits**

```bash
git push origin main
```

**Step 2: Verify Vercel deployment**

- Go to https://vercel.com/dashboard
- Confirm the latest deployment is building/succeeded
- Visit https://xhsvideodownloader.com and test a download
- Visit https://xhsvideodownloader.com/ads.txt and confirm it shows the AdSense line

**Step 3: Reapply to Google AdSense**

Once the site is confirmed live and functional, resubmit at https://adsense.google.com
