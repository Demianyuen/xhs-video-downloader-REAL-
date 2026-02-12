/**
 * Quick Start Guide - Phase 1 Implementation
 * Get the debugging and monetization system running
 */

# 🚀 Quick Start - Phase 1 (Debugging & Monetization)

## 1️⃣ Installation (5 minutes)

### Step 1: Install Dependencies
```bash
cd "C:\Users\kin16\OneDrive\Luna\爬蟲\xhs-downloader-web"
npm install
```

### Step 2: Configure Environment
Edit `.env.local` and add your Stripe keys:
```bash
# Get keys from https://dashboard.stripe.com/apikeys
STRIPE_PUBLIC_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_test_your_secret_here
```

### Step 3: Start Development Server
```bash
npm run dev
```

Expected output:
```
> next dev
  ▲ Next.js 14.2.5
  - Local:        http://localhost:3000
  - Environments: .env.local
```

---

## 2️⃣ Verify Installation (2 minutes)

### Check Health Endpoint
```bash
curl http://localhost:3000/api/health | jq
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2026-02-12T...",
  "uptime": { "ms": 5000, "seconds": 5, ... },
  "sessions": { "total": 0, "statuses": {...} },
  "users": { "totalUsers": 0, ... },
  "memory": { "heapUsed": 45, "heapTotal": 120, ... }
}
```

### Check Logs
```bash
ls -la logs/
cat logs/app-2026-02-12.log
```

Expected: Log file created with entries

---

## 3️⃣ Test Core Features (10 minutes)

### Test 1: User Management
```bash
# Get user info
curl http://localhost:3000/api/user \
  -H "x-user-id: test_user_1" | jq

# Expected: User created with 0 credits, 1 daily free credit
```

### Test 2: Free Transcription
```bash
# Use free credit
curl -X POST http://localhost:3000/api/user \
  -H "Content-Type: application/json" \
  -H "x-user-id: test_user_1" \
  -d '{"action":"use-free-credit"}' | jq

# Expected: dailyFreeCredits becomes 0
```

### Test 3: Paid Transcription
```bash
# Try transcription without credits
curl -X POST http://localhost:3000/api/transcribe \
  -H "Content-Type: application/json" \
  -H "x-user-id: test_user_2" \
  -d '{"audioUrl":"https://example.com/audio.wav","videoId":"vid_1"}' | jq

# Expected: 402 error - "Insufficient credits"
```

### Test 4: Payment Checkout
```bash
# Get available products
curl http://localhost:3000/api/payment/checkout | jq

# Expected: List of products with prices
```

---

## 4️⃣ Monitor System (Ongoing)

### Watch Real-time Metrics
```bash
# Terminal 1: Watch health metrics
watch -n 2 'curl -s http://localhost:3000/api/health | jq "{uptime:.uptime.seconds,sessions:.sessions.total,users:.users.totalUsers,memory:.memory.heapUsed}"'

# Terminal 2: Watch logs
tail -f logs/app-*.log

# Terminal 3: Run tests
# (Run test commands from above)
```

---

## 5️⃣ Troubleshooting

### Issue: "Cannot find module 'stripe'"
**Solution**: Run `npm install stripe`

### Issue: "STRIPE_SECRET_KEY not configured"
**Solution**: Add to `.env.local` and restart server

### Issue: "Logs directory not found"
**Solution**: Create manually: `mkdir -p logs`

### Issue: Port 3000 already in use
**Solution**: Kill existing process or use different port:
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

---

## 📊 What's Working Now

✅ **Logging System**
- All API requests logged to file
- Console output with timestamps
- Different log levels (INFO, ERROR, DEBUG, WARN)

✅ **Session Management**
- Track download sessions
- Automatic cleanup of old sessions
- Session statistics

✅ **User Management**
- Create users on first request
- Track credits and daily limits
- Record transcriptions and payments

✅ **Payment Integration**
- Stripe checkout sessions
- Webhook handling
- Product catalog

✅ **Health Monitoring**
- System status endpoint
- Memory and CPU metrics
- Session and user statistics

---

## 🎯 Next Phase (Week 2-3)

After Phase 1 is stable:
1. Implement audio extraction (ffmpeg)
2. Integrate OpenAI Whisper API
3. Add transcription UI
4. Test end-to-end flow

---

## 💡 Tips

### Development
- Use `DEBUG=true npm run dev` for verbose logging
- Check `logs/` directory for detailed error messages
- Use `curl` with `| jq` for pretty JSON output

### Testing
- Use different `x-user-id` headers to test multiple users
- Monitor memory usage with health endpoint
- Check logs for any warnings or errors

### Production
- Replace test Stripe keys with production keys
- Implement database storage (not in-memory)
- Set up log aggregation
- Enable HTTPS
- Configure CORS properly

---

## 📞 Support

### Check Logs
```bash
# View recent errors
grep ERROR logs/app-*.log | tail -20

# View all transcription requests
grep "Transcription" logs/app-*.log

# View all payments
grep "Payment" logs/app-*.log
```

### Debug API
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
```

---

**Status**: ✅ Ready to use
**Last Updated**: 2026-02-12
**Next Steps**: Run `npm install` and `npm run dev`
