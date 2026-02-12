/**
 * Immediate Action Plan
 * What to do right now to get started
 */

# ⚡ Immediate Action Plan
**Start Time**: Now
**Target**: Get system running in 30 minutes

---

## 🎯 Step-by-Step (30 Minutes)

### Step 1: Install Dependencies (5 minutes)
```bash
cd "C:\Users\kin16\OneDrive\Luna\爬蟲\xhs-downloader-web"
npm install
```

**What it does**: Downloads all required packages
**Expected**: No errors, shows "added X packages"

---

### Step 2: Configure Environment (2 minutes)
Edit `.env.local` and add your Stripe test keys:

```bash
# Get keys from https://dashboard.stripe.com/apikeys
STRIPE_PUBLIC_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_test_your_secret_here
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_your_key_here
```

**What it does**: Configures payment system
**Expected**: File saved without errors

---

### Step 3: Start Development Server (2 minutes)
```bash
npm run dev
```

**What it does**: Starts Next.js development server
**Expected Output**:
```
> next dev
  ▲ Next.js 14.2.5
  - Local:        http://localhost:3000
  - Environments: .env.local
```

**Keep this terminal open!**

---

### Step 4: Test Health Endpoint (3 minutes)
Open a new terminal and run:

```bash
curl http://localhost:3000/api/health | jq
```

**What it does**: Checks if server is running
**Expected Output**:
```json
{
  "status": "ok",
  "timestamp": "2026-02-12T...",
  "uptime": { "ms": 5000, "seconds": 5 },
  "sessions": { "total": 0 },
  "users": { "totalUsers": 0 },
  "memory": { "heapUsed": 45, "heapTotal": 120 }
}
```

---

### Step 5: Test User Endpoint (3 minutes)
```bash
curl http://localhost:3000/api/user \
  -H "x-user-id: test_user_1" | jq
```

**What it does**: Creates a test user
**Expected Output**:
```json
{
  "success": true,
  "user": {
    "id": "test_user_1",
    "credits": 0,
    "dailyFreeCredits": 1,
    "totalTranscriptions": 0,
    "totalSpent": 0,
    "isPremium": false,
    "createdAt": 1707...
  }
}
```

---

### Step 6: Test Payment Endpoint (3 minutes)
```bash
curl http://localhost:3000/api/payment/checkout | jq
```

**What it does**: Lists available products
**Expected Output**:
```json
{
  "success": true,
  "products": [
    {
      "id": "TRANSCRIPTION_10",
      "name": "10 Transcriptions",
      "description": "Get 10 transcriptions",
      "priceUsd": 0.99,
      "credits": 10
    },
    ...
  ]
}
```

---

### Step 7: Check Logs (2 minutes)
```bash
tail -20 logs/app-*.log
```

**What it does**: Shows recent log entries
**Expected**: Logs from your API calls above

---

### Step 8: Open in Browser (2 minutes)
```bash
# Open in browser
http://localhost:3000
```

**What it does**: Shows the main download page
**Expected**: Page loads with download form

---

## ✅ Success Checklist

After completing all steps, verify:

- [ ] `npm install` completed without errors
- [ ] `.env.local` configured with Stripe keys
- [ ] `npm run dev` shows "Local: http://localhost:3000"
- [ ] Health endpoint returns JSON with "status": "ok"
- [ ] User endpoint creates test user
- [ ] Payment endpoint lists products
- [ ] Logs directory has entries
- [ ] Browser shows main page at http://localhost:3000

---

## 🎯 Next Actions (After Getting Running)

### Immediate (Today)
1. [ ] Complete all 8 steps above
2. [ ] Verify all endpoints working
3. [ ] Check logs for any errors
4. [ ] Read `PHASE1_QUICKSTART.md`

### This Week
1. [ ] Run all tests from `PHASE1_CHECKLIST.md`
2. [ ] Fix any issues found
3. [ ] Update frontend with credits display
4. [ ] Test payment flow end-to-end

### Next Week
1. [ ] Implement audio extraction
2. [ ] Integrate OpenAI Whisper
3. [ ] Add transcription UI
4. [ ] Test transcription flow

---

## 🐛 Troubleshooting

### Issue: "npm: command not found"
**Solution**: Install Node.js from https://nodejs.org

### Issue: "Cannot find module 'stripe'"
**Solution**: Run `npm install stripe`

### Issue: "Port 3000 already in use"
**Solution**:
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Then restart: npm run dev
```

### Issue: "STRIPE_SECRET_KEY not configured"
**Solution**: Add to `.env.local` and restart server

### Issue: "Logs directory not found"
**Solution**: Create manually: `mkdir -p logs`

---

## 📊 What Each Endpoint Does

### GET /api/health
**Purpose**: Check system status
**Returns**: Uptime, memory, sessions, users, system info
**Use**: Monitor system health

### GET /api/user
**Purpose**: Get user info
**Returns**: User credits, daily limits, stats
**Use**: Display user dashboard

### POST /api/user
**Purpose**: Manage user credits
**Actions**: use-free-credit, deduct-credits
**Use**: Deduct credits for transcription

### GET /api/payment/checkout
**Purpose**: List available products
**Returns**: Product catalog with prices
**Use**: Show payment options

### POST /api/payment/checkout
**Purpose**: Create Stripe checkout session
**Returns**: Session ID for payment
**Use**: Initiate payment flow

### POST /api/payment/webhook
**Purpose**: Handle Stripe webhooks
**Returns**: Confirmation
**Use**: Process payments

### POST /api/transcribe
**Purpose**: Request transcription
**Returns**: Transcription result
**Use**: Transcribe audio

---

## 💡 Key Concepts

### Users
- Each user identified by `x-user-id` header
- Gets 1 free transcription per day
- Can buy more credits with Stripe

### Credits
- 1 credit = 1 transcription
- Free: 1 credit/day
- Paid: $0.99 for 10 credits

### Sessions
- Each download creates a session
- Sessions auto-cleanup after 1 hour
- Tracks status: pending, downloading, ready, completed, failed

### Logging
- All API calls logged to `logs/app-YYYY-MM-DD.log`
- Includes timestamp, level, message, data
- Useful for debugging

---

## 🚀 Performance Expectations

### Response Times
- Health check: < 10ms
- User endpoint: < 50ms
- Payment endpoint: < 100ms
- Transcription: < 5 seconds (placeholder)

### Memory Usage
- Idle: ~50MB
- With 10 users: ~60MB
- With 100 users: ~80MB

### Disk Usage
- Logs: ~1MB per day
- Temp files: Auto-cleaned

---

## 📈 Monitoring

### Watch System in Real-time
```bash
# Terminal 1: Watch health metrics
watch -n 2 'curl -s http://localhost:3000/api/health | jq "{uptime:.uptime.seconds,sessions:.sessions.total,users:.users.totalUsers,memory:.memory.heapUsed}"'

# Terminal 2: Watch logs
tail -f logs/app-*.log

# Terminal 3: Run tests
# (Run curl commands from above)
```

---

## 🎓 Learning Resources

### Documentation Files
- `PHASE1_QUICKSTART.md` - Quick reference
- `PHASE1_CHECKLIST.md` - Testing guide
- `DEVELOPER_REFERENCE.md` - Code snippets
- `COMPLETE_SUMMARY.md` - Full overview

### External Resources
- [Next.js Docs](https://nextjs.org/docs)
- [Stripe Docs](https://stripe.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)

---

## ✨ You're Ready!

**Everything is set up and ready to go.**

### Your Next Action:
1. Open terminal
2. Run: `cd "C:\Users\kin16\OneDrive\Luna\爬蟲\xhs-downloader-web"`
3. Run: `npm install`
4. Run: `npm run dev`
5. Open: http://localhost:3000

**That's it! You're running the system.**

---

**Time to Complete**: ~30 minutes
**Difficulty**: Easy
**Status**: Ready to start
**Next**: Follow `PHASE1_QUICKSTART.md` for detailed testing
