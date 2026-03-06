# Design: i18n Language Switcher + Video Preview + Download Fix

Date: 2026-03-06

## Goals

1. Remove all hardcoded Chinese text from all pages
2. Add language switcher (zh-Hant / zh-Hans / en) in Header top-right
3. Use correct fonts per language (Noto Sans TC, Noto Sans SC, Geist Sans)
4. Add inline video preview card after URL submission
5. Fix download to use blob fetch (no new tab/page)

## Files to Change

| File | Change |
|------|--------|
| `app/lib/i18n.tsx` | Extend translations for all pages |
| `app/components/Header.tsx` | Add LanguageSwitcher, translate nav text |
| `app/layout.tsx` | Add Noto fonts, dynamic lang attribute |
| `app/page.tsx` | Fix download (blob), add preview card, translate hardcoded text |
| `app/about/page.tsx` | Full translation |
| `app/guide/page.tsx` | Full translation |
| `app/legal/privacy-policy/page.tsx` | Full translation |
| `app/legal/terms/page.tsx` | Full translation |
| `app/legal/refund/page.tsx` | Full translation |

## i18n Architecture

- Translations live in `app/lib/i18n.tsx`
- `I18nProvider` wraps the app, persists locale to localStorage
- `useI18n()` hook used in all client components
- Static pages (about, guide, legal) need `'use client'` + `I18nProvider` wrapper
- Font applied via CSS variable on `<body>` based on locale

## Font Strategy

- `zh-Hant` → Noto Sans TC (Google Fonts)
- `zh-Hans` → Noto Sans SC (Google Fonts)
- `en` → Geist Sans (existing)
- Fonts loaded in `layout.tsx`, CSS variables set per locale in a client wrapper

## Download Fix

- Remove `target='_blank'` from download anchor
- Fetch video as blob: `fetch(videoUrl)` → `blob()` → `URL.createObjectURL()`
- Trigger download via anchor with object URL
- Revoke object URL after click

## Video Preview Card

- Shown after API returns success
- Contains: `<video src={videoUrl} controls>`, title, download button
- Inline on main page (no redirect)
- Dismissed when user clears URL or submits new one
