import crypto from 'crypto';

interface DownloadInfo {
  filePath: string;
  metadata: {
    title: string;
    author: string;
    type: string;
  };
  expiresAt: number;
  sessionId: string;
}

// In-memory storage for download tokens
const downloadTokens = new Map<string, DownloadInfo>();

/**
 * Generate a secure random token for download
 * @returns 32-character hexadecimal token
 */
export function generateToken(): string {
  return crypto.randomBytes(16).toString('hex');
}

/**
 * Store download information with token
 * @param token - Download token
 * @param info - Download information
 */
export function storeDownload(token: string, info: DownloadInfo): void {
  downloadTokens.set(token, info);
  console.log(`[DownloadManager] Stored token ${token} for session ${info.sessionId}`);
}

/**
 * Retrieve download information by token
 * @param token - Download token
 * @returns Download info or null if not found/expired
 */
export function getDownload(token: string): DownloadInfo | null {
  const info = downloadTokens.get(token);

  if (!info) {
    console.log(`[DownloadManager] Token ${token} not found`);
    return null;
  }

  // Check if token has expired
  if (Date.now() > info.expiresAt) {
    console.log(`[DownloadManager] Token ${token} expired`);
    downloadTokens.delete(token);
    return null;
  }

  return info;
}

/**
 * Remove download token from storage
 * @param token - Download token to remove
 */
export function removeDownload(token: string): void {
  const removed = downloadTokens.delete(token);
  if (removed) {
    console.log(`[DownloadManager] Removed token ${token}`);
  }
}

/**
 * Clean up expired tokens from storage
 */
export function cleanupExpiredTokens(): void {
  const now = Date.now();
  let cleanedCount = 0;

  for (const [token, info] of downloadTokens.entries()) {
    if (now > info.expiresAt) {
      downloadTokens.delete(token);
      cleanedCount++;
    }
  }

  if (cleanedCount > 0) {
    console.log(`[DownloadManager] Cleaned up ${cleanedCount} expired tokens`);
  }
}

/**
 * Get current number of active tokens
 * @returns Number of tokens in storage
 */
export function getActiveTokenCount(): number {
  return downloadTokens.size;
}

/**
 * Generate a unique session ID
 * @returns Session ID string
 */
export function generateSessionId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 11);
  return `${timestamp}_${random}`;
}

// Run cleanup every 5 minutes
setInterval(cleanupExpiredTokens, 5 * 60 * 1000);
