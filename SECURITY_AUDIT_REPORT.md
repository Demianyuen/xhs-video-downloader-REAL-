# 🔒 Security Audit Report - XHS Video Downloader

**Date:** 2026-02-12
**Status:** ⚠️ **CRITICAL ISSUES FOUND - NOT PRODUCTION READY**
**Risk Level:** HIGH

---

## Executive Summary

The XHS Video Downloader has **4 CRITICAL**, **7 HIGH**, **6 MEDIUM**, and **4 LOW** severity issues. The application is **NOT safe for production deployment** without immediate fixes.

### Critical Issues:
1. **Broken Authentication** - User identity spoofing via `x-user-id` header
2. **Server-Side Request Forgery (SSRF)** - URL validation bypass in download API
3. **Vulnerable Dependencies** - Next.js 14.2.5 has critical CVEs
4. **No Rate Limiting** - All endpoints are unprotected from abuse

---

## CRITICAL Issues (Fix Immediately)

### C1. Broken Authentication - User Identity Spoofing (CVSS 9.1)

**Location:** `app/api/user/route.ts` and `app/api/transcribe/route.ts`

**Problem:** The `x-user-id` HTTP header is trusted without verification. Any attacker can impersonate any user.

```typescript
// VULNERABLE CODE
function getUserId(request: NextRequest): string {
  const header = request.headers.get('x-user-id');  // ❌ ATTACKER-CONTROLLED
  return header || `user_${Date.now()}_...`;
}
```

**Impact:**
- Attackers can spend other users' credits
- Access other users' account data
- Bypass daily free limits

**Fix:** Remove header trust, use signed HttpOnly cookies only.

---

### C2. Server-Side Request Forgery (SSRF) (CVSS 8.6)

**Location:** `app/api/download/route.ts:116-121`

**Problem:** URL validation only checks if string *contains* `xiaohongshu.com`. This is trivially bypassed.

```typescript
// VULNERABLE CODE
if (!url.includes('xiaohongshu.com') && !url.includes('xhslink.com')) {
  // rejected
}
```

**Bypass Examples:**
- `http://evil.com/?redirect=xiaohongshu.com` ✅ Passes
- `http://xiaohongshu.com.evil.com/` ✅ Passes
- `http://169.254.169.254/latest/meta-data?q=xiaohongshu.com` ✅ Passes (AWS metadata SSRF)

**Impact:** Attackers can access internal network resources, cloud metadata, or use your server as a proxy.

**Fix:** Use strict URL parsing with hostname whitelist.

---

### C3. Critical Dependency Vulnerabilities (CVSS 9.1)

**Location:** `package.json:13` - `next@14.2.5`

**Vulnerabilities:**
- CRITICAL: Authorization Bypass in Next.js Middleware
- HIGH: Cache Poisoning
- HIGH: SSRF via Middleware Redirect
- HIGH: Multiple DoS vectors

**Fix:** Update immediately:
```bash
npm install next@latest
npm audit fix
```

---

### C4. No Rate Limiting (CVSS 8.0)

**Location:** All API endpoints

**Problem:** Despite `.env.local` defining limits, they're never enforced. Every endpoint is completely unprotected.

**Impact:**
- Unlimited scraping requests to XHS
- Unlimited credit usage attempts
- Unlimited user creation
- Unlimited Stripe checkout sessions (costs money)
- XHS IP banning

**Fix:** Implement rate limiting middleware on all endpoints.

---

## HIGH Issues (Fix Before Production)

### H1. Health Endpoint Exposes System Information (CVSS 7.5)

**Location:** `app/api/health/route.ts`

**Exposed Data:**
- OS platform, architecture, CPU count
- System memory details
- Node.js version
- Heap memory usage
- Active session counts
- User statistics

**Fix:** Protect with admin API key or strip sensitive data.

---

### H2. Insecure Cookie - No HttpOnly, No Secure, No SameSite (CVSS 7.1)

**Location:** `app/payment/checkout/page.tsx:39`

**Problem:**
```typescript
// VULNERABLE CODE
document.cookie = `userId=${id}; path=/; max-age=31536000`;
```

**Issues:**
- Accessible to JavaScript (XSS can steal it)
- Sent over HTTP (no `Secure` flag)
- No `SameSite` attribute (CSRF vulnerable)
- Set client-side (can be manipulated)

**Fix:** Set cookies server-side with proper flags.

---

### H3. Weak Random Number Generation (CVSS 7.0)

**Location:** `app/api/user/route.ts:15`, `app/api/download/route.ts:101`

**Problem:**
```typescript
// VULNERABLE CODE
`user_${Date.now()}_${Math.random().toString(36).substring(7)}`
```

**Issue:** `Math.random()` is predictable. Attackers can brute-force valid IDs.

**Fix:** Use `crypto.randomUUID()`.

---

### H4. In-Memory Data Store - No Persistence (CVSS 7.0)

**Location:** All data storage

**Problem:** All data stored in JavaScript `Map` objects. Lost on server restart.

**Impact:**
- Users who pay real money lose credits on restart
- No transaction safety for payments
- Serverless deployments (Vercel) create separate instances - data lost between requests

**Fix:** Use persistent database (Supabase, PlanetScale, SQLite).

---

### H5. Duplicate videoStore - Data Never Retrievable (CVSS 7.0)

**Location:** `app/api/download/route.ts:12` and `app/api/video/[id]/route.ts:5`

**Problem:** Both files declare separate `const videoStore = new Map()`. Download stores data in one Map, retrieval reads from a different Map.

**Impact:** **Core feature is broken** - no downloaded video can ever be viewed.

**Fix:** Use shared database or export/import the same Map instance.

---

### H6. No CORS/Security Headers (CVSS 6.8)

**Location:** `next.config.mjs`

**Problem:** No security headers configured. Any origin can make requests.

**Fix:** Add security headers in Next.js config.

---

### H7. Sensitive Data Logged to Disk (CVSS 6.5)

**Location:** `lib/logger.ts` and `logs/app-2026-02-12.log`

**Problem:** Full URLs with security tokens logged to disk:
```
[INFO] Processing video | {"url":"https://www.xiaohongshu.com/explore/...?xsec_token=ABl8MJnXXg17hVM4j71uVZwiptEPbxtbPhdlm6s_fj9Mg=..."}
```

**Impact:** Sensitive tokens exposed in log files.

**Fix:** Sanitize URLs before logging, add `logs/` to `.gitignore`.

---

## MEDIUM Issues

### M1. No Content Security Policy (CVSS 6.1)
- No CSP header set
- Third-party scripts can be injected

### M2. Untrusted Image Sources (CVSS 5.4)
- Thumbnail URLs from scraped content
- Could load arbitrary images or tracking pixels

### M3. Untrusted URL in window.open (CVSS 5.3)
- `window.open(videoData.videoUrl)` could execute arbitrary code
- Need protocol validation

### M4. Stripe Initialization with Empty String (CVSS 5.0)
- Fails silently if `STRIPE_SECRET_KEY` not set
- Should fail fast

### M5. No Input Validation (CVSS 5.0)
- POST body fields not validated
- Need Zod schema validation

### M6. Object Mutation Race Conditions (CVSS 4.0)
- Direct object mutations in UserManager
- Race conditions on credit operations

---

## LOW Issues

### L1. Console Logs in Production (CVSS 3.1)
- `console.error` and `console.log` expose error details

### L2. Placeholder Email (CVSS 2.0)
- `support@xhsdownloader.top` - verify domain ownership

### L3. Unused Dependencies (CVSS 2.0)
- `fluent-ffmpeg` and `ffmpeg-static` never used
- Increase attack surface

### L4. Missing API Endpoint (CVSS 2.0)
- `/api/payment/verify` called but doesn't exist
- Payment verification flow broken

---

## OWASP Top 10 Compliance

| # | Category | Status | Notes |
|---|----------|--------|-------|
| A01 | Broken Access Control | ❌ FAIL | No auth on endpoints; health endpoint exposes data |
| A02 | Cryptographic Failures | ❌ FAIL | `Math.random()` for IDs; no signed cookies |
| A03 | Injection | ❌ FAIL | SSRF vulnerability; unvalidated inputs |
| A04 | Insecure Design | ❌ FAIL | In-memory storage; no rate limiting; race conditions |
| A05 | Security Misconfiguration | ❌ FAIL | No security headers; no CSP; empty config |
| A06 | Vulnerable Components | ❌ FAIL | Next.js 14.2.5 has critical CVEs |
| A07 | Auth Failures | ❌ FAIL | Spoofable user identity; insecure cookies |
| A08 | Data Integrity Failures | ⚠️ WARN | Webhook signature verified, but no idempotency |
| A09 | Logging Failures | ❌ FAIL | Sensitive tokens logged; no monitoring |
| A10 | SSRF | ❌ FAIL | Download API is exploitable |

---

## Priority Remediation Order

### Phase 1: Critical (Do First - 2 hours)
1. Update Next.js to latest patch (30 min)
2. Fix SSRF with strict URL parsing (30 min)
3. Remove `x-user-id` header trust (30 min)
4. Add rate limiting to all endpoints (30 min)

### Phase 2: High (Before Deployment - 4 hours)
5. Add security headers in `next.config.mjs` (30 min)
6. Fix duplicate videoStore bug (30 min)
7. Secure cookies with HttpOnly/Secure/SameSite (1 hr)
8. Replace `Math.random()` with `crypto.randomUUID()` (30 min)
9. Add input validation with Zod (1 hr)
10. Protect health endpoint (30 min)

### Phase 3: Medium (Before Public Launch - 3 hours)
11. Sanitize log output (1 hr)
12. Add CSP headers (30 min)
13. Validate URLs in window.open (30 min)
14. Remove unused dependencies (15 min)

### Phase 4: Long-term (After MVP)
15. Add persistent database (significant effort)
16. Implement proper authentication system
17. Add comprehensive monitoring and alerting

---

## Deployment Checklist

- [ ] All CRITICAL issues fixed
- [ ] All HIGH issues fixed
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] Logging sanitized
- [ ] Dependencies updated
- [ ] Environment variables validated
- [ ] HTTPS enforced
- [ ] CORS properly configured
- [ ] Security audit passed
- [ ] Penetration testing completed
- [ ] Ready for production

---

## Recommendations

### Immediate Actions (Before Any Public Access)
1. **Fix SSRF vulnerability** - This can be exploited immediately
2. **Remove authentication bypass** - Users can impersonate each other
3. **Update Next.js** - Critical CVEs in current version
4. **Add rate limiting** - Prevent abuse and resource exhaustion

### Before Production Deployment
1. Implement persistent database (Supabase recommended)
2. Add proper authentication system
3. Configure all security headers
4. Set up monitoring and alerting
5. Conduct security penetration testing

### For Long-term Security
1. Regular security audits
2. Dependency vulnerability scanning
3. Security training for team
4. Incident response plan
5. Regular backups and disaster recovery

---

## Contact & Support

For security issues, please report privately to: `security@xhsdownloader.top`

**Do NOT** disclose security vulnerabilities publicly.

---

**Report Generated:** 2026-02-12
**Next Review:** After fixes are implemented
