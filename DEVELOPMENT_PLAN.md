# XHS Downloader Web - Development Plan
**Date**: 2026-02-12
**Goal**: Debug project, add transcription features, implement monetization
**Target Revenue**: $10 USD (Phase 1)

---

## 📊 Current Project Status

### ✅ What's Working
- **Frontend**: React/Next.js UI with download form
- **Video Extraction**: Extracts video URLs from XHS pages using HTML parsing
- **Direct Download**: Opens video URL directly in browser (no token system)
- **Rate Limiting**: 5 downloads/day with 15-second cooldown
- **UI/UX**: Clean interface with ad spaces for monetization
- **Responsive Design**: Works on desktop and mobile

### ⚠️ Current Issues to Debug
1. **No Token System**: Videos stream directly without security tokens
2. **No File Cleanup**: Temporary files may accumulate
3. **No Session Management**: No tracking of downloads
4. **No Error Logging**: Limited debugging information
5. **No Transcription**: No audio extraction or transcription
6. **No Payment Integration**: No Stripe integration
7. **No User Tracking**: Can't identify premium vs free users

### 📁 Project Structure
```
xhs-downloader-web/
├── app/
│   ├── api/
│   │   └── download/
│   │       └── route.ts          (Main download API)
│   ├── page.tsx                  (Frontend UI)
│   └── layout.tsx
├── lib/                          (Utilities - currently empty)
├── package.json
├── .env.local
└── Documentation files
```

---

## 🔧 Phase 1: Debugging & Stabilization (Week 1)

### 1.1 Add Comprehensive Logging
**Files to Create/Modify**:
- `lib/logger.ts` - Centralized logging system
- `app/api/download/route.ts` - Add logging

**Tasks**:
```typescript
// lib/logger.ts
export const logger = {
  info: (msg: string, data?: any) => console.log(`[INFO] ${msg}`, data),
  error: (msg: string, error?: any) => console.error(`[ERROR] ${msg}`, error),
  debug: (msg: string, data?: any) => console.log(`[DEBUG] ${msg}`, data),
  warn: (msg: string, data?: any) => console.warn(`[WARN] ${msg}`, data),
}
```

**Checklist**:
- [ ] Log all API requests with timestamp
- [ ] Log video extraction attempts
- [ ] Log errors with full stack traces
- [ ] Log rate limit hits
- [ ] Create log file in `logs/` directory

---

### 1.2 Add Session Management
**Files to Create**:
- `lib/session-manager.ts` - Track download sessions
- `lib/database.ts` - In-memory session storage

**Tasks**:
```typescript
// lib/session-manager.ts
interface Session {
  id: string
  url: string
  videoUrl: string
  metadata: { title: string; author: string }
  status: 'pending' | 'downloading' | 'ready' | 'completed'
  createdAt: number
  completedAt?: number
  ipAddress: string
}

export const sessionManager = {
  create: (url: string, ipAddress: string) => Session,
  update: (id: string, status: string) => void,
  get: (id: string) => Session | null,
  list: () => Session[],
}
```

**Checklist**:
- [ ] Create session on download start
- [ ] Update session status during download
- [ ] Store IP address for analytics
- [ ] Clean up old sessions (>1 hour)
- [ ] Add session list endpoint for debugging

---

### 1.3 Add Error Handling & Validation
**Files to Modify**:
- `app/api/download/route.ts` - Better error handling

**Tasks**:
```typescript
// Validate URL format
// Validate video extraction
// Handle network errors
// Handle timeout errors
// Return detailed error messages
```

**Checklist**:
- [ ] Validate XHS URL format
- [ ] Check if URL is accessible
- [ ] Handle video extraction failures
- [ ] Handle network timeouts
- [ ] Return 400/500 with clear messages

---

### 1.4 Add Health Check Endpoint
**Files to Create**:
- `app/api/health/route.ts` - System health check

**Tasks**:
```typescript
// GET /api/health
// Returns: {
//   status: 'ok' | 'error',
//   uptime: number,
//   sessions: number,
//   memory: number,
//   timestamp: number
// }
```

**Checklist**:
- [ ] Check server uptime
- [ ] Count active sessions
- [ ] Monitor memory usage
- [ ] Check disk space
- [ ] Return JSON response

---

## 🎙️ Phase 2: Transcription Feature (Week 2-3)

### 2.1 Audio Extraction
**Files to Create**:
- `lib/audio-extractor.ts` - Extract audio from video
- `app/api/transcribe/route.ts` - Transcription API

**Dependencies to Add**:
```json
{
  "ffmpeg-static": "^5.1.0",
  "fluent-ffmpeg": "^2.1.2"
}
```

**Tasks**:
```typescript
// lib/audio-extractor.ts
export async function extractAudio(videoPath: string): Promise<string> {
  // Use ffmpeg to extract audio
  // Save as .wav or .mp3
  // Return audio file path
}
```

**Checklist**:
- [ ] Install ffmpeg
- [ ] Create audio extraction function
- [ ] Handle different video formats
- [ ] Optimize audio quality (16kHz, mono)
- [ ] Add error handling

---

### 2.2 Transcription Integration
**Options**:
1. **OpenAI Whisper API** - $0.006 per minute
2. **Google Cloud Speech-to-Text** - $0.024 per 15 seconds
3. **Azure Speech Services** - $1 per hour
4. **Local Whisper** - Free but slower

**Recommendation**: Start with OpenAI Whisper (easiest integration)

**Files to Create**:
- `lib/transcription-service.ts` - Transcription logic
- `app/api/transcribe/route.ts` - Transcription endpoint

**Tasks**:
```typescript
// lib/transcription-service.ts
export async function transcribeAudio(audioPath: string): Promise<{
  text: string
  language: string
  duration: number
  confidence: number
}> {
  // Call OpenAI Whisper API
  // Return transcription
}
```

**Checklist**:
- [ ] Set up OpenAI API key
- [ ] Create transcription function
- [ ] Handle long audio files (split into chunks)
- [ ] Cache transcriptions
- [ ] Add language detection

---

### 2.3 Transcription UI
**Files to Modify**:
- `app/page.tsx` - Add transcription button
- `app/components/TranscriptionResult.tsx` - Display results

**Tasks**:
- [ ] Add "Get Transcription" button after download
- [ ] Show transcription loading state
- [ ] Display transcription text
- [ ] Add copy-to-clipboard button
- [ ] Add download as .txt option

---

### 2.4 Transcription Storage
**Files to Create**:
- `lib/transcription-cache.ts` - Cache transcriptions

**Tasks**:
```typescript
// Store transcriptions in memory with video URL as key
// Expire after 24 hours
// Limit cache size to 100MB
```

**Checklist**:
- [ ] Create in-memory cache
- [ ] Add cache expiration
- [ ] Add cache size limits
- [ ] Add cache statistics endpoint

---

## 💳 Phase 3: Monetization with Stripe (Week 3-4)

### 3.1 Stripe Setup
**Tasks**:
- [ ] Create Stripe account
- [ ] Get API keys (publishable + secret)
- [ ] Set up webhook endpoint
- [ ] Configure payment methods

**Files to Create**:
- `.env.local` - Add Stripe keys
- `lib/stripe-client.ts` - Stripe initialization

---

### 3.2 Payment Models
**Option A: Pay-Per-Transcription** (Recommended for $10 goal)
- Free: 1 transcription/day
- Premium: $0.99 for 10 transcriptions
- Or: $4.99/month unlimited

**Option B: Subscription**
- Free: 5 downloads/day, no transcription
- Pro: $2.99/month - unlimited downloads + transcription
- Premium: $9.99/month - all features + priority

**Option C: Credits System**
- Free: 5 credits/day
- 1 download = 1 credit
- 1 transcription = 2 credits
- Buy 50 credits for $4.99

**Recommendation**: Start with Option A (Pay-Per-Transcription)

---

### 3.3 Payment Integration
**Files to Create**:
- `app/api/payment/create-checkout/route.ts` - Create checkout session
- `app/api/payment/webhook/route.ts` - Handle Stripe webhooks
- `lib/payment-manager.ts` - Payment logic
- `app/components/PaymentModal.tsx` - Payment UI

**Tasks**:
```typescript
// app/api/payment/create-checkout/route.ts
export async function POST(request: NextRequest) {
  const { userId, productId } = await request.json()

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: '10 Transcriptions' },
        unit_amount: 99, // $0.99
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
  })

  return NextResponse.json({ sessionId: session.id })
}
```

**Checklist**:
- [ ] Create Stripe checkout session
- [ ] Handle successful payments
- [ ] Handle failed payments
- [ ] Add webhook for payment confirmation
- [ ] Update user credits on payment

---

### 3.4 User Credits System
**Files to Create**:
- `lib/user-manager.ts` - User data management
- `lib/credits-manager.ts` - Credit tracking

**Tasks**:
```typescript
// lib/user-manager.ts
interface User {
  id: string
  email?: string
  credits: number
  dailyFreeCredits: number
  lastFreeCreditsReset: number
  totalSpent: number
  createdAt: number
}

export const userManager = {
  getOrCreate: (userId: string) => User,
  addCredits: (userId: string, amount: number) => void,
  deductCredits: (userId: string, amount: number) => boolean,
  getDailyFreeCredits: (userId: string) => number,
}
```

**Checklist**:
- [ ] Create user on first visit
- [ ] Track credits per user
- [ ] Reset daily free credits at midnight
- [ ] Prevent credit deduction if insufficient
- [ ] Log all credit transactions

---

### 3.5 Transcription Paywall
**Files to Modify**:
- `app/api/transcribe/route.ts` - Add credit check
- `app/page.tsx` - Show credit balance

**Tasks**:
```typescript
// Check user credits before transcription
// Deduct credits on successful transcription
// Show "Buy Credits" button if insufficient
// Display credit balance in UI
```

**Checklist**:
- [ ] Check credits before transcription
- [ ] Deduct credits on success
- [ ] Show payment modal if insufficient
- [ ] Display credit balance
- [ ] Show daily free transcription count

---

## 📈 Phase 4: Analytics & Optimization (Week 4)

### 4.1 Analytics Tracking
**Files to Create**:
- `lib/analytics.ts` - Event tracking
- `app/api/analytics/route.ts` - Analytics endpoint

**Events to Track**:
- Download attempts (success/failure)
- Transcription requests (success/failure)
- Payment attempts (success/failure)
- User signups
- Credit purchases
- Daily active users

**Checklist**:
- [ ] Track all key events
- [ ] Store analytics in database
- [ ] Create analytics dashboard
- [ ] Monitor conversion rates

---

### 4.2 Performance Optimization
**Tasks**:
- [ ] Cache video metadata
- [ ] Optimize audio extraction
- [ ] Parallel transcription processing
- [ ] Add request rate limiting
- [ ] Monitor API response times

**Checklist**:
- [ ] Profile API endpoints
- [ ] Identify bottlenecks
- [ ] Optimize slow operations
- [ ] Add caching where appropriate

---

## 🚀 Implementation Roadmap

### Week 1: Debugging & Stabilization
```
Mon-Tue: Logging + Session Management
Wed-Thu: Error Handling + Health Check
Fri: Testing + Bug Fixes
```

### Week 2-3: Transcription Feature
```
Mon-Tue: Audio Extraction (ffmpeg)
Wed-Thu: Transcription Integration (OpenAI)
Fri: UI + Testing
```

### Week 3-4: Monetization
```
Mon-Tue: Stripe Setup + Payment Integration
Wed-Thu: Credits System + Paywall
Fri: Testing + Optimization
```

### Week 4: Analytics & Launch
```
Mon-Tue: Analytics + Monitoring
Wed-Thu: Performance Optimization
Fri: Final Testing + Launch
```

---

## 💰 Revenue Projection

### Pricing Strategy
- **Free Tier**: 1 transcription/day
- **Pay-Per**: $0.99 for 10 transcriptions
- **Monthly**: $4.99/month unlimited

### Target: $10 USD
- **Scenario 1**: 10 users × $0.99 = $9.90 ✓
- **Scenario 2**: 2 users × $4.99 = $9.98 ✓
- **Scenario 3**: 1 user × $9.99 = $9.99 ✓

### Growth Path
- Week 1-2: 5-10 users
- Week 3-4: 20-30 users
- Month 2: 50-100 users
- Month 3: 100-200 users

---

## 🔐 Security Considerations

### Phase 1
- [ ] Validate all user inputs
- [ ] Sanitize file paths
- [ ] Rate limit API endpoints
- [ ] Add CORS protection

### Phase 2
- [ ] Encrypt audio files
- [ ] Secure transcription storage
- [ ] Add user authentication
- [ ] Implement API key rotation

### Phase 3
- [ ] PCI compliance for payments
- [ ] Secure Stripe webhook verification
- [ ] Encrypt sensitive data
- [ ] Add fraud detection

---

## 📊 Success Metrics

### Phase 1
- [ ] Zero errors in logs
- [ ] 100% uptime
- [ ] <1s API response time
- [ ] All tests passing

### Phase 2
- [ ] 95% transcription success rate
- [ ] <30s transcription time
- [ ] <5% user complaints
- [ ] 80%+ user satisfaction

### Phase 3
- [ ] $10 revenue in first month
- [ ] 10+ paying users
- [ ] 2%+ conversion rate
- [ ] <2% payment failure rate

---

## 🛠️ Tech Stack

### Current
- Next.js 14.2.5
- React 18.3.1
- TypeScript 5
- Tailwind CSS 3.4.13

### To Add
- **Transcription**: OpenAI Whisper API
- **Audio**: ffmpeg + fluent-ffmpeg
- **Payments**: Stripe
- **Database**: (Optional) Supabase or Firebase
- **Logging**: Winston or Pino
- **Analytics**: Custom or Mixpanel

---

## 📝 Testing Checklist

### Phase 1
- [ ] Test valid XHS URLs
- [ ] Test invalid URLs
- [ ] Test rate limiting
- [ ] Test error messages
- [ ] Test logging

### Phase 2
- [ ] Test audio extraction
- [ ] Test transcription accuracy
- [ ] Test long videos (>1 hour)
- [ ] Test different languages
- [ ] Test UI responsiveness

### Phase 3
- [ ] Test payment flow
- [ ] Test credit deduction
- [ ] Test webhook handling
- [ ] Test error recovery
- [ ] Test concurrent payments

---

## 🎯 Next Steps

1. **Immediate** (Today):
   - [ ] Review this plan
   - [ ] Set up logging system
   - [ ] Create session manager

2. **This Week**:
   - [ ] Complete Phase 1 debugging
   - [ ] Test all endpoints
   - [ ] Fix any issues

3. **Next Week**:
   - [ ] Start transcription feature
   - [ ] Set up OpenAI API
   - [ ] Implement audio extraction

4. **Week 3**:
   - [ ] Complete transcription
   - [ ] Set up Stripe
   - [ ] Implement payments

5. **Week 4**:
   - [ ] Launch with monetization
   - [ ] Monitor analytics
   - [ ] Optimize performance

---

## 📞 Support & Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [OpenAI Whisper API](https://platform.openai.com/docs/guides/speech-to-text)
- [Stripe Docs](https://stripe.com/docs)
- [FFmpeg Docs](https://ffmpeg.org/documentation.html)

### Tools
- Postman - API testing
- Chrome DevTools - Frontend debugging
- VS Code - Code editor
- Git - Version control

---

**Status**: Ready for implementation
**Last Updated**: 2026-02-12
**Next Review**: After Phase 1 completion
