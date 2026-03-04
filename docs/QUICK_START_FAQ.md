# XHS Video Downloader - Quick Start & FAQ Guide

## Quick Start Guide & Frequently Asked Questions

This document provides quick reference guides, FAQs, and troubleshooting information for users and developers.

---

## Table of Contents

1. User Quick Start Guide
2. Developer Quick Start Guide
3. Frequently Asked Questions (FAQ)
4. Troubleshooting Guide
5. API Quick Reference
6. Common Use Cases
7. Best Practices
8. Support Resources

---

## 1. User Quick Start Guide

### 1.1 Getting Started (30 seconds)

**Step 1: Visit the Website**
- Go to https://xhsdownloader.com
- Homepage loads instantly

**Step 2: Paste Video URL**
- Copy XHS video URL from Xiaohongshu
- Paste into input field
- Press Enter or click "Download"

**Step 3: Select Options**
- Choose format (MP4 or WebM)
- Select quality (720p or 1080p)
- Click "Download"

**Step 4: Download Complete**
- Video downloads to your device
- Ready to use immediately

### 1.2 Finding XHS Video URLs

**On Xiaohongshu App**:
1. Open video
2. Tap share button
3. Copy link
4. Paste into XHS Downloader

**On Xiaohongshu Web**:
1. Open video
2. Copy URL from address bar
3. Paste into XHS Downloader

**Supported URL Formats**:
- `https://www.xiaohongshu.com/explore/{video_id}`
- `https://xhs.com/explore/{video_id}`
- Short links with redirects

### 1.3 Troubleshooting Downloads

**Issue: "Invalid URL"**
- Ensure URL is from Xiaohongshu
- Check URL is complete
- Try copying again

**Issue: "Video Not Found"**
- Video may be deleted
- Video may be private
- Try different video

**Issue: "Download Failed"**
- Check internet connection
- Try again in a few seconds
- Try different quality

**Issue: "Slow Download"**
- Check internet speed
- Try lower quality
- Try during off-peak hours

### 1.4 Premium Features

**Upgrade to Premium**:
1. Click "Upgrade" button
2. Select plan (Monthly or Annual)
3. Enter payment information
4. Complete payment
5. Enjoy unlimited downloads

**Premium Benefits**:
- ✅ Unlimited downloads (vs. 5/day)
- ✅ No ads
- ✅ Batch download (up to 50 videos)
- ✅ Download history
- ✅ Priority support
- ✅ Early access to features

**Pricing**:
- Monthly: $4.99/month
- Annual: $49.99/year (save 17%)
- Free trial: 7 days

---

## 2. Developer Quick Start Guide

### 2.1 API Setup (5 minutes)

**Step 1: Sign Up**
```bash
# Visit API dashboard
https://xhsdownloader.com/api/dashboard

# Sign up for API access
# Select plan (Starter, Professional, Enterprise)
```

**Step 2: Get API Key**
```bash
# Copy API key from dashboard
# Store securely in environment variables
export XHS_API_KEY="sk_live_xxx"
```

**Step 3: Make First Request**
```bash
curl -X POST https://api.xhsdownloader.com/v1/download \
  -H "Authorization: Bearer sk_live_xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.xiaohongshu.com/explore/...",
    "format": "mp4",
    "quality": "1080p"
  }'
```

### 2.2 API Endpoints

**Download Video**:
```
POST /api/v1/download
```

**Get Metadata**:
```
GET /api/v1/metadata?url={url}
```

**Batch Download**:
```
POST /api/v1/batch
```

**Check Usage**:
```
GET /api/v1/usage
```

### 2.3 Authentication

**API Key Authentication**:
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.xhsdownloader.com/v1/download
```

**Request Headers**:
```
Authorization: Bearer sk_live_xxx
Content-Type: application/json
User-Agent: MyApp/1.0
```

### 2.4 Rate Limits

**Starter Plan**:
- 10,000 requests/month
- 10 requests/second
- $19/month

**Professional Plan**:
- 100,000 requests/month
- 50 requests/second
- $49/month

**Enterprise Plan**:
- 1,000,000 requests/month
- 500 requests/second
- $99/month

### 2.5 Error Handling

**Common Errors**:

```json
{
  "error": {
    "code": "INVALID_URL",
    "message": "Invalid XHS URL format"
  }
}
```

```json
{
  "error": {
    "code": "RATE_LIMITED",
    "message": "Too many requests",
    "retryAfter": 60
  }
}
```

```json
{
  "error": {
    "code": "VIDEO_NOT_FOUND",
    "message": "Video not found or deleted"
  }
}
```

### 2.6 SDK Libraries

**JavaScript/Node.js**:
```bash
npm install xhs-downloader-sdk
```

```javascript
const XHS = require('xhs-downloader-sdk');

const client = new XHS.Client({
  apiKey: 'sk_live_xxx'
});

const video = await client.download({
  url: 'https://www.xiaohongshu.com/explore/...',
  format: 'mp4',
  quality: '1080p'
});

console.log(video.downloadUrl);
```

**Python**:
```bash
pip install xhs-downloader
```

```python
from xhs_downloader import Client

client = Client(api_key='sk_live_xxx')

video = client.download(
    url='https://www.xiaohongshu.com/explore/...',
    format='mp4',
    quality='1080p'
)

print(video.download_url)
```

---

## 3. Frequently Asked Questions (FAQ)

### 3.1 General Questions

**Q: Is XHS Downloader free?**
A: Yes! We offer a free tier with 5 downloads per day. Premium subscription ($4.99/month) offers unlimited downloads and additional features.

**Q: Is it legal to download XHS videos?**
A: Yes, for personal use. Always respect copyright and creator rights. Read our Terms of Service for details.

**Q: Do you store my videos?**
A: No. We only generate download links. Videos are not stored on our servers.

**Q: Is my data private?**
A: Yes. We don't collect personal data beyond what's necessary. Read our Privacy Policy for details.

**Q: What video formats are supported?**
A: MP4 and WebM. MP4 is recommended for compatibility.

**Q: What quality options are available?**
A: 720p and 1080p. Quality depends on original video.

**Q: Can I download multiple videos at once?**
A: Yes, with Premium subscription (batch download up to 50 videos).

**Q: How long do downloads take?**
A: Usually 10-30 seconds depending on video length and quality.

**Q: Can I download videos on mobile?**
A: Yes, our website is mobile-responsive. Works on all devices.

**Q: Do you have a mobile app?**
A: Not yet, but we're working on iOS and Android apps.

### 3.2 Premium Questions

**Q: What's included in Premium?**
A: Unlimited downloads, no ads, batch download, download history, priority support.

**Q: How much does Premium cost?**
A: $4.99/month or $49.99/year (save 17%).

**Q: Is there a free trial?**
A: Yes, 7-day free trial available.

**Q: Can I cancel anytime?**
A: Yes, cancel anytime with no penalties.

**Q: Do you offer refunds?**
A: Yes, 30-day money-back guarantee.

**Q: Can I upgrade/downgrade?**
A: Yes, change plans anytime.

**Q: Is Premium shared across devices?**
A: Yes, use your account on any device.

### 3.3 API Questions

**Q: How do I get API access?**
A: Sign up at https://xhsdownloader.com/api/dashboard

**Q: What are the rate limits?**
A: Depends on plan. Starter: 10k/month, Professional: 100k/month, Enterprise: 1M/month.

**Q: How do I authenticate?**
A: Use Bearer token in Authorization header.

**Q: What's the API response time?**
A: Usually < 500ms (p95).

**Q: Do you have webhooks?**
A: Yes, for batch downloads and status updates.

**Q: Can I use the API for commercial purposes?**
A: Yes, with appropriate plan and terms agreement.

**Q: What's the SLA?**
A: 99.9% uptime guarantee for Professional and Enterprise plans.

### 3.4 Technical Questions

**Q: What's the maximum file size?**
A: No limit. Depends on your storage.

**Q: Can I download private videos?**
A: No, only public videos.

**Q: Does it work with video links?**
A: Only Xiaohongshu links. Other platforms not supported.

**Q: Can I download livestreams?**
A: No, only recorded videos.

**Q: What about watermarks?**
A: Premium feature to remove watermarks (coming soon).

**Q: Can I edit videos after download?**
A: Yes, use any video editor. We recommend Adobe Premiere, DaVinci Resolve, or CapCut.

### 3.5 Support Questions

**Q: How do I contact support?**
A: Email support@xhsdownloader.com or use support form on website.

**Q: What's the response time?**
A: Usually within 24 hours. Premium users get priority support.

**Q: Do you have a community forum?**
A: Yes, join our Discord server or Reddit community.

**Q: How do I report a bug?**
A: Email support@xhsdownloader.com with details and screenshots.

**Q: How do I request a feature?**
A: Use feature request form on website or vote on existing requests.

---

## 4. Troubleshooting Guide

### 4.1 Download Issues

**Problem: Download button not working**

**Solutions**:
1. Refresh the page
2. Clear browser cache
3. Try different browser
4. Check internet connection
5. Try different video

**Problem: "Invalid URL" error**

**Solutions**:
1. Verify URL is from Xiaohongshu
2. Copy URL again carefully
3. Check for extra spaces
4. Try full URL (not shortened)
5. Try different video

**Problem: "Video not found" error**

**Solutions**:
1. Check if video still exists
2. Try different video
3. Check if video is private
4. Wait a few minutes and try again
5. Contact support if issue persists

**Problem: Download is very slow**

**Solutions**:
1. Check internet speed
2. Try lower quality (720p)
3. Try different video
4. Try during off-peak hours
5. Restart router/device

**Problem: Downloaded file won't play**

**Solutions**:
1. Try different video player
2. Try different quality
3. Try different format (MP4 vs WebM)
4. Check file isn't corrupted
5. Try re-downloading

### 4.2 Account Issues

**Problem: Can't log in**

**Solutions**:
1. Check email/password
2. Reset password
3. Clear browser cache
4. Try different browser
5. Contact support

**Problem: Premium not working**

**Solutions**:
1. Refresh page
2. Log out and log back in
3. Check subscription status
4. Verify payment went through
5. Contact support

**Problem: Can't upgrade to Premium**

**Solutions**:
1. Check payment method
2. Try different payment method
3. Check billing address
4. Contact Stripe support
5. Contact our support

### 4.3 Technical Issues

**Problem: Website not loading**

**Solutions**:
1. Check internet connection
2. Try different browser
3. Clear browser cache
4. Disable browser extensions
5. Try incognito mode

**Problem: Page loading slowly**

**Solutions**:
1. Check internet speed
2. Close other tabs/apps
3. Restart browser
4. Clear cache
5. Try different device

**Problem: Mobile site not working**

**Solutions**:
1. Refresh page
2. Rotate device
3. Clear browser cache
4. Try different browser
5. Try desktop version

---

## 5. API Quick Reference

### 5.1 Request/Response Examples

**Download Request**:
```bash
curl -X POST https://api.xhsdownloader.com/v1/download \
  -H "Authorization: Bearer sk_live_xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.xiaohongshu.com/explore/123456",
    "format": "mp4",
    "quality": "1080p"
  }'
```

**Download Response**:
```json
{
  "success": true,
  "data": {
    "videoUrl": "https://cdn.example.com/video.mp4",
    "title": "Amazing XHS Video",
    "duration": 120,
    "size": 5242880,
    "thumbnail": "https://cdn.example.com/thumb.jpg",
    "uploadedAt": "2024-03-04T10:30:00Z"
  }
}
```

**Batch Download Request**:
```bash
curl -X POST https://api.xhsdownloader.com/v1/batch \
  -H "Authorization: Bearer sk_live_xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "urls": [
      "https://www.xiaohongshu.com/explore/123456",
      "https://www.xiaohongshu.com/explore/789012"
    ],
    "format": "mp4",
    "quality": "1080p"
  }'
```

**Batch Download Response**:
```json
{
  "success": true,
  "data": {
    "batchId": "batch_123456",
    "status": "processing",
    "videos": [
      {
        "url": "https://www.xiaohongshu.com/explore/123456",
        "status": "completed",
        "downloadUrl": "https://cdn.example.com/video1.mp4"
      },
      {
        "url": "https://www.xiaohongshu.com/explore/789012",
        "status": "processing"
      }
    ],
    "zipUrl": "https://cdn.example.com/batch_123456.zip"
  }
}
```

### 5.2 Status Codes

| Code | Meaning | Action |
|------|---------|--------|
| 200 | Success | Use response data |
| 400 | Bad Request | Check request format |
| 401 | Unauthorized | Check API key |
| 404 | Not Found | Check URL |
| 429 | Rate Limited | Wait and retry |
| 500 | Server Error | Retry later |

---

## 6. Common Use Cases

### 6.1 Content Creator Workflow

**Scenario**: Creator wants to download and edit XHS videos

**Steps**:
1. Find video on Xiaohongshu
2. Copy video URL
3. Paste into XHS Downloader
4. Download in 1080p MP4
5. Import into video editor (Adobe Premiere, DaVinci Resolve)
6. Edit and add effects
7. Export and upload to other platforms

**Tools Recommended**:
- Adobe Premiere Pro
- DaVinci Resolve (free)
- CapCut
- Final Cut Pro

### 6.2 Researcher Workflow

**Scenario**: Researcher wants to analyze XHS videos

**Steps**:
1. Find relevant videos
2. Download using batch feature
3. Organize by category
4. Analyze content
5. Extract insights
6. Create report

**Tools Recommended**:
- Google Sheets (for data)
- Tableau (for visualization)
- Python (for analysis)

### 6.3 Developer Integration

**Scenario**: Developer wants to integrate XHS downloader into app

**Steps**:
1. Sign up for API access
2. Get API key
3. Install SDK library
4. Implement download function
5. Handle errors
6. Test thoroughly
7. Deploy to production

**Code Example**:
```javascript
const XHS = require('xhs-downloader-sdk');

async function downloadVideo(url) {
  try {
    const client = new XHS.Client({
      apiKey: process.env.XHS_API_KEY
    });

    const video = await client.download({
      url: url,
      format: 'mp4',
      quality: '1080p'
    });

    return video.downloadUrl;
  } catch (error) {
    console.error('Download failed:', error);
    throw error;
  }
}
```

### 6.4 Batch Processing

**Scenario**: User wants to download 50 videos at once

**Steps**:
1. Upgrade to Premium
2. Prepare list of URLs
3. Use batch download feature
4. Monitor progress
5. Download ZIP file
6. Extract files
7. Organize videos

---

## 7. Best Practices

### 7.1 For Users

**Do's**:
- ✅ Respect creator rights
- ✅ Use for personal purposes
- ✅ Give credit to creators
- ✅ Follow platform terms
- ✅ Report issues to support

**Don'ts**:
- ❌ Download copyrighted content
- ❌ Redistribute without permission
- ❌ Use for commercial purposes
- ❌ Violate creator rights
- ❌ Spam or abuse service

### 7.2 For Developers

**Do's**:
- ✅ Use appropriate error handling
- ✅ Implement retry logic
- ✅ Cache responses
- ✅ Monitor rate limits
- ✅ Test thoroughly

**Don'ts**:
- ❌ Ignore rate limits
- ❌ Make unnecessary requests
- ❌ Store API keys in code
- ❌ Bypass authentication
- ❌ Abuse service

### 7.3 Performance Tips

**For Users**:
- Use 720p for faster downloads
- Download during off-peak hours
- Check internet connection
- Use wired connection if possible
- Close other apps/tabs

**For Developers**:
- Implement caching
- Use batch API for multiple videos
- Handle errors gracefully
- Monitor API usage
- Optimize requests

---

## 8. Support Resources

### 8.1 Getting Help

**Email Support**:
- support@xhsdownloader.com
- Response time: 24 hours
- Premium users: Priority support

**Community**:
- Discord: https://discord.gg/xhsdownloader
- Reddit: https://reddit.com/r/xhsdownloader
- Twitter: https://twitter.com/xhsdownloader

**Documentation**:
- User Guide: https://xhsdownloader.com/guide
- API Docs: https://api.xhsdownloader.com/docs
- Blog: https://xhsdownloader.com/blog
- FAQ: https://xhsdownloader.com/faq

### 8.2 Reporting Issues

**Bug Report**:
1. Describe the issue
2. Include screenshots
3. Provide steps to reproduce
4. Include browser/device info
5. Email to support@xhsdownloader.com

**Feature Request**:
1. Describe the feature
2. Explain use case
3. Vote on existing requests
4. Submit via website form

### 8.3 Status & Updates

**Status Page**:
- https://status.xhsdownloader.com
- Real-time service status
- Incident history
- Maintenance schedule

**Blog**:
- https://xhsdownloader.com/blog
- Latest updates
- Feature announcements
- Tips and tutorials

**Social Media**:
- Twitter: @xhsdownloader
- Instagram: @xhsdownloader
- Weibo: @xhsdownloader

---

## Appendix: Keyboard Shortcuts

**Website**:
- `Ctrl/Cmd + K`: Focus search
- `Ctrl/Cmd + /`: Show help
- `Esc`: Close modals
- `Enter`: Submit form

**API Dashboard**:
- `Ctrl/Cmd + C`: Copy API key
- `Ctrl/Cmd + R`: Refresh data
- `Ctrl/Cmd + S`: Save settings

---

**Last Updated**: March 4, 2024
**Version**: 1.0
**Next Review**: June 4, 2024
