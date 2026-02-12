/**
 * Developer Quick Reference
 * Common commands and code snippets
 */

# 👨‍💻 Developer Quick Reference

## 🚀 Getting Started

### Installation
```bash
cd "C:\Users\kin16\OneDrive\Luna\爬蟲\xhs-downloader-web"
npm install
npm run dev
```

### Environment Setup
```bash
# Copy template
cp .env.local.example .env.local

# Add your keys
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_test_...
```

---

## 📝 Common Commands

### Development
```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npx tsc --noEmit         # Check TypeScript
```

### Testing
```bash
# Health check
curl http://localhost:3000/api/health | jq

# Get user
curl http://localhost:3000/api/user \
  -H "x-user-id: test_user_1"

# Create checkout
curl -X POST http://localhost:3000/api/payment/checkout \
  -H "Content-Type: application/json" \
  -d '{"productId":"TRANSCRIPTION_10","userId":"test_user_1"}'

# Request transcription
curl -X POST http://localhost:3000/api/transcribe \
  -H "Content-Type: application/json" \
  -H "x-user-id: test_user_1" \
  -d '{"audioUrl":"https://example.com/audio.wav","videoId":"vid_1"}'
```

### Debugging
```bash
# Watch logs
tail -f logs/app-*.log

# Search logs
grep ERROR logs/app-*.log
grep "Payment" logs/app-*.log

# Check health
curl http://localhost:3000/api/health | jq '.memory'

# Check sessions
curl http://localhost:3000/api/health | jq '.sessions'
```

---

## 🔧 Code Snippets

### Using Logger
```typescript
import { logger } from '@/lib/logger';

logger.info('User created', { userId, email });
logger.error('Payment failed', error);
logger.debug('Debug info', data);
logger.warn('Warning message', data);
```

### Using Session Manager
```typescript
import { sessionManager } from '@/lib/session-manager';

const session = sessionManager.create(url, ipAddress);
sessionManager.update(id, { status: 'completed' });
const stats = sessionManager.getStats();
```

### Using User Manager
```typescript
import { userManager } from '@/lib/user-manager';

const user = userManager.getOrCreate(userId);
userManager.addCredits(userId, 10);
userManager.deductCredits(userId, 1);
userManager.useDailyFreeCredit(userId);
```

### Using Payment Manager
```typescript
import { paymentManager } from '@/lib/payment-manager';

const sessionId = await paymentManager.createCheckoutSession(
  productId, userId, successUrl, cancelUrl
);
const result = await paymentManager.handlePaymentSuccess(sessionId);
```

### Creating API Endpoint
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const { data } = await request.json();

    logger.info('Processing request', { data });

    return NextResponse.json({
      success: true,
      result: data,
    });
  } catch (error) {
    logger.error('Request failed', error);

    return NextResponse.json(
      { error: 'Request failed' },
      { status: 500 }
    );
  }
}
```

---

## 📊 File Locations

### Source Code
```
lib/
  logger.ts                    - Logging system
  session-manager.ts           - Session tracking
  user-manager.ts              - User credits
  payment-manager.ts           - Stripe integration

app/
  api/
    health/route.ts            - Health check
    user/route.ts              - User management
    payment/
      checkout/route.ts        - Checkout creation
      webhook/route.ts         - Webhook handler
    transcribe/route.ts        - Transcription API
  payment/
    checkout/page.tsx          - Payment options
    success/page.tsx           - Success page
    cancel/page.tsx            - Cancel page
```

### Logs
```
logs/
  app-2026-02-12.log          - Daily log file
  app-2026-02-13.log          - Next day log file
```

### Configuration
```
.env.local                     - Environment variables
package.json                   - Dependencies
tsconfig.json                  - TypeScript config
next.config.js                 - Next.js config
```

---

## 🔍 Debugging Tips

### Check Server Status
```bash
# Is server running?
curl http://localhost:3000/api/health

# Check memory
curl http://localhost:3000/api/health | jq '.memory'

# Check sessions
curl http://localhost:3000/api/health | jq '.sessions'

# Check users
curl http://localhost:3000/api/health | jq '.users'
```

### Check Logs
```bash
# View recent logs
tail -20 logs/app-*.log

# Watch logs in real-time
tail -f logs/app-*.log

# Search for errors
grep ERROR logs/app-*.log

# Search for specific user
grep "test_user_1" logs/app-*.log

# Count errors
grep ERROR logs/app-*.log | wc -l
```

### Test API Endpoints
```bash
# Test with verbose output
curl -v http://localhost:3000/api/health

# Test with custom headers
curl -H "x-user-id: debug_user" http://localhost:3000/api/user

# Test POST with data
curl -X POST http://localhost:3000/api/user \
  -H "Content-Type: application/json" \
  -d '{"action":"use-free-credit"}' \
  -v

# Pretty print JSON
curl http://localhost:3000/api/health | jq
```

---

## 🐛 Common Issues

### Issue: "Cannot find module 'stripe'"
```bash
npm install stripe
```

### Issue: "STRIPE_SECRET_KEY not configured"
```bash
# Add to .env.local
STRIPE_SECRET_KEY=sk_test_your_key_here
```

### Issue: "Logs directory not found"
```bash
mkdir -p logs
```

### Issue: "Port 3000 already in use"
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### Issue: "TypeScript errors"
```bash
# Check for errors
npx tsc --noEmit

# Fix errors in code
# Then restart server
npm run dev
```

---

## 📚 Documentation Files

### Quick Reference
- `PHASE1_QUICKSTART.md` - 5-minute setup
- `PHASE1_CHECKLIST.md` - Testing guide
- `COMPLETE_SUMMARY.md` - What's been built

### Planning & Strategy
- `DEVELOPMENT_PLAN.md` - 4-week roadmap
- `MONETIZATION_STRATEGY.md` - Revenue model
- `IMPLEMENTATION_STATUS.md` - Progress report

### Deployment & Operations
- `DEPLOYMENT_GUIDE.md` - Production setup
- `ARCHITECTURE.md` - System design

---

## 🔗 Useful Links

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Stripe Docs](https://stripe.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [React Docs](https://react.dev)

### Tools
- [Postman](https://www.postman.com) - API testing
- [Stripe Dashboard](https://dashboard.stripe.com) - Payment management
- [Vercel Dashboard](https://vercel.com) - Deployment

### APIs
- [Stripe API Reference](https://stripe.com/docs/api)
- [OpenAI API](https://platform.openai.com/docs)
- [FFmpeg Documentation](https://ffmpeg.org/documentation.html)

---

## 💡 Best Practices

### Code Style
```typescript
// ✅ Good: Clear, descriptive names
const user = userManager.getOrCreate(userId);
const credits = user.credits;

// ❌ Bad: Unclear abbreviations
const u = um.getOrCreate(uid);
const c = u.c;
```

### Error Handling
```typescript
// ✅ Good: Specific error handling
try {
  const result = await riskyOperation();
  return result;
} catch (error) {
  logger.error('Operation failed', error);
  throw new Error('User-friendly message');
}

// ❌ Bad: Generic error handling
try {
  const result = await riskyOperation();
} catch (error) {
  console.log('Error');
}
```

### Logging
```typescript
// ✅ Good: Structured logging
logger.info('Payment processed', {
  userId,
  amount,
  credits,
  timestamp: Date.now(),
});

// ❌ Bad: Unstructured logging
console.log('Payment: ' + userId + ' ' + amount);
```

### API Responses
```typescript
// ✅ Good: Consistent response format
return NextResponse.json({
  success: true,
  data: result,
  message: 'Operation successful',
});

// ❌ Bad: Inconsistent format
return NextResponse.json(result);
```

---

## 🚀 Performance Tips

### Optimize API Response
```typescript
// ✅ Good: Return only needed data
return NextResponse.json({
  success: true,
  credits: user.credits,
  dailyFree: userManager.getDailyFreeCredits(userId),
});

// ❌ Bad: Return entire user object
return NextResponse.json({ success: true, user });
```

### Optimize Database Queries
```typescript
// ✅ Good: Use indexes, limit results
const users = userManager.listAll().slice(0, 100);

// ❌ Bad: Load all data
const users = userManager.listAll();
```

### Optimize Memory
```typescript
// ✅ Good: Clean up old data
sessionManager.cleanup();

// ❌ Bad: Keep all data in memory
// (no cleanup)
```

---

## 📊 Monitoring

### Key Metrics to Track
```bash
# Daily active users
curl http://localhost:3000/api/health | jq '.users.totalUsers'

# Active sessions
curl http://localhost:3000/api/health | jq '.sessions.total'

# Memory usage
curl http://localhost:3000/api/health | jq '.memory.heapUsed'

# Uptime
curl http://localhost:3000/api/health | jq '.uptime.hours'
```

### Set Up Alerts
```bash
# Monitor memory (alert if > 100MB)
watch -n 5 'curl -s http://localhost:3000/api/health | jq ".memory.heapUsed"'

# Monitor errors (alert if > 10)
watch -n 5 'grep ERROR logs/app-*.log | wc -l'

# Monitor sessions (alert if > 100)
watch -n 5 'curl -s http://localhost:3000/api/health | jq ".sessions.total"'
```

---

## 🎯 Next Steps

### This Week
1. [ ] Read `PHASE1_QUICKSTART.md`
2. [ ] Run `npm install`
3. [ ] Configure `.env.local`
4. [ ] Test all endpoints
5. [ ] Review logs

### Next Week
1. [ ] Implement audio extraction
2. [ ] Integrate OpenAI Whisper
3. [ ] Add transcription UI
4. [ ] Test end-to-end

### Week 3
1. [ ] Complete payment UI
2. [ ] Deploy to production
3. [ ] Monitor metrics
4. [ ] Launch marketing

---

**Last Updated**: 2026-02-12
**Status**: Ready for development
**Next Review**: After Phase 1 testing
