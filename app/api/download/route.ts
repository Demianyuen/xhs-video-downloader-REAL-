import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

const XHS_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
  'Referer': 'https://www.xiaohongshu.com/',
};

// In-memory storage for video data
const videoStore = new Map();

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
  return `video_${Date.now()}_${Math.random().toString(36).substring(7)}`;
}

export async function POST(request: NextRequest) {
  try {
    const { url, type } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'Please provide a video link' },
        { status: 400 }
      );
    }

    // Validate URL format
    if (!url.includes('xiaohongshu.com') && !url.includes('xhslink.com')) {
      return NextResponse.json(
        { error: 'Please provide a valid Xiaohongshu link' },
        { status: 400 }
      );
    }

    logger.info('Processing video', { url, type });

    const result = await extractVideoUrl(url);
    const videoId = generateVideoId();

    // Store video data
    const videoData = {
      videoId,
      title: result.title,
      author: result.author,
      videoUrl: result.videoUrl,
      thumbnail: result.thumbnail || 'https://via.placeholder.com/400x300?text=XHS+Video',
      duration: 0,
      availableResolutions: ['1080p', '720p', '480p', '360p'],
      transcript: type === 'transcript' ? 'Transcript generation coming soon...' : undefined,
      createdAt: Date.now(),
    };

    videoStore.set(videoId, videoData);
    logger.info('Video stored', { videoId });

    return NextResponse.json({
      success: true,
      videoId,
      videoUrl: result.videoUrl,
      metadata: {
        title: result.title,
        author: result.author,
        type: 'video',
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
