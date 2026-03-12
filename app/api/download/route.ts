import { NextRequest, NextResponse } from 'next/server';
import { isValidXHSUrl, extractVideoId } from '@/lib/xhs-service-vercel';

const DESKTOP_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const MOBILE_UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1';

function decodeHTMLEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
}

// Fetch XHS page and extract video URL, title, thumbnail
// Tries desktop UA first (gets __INITIAL_STATE__ with masterUrl),
// then mobile UA (may get og:video meta tag)
async function scrapeXHSPage(pageUrl: string): Promise<{
  title: string;
  videoUrl: string | null;
  thumbnail: string | null;
}> {
  // Try both the /explore/ and /discovery/item/ URL formats
  const noteId = pageUrl.match(/\/(?:explore|discovery\/item)\/([a-zA-Z0-9]+)/)?.[1];
  const urlsToTry = [
    pageUrl,
    noteId ? `https://www.xiaohongshu.com/discovery/item/${noteId}` : null,
  ].filter(Boolean) as string[];

  for (const tryUrl of urlsToTry) {
    for (const ua of [DESKTOP_UA, MOBILE_UA]) {
      try {
        const res = await fetch(tryUrl, {
          headers: {
            'User-Agent': ua,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Referer': 'https://www.xiaohongshu.com/',
          },
        });

        if (!res.ok) {
          console.log(`[Scrape] HTTP ${res.status} for ${tryUrl}`);
          continue;
        }
        const html = await res.text();
        console.log(`[Scrape] Got ${html.length} bytes from ${tryUrl} (${ua === DESKTOP_UA ? 'desktop' : 'mobile'}), has_masterUrl=${html.includes('"masterUrl"')}, has_sns=${html.includes('sns-video')}, has_ogvideo=${html.includes('og:video')}`);

        // Extract title
        const title = decodeHTMLEntities(
          (html.match(/<meta[^>]+property="og:title"[^>]+content="([^"]+)"/i)?.[1] ||
           html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] ||
           'XHS Video')
            .replace(' - 小红书', '').replace(' - 小紅書', '').trim()
        );

        // Extract thumbnail
        const thumbnail =
          html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i)?.[1] ||
          html.match(/<meta[^>]+content="([^"]+)"[^>]+property="og:image"/i)?.[1] ||
          null;

        // Strategy 1: og:video meta tag (mobile UA sometimes returns this)
        const ogVideo =
          html.match(/<meta[^>]+property="og:video"[^>]+content="([^"]+)"/i)?.[1] ||
          html.match(/<meta[^>]+content="([^"]+)"[^>]+property="og:video"/i)?.[1] ||
          null;
        if (ogVideo) {
          console.log(`[Scrape] og:video found via ${ua === DESKTOP_UA ? 'desktop' : 'mobile'} UA`);
          return { title, videoUrl: ogVideo, thumbnail };
        }

        // Strategy 2: masterUrl in __INITIAL_STATE__ (desktop UA gets this)
        const masterUrlMatch = html.match(/"masterUrl"\s*:\s*"(https?:[^"]+)"/);
        if (masterUrlMatch) {
          const videoUrl = decodeURIComponent(masterUrlMatch[1].replace(/\\u002F/g, '/'));
          console.log(`[Scrape] masterUrl found`);
          return { title, videoUrl, thumbnail };
        }

        // Strategy 3: sns-video CDN URLs in page source
        const snsMatch = html.match(/https:\/\/[^"'\s<>\\]+sns-video[^"'\s<>\\]+\.mp4[^"'\s<>\\]*/);
        if (snsMatch) {
          const videoUrl = decodeURIComponent(snsMatch[0]);
          console.log(`[Scrape] sns-video URL found`);
          return { title, videoUrl, thumbnail };
        }

        // Strategy 4: any .mp4 URL in the page
        const mp4Match = html.match(/https:\/\/[^"'\s<>\\]+\.mp4[^"'\s<>\\]*/);
        if (mp4Match) {
          console.log(`[Scrape] mp4 URL found`);
          return { title, videoUrl: mp4Match[0], thumbnail };
        }

        // No video found with this UA, try next
        console.log(`[Scrape] No video URL found with ${ua === DESKTOP_UA ? 'desktop' : 'mobile'} UA on ${tryUrl}`);
      } catch (err) {
        console.error(`[Scrape] Error fetching ${tryUrl}:`, err);
      }
    }
  }

  return { title: 'XHS Video', videoUrl: null, thumbnail: null };
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ success: false, error: 'URL is required' }, { status: 400 });
    }

    if (!isValidXHSUrl(url)) {
      return NextResponse.json(
        { success: false, error: 'Invalid XHS URL. Please provide a valid Xiaohongshu link.' },
        { status: 400 }
      );
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      return NextResponse.json({ success: false, error: 'Could not extract video ID from URL' }, { status: 400 });
    }

    console.log(`[Download API] Processing: ${videoId}`);

    const pageInfo = await scrapeXHSPage(url);

    if (pageInfo.videoUrl) {
      return NextResponse.json({
        success: true,
        videoId,
        title: pageInfo.title,
        downloadUrl: pageInfo.videoUrl,
        thumbnailUrl: pageInfo.thumbnail,
        source: 'scrape',
      });
    }

    return NextResponse.json({
      success: false,
      error: '無法提取視頻連結。請確認連結是公開的視頻筆記，或稍後再試。',
    }, { status: 422 });

  } catch (error) {
    console.error('[Download API] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process video. Please try again.' },
      { status: 500 }
    );
  }
}
