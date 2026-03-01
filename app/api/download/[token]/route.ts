import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { getDownload, removeDownload } from '@/lib/download-manager';
import { cleanupSession } from '@/lib/cleanup';

/**
 * Sanitize filename to prevent path traversal and invalid characters
 * @param filename - Original filename
 * @returns Sanitized filename
 */
function sanitizeFilename(filename: string): string {
  // Remove path separators and special characters
  return filename
    .replace(/[/\\]/g, '')
    .replace(/[<>:"|?*]/g, '')
    .replace(/\.\./g, '')
    .trim()
    .substring(0, 200); // Limit length
}

/**
 * GET endpoint to stream video file to user
 * @param request - Next.js request object
 * @param params - Route parameters containing token
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    // Validate token format (32 hex characters)
    if (!/^[a-f0-9]{32}$/.test(token)) {
      console.log(`[FileStream] Invalid token format: ${token}`);
      return NextResponse.json(
        { error: 'Invalid token format' },
        { status: 400 }
      );
    }

    // Get download info from token
    const download = getDownload(token);

    if (!download) {
      console.log(`[FileStream] Token not found or expired: ${token}`);
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 404 }
      );
    }

    console.log(`[FileStream] Streaming file for token ${token}, session ${download.sessionId}`);

    // Check if file exists
    try {
      await fs.access(download.filePath);
    } catch {
      console.error(`[FileStream] File not found: ${download.filePath}`);
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    // Read file
    const fileBuffer = await fs.readFile(download.filePath);
    const fileStats = await fs.stat(download.filePath);

    // Sanitize filename
    const safeFilename = sanitizeFilename(download.metadata.title);
    const filename = safeFilename ? `${safeFilename}.mp4` : 'video.mp4';

    console.log(`[FileStream] Streaming ${fileStats.size} bytes as ${filename}`);

    // Create response with file stream
    const response = new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': fileStats.size.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });

    // Schedule cleanup after 5 seconds
    setTimeout(async () => {
      try {
        console.log(`[FileStream] Cleaning up session ${download.sessionId}`);
        await cleanupSession(download.sessionId);
        removeDownload(token);
      } catch (error) {
        console.error(`[FileStream] Cleanup error for session ${download.sessionId}:`, error);
      }
    }, 5000);

    return response;

  } catch (error: any) {
    console.error('[FileStream] Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to stream file',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
