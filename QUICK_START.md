# Quick Start Guide - XHS Video Downloader

## 🚀 Start the Server

```bash
cd "C:\Users\kin16\Documents\爬蟲\xhs-downloader-web"
npm run dev
```

Server will start at: **http://localhost:3000**

---

## 📥 How to Download Videos

### Step 1: Get XHS Video URL
1. Open Xiaohongshu (小红书) app or website
2. Find the video you want to download
3. Copy the video link (e.g., `https://www.xiaohongshu.com/discovery/item/696dd8150000000021031a64`)

### Step 2: Download
1. Open http://localhost:3000 in your browser
2. Paste the URL in the search box
3. Click "下载" button
4. Wait for "下载已开始！" alert
5. Video will automatically download to your Downloads folder

---

## 🔍 What Happens Behind the Scenes

```
Your URL → API downloads video → Generates secure token →
Returns token to browser → Browser downloads file →
Cleanup after 5 seconds
```

**Token expires in**: 5 minutes
**Cleanup happens**: 5 seconds after download
**Periodic cleanup**: Every 5 minutes

---

## ✅ Verify It's Working

### Check 1: Server Running
Look for this in terminal:
```
✓ Ready in 2.8s
- Local:         http://localhost:3000
```

### Check 2: Download Works
1. Submit a valid XHS URL
2. You should see:
   - Button changes to "下载中..."
   - Alert with video title, author, type
   - Browser downloads .mp4 file

### Check 3: File Downloaded
Check your Downloads folder for:
```
{video_title}.mp4
```

### Check 4: Cleanup Works
After 10 seconds, check temp directory:
```bash
dir "C:\Users\kin16\Documents\爬蟲\xhs-downloader-web\temp"
```
Should be empty or have only recent downloads.

---

## 🐛 Common Issues

### Issue: "請提供有效的小紅書鏈接"
**Fix**: Make sure URL contains `xiaohongshu.com`

### Issue: "下載超時，請稍後重試"
**Fix**: Video is too large or network is slow. Try again.

### Issue: "File not found"
**Fix**: Python script may not support `-o` flag. Check script:
```bash
python "C:\Users\kin16\Documents\爬蟲\XHS-Downloader-master\download_video_simple.py" --help
```

### Issue: Download doesn't start
**Fix**:
1. Open browser console (F12)
2. Check for errors
3. Verify token is returned from API

---

## 📁 Project Structure

```
xhs-downloader-web/
├── app/
│   ├── api/
│   │   └── download/
│   │       ├── route.ts              # Download initiation
│   │       └── [token]/route.ts      # File streaming
│   └── page.tsx                      # Frontend UI
├── lib/
│   ├── download-manager.ts           # Token management
│   └── cleanup.ts                    # File cleanup
├── temp/                             # Temporary downloads (auto-cleaned)
├── .env.local                        # Configuration
├── TEST_GUIDE.md                     # Detailed testing guide
└── IMPLEMENTATION_SUMMARY.md         # Complete documentation
```

---

## 🔧 Configuration

Edit `.env.local` to customize:

```env
# Token expiry (default: 5 minutes)
TOKEN_EXPIRY_MS=300000

# Cleanup interval (default: 10 minutes)
CLEANUP_INTERVAL_MS=600000

# Max file age before cleanup (default: 10 minutes)
MAX_FILE_AGE_MS=600000
```

---

## 📊 Monitor Logs

Watch terminal for these messages:

**Download started:**
```
[Download] Starting download for session 1738656789_abc123def
```

**Download ready:**
```
[Download] Download ready - token: a1b2c3d4e5f6...
```

**File streaming:**
```
[FileStream] Streaming file for token a1b2c3d4e5f6...
```

**Cleanup:**
```
[FileStream] Cleaning up session 1738656789_abc123def
[Cleanup] Removed expired session: 1738656789_abc123def
```

---

## 🎯 Quick Test

**Test URL** (example):
```
https://www.xiaohongshu.com/discovery/item/696dd8150000000021031a64
```

**Expected Result:**
1. Alert shows: "下载已开始！"
2. Browser downloads: `{title}.mp4`
3. File plays correctly
4. Temp folder cleaned after 10 seconds

---

## 📚 Documentation

- **TEST_GUIDE.md** - Comprehensive testing instructions
- **IMPLEMENTATION_SUMMARY.md** - Complete technical documentation
- **This file** - Quick reference for daily use

---

## 🆘 Need Help?

1. Check **TEST_GUIDE.md** for detailed troubleshooting
2. Check **IMPLEMENTATION_SUMMARY.md** for technical details
3. Check server logs in terminal
4. Check browser console (F12) for frontend errors

---

**Status**: ✅ Ready to use
**Server**: http://localhost:3000
**Last Updated**: 2026-02-04
