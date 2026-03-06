# i18n Language Switcher + Video Preview + Download Fix Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove all hardcoded Chinese text, add a 3-language switcher in the header, apply correct fonts per language, add inline video preview, and fix download to use blob fetch.

**Architecture:** Extend the existing i18n system in `app/lib/i18n.tsx` with full translations for all pages. Wrap static pages with `'use client'` + `I18nProvider`. Apply per-language fonts via a client-side `FontProvider` in layout. Fix download via blob fetch.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, next/font/google (Noto Sans TC/SC)

---

### Task 1: Extend translations in `app/lib/i18n.tsx`

**Files:**
- Modify: `app/lib/i18n.tsx`

**Step 1: Replace the entire file with extended translations**

Add these new keys to all 3 locales (`zh-Hant`, `zh-Hans`, `en`) inside the existing `translations` object. Keep all existing keys, add new ones:

```typescript
// Add to each locale:
header: {
  about: '關於' | '关于' | 'About',
  backToHome: '返回首頁' | '返回首页' | 'Back to Home',
},
badge: '最新版' | '最新版' | 'Latest',
input: {
  placeholder: '粘貼小紅書連結（自動提取）...' | '粘贴小红书链接（自动提取）...' | 'Paste Xiaohongshu link (auto-extracted)...',
},
trust: {
  ssl: 'SSL 加密' | 'SSL 加密' | 'SSL Encrypted',
  free: '無限免費' | '无限免费' | 'Unlimited Free',
},
preview: {
  title: '視頻預覽' | '视频预览' | 'Video Preview',
  downloadBtn: '下載視頻' | '下载视频' | 'Download Video',
  downloading: '下載中...' | '下载中...' | 'Downloading...',
},
seo: {
  heading: '關於小紅書媒體存檔工具' | '关于小红书媒体存档工具' | 'About XHS Media Archive Tool',
  whatIsTitle: '什麼是媒體存檔工具？' | '什么是媒体存档工具？' | 'What is a Media Archive Tool?',
  whatIsP1: '...' ,  // full paragraph text per locale
  whatIsP2: '...',
  techTitle: '技術原理與工作流程' | '技术原理与工作流程' | 'How It Works',
  techIntro: '...',
  techSteps: ['...', '...', '...', '...', '...'],  // 5 steps per locale
  techOutro: '...',
  formatsTitle: '支持的格式與質量選項' | '支持的格式与质量选项' | 'Supported Formats & Quality',
  formatsIntro: '...',
  formatsList: ['1080p Full HD: ...', '720p HD: ...', '480p SD: ...', '360p: ...'],
  formatsOutro: '...',
  privacyTitle: '隱私與安全保障' | '隐私与安全保障' | 'Privacy & Security',
  privacyIntro: '...',
  privacyList: ['...', '...', '...', '...', '...'],
  privacyOutro: '...',
  tipsTitle: '使用建議與最佳實踐' | '使用建议与最佳实践' | 'Tips & Best Practices',
  tipsIntro: '...',
  tipsList: ['...', '...', '...', '...', '...'],
  legalNotice: '法律聲明：...' | '法律声明：...' | 'Legal Notice: ...',
},
about: {
  title: '關於 XHS Downloader' | '关于 XHS Downloader' | 'About XHS Downloader',
  missionTitle: '我們的使命' | '我们的使命' | 'Our Mission',
  missionText: '...',
  whyTitle: '為什麼選擇我們？' | '为什么选择我们？' | 'Why Choose Us?',
  whyList: ['100% 免費: ...' | ... | '100% Free: ...', ...],
  techTitle: '我們的技術' | '我们的技术' | 'Our Technology',
  techText: '...',
  privacyTitle: '隱私和安全' | '隐私和安全' | 'Privacy & Security',
  privacyText: '...',
  legalTitle: '合法使用' | '合法使用' | 'Legal Use',
  legalText: '...',
  improveTitle: '持續改進' | '持续改进' | 'Continuous Improvement',
  improveText: '...',
  contactTitle: '聯繫我們' | '联系我们' | 'Contact Us',
  contactText: '...',
  email: 'support@xhsvideodownloader.com',
  lastUpdated: '最後更新：2026 年 2 月 24 日' | '最后更新：2026 年 2 月 24 日' | 'Last updated: February 24, 2026',
},
guide: {
  title: 'XHS Downloader 完整使用指南' | 'XHS Downloader 完整使用指南' | 'XHS Downloader Complete Guide',
  whatIsTitle: '什麼是 XHS Downloader？' | '什么是 XHS Downloader？' | 'What is XHS Downloader?',
  whatIsText: '...',
  whyTitle: '為什麼使用 XHS Downloader？' | '为什么使用 XHS Downloader？' | 'Why Use XHS Downloader?',
  features: [
    { emoji: '✨', title: '完全免費' | '完全免费' | 'Completely Free', desc: '...' },
    { emoji: '⚡', title: '超快速度' | '超快速度' | 'Super Fast', desc: '...' },
    { emoji: '🔒', title: '100% 安全' | '100% 安全' | '100% Safe', desc: '...' },
    { emoji: '📱', title: '多設備支持' | '多设备支持' | 'Multi-Device', desc: '...' },
  ],
  stepsTitle: '分步使用指南' | '分步使用指南' | 'Step-by-Step Guide',
  steps: [
    { title: '第 1 步：找到視頻' | ... | 'Step 1: Find the Video', desc: '...' },
    { title: '第 2 步：複製視頻鏈接' | ... | 'Step 2: Copy the Link', desc: '...' },
    { title: '第 3 步：粘貼鏈接' | ... | 'Step 3: Paste the Link', desc: '...' },
    { title: '第 4 步：選擇質量' | ... | 'Step 4: Choose Quality', desc: '...' },
    { title: '第 5 步：下載' | ... | 'Step 5: Download', desc: '...' },
    { title: '第 6 步：享受' | ... | 'Step 6: Enjoy', desc: '...' },
  ],
  faqTitle: '常見問題解答' | '常见问题解答' | 'FAQ',
  faqs: [
    { q: '下載失敗怎麼辦？' | ... | 'What if download fails?', a: '...' },
    { q: '下載的視頻有水印嗎？' | ... | 'Will videos have watermarks?', a: '...' },
    { q: '我可以下載多少個視頻？' | ... | 'How many videos can I download?', a: '...' },
    { q: '下載的視頻會被保存多久？' | ... | 'How long are videos stored?', a: '...' },
    { q: '這是合法的嗎？' | ... | 'Is this legal?', a: '...' },
  ],
  tipsTitle: '提示和技巧' | '提示和技巧' | 'Tips & Tricks',
  tips: ['...', '...', '...', '...', '...'],
  lastUpdated: '...',
},
legal: {
  privacy: {
    title: '隱私權政策' | '隐私权政策' | 'Privacy Policy',
    sections: [ /* all 10 sections with title + content */ ],
    lastUpdated: '...',
  },
  terms: {
    title: '服務條款' | '服务条款' | 'Terms of Service',
    sections: [ /* all 12 sections */ ],
    lastUpdated: '...',
  },
  refund: {
    title: '退款政策' | '退款政策' | 'Refund Policy',
    sections: [ /* all 6 sections */ ],
    lastUpdated: '...',
  },
},
contact: {
  title: '聯繫我們' | '联系我们' | 'Contact Us',
  sections: [ /* all sections */ ],
  lastUpdated: '...',
},
```

**Step 2: Verify TypeScript compiles**

```bash
cd C:/Users/user/xhs-video-downloader && npx tsc --noEmit
```
Expected: No errors

**Step 3: Commit**

```bash
cd C:/Users/user/xhs-video-downloader
git add app/lib/i18n.tsx
git commit -m "feat: extend i18n translations for all pages and new UI keys"
```

---

### Task 2: Add Noto fonts + FontProvider in `app/layout.tsx`

**Files:**
- Modify: `app/layout.tsx`
- Create: `app/components/FontProvider.tsx`

**Step 1: Create `app/components/FontProvider.tsx`**

This is a client component that reads locale from i18n context and applies the correct font CSS variable to `<body>`.

```tsx
'use client';

import { useI18n } from '@/app/lib/i18n';
import { useEffect } from 'react';

type Props = {
  notoTCVar: string;
  notoSCVar: string;
  geistVar: string;
  children: React.ReactNode;
};

export default function FontProvider({ notoTCVar, notoSCVar, geistVar, children }: Props) {
  const { locale } = useI18n();

  useEffect(() => {
    const fontVar = locale === 'zh-Hant' ? notoTCVar
      : locale === 'zh-Hans' ? notoSCVar
      : geistVar;
    document.body.style.fontFamily = `var(${fontVar}), sans-serif`;
    document.documentElement.lang = locale === 'zh-Hant' ? 'zh-TW'
      : locale === 'zh-Hans' ? 'zh-CN'
      : 'en';
  }, [locale, notoTCVar, notoSCVar, geistVar]);

  return <>{children}</>;
}
```

**Step 2: Update `app/layout.tsx`**

Add Noto Sans TC and SC font imports, wrap body children with `I18nProvider` + `FontProvider`:

```tsx
import { Geist, Geist_Mono, Noto_Sans_TC, Noto_Sans_SC } from "next/font/google";
import { I18nProvider } from "./lib/i18n";
import FontProvider from "./components/FontProvider";

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-tc",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sc",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// In RootLayout body:
<body className={`${geistSans.variable} ${geistMono.variable} ${notoSansTC.variable} ${notoSansSC.variable} antialiased`}>
  <I18nProvider>
    <FontProvider
      notoTCVar="--font-noto-tc"
      notoSCVar="--font-noto-sc"
      geistVar="--font-geist-sans"
    >
      <Header />
      <main>{children}</main>
    </FontProvider>
  </I18nProvider>
</body>
```

**Step 3: Verify build**

```bash
cd C:/Users/user/xhs-video-downloader && npm run build 2>&1 | tail -20
```
Expected: No font-related errors

**Step 4: Commit**

```bash
git add app/layout.tsx app/components/FontProvider.tsx
git commit -m "feat: add Noto Sans TC/SC fonts with dynamic font switching per locale"
```

---

### Task 3: Update `app/components/Header.tsx`

**Files:**
- Modify: `app/components/Header.tsx`

**Step 1: Replace Header with translated version**

The Header already imports from next/navigation. Add `useI18n` and `LanguageSwitcher`:

```tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Sparkles } from 'lucide-react';
import { useI18n, LanguageSwitcher } from '@/app/lib/i18n';

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const { t } = useI18n();

  return (
    <header className="w-full bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-red-500">
            XHS Downloader
          </span>
        </Link>

        {/* Right side: nav + language switcher */}
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-4">
            {!isHome && (
              <Link href="/" className="flex items-center gap-1 text-gray-600 hover:text-pink-600 transition text-sm">
                <Home className="w-4 h-4" />
                <span>{t.header.backToHome}</span>
              </Link>
            )}
            <Link
              href="/about"
              className={`text-sm font-medium transition ${
                pathname === '/about' ? 'text-pink-600' : 'text-gray-600 hover:text-pink-600'
              }`}
            >
              {t.header.about}
            </Link>
          </nav>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
```

**Step 2: Verify TypeScript**

```bash
cd C:/Users/user/xhs-video-downloader && npx tsc --noEmit
```

**Step 3: Commit**

```bash
git add app/components/Header.tsx
git commit -m "feat: add language switcher to header, translate nav text"
```

---

### Task 4: Update `app/page.tsx` — fix download + add preview + translate

**Files:**
- Modify: `app/page.tsx`

**Step 1: Add video preview state and blob download logic**

Replace the `handleDownload` function and add preview state:

```tsx
const [videoData, setVideoData] = useState<{ videoUrl: string; title: string } | null>(null);
const [isDownloadingFile, setIsDownloadingFile] = useState(false);

const handleDownload = async (e: FormEvent) => {
  e.preventDefault();
  const cleanUrl = extractXHUrl(url);
  if (!cleanUrl) { alert(t.error.emptyUrl); return; }

  const currentUsage = getUsageStatus();
  if (!currentUsage.canDownload) {
    alert(currentUsage.isLimitReached
      ? t.error.limitReached
      : t.error.waitCooldown.replace('$0', String(currentUsage.cooldownRemaining)));
    return;
  }

  setUrl(cleanUrl);
  setIsDownloading(true);
  setVideoData(null);
  try {
    const response = await fetch('/api/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: cleanUrl }),
    });
    const data = await response.json();
    if (data.success && data.videoUrl) {
      recordDownload();
      setUsage(getUsageStatus());
      setCooldown(15);
      setVideoData({ videoUrl: data.videoUrl, title: data.title || 'xhs-video' });
    } else {
      alert(t.error.downloadFailed + ': ' + (data.error || t.error.unknown));
    }
  } catch (error) {
    console.error('Download error:', error);
    alert(t.error.downloadFailed + ' - ' + t.error.retry);
  } finally {
    setIsDownloading(false);
  }
};

const handleFileDownload = async () => {
  if (!videoData) return;
  setIsDownloadingFile(true);
  try {
    const res = await fetch(videoData.videoUrl);
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = `${videoData.title}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(objectUrl);
  } catch {
    alert(t.error.downloadFailed);
  } finally {
    setIsDownloadingFile(false);
  }
};
```

**Step 2: Add video preview card JSX**

After the form closing tag, add:

```tsx
{videoData && (
  <div className="mt-6 bg-gray-50 rounded-2xl p-4 border border-pink-100">
    <h3 className="font-semibold text-gray-800 mb-3 text-sm">{t.preview.title}</h3>
    <video
      src={videoData.videoUrl}
      controls
      className="w-full rounded-xl mb-3 max-h-64 bg-black"
    />
    <p className="text-sm text-gray-600 mb-3 truncate">{videoData.title}</p>
    <button
      onClick={handleFileDownload}
      disabled={isDownloadingFile}
      className="w-full py-3 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-pink-500 to-red-500 text-white disabled:opacity-50 flex items-center justify-center gap-2"
    >
      <Download className="w-4 h-4" />
      {isDownloadingFile ? t.preview.downloading : t.preview.downloadBtn}
    </button>
  </div>
)}
```

**Step 3: Replace all hardcoded Chinese text**

- Line 93: `<span>2025 最新版</span>` → `<span>{t.badge}</span>`
- Line 113: `placeholder="粘貼小紅書連結..."` → `placeholder={t.input.placeholder}`
- Line 145: `SSL 加密` → `{t.trust.ssl}`
- Line 146: `無限免費` → `{t.trust.free}`
- SEO section (lines 167-268): Replace all hardcoded text with `t.seo.*` references

**Step 4: Verify TypeScript**

```bash
cd C:/Users/user/xhs-video-downloader && npx tsc --noEmit
```

**Step 5: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add video preview card, fix blob download, translate main page"
```

---

### Task 5: Update `app/about/page.tsx`

**Files:**
- Modify: `app/about/page.tsx`

**Step 1: Convert to client component with i18n**

```tsx
'use client';

import { I18nProvider, useI18n } from '@/app/lib/i18n';

function AboutContent() {
  const { t } = useI18n();
  const a = t.about;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">{a.title}</h1>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{a.missionTitle}</h2>
              <p>{a.missionText}</p>
            </section>
            {/* ... repeat for all sections using t.about.* */}
            <section className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600">{a.lastUpdated}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return <I18nProvider><AboutContent /></I18nProvider>;
}
```

Note: Remove `export const metadata` — it cannot coexist with `'use client'`. Page title will be set via layout metadata.

**Step 2: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat: translate about page with i18n"
```

---

### Task 6: Update `app/guide/page.tsx`

**Files:**
- Modify: `app/guide/page.tsx`

**Step 1: Same pattern as about page**

```tsx
'use client';
import { I18nProvider, useI18n } from '@/app/lib/i18n';

function GuideContent() {
  const { t } = useI18n();
  const g = t.guide;
  // Render all sections using g.* keys
  // Steps: g.steps.map(step => ...)
  // FAQs: g.faqs.map(faq => <details>...)
  // Features: g.features.map(f => ...)
}

export default function Guide() {
  return <I18nProvider><GuideContent /></I18nProvider>;
}
```

**Step 2: Commit**

```bash
git add app/guide/page.tsx
git commit -m "feat: translate guide page with i18n"
```

---

### Task 7: Update legal pages

**Files:**
- Modify: `app/legal/privacy-policy/page.tsx`
- Modify: `app/legal/terms/page.tsx`
- Modify: `app/legal/refund/page.tsx`

**Step 1: Same pattern for all three**

Each legal page follows the same structure:

```tsx
'use client';
import { I18nProvider, useI18n } from '@/app/lib/i18n';

function PrivacyContent() {
  const { t } = useI18n();
  const p = t.legal.privacy;
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">{p.title}</h1>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            {p.sections.map((section, i) => (
              <section key={i}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                {/* render section.content */}
              </section>
            ))}
            <section className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600">{p.lastUpdated}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PrivacyPolicy() {
  return <I18nProvider><PrivacyContent /></I18nProvider>;
}
```

Repeat for terms and refund pages using `t.legal.terms` and `t.legal.refund`.

**Step 2: Commit**

```bash
git add app/legal/
git commit -m "feat: translate all legal pages with i18n"
```

---

### Task 8: Update `app/contact/page.tsx`

**Files:**
- Modify: `app/contact/page.tsx`

**Step 1: Same pattern**

```tsx
'use client';
import { I18nProvider, useI18n } from '@/app/lib/i18n';

function ContactContent() {
  const { t } = useI18n();
  const c = t.contact;
  // render using c.*
}

export default function Contact() {
  return <I18nProvider><ContactContent /></I18nProvider>;
}
```

**Step 2: Commit**

```bash
git add app/contact/page.tsx
git commit -m "feat: translate contact page with i18n"
```

---

### Task 9: Verify build

**Step 1: Run full build**

```bash
cd C:/Users/user/xhs-video-downloader && npm run build 2>&1
```

Expected: `✓ Compiled successfully` with no TypeScript or lint errors.

**Step 2: Fix any errors**

Common issues to watch for:
- `'use client'` pages cannot export `metadata` — remove those exports
- `useI18n` called outside `I18nProvider` — ensure all pages wrap with `<I18nProvider>`
- Font variable names must match exactly between `layout.tsx` and `FontProvider.tsx`

---

### Task 10: Deploy to Vercel

**Step 1: Deploy**

```bash
cd C:/Users/user/xhs-video-downloader && vercel --prod
```

Expected: Deployment URL printed, e.g. `https://xhs-downloader-web-xxx.vercel.app`

**Step 2: Smoke test**

- Visit the deployment URL
- Verify language switcher appears in header top-right
- Switch to English — all text should change
- Switch to Simplified Chinese — font should change to Noto Sans SC
- Paste an XHS URL and submit — video preview card should appear
- Click Download Video — file should download directly (no new tab)
