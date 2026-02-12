/**
 * Implementation Checklist & Testing Guide
 * Phase 1: Debugging & Stabilization
 */

# 🚀 Implementation Checklist - Phase 1

## ✅ Completed Components

### Logging System
- [x] Created `lib/logger.ts` - Centralized logging
- [x] File-based logging to `logs/` directory
- [x] Console output with timestamps
- [x] Different log levels (INFO, ERROR, DEBUG, WARN)

### Session Management
- [x] Created `lib/session-manager.ts` - Track download sessions
- [x] Session creation with unique IDs
- [x] Session status tracking (pending, downloading, ready, completed, failed)
- [x] Automatic cleanup of expired sessions (1 hour timeout)
- [x] Session statistics endpoint

### User Management
- [x] Created `lib/user-manager.ts` - User credit system
- [x] Daily free credits (1 per day)
- [x] Credit deduction for transcriptions
- [x] Premium user support
- [x] User statistics tracking

### Payment Integration
- [x] Created `lib/payment-manager.ts` - Stripe integration
- [x] Product catalog (10, 50 transcriptions, monthly unlimited)
- [x] Checkout session creation
- [x] Webhook signature verification
- [x] Payment success handling

### API Endpoints
- [x] `GET /api/health` - System health check
- [x] `POST /api/payment/checkout` - Create checkout session
- [x] `POST /api/payment/webhook` - Handle Stripe webhooks
- [x] `GET /api/user` - Get user info
- [x] `POST /api/user` - Manage user credits
- [x] `POST /api/transcribe` - Request transcription

### Configuration
- [x] Updated `.env.local` with all required variables
- [x] Updated `package.json` with new dependencies

---

## 📋 Testing Checklist

### Phase 1.1: Logging System
```bash
# Test logging
curl http://localhost:3000/api/health

# Check logs
cat logs/app-2026-02-12.log

# Verify log file exists
ls -la logs/
```

**Expected Results**:
- [ ] Health check returns JSON with system info
- [ ] Log file created in `logs/` directory
- [ ] Logs contain timestamp, level, and message
- [ ] No errors in console

---

### Phase 1.2: Session Management
```bash
# Test session creation (via download API)
curl -X POST http://localhost:3000/api/download \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.xiaohongshu.com/..."}'

# Check session stats (via health endpoint)
curl http://localhost:3000/api/health | jq '.sessions'
```

**Expected Results**:
- [ ] Session created with unique ID
- [ ] Session status tracked
- [ ] Health endpoint shows session count
- [ ] Old sessions cleaned up automatically

---

### Phase 1.3: User Management
```bash
# Get user info
curl http://localhost:3000/api/user \
  -H "x-user-id: test_user_123"

# Use free credit
curl -X POST http://localhost:3000/api/user \
  -H "Content-Type: application/json" \
  -H "x-user-id: test_user_123" \
  -d '{"action":"use-free-credit"}'

# Deduct credits
curl -X POST http://localhost:3000/api/user \
  -H "Content-Type: application/json" \
  -H "x-user-id: test_user_123" \
  -d '{"action":"deduct-credits","amount":5}'
```

**Expected Results**:
- [ ] User created on first request
- [ ] Daily free credits available
- [ ] Credits deducted correctly
- [ ] Error when insufficient credits

---

### Phase 1.4: Payment Integration
```bash
# Get available products
curl http://localhost:3000/api/payment/checkout

# Create checkout session (requires STRIPE_SECRET_KEY)
curl -X POST http://localhost:3000/api/payment/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "productId":"TRANSCRIPTION_10",
    "userId":"test_user_123"
  }'
```

**Expected Results**:
- [ ] Products list returned
- [ ] Checkout session created with valid sessionId
- [ ] Session contains correct product info
- [ ] Error handling for invalid products

---

### Phase 1.5: Transcription API
```bash
# Request transcription (with free credit)
curl -X POST http://localhost:3000/api/transcribe \
  -H "Content-Type: application/json" \
  -H "x-user-id: test_user_123" \
  -d '{
    "audioUrl":"https://example.com/audio.wav",
    "videoId":"video_123"
  }'

# Request transcription (without credits)
curl -X POST http://localhost:3000/api/transcribe \
  -H "Content-Type: application/json" \
  -H "x-user-id: test_user_456" \
  -d '{
    "audioUrl":"https://example.com/audio.wav",
    "videoId":"video_123"
  }'
```

**Expected Results**:
- [ ] First request succeeds (uses free credit)
- [ ] Second request fails with 402 (insufficient credits)
- [ ] User credits updated correctly
- [ ] Transcription recorded in user stats

---

## 🔧 Debugging Commands

### Check Server Status
```bash
# Health check
curl http://localhost:3000/api/health | jq

# Check logs
tail -f logs/app-*.log

# Check temp directory
ls -la temp/

# Check Node process
ps aux | grep "node"
```

### Monitor Performance
```bash
# Watch memory usage
watch -n 1 'curl -s http://localhost:3000/api/health | jq ".memory"'

# Watch session count
watch -n 1 'curl -s http://localhost:3000/api/health | jq ".sessions"'

# Watch user count
watch -n 1 'curl -s http://localhost:3000/api/health | jq ".users"'
```

### Test Rate Limiting
```bash
# Test 5 downloads in quick succession
for i in {1..5}; do
  curl -X POST http://localhost:3000/api/download \
    -H "Content-Type: application/json" \
    -d '{"url":"https://www.xiaohongshu.com/..."}' &
done
wait

# 6th download should fail
curl -X POST http://localhost:3000/api/download \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.xiaohongshu.com/..."}'
```

---

## 🐛 Common Issues & Solutions

### Issue: "STRIPE_SECRET_KEY not configured"
**Solution**: Add to `.env.local`:
```
STRIPE_SECRET_KEY=sk_test_your_key_here
```

### Issue: "Logs directory not found"
**Solution**: Create manually:
```bash
mkdir -p logs
```

### Issue: "User not found" errors
**Solution**: Ensure `x-user-id` header is sent with requests

### Issue: "Insufficient credits" on first transcription
**Solution**: Check that daily free credits are being tracked correctly

---

## 📊 Success Metrics

### Phase 1 Completion
- [ ] All endpoints return 200 OK
- [ ] Logging system working (files created)
- [ ] Session management tracking downloads
- [ ] User credits system functional
- [ ] Payment integration configured
- [ ] No console errors
- [ ] Health check shows all systems OK

### Performance Targets
- [ ] API response time < 500ms
- [ ] Memory usage < 100MB
- [ ] Log file size < 10MB per day
- [ ] Session cleanup working (no memory leaks)

---

## 🚀 Next Steps

### Immediate (Today)
1. [ ] Install dependencies: `npm install`
2. [ ] Configure Stripe keys in `.env.local`
3. [ ] Run health check: `curl http://localhost:3000/api/health`
4. [ ] Test all endpoints with curl commands above

### This Week
1. [ ] Complete Phase 1 testing
2. [ ] Fix any issues found
3. [ ] Document any bugs
4. [ ] Prepare for Phase 2 (Transcription)

### Next Week
1. [ ] Implement audio extraction (ffmpeg)
2. [ ] Integrate OpenAI Whisper API
3. [ ] Add transcription UI
4. [ ] Test end-to-end flow

---

## 📝 Notes

- All user data is stored in-memory (will be lost on server restart)
- For production, implement database storage (Supabase, Firebase, etc.)
- Stripe keys are test keys - replace with production keys before launch
- Logs are stored locally - implement log aggregation for production

---

**Last Updated**: 2026-02-12
**Status**: Ready for testing
**Next Review**: After Phase 1 completion
