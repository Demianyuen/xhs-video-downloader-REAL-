import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

const XHS_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
  'Referer': 'https://www.xiaohongshu.com/',
};

/**
 * Extract images from XHS post
 */
async function extractImagesFromPost(url: string): Promise<{
  success: boolean;
  images: Array<{
    url: string;
    thumbnail: string;
    description?: string;
  }>;
  title: string;
}> {
  try {
    const response = await fetch(url, {
      headers: XHS_HEADERS,
      redirect: 'follow',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch page: ${response.status}`);
    }

    const html = await response.text();

    // Extract title
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    const title = titleMatch ? titleMatch[1].replace(' - 小红书', '').replace(' | RED', '') : 'XHS Post';

    // Extract images from __INITIAL_STATE__
    const stateMatch = html.match(/__INITIAL_STATE__\s*=\s*({.+?})\s*<\/script>/s);
    const images: Array<{ url: string; thumbnail: string; description?: string }> = [];

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
            const imageList = note.image_list || note.interact_info?.image_list || [];

            for (const imageData of imageList) {
              const traceId = imageData.trace_id || imageData.url?.split('/').pop();
              if (traceId) {
                const imageUrl = `https://sns-img-hw.xhscdn.com/${traceId}`;
                const thumbnailUrl = `https://sns-img-hw.xhscdn.com/${traceId}?imageView2/2/w/400/format/webp`;

                images.push({
                  url: imageUrl,
                  thumbnail: thumbnailUrl,
                  description: note.title || note.desc || '',
                });
              }
            }
          }
        }
      } catch {
        // JSON parse failed, try other methods
      }
    }

    // Method 2: Extract from meta tags
    const ogImageMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/g);
    if (ogImageMatch && images.length === 0) {
      for (const match of ogImageMatch) {
        const urlMatch = match.match(/content="([^"]+)"/);
        if (urlMatch) {
          images.push({
            url: urlMatch[1],
            thumbnail: urlMatch[1],
          });
        }
      }
    }

    return {
      success: true,
      images,
      title,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    logger.error('Image extraction error', error);
    return {
      success: false,
      images: [],
      title: 'Error',
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'Please provide a post URL' },
        { status: 400 }
      );
    }

    // Extract URL from clipboard content (handles mobile app format)
    const extractUrlFromClipboard = (input: string): string | null => {
      const trimmed = input.trim();
      try {
        const parsed = new URL(trimmed);
        if (parsed.hostname.includes('xiaohongshu.com') || parsed.hostname.includes('xhslink.com')) {
          return trimmed;
        }
      } catch {
        // Not a direct URL, continue to extraction
      }
      const urlRegex = /https?:\/\/(?:www\.)?(?:xiaohongshu\.com|xhslink\.com)[^\s\u4e00-\u9fff]*/gi;
      const match = trimmed.match(urlRegex);
      if (match && match[0]) {
        let extractedUrl = match[0].replace(/[.,;:!？。，；：！]+$/, '');
        if (extractedUrl.startsWith('http://')) {
          extractedUrl = extractedUrl.replace('http://', 'https://');
        }
        return extractedUrl;
      }
      return null;
    };

    const extractedUrl = extractUrlFromClipboard(url);
    if (!extractedUrl) {
      return NextResponse.json(
        { error: 'Please provide a valid Xiaohongshu post URL' },
        { status: 400 }
      );
    }

    logger.info('Extracting images from post', { url: extractedUrl });

    const result = await extractImagesFromPost(extractedUrl);

    if (!result.success || result.images.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'No images found. The post may not contain images or the link may be invalid.',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      title: result.title,
      images: result.images,
      count: result.images.length,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    logger.error('Image extraction API Error', error);

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
    message: 'Image extraction service is running',
  });
}
