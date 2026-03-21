import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

const XHS_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
  'Referer': 'https://www.xiaohongshu.com/',
};

/**
 * Extract transcript/subtitle from XHS video post
 */
async function extractTranscriptFromPost(url: string): Promise<{
  success: boolean;
  transcript?: {
    text: string;
    segments?: Array<{
      start: number;
      end: number;
      text: string;
    }>;
  };
  title?: string;
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

    // Extract from __INITIAL_STATE__
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
            // Method 1: Extract from desc (description/text content)
            const desc = note.desc || note.title || '';
            if (desc && desc.length > 50) {
              return {
                success: true,
                transcript: {
                  text: desc,
                },
                title,
              };
            }

            // Method 2: Extract from video caption/subtitle data
            const video = note.video;
            if (video) {
              // Check for subtitle info
              const subtitleInfo = video.consumer?.originVideoKey || video.media?.subtitle;

              // Method 3: Extract from note card text content
              const descText = note.desc || '';
              if (descText) {
                // Try to parse as structured content (bullet points, numbered lists, etc.)
                const lines = descText.split('\n').filter((line: string) => line.trim().length > 0);

                if (lines.length > 0) {
                  return {
                    success: true,
                    transcript: {
                      text: descText,
                      segments: lines.map((line: string, index: number) => ({
                        start: index * 5, // Rough estimation
                        end: (index + 1) * 5,
                        text: line.trim(),
                      })),
                    },
                    title,
                  };
                }
              }

              // Method 4: Check for embedded transcript data
              const transcriptData = note.video?.media?.stream?.h264?.[0]?.transcript;
              if (transcriptData) {
                return {
                  success: true,
                  transcript: {
                    text: transcriptData,
                  },
                  title,
                };
              }
            }
          }
        }
      } catch {
        // JSON parse failed
      }
    }

    // Method 5: Extract text content from page body
    const bodyText = html.replace(/<script[^>]*>.*?<\/script>/gs, '')
      .replace(/<style[^>]*>.*?<\/style>/gs, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (bodyText.length > 100) {
      return {
        success: true,
        transcript: {
          text: bodyText.substring(0, 2000), // Limit to 2000 characters
        },
        title,
      };
    }

    return {
      success: false,
      title,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    logger.error('Transcript extraction error', error);
    return {
      success: false,
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
        // Not a direct URL
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

    logger.info('Extracting transcript from post', { url: extractedUrl });

    const result = await extractTranscriptFromPost(extractedUrl);

    if (!result.success || !result.transcript) {
      return NextResponse.json(
        {
          success: false,
          error: 'No transcript found. The post may not have text content or subtitles.',
          note: 'Video transcripts are only available if the creator has added captions or if the post contains substantial text content.',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      title: result.title,
      transcript: result.transcript,
      wordCount: result.transcript.text?.length || 0,
      format: 'text',
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    logger.error('Transcript extraction API Error', error);

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
    message: 'Transcript extraction service is running',
  });
}
