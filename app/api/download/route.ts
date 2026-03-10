import { NextRequest, NextResponse } from 'next/server';
import { isValidXHSUrl, extractVideoId } from '@/lib/xhs-service-vercel';

// Uses cobalt.tools API — free, no key required, supports XHS
async function fetchViaCoalt(url: string): Promise<{ url: string; filename?: string } | null> {
  try {
    const res = await fetch('https://api.cobalt.tools/api/json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ url, vCodec: 'h264', vQuality: '720', isNoTTWatermark: true }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.status === 'stream' || data.status === 'redirect') {
      return { url: data.url, filename: data.filename };
    }
    return null;
  } catch {
    return null;
  }
}

// Scrape XHS page for title and video URL from meta tags
async function scrapeXHSPage(pageUrl: string): Promise<{ title: string; videoUrl: string | null; thumbnail: string | null }> {
  try {
    const res = await fetch(pageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
        'Accept-Language': 'zh-TW,zh;q=0.9',
        'Referer': 'https://www.xiaohongshu.com/',
      },
    });
    const html = await res.text();

    const title =
      html.match(/<meta[^>]+property="og:title"[^>]+content="([^"]+)"/i)?.[1] ||
      html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] ||
      'XHS Video';

    const videoUrl =
      html.match(/<meta[^>]+property="og:video"[^>]+content="([^"]+)"/i)?.[1] ||
      html.match(/<meta[^>]+content="([^"]+)"[^>]+property="og:video"/i)?.[1] ||
      html.match(/["']url["']\s*:\s*["'](https:\/\/[^"']*\.mp4[^"']*)/i)?.[1] ||
      null;

    const thumbnail =
      html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i)?.[1] ||
      html.match(/<meta[^>]+content="([^"]+)"[^>]+property="og:image"/i)?.[1] ||
      null;

    return {
      title: decodeHTMLEntities(title.replace(' - 小红书', '').replace(' - 小紅書', '').trim()),
      videoUrl,
      thumbnail,
    };
  } catch {
    return { title: 'XHS Video', videoUrl: null, thumbnail: null };
  }
}

function decodeHTMLEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
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

    // Step 1: Try cobalt.tools for direct download URL
    const cobalt = await fetchViaCoalt(url);
    if (cobalt?.url) {
      const pageInfo = await scrapeXHSPage(url);
      return NextResponse.json({
        success: true,
        videoId,
        title: pageInfo.title,
        downloadUrl: cobalt.url,
        thumbnailUrl: pageInfo.thumbnail,
        source: 'cobalt',
      });
    }

    // Step 2: Fallback — scrape the page directly for og:video
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

    // Step 3: Nothing worked — return clear error
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
