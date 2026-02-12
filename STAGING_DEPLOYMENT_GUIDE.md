# 🚀 Staging Deployment Guide

**Project:** XHS Video Downloader
**Status:** Ready for Staging
**Date:** 2026-02-12

---

## 📋 Pre-Deployment Checklist

### Environment Setup
- [ ] Vercel account ready
- [ ] GitHub repository connected
- [ ] Environment variables prepared
- [ ] Database configured (if using)
- [ ] Payment test accounts created

### Code Verification
- [ ] All 7 days completed
- [ ] Build successful locally
- [ ] No TypeScript errors
- [ ] All commits pushed to GitHub
- [ ] Latest code on main branch

---

## 🔧 Staging Deployment Steps

### Step 1: Prepare Environment Variables

Create `.env.staging` file with:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://xhs-downloader-staging.vercel.app

# Payment Configuration (Test Mode)
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
WECHAT_APP_ID=test_app_id
WECHAT_MCH_ID=test_mch_id
WECHAT_API_KEY=test_api_key
ALIPAY_APP_ID=test_app_id
ALIPAY_PRIVATE_KEY=test_private_key
ALIPAY_PUBLIC_KEY=test_public_key

# Database Configuration (if using)
DATABASE_URL=postgresql://user:password@localhost:5432/xhs_staging

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G_XXXXXXXXXX
```

### Step 2: Deploy to Vercel

**Option A: Using Vercel Dashboard**
1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Select GitHub repository
4. Configure project settings:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Add environment variables from `.env.staging`
6. Click "Deploy"

**Option B: Using Vercel CLI**
```bash
npm install -g vercel
vercel --prod --env-file .env.staging
```

### Step 3: Verify Deployment

After deployment completes:

1. **Check Build Status**
   - Visit Vercel dashboard
   - Verify build completed successfully
   - Check for any build warnings

2. **Test Website Loading**
   - Visit https://xhs-downloader-staging.vercel.app
   - Verify landing page loads
   - Check animations work smoothly
   - Test responsive design on mobile

3. **Verify All Pages**
   - [ ] Home page (/)
   - [ ] Download page (/download/[id])
   - [ ] Pricing page (/pricing)
   - [ ] FAQ page (/faq)
   - [ ] About page (/about)
   - [ ] Privacy page (/privacy)
   - [ ] Terms page (/terms)
   - [ ] Contact page (/contact)
   - [ ] Subscription page (/subscription)
   - [ ] Payment pages (/payment/*)

---

## 🧪 Staging Testing Plan

### Phase 1: Smoke Testing (30 minutes)

**Basic Functionality**
- [ ] Landing page loads without errors
- [ ] All navigation links work
- [ ] Animations play smoothly
- [ ] Mobile responsive design works
- [ ] Dark mode toggle works (if implemented)

**Console Checks**
- [ ] No JavaScript errors in console
- [ ] No TypeScript errors
- [ ] No network errors
- [ ] Performance metrics acceptable

### Phase 2: Feature Testing (1-2 hours)

**Download Feature**
- [ ] Paste XHS URL
- [ ] Click download button
- [ ] Select resolution
- [ ] Verify download starts
- [ ] Test error handling (invalid URL)
- [ ] Test rate limiting (5 downloads/day)

**Share Buttons**
- [ ] Twitter share works
- [ ] Facebook share works
- [ ] WhatsApp share works
- [ ] Copy link button works

**Subscription Management**
- [ ] View current subscription
- [ ] See remaining downloads
- [ ] View upgrade options
- [ ] Navigate to pricing page

**Payment Flow (Test Mode)**
- [ ] Click upgrade button
- [ ] Select payment method
- [ ] Complete test payment
- [ ] Verify subscription updated
- [ ] Check payment success page

### Phase 3: User Experience Testing (1 hour)

**Navigation**
- [ ] All links work correctly
- [ ] Back button works
- [ ] Breadcrumbs work (if present)
- [ ] Search functionality works (if present)

**Forms**
- [ ] Contact form submits
- [ ] Form validation works
- [ ] Error messages display
- [ ] Success messages display

**Performance**
- [ ] Page load time < 2.5s
- [ ] Animations smooth (60fps)
- [ ] No layout shifts
- [ ] Images load quickly

### Phase 4: Accessibility Testing (30 minutes)

**Keyboard Navigation**
- [ ] Tab through all interactive elements
- [ ] Enter key activates buttons
- [ ] Escape closes modals
- [ ] Focus indicators visible

**Screen Reader**
- [ ] Page structure makes sense
- [ ] Images have alt text
- [ ] Form labels present
- [ ] Buttons have accessible names

**Color Contrast**
- [ ] Text readable on all backgrounds
- [ ] Contrast ratio >= 4.5:1
- [ ] Color not only indicator

### Phase 5: Security Testing (30 minutes)

**HTTPS & Headers**
- [ ] All requests use HTTPS
- [ ] Security headers present
- [ ] No mixed content warnings

**Input Validation**
- [ ] Invalid URLs rejected
- [ ] XSS attempts blocked
- [ ] CSRF protection working
- [ ] Rate limiting enforced

**Data Protection**
- [ ] No sensitive data in logs
- [ ] Cookies secure (HttpOnly, Secure, SameSite)
- [ ] No data leaks in console

---

## 📊 Testing Checklist

### Critical Flows
- [ ] Download video flow works end-to-end
- [ ] Subscribe to premium flow works
- [ ] Share video flow works
- [ ] View subscription flow works

### Error Scenarios
- [ ] Invalid URL error handled
- [ ] Rate limit error shown
- [ ] Payment failure handled
- [ ] Network error handled
- [ ] Server error handled

### Browser Compatibility
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

### Device Testing
- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] Large screen (2560x1440)

---

## 🐛 Bug Reporting Template

If you find issues during testing, use this template:

```
**Title:** [Brief description of issue]

**Environment:**
- Browser: [Chrome/Firefox/Safari/Edge]
- Device: [Desktop/Tablet/Mobile]
- URL: [https://xhs-downloader-staging.vercel.app/...]

**Steps to Reproduce:**
1. [First step]
2. [Second step]
3. [Third step]

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Screenshots/Videos:**
[Attach if possible]

**Severity:**
- [ ] Critical (blocks usage)
- [ ] High (major feature broken)
- [ ] Medium (feature partially broken)
- [ ] Low (minor issue)
```

---

## 📈 Performance Monitoring

### Metrics to Track

**Page Performance**
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- First Input Delay (FID)

**Business Metrics**
- Page load time
- Error rate
- Conversion rate
- User engagement

### Tools to Use

1. **Lighthouse** (Chrome DevTools)
   - Run audit on each page
   - Target score: 90+

2. **WebPageTest**
   - Test from different locations
   - Analyze waterfall charts

3. **Google Analytics** (if configured)
   - Track user behavior
   - Monitor conversion funnel

---

## 🔄 Feedback Collection

### User Testing
1. Share staging URL with beta users
2. Collect feedback on:
   - Ease of use
   - Feature completeness
   - Performance
   - Design/UX
   - Any bugs or issues

### Feedback Channels
- [ ] Email feedback form
- [ ] In-app feedback widget
- [ ] User interviews
- [ ] Analytics data

---

## ✅ Sign-Off Checklist

Before moving to production, verify:

- [ ] All critical flows tested and working
- [ ] No critical bugs found
- [ ] Performance acceptable (Lighthouse > 90)
- [ ] Security checks passed
- [ ] Accessibility verified
- [ ] Mobile responsive
- [ ] Payment flow tested (test mode)
- [ ] Error handling working
- [ ] User feedback positive
- [ ] Team approval obtained

---

## 🚀 Production Deployment

Once staging testing is complete and approved:

1. **Final Verification**
   - [ ] All staging tests passed
   - [ ] No critical issues
   - [ ] Team sign-off obtained

2. **Production Deployment**
   - [ ] Update environment variables for production
   - [ ] Deploy to production environment
   - [ ] Verify production deployment
   - [ ] Monitor closely first 24 hours

3. **Post-Deployment**
   - [ ] Monitor error logs
   - [ ] Track user feedback
   - [ ] Monitor conversion rate
   - [ ] Monitor payment processing
   - [ ] Gather analytics

---

## 📞 Support & Escalation

### During Staging Testing
- **Critical Issues:** Fix immediately
- **High Priority:** Fix within 24 hours
- **Medium Priority:** Fix within 48 hours
- **Low Priority:** Fix before production

### Contact Information
- **Support Email:** support@xhsdownloader.top
- **Technical Issues:** technical@xhsdownloader.top
- **Emergency:** [Your phone number]

---

## 📝 Testing Report Template

After completing all testing phases, create a report:

```markdown
# Staging Testing Report

**Date:** [Date]
**Tester:** [Name]
**Environment:** Staging
**URL:** https://xhs-downloader-staging.vercel.app

## Summary
- Total Tests: [X]
- Passed: [X]
- Failed: [X]
- Blocked: [X]

## Critical Issues
[List any critical issues found]

## High Priority Issues
[List any high priority issues]

## Recommendations
[Any recommendations for production]

## Sign-Off
- [ ] Ready for production deployment
- [ ] Needs more testing
- [ ] Needs fixes before production
```

---

## 🎯 Next Steps

1. **Immediate (Today)**
   - [ ] Prepare environment variables
   - [ ] Deploy to Vercel staging
   - [ ] Verify deployment successful

2. **Day 1-2 (Smoke Testing)**
   - [ ] Test basic functionality
   - [ ] Verify all pages load
   - [ ] Check for console errors

3. **Day 2-3 (Feature Testing)**
   - [ ] Test download feature
   - [ ] Test share buttons
   - [ ] Test subscription management
   - [ ] Test payment flow (test mode)

4. **Day 3-4 (UX & Performance)**
   - [ ] Test user experience
   - [ ] Verify performance metrics
   - [ ] Test accessibility
   - [ ] Test security

5. **Day 4-5 (Final Review)**
   - [ ] Collect user feedback
   - [ ] Fix any issues found
   - [ ] Final sign-off
   - [ ] Prepare for production

6. **Day 5+ (Production)**
   - [ ] Deploy to production
   - [ ] Monitor closely
   - [ ] Gather user feedback
   - [ ] Plan improvements

---

**Status:** ✅ Ready for Staging Deployment
**Estimated Testing Time:** 4-5 days
**Estimated Time to Production:** 1-2 weeks
