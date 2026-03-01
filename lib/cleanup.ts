import fs from 'fs/promises';
import path from 'path';

/**
 * Clean up expired download files from temp directory
 * Deletes files and directories older than maxAge
 */
export async function cleanupExpiredDownloads(
  maxAgeMs: number = 10 * 60 * 1000 // 10 minutes default
): Promise<void> {
  const tempDir = path.join(process.cwd(), 'temp');
  const now = Date.now();

  try {
    // Check if temp directory exists
    try {
      await fs.access(tempDir);
    } catch {
      console.log('[Cleanup] Temp directory does not exist, skipping cleanup');
      return;
    }

    const sessions = await fs.readdir(tempDir);
    let cleanedCount = 0;

    for (const session of sessions) {
      const sessionPath = path.join(tempDir, session);

      try {
        const stats = await fs.stat(sessionPath);

        // Check if directory is older than maxAge
        if (now - stats.mtimeMs > maxAgeMs) {
          await fs.rm(sessionPath, { recursive: true, force: true });
          cleanedCount++;
          console.log(`[Cleanup] Removed expired session: ${session}`);
        }
      } catch (error) {
        console.error(`[Cleanup] Error processing session ${session}:`, error);
      }
    }

    if (cleanedCount > 0) {
      console.log(`[Cleanup] Cleaned up ${cleanedCount} expired sessions`);
    }
  } catch (error) {
    console.error('[Cleanup] Error during cleanup:', error);
  }
}

/**
 * Perform startup cleanup - clear entire temp directory
 * Run this when server starts to ensure clean state
 */
export async function startupCleanup(): Promise<void> {
  const tempDir = path.join(process.cwd(), 'temp');

  try {
    console.log('[Cleanup] Starting startup cleanup...');

    // Remove entire temp directory
    await fs.rm(tempDir, { recursive: true, force: true });

    // Recreate empty temp directory
    await fs.mkdir(tempDir, { recursive: true });

    console.log('[Cleanup] Startup cleanup completed - temp directory cleared');
  } catch (error) {
    console.error('[Cleanup] Error during startup cleanup:', error);
  }
}

/**
 * Clean up a specific download session
 * @param sessionId - Session ID to clean up
 */
export async function cleanupSession(sessionId: string): Promise<void> {
  const sessionPath = path.join(process.cwd(), 'temp', sessionId);

  try {
    await fs.rm(sessionPath, { recursive: true, force: true });
    console.log(`[Cleanup] Cleaned up session: ${sessionId}`);
  } catch (error) {
    console.error(`[Cleanup] Error cleaning up session ${sessionId}:`, error);
  }
}

/**
 * Schedule periodic cleanup
 * @param intervalMs - Cleanup interval in milliseconds (default: 10 minutes)
 */
export function schedulePeriodicCleanup(
  intervalMs: number = 10 * 60 * 1000
): NodeJS.Timeout {
  console.log(`[Cleanup] Scheduling periodic cleanup every ${intervalMs / 1000 / 60} minutes`);

  return setInterval(() => {
    cleanupExpiredDownloads();
  }, intervalMs);
}

/**
 * Get size of temp directory
 * @returns Size in bytes
 */
export async function getTempDirectorySize(): Promise<number> {
  const tempDir = path.join(process.cwd(), 'temp');
  let totalSize = 0;

  try {
    const sessions = await fs.readdir(tempDir);

    for (const session of sessions) {
      const sessionPath = path.join(tempDir, session);
      const stats = await fs.stat(sessionPath);

      if (stats.isDirectory()) {
        const files = await fs.readdir(sessionPath, { recursive: true });
        for (const file of files) {
          const filePath = path.join(sessionPath, file as string);
          try {
            const fileStats = await fs.stat(filePath);
            if (fileStats.isFile()) {
              totalSize += fileStats.size;
            }
          } catch {
            // Skip files that can't be accessed
          }
        }
      }
    }
  } catch (error) {
    console.error('[Cleanup] Error calculating temp directory size:', error);
  }

  return totalSize;
}

// Initialize periodic cleanup on module load
schedulePeriodicCleanup();
