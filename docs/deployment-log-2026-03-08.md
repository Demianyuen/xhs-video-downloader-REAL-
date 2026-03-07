# Deployment Log - March 8, 2026

## Language Switcher Fix & Optimization

### Issue Identified
Language switcher in header was not updating page content when changed. Root cause: each page had its own isolated `I18nProvider` wrapper, creating separate React contexts that didn't share state.

### Changes Made

#### Files Modified (7 files)
1. **app/page.tsx**
   - Removed isolated `I18nProvider` wrapper
   - Changed import from `I18nProvider, useI18n` to just `useI18n`
   - Export now returns `<HomeContent />` directly

2. **app/about/page.tsx**
   - Removed isolated `I18nProvider` wrapper
   - Changed import from `I18nProvider, useI18n` to just `useI18n`
   - Export now returns `<AboutContent />` directly

3. **app/guide/page.tsx**
   - Removed isolated `I18nProvider` wrapper
   - Changed import from `I18nProvider, useI18n` to just `useI18n`
   - Export now returns `<GuideContent />` directly

4. **app/contact/page.tsx**
   - Removed isolated `I18nProvider` wrapper
   - Changed import from `I18nProvider, useI18n` to just `useI18n`
   - Export now returns `<ContactContent />` directly

5. **app/legal/privacy-policy/page.tsx**
   - Removed isolated `I18nProvider` wrapper
   - Changed import from `I18nProvider, useI18n` to just `useI18n`
   - Export now returns `<PrivacyContent />` directly

6. **app/legal/terms/page.tsx**
   - Removed isolated `I18nProvider` wrapper
   - Changed import from `I18nProvider, useI18n` to just `useI18n`
   - Export now returns `<TermsContent />` directly

7. **app/legal/refund/page.tsx**
   - Removed isolated `I18nProvider` wrapper
   - Changed import from `I18nProvider, useI18n` to just `useI18n`
   - Export now returns `<RefundContent />` directly

### Architecture
- **Single Provider**: `app/layout.tsx` provides one `I18nProvider` for entire app
- **Shared Context**: All pages now read from same context instance
- **Font Provider**: `FontProvider` wraps content and applies fonts dynamically based on locale
- **Language Switcher**: Located in `Header` component, updates global locale state

### Deployment Details

**Commit**: `24e0160` - "fix: remove isolated I18nProvider wrappers so language switcher works globally"

**Build Status**: ✅ Clean (no errors, no warnings)

**Deployment URL**: https://xhs-video-downloader-c159jv0pg-demianyuens-projects.vercel.app

**Custom Domain**: https://xhsvideodownloader.com (aliased successfully)

**Deployment Time**: ~25 seconds

**Build Output**:
```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /about
├ ƒ /api/adsense
├ ƒ /api/download
├ ƒ /api/download/[token]
├ ƒ /api/transcript
├ ○ /contact
├ ○ /guide
├ ○ /legal/privacy-policy
├ ○ /legal/refund
├ ○ /legal/terms
├ ○ /privacy
└ ○ /terms

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

### Verification Results

**All Pages Return 200**:
- ✅ Home: https://xhsvideodownloader.com/
- ✅ About: https://xhsvideodownloader.com/about
- ✅ Guide: https://xhsvideodownloader.com/guide
- ✅ Contact: https://xhsvideodownloader.com/contact
- ✅ Privacy Policy: https://xhsvideodownloader.com/legal/privacy-policy
- ✅ Terms: https://xhsvideodownloader.com/legal/terms
- ✅ Refund: https://xhsvideodownloader.com/legal/refund

**Language Switcher**:
- ✅ Renders with 3 options: 繁體中文 / 简体中文 / English
- ✅ Default locale: zh-Hant (Traditional Chinese)
- ✅ Persists selection to localStorage
- ✅ Updates all page content when changed
- ✅ Triggers font switching via FontProvider

**Font Loading**:
- ✅ Noto Sans TC loaded for Traditional Chinese
- ✅ Noto Sans SC loaded for Simplified Chinese
- ✅ Geist Sans used for English
- ✅ Fonts loaded via runtime CSS (not build-time)

### AdSense Status

**Publisher ID**: ca-pub-7935038704820292

**Integration Status**:
- ✅ AdSense script tag present in `<head>`
- ✅ Meta tag `google-adsense-account` present
- ✅ Script loads from `pagead2.googlesyndication.com`
- ⚠️ API endpoint requires env vars: `ADSENSE_ACCESS_TOKEN`, `ADSENSE_ACCOUNT_ID`

**Note**: AdSense ads will display once Google approves the account. The API endpoint is for analytics/reporting only, not required for ad display.

### Git History
```
24e0160 fix: remove isolated I18nProvider wrappers so language switcher works globally
9a66aa6 fix: clean up about page translation logic and install missing autoprefixer
2ed494b feat: add i18n language switcher, video preview, and fix download
```

### Next Steps (Optional)
1. Monitor AdSense approval status
2. Add `ADSENSE_ACCESS_TOKEN` and `ADSENSE_ACCOUNT_ID` to Vercel env vars for reporting API
3. Test language switching on live site with real users
4. Monitor font loading performance

---

**Deployed By**: Claude Sonnet 4.6
**Deployment Date**: March 8, 2026
**Status**: ✅ Live and Verified
