/**
 * Deployment & Production Guide
 * Steps to deploy to production
 */

# 🚀 Deployment & Production Guide

## 📋 Pre-Deployment Checklist

### Code Quality
- [ ] All tests passing
- [ ] No console errors
- [ ] No TypeScript errors: `npx tsc --noEmit`
- [ ] ESLint passing: `npm run lint`
- [ ] No hardcoded secrets in code

### Security
- [ ] Stripe keys in environment variables (not code)
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (if using database)
- [ ] XSS prevention (sanitize user input)

### Performance
- [ ] API response time < 500ms
- [ ] Memory usage < 100MB
- [ ] Database queries optimized
- [ ] Images optimized
- [ ] CSS/JS minified

### Monitoring
- [ ] Error tracking configured (Sentry)
- [ ] Analytics configured (Google Analytics)
- [ ] Logging system working
- [ ] Health check endpoint working
- [ ] Uptime monitoring configured

---

## 🔧 Environment Setup

### 1. Production Environment Variables

Create `.env.production`:
```bash
# Stripe (Production Keys)
STRIPE_PUBLIC_KEY=pk_live_your_production_key
STRIPE_SECRET_KEY=sk_live_your_production_key
STRIPE_WEBHOOK_SECRET=whsec_live_your_production_secret

# Application
NEXT_PUBLIC_URL=https://yourdomain.com
NODE_ENV=production
DEBUG=false

# Feature Flags
ENABLE_TRANSCRIPTION=true
ENABLE_PAYMENTS=true
ENABLE_LOGGING=true

# Database (if using)
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Error Tracking
SENTRY_DSN=https://your-sentry-dsn

# Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### 2. Stripe Production Setup

**Steps**:
1. Go to https://dashboard.stripe.com
2. Switch to "Live" mode (top left)
3. Get production API keys
4. Set up webhook endpoint: `https://yourdomain.com/api/payment/webhook`
5. Add webhook events: `checkout.session.completed`, `charge.failed`

---

## 🌐 Hosting Options

### Option A: Vercel (Recommended for Next.js)
**Pros**: Easy deployment, automatic scaling, free tier available
**Cons**: Limited customization, vendor lock-in

**Steps**:
```bash
# 1. Push code to GitHub
git push origin main

# 2. Connect to Vercel
# Go to https://vercel.com/new
# Select your GitHub repo
# Add environment variables
# Deploy

# 3. Configure custom domain
# Go to Vercel dashboard
# Add your domain
# Update DNS records
```

### Option B: AWS (Scalable)
**Pros**: Highly scalable, many services available
**Cons**: Complex setup, higher cost

**Services**:
- EC2 or ECS for app
- RDS for database
- S3 for file storage
- CloudFront for CDN
- Route 53 for DNS

### Option C: DigitalOcean (Simple)
**Pros**: Simple setup, affordable, good documentation
**Cons**: Less scalable than AWS

**Steps**:
```bash
# 1. Create Droplet (Ubuntu 22.04)
# 2. SSH into server
# 3. Install Node.js and npm
# 4. Clone repository
# 5. Install dependencies
# 6. Set up environment variables
# 7. Start application with PM2
# 8. Configure Nginx as reverse proxy
# 9. Set up SSL with Let's Encrypt
```

---

## 📦 Build & Deployment

### Build for Production
```bash
# Build Next.js app
npm run build

# Test production build locally
npm run start

# Check for errors
npx tsc --noEmit
npm run lint
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Check deployment
vercel ls
```

### Deploy to DigitalOcean
```bash
# SSH into server
ssh root@your_server_ip

# Clone repository
git clone https://github.com/yourusername/xhs-downloader-web.git
cd xhs-downloader-web

# Install dependencies
npm install

# Build
npm run build

# Install PM2
npm install -g pm2

# Start application
pm2 start npm --name "xhs-downloader" -- start

# Save PM2 config
pm2 save

# Configure Nginx
sudo nano /etc/nginx/sites-available/default

# Add:
# server {
#   listen 80;
#   server_name yourdomain.com;
#   location / {
#     proxy_pass http://localhost:3000;
#   }
# }

# Restart Nginx
sudo systemctl restart nginx

# Set up SSL
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## 🔒 Security Hardening

### 1. HTTPS/SSL
```bash
# Vercel: Automatic
# DigitalOcean: Use Let's Encrypt (see above)
# AWS: Use ACM (AWS Certificate Manager)
```

### 2. Environment Variables
```bash
# Never commit .env files
echo ".env.local" >> .gitignore
echo ".env.production" >> .gitignore

# Use secure secret management
# Vercel: Environment variables in dashboard
# DigitalOcean: Use .env file (not in git)
# AWS: Use Secrets Manager
```

### 3. Rate Limiting
```typescript
// Add to API routes
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### 4. CORS Configuration
```typescript
// Add to API routes
const cors = require('cors');

const corsOptions = {
  origin: process.env.NEXT_PUBLIC_URL,
  credentials: true,
};

app.use(cors(corsOptions));
```

### 5. Input Validation
```typescript
// Validate all user input
import { z } from 'zod';

const schema = z.object({
  url: z.string().url(),
  email: z.string().email(),
});

const validated = schema.parse(input);
```

---

## 📊 Monitoring & Analytics

### 1. Error Tracking (Sentry)
```bash
# Install Sentry
npm install @sentry/nextjs

# Configure in next.config.js
const withSentryConfig = require("@sentry/nextjs/withSentryConfig");

module.exports = withSentryConfig(
  {
    // your Next.js config
  },
  {
    org: "your-org",
    project: "your-project",
    authToken: process.env.SENTRY_AUTH_TOKEN,
  }
);
```

### 2. Analytics (Google Analytics)
```bash
# Install Google Analytics
npm install @react-google-analytics/core

# Add to _app.tsx
import { GoogleAnalytics } from '@react-google-analytics/core';

export default function App({ Component, pageProps }) {
  return (
    <>
      <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_ID} />
      <Component {...pageProps} />
    </>
  );
}
```

### 3. Uptime Monitoring
- Use UptimeRobot (free)
- Monitor: `https://yourdomain.com/api/health`
- Alert on failure

### 4. Performance Monitoring
- Use Vercel Analytics (automatic)
- Monitor Core Web Vitals
- Set up alerts for degradation

---

## 🗄️ Database Setup (Optional)

### PostgreSQL with Supabase
```bash
# 1. Create Supabase project
# Go to https://supabase.com
# Create new project

# 2. Get connection string
# Copy from project settings

# 3. Set environment variable
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
DATABASE_URL=postgresql://user:password@host:5432/dbname

# 4. Create tables
# Use Supabase dashboard or SQL editor

# 5. Install client
npm install @supabase/supabase-js

# 6. Use in code
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
```

---

## 🚨 Incident Response

### If Something Goes Wrong

**Step 1: Assess**
- Check health endpoint: `https://yourdomain.com/api/health`
- Check logs: `tail -f logs/app-*.log`
- Check error tracking: Sentry dashboard

**Step 2: Communicate**
- Update status page
- Notify users via email
- Post on social media

**Step 3: Fix**
- Identify root cause
- Deploy fix
- Verify fix works

**Step 4: Post-Mortem**
- Document what happened
- Document how to prevent
- Update runbooks

---

## 📋 Post-Deployment Checklist

### Immediate (First Hour)
- [ ] Website loads without errors
- [ ] Health check returns 200 OK
- [ ] Payment flow works end-to-end
- [ ] Logs show no errors
- [ ] Monitoring alerts configured

### First Day
- [ ] Monitor error rate (should be < 1%)
- [ ] Monitor response time (should be < 500ms)
- [ ] Monitor user signups
- [ ] Monitor payment conversions
- [ ] Check for any user complaints

### First Week
- [ ] Monitor daily metrics
- [ ] Optimize slow endpoints
- [ ] Fix any bugs found
- [ ] Gather user feedback
- [ ] Plan Phase 2

---

## 🔄 Continuous Deployment

### GitHub Actions Workflow
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        run: vercel --prod
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

---

## 📞 Support & Troubleshooting

### Common Issues

**Issue: "502 Bad Gateway"**
- Check if app is running: `pm2 status`
- Check logs: `pm2 logs`
- Restart app: `pm2 restart all`

**Issue: "Payment webhook not working"**
- Check webhook URL in Stripe dashboard
- Check logs for webhook errors
- Verify webhook secret is correct

**Issue: "High memory usage"**
- Check for memory leaks
- Restart app: `pm2 restart all`
- Optimize database queries

**Issue: "Slow API response"**
- Check database query performance
- Add caching
- Optimize code
- Scale infrastructure

---

## 🎯 Success Metrics

### Deployment Success
- [ ] 99.9% uptime
- [ ] < 500ms API response time
- [ ] < 1% error rate
- [ ] 0 payment failures
- [ ] All monitoring alerts working

### Business Metrics
- [ ] Users signing up
- [ ] Payments processing
- [ ] Revenue tracking
- [ ] User retention
- [ ] Conversion rate

---

**Status**: Ready for deployment
**Next Steps**: Follow pre-deployment checklist
**Support**: Check troubleshooting section
