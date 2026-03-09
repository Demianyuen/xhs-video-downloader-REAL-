# Google AdSense Setup Guide

## Current Status: ⏳ Awaiting Approval

**Request Date**: 01 Mar 2026 14:31
**Publisher ID**: `ca-pub-7935038704820292`
**Expected Approval Time**: 2-4 weeks (typically a few days)

---

## ✅ What's Already Done

1. **AdSense Script Loaded** (`app/layout.tsx` line 118)
   - Publisher ID configured
   - Script loads on every page
   - Meta verification tag present (line 109)

2. **AdSense Component Created** (`components/AdSense.tsx`)
   - Reusable component for all ad placements
   - Supports multiple ad formats (horizontal, vertical, fluid, auto)
   - Publisher ID pre-configured

3. **Ad Placement Added** (`app/page.tsx`)
   - Horizontal banner ad below main content
   - Styled with pink theme to match site design
   - Ready for ad slot ID

4. **Privacy Policy Compliant**
   - AdSense usage disclosed in `/privacy` page
   - GDPR/CCPA compliant

---

## 📋 Next Steps (After Approval)

### Step 1: Check Approval Status
1. Go to https://www.google.com/adsense
2. Check if your account status shows "Approved"
3. You'll receive an email notification when approved

### Step 2: Create Ad Units
Once approved, create ad units in your AdSense dashboard:

1. Go to **Ads** → **By ad unit**
2. Click **Display ads**
3. Create a new ad unit:
   - **Name**: "XHS Downloader - Main Banner"
   - **Type**: Display ad
   - **Size**: Responsive
4. Copy the **Ad slot ID** (format: `1234567890`)

### Step 3: Update Ad Slot IDs

Replace placeholder ad slot IDs in your code:

**File**: `app/page.tsx` (line ~283)
```tsx
<AdSense
  adSlot="YOUR_AD_SLOT_ID_1"  // ← Replace with actual ad slot ID
  adFormat="horizontal"
  style={{ display: 'block', minHeight: '90px' }}
/>
```

### Step 4: Add More Ad Placements (Optional)

You can add more ads in strategic locations:

#### Example 1: Sidebar Ad (if you add a sidebar)
```tsx
<AdSense
  adSlot="YOUR_AD_SLOT_ID_2"
  adFormat="vertical"
  style={{ display: 'block', width: '300px', height: '600px' }}
/>
```

#### Example 2: In-Feed Ad (between content sections)
```tsx
<AdSense
  adSlot="YOUR_AD_SLOT_ID_3"
  adFormat="fluid"
  style={{ display: 'block' }}
/>
```

#### Example 3: Footer Ad
```tsx
<AdSense
  adSlot="YOUR_AD_SLOT_ID_4"
  adFormat="horizontal"
  style={{ display: 'block', minHeight: '90px' }}
/>
```

### Step 5: Deploy to Production

After updating ad slot IDs:

```bash
cd C:/Users/user/xhs-video-downloader-fix
git add app/page.tsx
git commit -m "feat: add AdSense ad slot IDs after approval"
git push origin main
```

Vercel will automatically deploy the changes.

---

## 🔍 Verification

### How to Check if Ads Are Working

1. **Visit your live site**: https://xhs-downloader-web-rust.vercel.app
2. **Look for ad spaces**: You should see actual ads instead of gray placeholders
3. **Check browser console**: Open DevTools → Console, look for AdSense errors
4. **Wait 10-20 minutes**: Ads may take time to appear after first deployment

### Common Issues

**Issue**: Ads not showing after adding slot IDs
- **Solution**: Wait 10-20 minutes for AdSense to propagate
- **Solution**: Clear browser cache and reload
- **Solution**: Check browser console for errors

**Issue**: "AdSense account not approved yet"
- **Solution**: Wait for Google's approval email
- **Solution**: Check AdSense dashboard for approval status

**Issue**: Blank ad spaces
- **Solution**: Verify ad slot ID is correct (no typos)
- **Solution**: Ensure Publisher ID matches in both layout.tsx and AdSense.tsx
- **Solution**: Check if ad units are active in AdSense dashboard

---

## 📊 Monitoring Revenue

### Using the Built-in AdSense API

Your project includes an AdSense monitoring API at `/api/adsense`:

**Get Daily Report**:
```bash
curl "https://your-domain.com/api/adsense?action=report&period=daily&daysBack=7"
```

**Monitor Metrics**:
```bash
curl "https://your-domain.com/api/adsense?action=monitor"
```

**Project Revenue**:
```bash
curl "https://your-domain.com/api/adsense?action=projection&daysAhead=30"
```

**Note**: You'll need to set up OAuth2 credentials and add them to environment variables:
- `ADSENSE_ACCESS_TOKEN`
- `ADSENSE_ACCOUNT_ID`

---

## 📝 Quick Reference

| Item | Value |
|------|-------|
| Publisher ID | `ca-pub-7935038704820292` |
| Script Location | `app/layout.tsx` line 118 |
| Component Location | `components/AdSense.tsx` |
| Current Ad Placement | `app/page.tsx` line ~283 |
| Privacy Policy | `/privacy` |

---

## 🎯 Recommended Ad Placements

For optimal revenue without hurting user experience:

1. **Top Banner** (✅ Already added)
   - Below main content, above footer
   - Horizontal format
   - High visibility

2. **Between Content Sections** (Recommended)
   - After "How to Download" section
   - Fluid/responsive format
   - Natural content break

3. **Sidebar** (If you add one)
   - Vertical format
   - Sticky positioning
   - Always visible while scrolling

**Avoid**:
- ❌ Too many ads (max 3-4 per page)
- ❌ Ads above the fold (can hurt SEO)
- ❌ Ads that block content
- ❌ Auto-playing video ads (user experience)

---

## 🚀 After Setup

Once ads are live and generating revenue:

1. **Monitor Performance**: Check AdSense dashboard daily
2. **Optimize Placement**: Test different ad positions
3. **A/B Testing**: Try different ad formats
4. **Track Metrics**: Use the built-in API to monitor revenue trends

---

**Last Updated**: 2026-03-10
**Status**: Awaiting AdSense approval (requested 01 Mar 2026)
