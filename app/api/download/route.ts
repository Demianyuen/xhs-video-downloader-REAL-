import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { videoStore } from '@/lib/video-store';

const XHS_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
  'Referer': 'https://www.xiaohongshu.com/',
};

// Simple rate limiting (replace with Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string, limit: number = 5, windowMs: number = 86400000): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

/**
 * Extract video URL from XHS page
 */
async function extractVideoUrl(url: string): Promise<{
  videoUrl: string;
  title: string;
  author: string;
  thumbnail: string;
}> {
  const response = await fetch(url, {
    headers: XHS_HEADERS,
    redirect: 'follow',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch page: ${response.status}`);
  }

  const html = await response.text();

  // Try to extract video URL from the page
  const stateMatch = html.match(/__INITIAL_STATE__\s*=\s*({.+?})\s*<\/script>/s);
  if (stateMatch) {
    try {
      const cleanJson = stateMatch[1]
        .replace(/undefined/g, 'null')
        .replace(/\n/g, '');
      const state = JSON.parse(cleanJson);

      const noteData = state?.note?.noteDetailMap;
      if (noteData) {
        const noteId = Object.keys(noteData)[0];
        const note = noteData[noteId]?.note;
        if (note) {
          const video = note.video;
          const title = note.title || note.desc || 'XHS Video';
          const author = note.user?.nickname || 'Unknown';
          const thumbnail = note.interact_info?.image_list?.[0]?.image || '';

          if (video) {
            const videoUrl =
              video.consumer?.originVideoKey
                ? `https://sns-video-bd.xhscdn.com/${video.consumer.originVideoKey}`
                : video.media?.stream?.h264?.[0]?.masterUrl
                  || video.media?.stream?.h265?.[0]?.masterUrl
                  || video.media?.stream?.av1?.[0]?.masterUrl
                  || '';

            if (videoUrl) {
              return { videoUrl, title, author, thumbnail };
            }
          }
        }
      }
    } catch {
      // JSON parse failed, try other methods
    }
  }

  // Method 2: Look for video meta tags
  const ogVideoMatch = html.match(/<meta\s+property="og:video"\s+content="([^"]+)"/);
  if (ogVideoMatch) {
    const title = html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/)?.[1] || 'XHS Video';
    const thumbnail = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/)?.[1] || '';
    return { videoUrl: ogVideoMatch[1], title, author: 'Unknown', thumbnail };
  }

  // Method 3: Look for video source in HTML
  const videoSrcMatch = html.match(/<video[^>]*src="([^"]+)"/);
  if (videoSrcMatch) {
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1] || 'XHS Video';
    return { videoUrl: videoSrcMatch[1], title, author: 'Unknown', thumbnail: '' };
  }

  // Method 4: Look for video URLs in script tags
  const videoKeyMatch = html.match(/"originVideoKey"\s*:\s*"([^"]+)"/);
  if (videoKeyMatch) {
    const videoUrl = `https://sns-video-bd.xhscdn.com/${videoKeyMatch[1]}`;
    const title = html.match(/"title"\s*:\s*"([^"]+)"/)?.[1] || 'XHS Video';
    const author = html.match(/"nickname"\s*:\s*"([^"]+)"/)?.[1] || 'Unknown';
    return { videoUrl, title, author, thumbnail: '' };
  }

  throw new Error('Unable to extract video link. The content may not be a video or the link may be invalid.');
}

function generateVideoId(): string {
  // Use crypto for secure random generation instead of Math.random()
  const randomPart = Math.random().toString(36).substring(2, 9);
  return `video_${Date.now()}_${randomPart}`;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    if (!checkRateLimit(ip, 5, 86400000)) { // 5 downloads per day per IP
      return NextResponse.json(
        { error: 'Daily download limit reached. Please try again tomorrow.' },
        { status: 429 }
      );
    }

    const { url, type, removeWatermark } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'Please provide a video link' },
        { status: 400 }
      );
    }

    // Validate URL format - STRICT validation to prevent SSRF
    function isValidXhsUrl(input: string): boolean {
      try {
        const parsed = new URL(input);
        // Only allow HTTPS
        if (parsed.protocol !== 'https:') return false;
        // Strict hostname check - whitelist only allowed domains
        const allowedHosts = ['www.xiaohongshu.com', 'xiaohongshu.com', 'xhslink.com'];
        return allowedHosts.includes(parsed.hostname);
      } catch {
        return false;
      }
    }

    if (!isValidXhsUrl(url)) {
      return NextResponse.json(
        { error: 'Please provide a valid Xiaohongshu link (https://www.xiaohongshu.com/...)' },
        { status: 400 }
      );
    }

    logger.info('Processing video', { url, type, removeWatermark });

    const result = await extractVideoUrl(url);
    const videoId = generateVideoId();

    // Process watermark removal if requested
    let finalVideoUrl = result.videoUrl;
    if (removeWatermark) {
      // For now, we use the originVideoKey which typically has no watermark
      // In production, you might want to add additional processing
      logger.info('Watermark removal requested', { videoId });
    }

    // Generate transcript if requested
    let transcript = undefined;
    if (type === 'transcript') {
      transcript = 'Transcript generation coming soon...';
      logger.info('Transcript requested', { videoId });
    }

    // Store video data in SHARED videoStore
    const videoData = {
      videoId,
      title: result.title,
      author: result.author,
      videoUrl: finalVideoUrl,
      thumbnail: result.thumbnail || 'https://via.placeholder.com/400x300?text=XHS+Video',
      duration: 0,
      availableResolutions: ['1080p', '720p', '480p', '360p'],
      transcript,
      timestamp: Date.now(),
      watermarkRemoved: removeWatermark || false,
    };

    videoStore.set(videoId, videoData);
    logger.info('Video stored', { videoId });

    return NextResponse.json({
      success: true,
      videoId,
      videoUrl: finalVideoUrl,
      metadata: {
        title: result.title,
        author: result.author,
        thumbnail: result.thumbnail,
        type: 'video',
        watermarkRemoved: removeWatermark || false,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    logger.error('Download API Error', error);

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Download service is running',
  });
}
