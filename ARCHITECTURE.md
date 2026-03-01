# XHS Video Downloader - Architecture Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                           USER BROWSER                               │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │  Frontend (app/page.tsx)                                    │    │
│  │  - Input: XHS URL                                           │    │
│  │  - Button: "下载"                                            │    │
│  │  - State: isDownloading                                     │    │
│  └────────────────────────────────────────────────────────────┘    │
└───────────────────────────┬─────────────────────────────────────────┘
                            │
                            │ POST /api/download
                            │ { url: "https://..." }
                            ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    NEXT.JS API ROUTES                                │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │  Download API (app/api/download/route.ts)                  │    │
│  │  ┌──────────────────────────────────────────────────────┐  │    │
│  │  │ 1. Validate URL (xiaohongshu.com)                    │  │    │
│  │  │ 2. Generate session ID: 1738656789_abc123def         │  │    │
│  │  │ 3. Create temp directory: temp/{sessionId}/Download/ │  │    │
│  │  │ 4. Execute Python script with -o flag                │  │    │
│  │  │ 5. Find downloaded .mp4 file                         │  │    │
│  │  │ 6. Extract metadata (title, author, type)            │  │    │
│  │  │ 7. Generate secure token                             │  │    │
│  │  │ 8. Store token → file mapping                        │  │    │
│  │  │ 9. Return { success, token, metadata }               │  │    │
│  │  └──────────────────────────────────────────────────────┘  │    │
│  └────────────────────────────────────────────────────────────┘    │
│                            │                                         │
│                            │ Uses                                    │
│                            ↓                                         │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │  Download Manager (lib/download-manager.ts)                │    │
│  │  ┌──────────────────────────────────────────────────────┐  │    │
│  │  │ - generateToken(): crypto.randomBytes(16).hex()      │  │    │
│  │  │ - generateSessionId(): timestamp_random              │  │    │
│  │  │ - storeDownload(token, info): Map storage            │  │    │
│  │  │ - getDownload(token): Retrieve + validate expiry     │  │    │
│  │  │ - removeDownload(token): Delete from Map             │  │    │
│  │  │ - cleanupExpiredTokens(): Periodic cleanup           │  │    │
│  │  │                                                        │  │    │
│  │  │ Storage: Map<token, DownloadInfo>                    │  │    │
│  │  │   - filePath: string                                 │  │    │
│  │  │   - metadata: { title, author, type }                │  │    │
│  │  │   - expiresAt: number (timestamp)                    │  │    │
│  │  │   - sessionId: string                                │  │    │
│  │  └──────────────────────────────────────────────────────┘  │    │
│  └────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
                            │
                            │ Returns token
                            ↓
┌─────────────────────────────────────────────────────────────────────┐
│                           USER BROWSER                               │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │  Frontend receives: { success: true, token, metadata }     │    │
│  │  Creates: <a href="/api/download/{token}">                 │    │
│  │  Triggers: link.click()                                     │    │
│  │  Shows: Alert with metadata                                 │    │
│  └────────────────────────────────────────────────────────────┘    │
└───────────────────────────┬─────────────────────────────────────────┘
                            │
                            │ GET /api/download/{token}
                            ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    NEXT.JS API ROUTES                                │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │  File Streaming API (app/api/download/[token]/route.ts)    │    │
│  │  ┌──────────────────────────────────────────────────────┐  │    │
│  │  │ 1. Validate token format (32 hex chars)              │  │    │
│  │  │ 2. Get download info from token                      │  │    │
│  │  │ 3. Check token expiration (5 minutes)                │  │    │
│  │  │ 4. Verify file exists                                │  │    │
│  │  │ 5. Read file buffer                                  │  │    │
│  │  │ 6. Sanitize filename                                 │  │    │
│  │  │ 7. Stream with headers:                              │  │    │
│  │  │    - Content-Type: video/mp4                         │  │    │
│  │  │    - Content-Disposition: attachment                 │  │    │
│  │  │    - Content-Length: file size                       │  │    │
│  │  │ 8. Schedule cleanup (5 seconds)                      │  │    │
│  │  └──────────────────────────────────────────────────────┘  │    │
│  └────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
                            │
                            │ File stream
                            ↓
┌─────────────────────────────────────────────────────────────────────┐
│                           USER BROWSER                               │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │  Browser downloads: {title}.mp4                             │    │
│  │  Saves to: Downloads folder                                 │    │
│  └────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
                            │
                            │ After 5 seconds
                            ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    CLEANUP SYSTEM                                    │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │  Cleanup Module (lib/cleanup.ts)                            │    │
│  │  ┌──────────────────────────────────────────────────────┐  │    │
│  │  │ Immediate Cleanup (5 seconds after download):        │  │    │
│  │  │   - Delete temp/{sessionId}/ directory               │  │    │
│  │  │   - Remove token from memory                         │  │    │
│  │  │                                                        │  │    │
│  │  │ Periodic Cleanup (every 5 minutes):                  │  │    │
│  │  │   - Scan temp/ directory                             │  │    │
│  │  │   - Delete files older than 10 minutes               │  │    │
│  │  │   - Remove empty directories                         │  │    │
│  │  │                                                        │  │    │
│  │  │ Startup Cleanup (on server start):                   │  │    │
│  │  │   - Delete entire temp/ directory                    │  │    │
│  │  │   - Recreate empty temp/ directory                   │  │    │
│  │  └──────────────────────────────────────────────────────┘  │    │
│  └────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Component Interactions

### 1. Download Initiation Flow

```
User Input → Frontend Validation → API Request → Session Creation
    ↓
Python Script Execution → File Discovery → Metadata Extraction
    ↓
Token Generation → Storage → Response to Frontend
```

### 2. File Streaming Flow

```
Frontend Token → Browser Request → Token Validation → File Read
    ↓
Header Setup → Stream Response → Browser Download
    ↓
Cleanup Scheduling → File Deletion → Token Removal
```

### 3. Cleanup Flow

```
┌─────────────────────────────────────────────────────────┐
│ Immediate Cleanup (5s after download)                   │
│   - Triggered by: File streaming completion             │
│   - Action: Delete specific session directory           │
│   - Scope: Single download                              │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Periodic Cleanup (every 5 minutes)                      │
│   - Triggered by: setInterval                           │
│   - Action: Scan and delete old files                   │
│   - Scope: All expired sessions                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Startup Cleanup (on server start)                       │
│   - Triggered by: Module load                           │
│   - Action: Clear entire temp directory                 │
│   - Scope: All files                                    │
└─────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

```
┌──────────┐
│   User   │
└────┬─────┘
     │
     │ 1. Submit URL
     ↓
┌──────────────┐
│   Frontend   │
└────┬─────────┘
     │
     │ 2. POST /api/download
     ↓
┌──────────────────┐
│  Download API    │
└────┬─────────────┘
     │
     │ 3. Execute Python
     ↓
┌──────────────────┐
│  Python Script   │
└────┬─────────────┘
     │
     │ 4. Save to temp/
     ↓
┌──────────────────┐
│  File System     │
└────┬─────────────┘
     │
     │ 5. Return file path
     ↓
┌──────────────────┐
│  Download API    │
└────┬─────────────┘
     │
     │ 6. Generate token
     ↓
┌──────────────────┐
│ Download Manager │
└────┬─────────────┘
     │
     │ 7. Store mapping
     ↓
┌──────────────────┐
│  Memory (Map)    │
└────┬─────────────┘
     │
     │ 8. Return token
     ↓
┌──────────────────┐
│   Frontend       │
└────┬─────────────┘
     │
     │ 9. Request file
     ↓
┌──────────────────┐
│  Streaming API   │
└────┬─────────────┘
     │
     │ 10. Validate token
     ↓
┌──────────────────┐
│ Download Manager │
└────┬─────────────┘
     │
     │ 11. Get file path
     ↓
┌──────────────────┐
│  File System     │
└────┬─────────────┘
     │
     │ 12. Stream file
     ↓
┌──────────────────┐
│   Browser        │
└────┬─────────────┘
     │
     │ 13. Download complete
     ↓
┌──────────────────┐
│  Cleanup System  │
└────┬─────────────┘
     │
     │ 14. Delete files
     ↓
┌──────────────────┐
│  File System     │
└──────────────────┘
```

---

## Security Layers

```
┌─────────────────────────────────────────────────────────┐
│ Layer 1: Input Validation                               │
│   - URL format check (xiaohongshu.com)                  │
│   - Empty input rejection                               │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│ Layer 2: Token Security                                 │
│   - Crypto-secure generation (crypto.randomBytes)       │
│   - 32-character hexadecimal format                     │
│   - Format validation (regex: ^[a-f0-9]{32}$)           │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│ Layer 3: Expiration Control                             │
│   - 5-minute token lifetime                             │
│   - Timestamp-based validation                          │
│   - Automatic expiration cleanup                        │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│ Layer 4: Path Security                                  │
│   - Filename sanitization (remove ../, \, etc.)         │
│   - No user input in file paths                         │
│   - Session isolation (unique directories)              │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│ Layer 5: File Validation                                │
│   - File existence check                                │
│   - File type validation (.mp4)                         │
│   - Size verification                                   │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│ Layer 6: Cleanup Protection                             │
│   - Automatic file deletion                             │
│   - Disk space management                               │
│   - Token removal after use                             │
└─────────────────────────────────────────────────────────┘
```

---

## Error Handling Flow

```
┌─────────────────────────────────────────────────────────┐
│ Error Type: Invalid URL                                 │
│   - Detection: URL validation check                     │
│   - Response: 400 Bad Request                           │
│   - Message: "請提供有效的小紅書鏈接"                      │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Error Type: Python Script Failure                       │
│   - Detection: stderr contains "錯誤"                    │
│   - Response: 500 Internal Server Error                 │
│   - Message: "下載失敗" + details                        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Error Type: File Not Found                              │
│   - Detection: No .mp4 file in temp directory           │
│   - Response: 500 Internal Server Error                 │
│   - Message: "下載失敗：未找到視頻文件"                    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Error Type: Timeout                                     │
│   - Detection: execAsync timeout (60 seconds)           │
│   - Response: 408 Request Timeout                       │
│   - Message: "下載超時，請稍後重試"                        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Error Type: Invalid Token                               │
│   - Detection: Token format validation fails            │
│   - Response: 400 Bad Request                           │
│   - Message: "Invalid token format"                     │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Error Type: Expired Token                               │
│   - Detection: Token not found or expired               │
│   - Response: 404 Not Found                             │
│   - Message: "Invalid or expired token"                 │
└─────────────────────────────────────────────────────────┘
```

---

## State Management

### Token Storage (In-Memory Map)

```
Map<string, DownloadInfo>
  │
  ├─ "a1b2c3d4e5f6..." → {
  │    filePath: "temp/1738656789_abc/Download/video.mp4",
  │    metadata: {
  │      title: "美食分享",
  │      author: "张三",
  │      type: "视频"
  │    },
  │    expiresAt: 1738657089000,
  │    sessionId: "1738656789_abc123def"
  │  }
  │
  ├─ "b2c3d4e5f6a7..." → { ... }
  │
  └─ "c3d4e5f6a7b8..." → { ... }
```

### Session Lifecycle

```
┌─────────────────────────────────────────────────────────┐
│ 1. CREATED                                              │
│    - Session ID generated                               │
│    - Temp directory created                             │
│    - Status: Active                                     │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│ 2. DOWNLOADING                                          │
│    - Python script executing                            │
│    - File being written                                 │
│    - Status: In Progress                                │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│ 3. READY                                                │
│    - File downloaded                                    │
│    - Token generated                                    │
│    - Status: Ready for streaming                        │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│ 4. STREAMING                                            │
│    - File being streamed                                │
│    - Browser downloading                                │
│    - Status: Active                                     │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│ 5. CLEANUP SCHEDULED                                    │
│    - Download complete                                  │
│    - Cleanup timer started (5 seconds)                  │
│    - Status: Pending cleanup                            │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│ 6. DELETED                                              │
│    - Files deleted                                      │
│    - Token removed                                      │
│    - Status: Cleaned up                                 │
└─────────────────────────────────────────────────────────┘
```

---

## Performance Optimization

### Parallel Operations

```
User submits URL
    ↓
┌───────────────────────────────────────────────────────┐
│ Sequential Operations (Must be in order)              │
│   1. Validate URL                                     │
│   2. Generate session ID                              │
│   3. Create temp directory                            │
│   4. Execute Python script                            │
│   5. Find video file                                  │
│   6. Generate token                                   │
│   7. Store mapping                                    │
│   8. Return response                                  │
└───────────────────────────────────────────────────────┘

Multiple users submit URLs
    ↓
┌───────────────────────────────────────────────────────┐
│ Parallel Operations (Independent sessions)            │
│   User A: Session 1738656789_abc → Token a1b2c3...   │
│   User B: Session 1738656790_def → Token b2c3d4...   │
│   User C: Session 1738656791_ghi → Token c3d4e5...   │
│                                                        │
│ No conflicts due to:                                  │
│   - Unique session IDs                                │
│   - Isolated temp directories                         │
│   - Separate token mappings                           │
└───────────────────────────────────────────────────────┘
```

### Memory Management

```
┌───────────────────────────────────────────────────────┐
│ Token Storage (In-Memory)                             │
│   - Size: ~1KB per token                              │
│   - Limit: Unlimited (but auto-cleaned)               │
│   - Cleanup: Every 5 minutes                          │
│   - Expected: < 100 active tokens at any time         │
│   - Memory usage: < 100KB                             │
└───────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────┐
│ File Streaming (Buffer)                               │
│   - Size: Entire file loaded into memory              │
│   - Typical: 10-50MB per video                        │
│   - Peak: 100MB for large videos                      │
│   - Duration: < 1 second (streaming time)             │
│   - Concurrent: Multiple users supported              │
└───────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────┐
│ Disk Usage (Temporary)                                │
│   - Location: temp/ directory                         │
│   - Size: Video file size (10-100MB typical)          │
│   - Duration: 5-10 seconds (download to cleanup)      │
│   - Cleanup: Automatic (3 layers)                     │
│   - Max usage: Depends on concurrent downloads        │
└───────────────────────────────────────────────────────┘
```

---

## Monitoring Points

### Key Metrics to Track

```
┌───────────────────────────────────────────────────────┐
│ Download Success Rate                                 │
│   - Successful downloads / Total attempts             │
│   - Target: > 95%                                     │
│   - Alert: < 90%                                      │
└───────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────┐
│ Average Download Time                                 │
│   - Time from URL submit to file ready               │
│   - Target: < 30 seconds                              │
│   - Alert: > 60 seconds                               │
└───────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────┐
│ Token Expiration Rate                                 │
│   - Expired tokens / Total tokens                     │
│   - Target: < 5%                                      │
│   - Alert: > 20%                                      │
└───────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────┐
│ Cleanup Efficiency                                    │
│   - Files cleaned / Files created                     │
│   - Target: 100%                                      │
│   - Alert: < 95%                                      │
└───────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────┐
│ Disk Space Usage                                      │
│   - Current temp/ directory size                      │
│   - Target: < 1GB                                     │
│   - Alert: > 5GB                                      │
└───────────────────────────────────────────────────────┘
```

---

**Created**: 2026-02-04
**Status**: Complete
**Version**: 1.0
