# XHS Video Download Implementation - Test Guide

## Implementation Summary

Successfully implemented token-based video download flow with the following components:

### Created Files
1. **lib/download-manager.ts** - Token generation, storage, and validation
2. **lib/cleanup.ts** - Automatic file cleanup system
3. **app/api/download/[token]/route.ts** - File streaming endpoint
4. **.env.local** - Environment configuration

### Modified Files
1. **app/api/download/route.ts** - Added session management and token generation
2. **app/page.tsx** - Updated frontend to trigger browser downloads

## How It Works

### Flow Diagram
```
User submits URL
    ↓
API downloads video to temp/{sessionId}/Download/
    ↓
API generates secure token (32-char hex)
    ↓
API returns token + metadata to frontend
    ↓
Frontend creates download link: /api/download/{token}
    ↓
Browser requests file from streaming endpoint
    ↓
API validates token and streams file
    ↓
Cleanup after 5 seconds
```

## Testing Instructions

### Test 1: Basic Download Flow
1. Open http://localhost:3000
2. Paste a valid XHS URL: `https://www.xiaohongshu.com/discovery/item/696dd8150000000021031a64`
3. Click "下载" button
4. Expected results:
   - Alert shows: "下载已开始！" with title, author, type
   - Browser downloads .mp4 file
   - File saved to Downloads folder
   - Filename matches video title

### Test 2: Invalid URL
1. Enter invalid URL: `https://youtube.com/watch?v=123`
2. Click "下载"
3. Expected: Error alert "請提供有效的小紅書鏈接"

### Test 3: Token Expiration
1. Download a video successfully
2. Copy the token from browser network tab
3. Wait 6 minutes
4. Try to access `/api/download/{token}` directly
5. Expected: 404 error "Invalid or expired token"

### Test 4: Concurrent Downloads
1. Open 3 browser tabs
2. Submit different XHS URLs in each tab simultaneously
3. Expected: All downloads succeed without conflicts

### Test 5: Cleanup Verification
1. Download a video
2. Check temp directory: `C:\Users\kin16\Documents\爬蟲\xhs-downloader-web\temp\`
3. Wait 10 seconds after download completes
4. Check temp directory again
5. Expected: Session folder deleted

## Manual Testing Checklist

- [ ] Server starts without errors
- [ ] Download button shows "下载中..." during download
- [ ] Success alert displays correct metadata
- [ ] Browser downloads .mp4 file
- [ ] Filename is sanitized (no special characters)
- [ ] File size > 0 bytes
- [ ] Video plays correctly
- [ ] Input field clears after successful download
- [ ] Invalid URL shows error message
- [ ] Expired token returns 404
- [ ] Multiple concurrent downloads work
- [ ] Temp files cleaned up after 10 seconds
- [ ] No console errors in browser
- [ ] No server errors in terminal

## Verification Commands

### Check temp directory
```bash
dir "C:\Users\kin16\Documents\爬蟲\xhs-downloader-web\temp"
```

### Monitor server logs
```bash
# Watch for these log messages:
# [Download] Starting download for session {sessionId}
# [Download] Video file found: {filePath}
# [Download] Download ready - token: {token}
# [FileStream] Streaming file for token {token}
# [FileStream] Cleaning up session {sessionId}
# [Cleanup] Removed expired session: {sessionId}
```

### Check active tokens (add to download-manager.ts for debugging)
```typescript
console.log('Active tokens:', getActiveTokenCount());
```

## Known Limitations

1. **Python Script Dependency**: Requires `-o` flag support in download_video_simple.py
2. **Memory Storage**: Tokens stored in memory (lost on server restart)
3. **No Progress Indicator**: User doesn't see download progress
4. **Single File Only**: Doesn't support batch downloads yet
5. **No Rate Limiting**: No protection against abuse

## Next Steps

### Phase 2: Enhancements
- [ ] Add download progress tracking
- [ ] Implement rate limiting (10 downloads/hour per IP)
- [ ] Add user authentication
- [ ] Store tokens in Redis for persistence
- [ ] Add download history

### Phase 3: Production Ready
- [ ] Move to cloud storage (S3/R2)
- [ ] Add CDN for faster downloads
- [ ] Implement payment integration
- [ ] Add analytics tracking
- [ ] Set up monitoring and alerts

## Troubleshooting

### Issue: "File not found" error
**Solution**: Check if Python script supports `-o` flag. Verify temp directory permissions.

### Issue: Token expired immediately
**Solution**: Check system time. Verify TOKEN_EXPIRY_MS in .env.local (default: 5 minutes).

### Issue: Cleanup not working
**Solution**: Check if cleanup.ts is imported. Verify setInterval is running.

### Issue: Download doesn't start
**Solution**: Check browser console for errors. Verify token is returned from API.

### Issue: Filename has special characters
**Solution**: sanitizeFilename() should remove them. Check implementation.

## Security Notes

✅ **Implemented**:
- Token validation (32-char hex format)
- Filename sanitization (no path traversal)
- Token expiration (5 minutes)
- Automatic cleanup (prevents disk filling)

⚠️ **TODO**:
- Rate limiting per IP
- User authentication
- CSRF protection
- File size limits
- Virus scanning

## Performance Metrics

**Expected Performance**:
- Token generation: < 1ms
- File download (Python): 5-30 seconds (depends on video size)
- File streaming: < 1 second
- Cleanup: < 100ms per session

**Resource Usage**:
- Memory: ~10MB per active download
- Disk: Temporary (cleaned up after 10 seconds)
- CPU: Minimal (mostly I/O bound)

---

**Status**: ✅ Implementation Complete
**Server**: Running at http://localhost:3000
**Ready for Testing**: Yes

*Last updated: 2026-02-04*
