# 🚀 DEPLOYMENT GUIDE - VERCEL

## Step 1: Create Vercel Account (if you don't have one)

1. Go to https://vercel.com
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub account

## Step 2: Deploy to Vercel

### Option A: Via Vercel Dashboard (Easiest)

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Select your GitHub repository: `xhs-video-downloader`
4. Click "Import"
5. Configure project:
   - Framework: Next.js (auto-detected)
   - Root Directory: ./ (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
6. Click "Deploy"
7. Wait 2-3 minutes for deployment to complete

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
cd "C:\Users\kin16\OneDrive\Luna\爬蟲\xhs-downloader-web"
vercel --prod

# Follow the prompts:
# - Link to existing project? No
# - Project name? xhs-video-downloader
# - Directory? ./
# - Override settings? No
```

## Step 3: Configure Environment Variables

After deployment, add environment variables:

1. Go to Vercel Dashboard
2. Select your project: `xhs-video-downloader`
3. Go to Settings → Environment Variables
4. Add these variables:

```
NEXT_PUBLIC_URL=https://your-project.vercel.app
```

(Optional - for future Stripe integration):
```
STRIPE_PUBLIC_KEY=pk_live_your_key
STRIPE_SECRET_KEY=sk_live_your_key
STRIPE_WEBHOOK_SECRET=whsec_live_your_secret
```

5. Click "Save"
6. Redeploy: Go to Deployments → Latest → Click "Redeploy"

## Step 4: Add Custom Domain (Optional)

1. In Vercel Dashboard, go to Settings → Domains
2. Add your domain (e.g., xhsdownloader.com)
3. Update DNS records at your domain registrar
4. Wait 24-48 hours for DNS propagation

## Step 5: Test Your Website

1. Visit: https://your-project.vercel.app
2. Test the landing page:
   - Paste an XHS URL
   - Click "Download Video" or "Get Transcript"
   - Should redirect to results page
3. Check that everything works

## Troubleshooting

### Issue: Build fails
- Check build logs in Vercel dashboard
- Make sure all dependencies are in package.json
- Run `npm run build` locally to test

### Issue: Website shows 404
- Wait a few minutes for deployment to complete
- Refresh the page
- Check Vercel dashboard for deployment status

### Issue: API endpoints not working
- Check that API routes are in `app/api/` directory
- Verify environment variables are set
- Check browser console for errors

## Your Website is Live!

Your website is now live at:
- **Vercel URL**: https://your-project.vercel.app
- **Custom Domain** (if added): https://yourdomain.com

Share this URL with others to start using your XHS Video Downloader!
