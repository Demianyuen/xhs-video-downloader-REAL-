import { NextRequest, NextResponse } from 'next/server';
import { isValidXHSUrl, extractVideoId } from '@/lib/xhs-service-vercel';

const DESKTOP_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

function decodeHTMLEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
}

// Step 1: Get session cookies from XHS homepage
async function getXHSCookies(): Promise<string> {
  try {
    const res = await fetch('https://www.xiaohongshu.com/', {
      headers: { 'User-Agent': DESKTOP_UA, 'Accept-Language': 'zh-CN,zh;q=0.9' },
      redirect: 'follow',
    });
    const setCookies = res.headers.getSetCookie?.() ?? [];
    return setCookies.map(c => c.split(';')[0]).join('; ');
  } catch {
    return '';
  }
}

// Step 2: Call XHS internal feed API with xsec_token to get masterUrl
async function fetchViaFeedAPI(noteId: string, xsecToken: string, xsecSource: string, cookies: string): Promise<{
  title: string;
  videoUrl: string | null;
  thumbnail: string | null;
} | null> {
  try {
    const body = JSON.stringify({
      source_note_id: noteId,
      image_formats: ['jpg', 'webp', 'avif'],
      extra: { need_body_topic: '1' },
      xsec_source: xsecSource || 'pc_feed',
      xsec_token: xsecToken,
    });

    const res = await fetch('https://www.xiaohongshu.com/api/sns/web/v1/feed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': DESKTOP_UA,
        'Referer': `https://www.xiaohongshu.com/explore/${noteId}`,
        'Origin': 'https://www.xiaohongshu.com',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cookie': cookies,
      },
      body,
    });

    if (!res.ok) {
      console.log(`[FeedAPI] HTTP ${res.status}`);
      return null;
    }

    const data = await res.json();
    console.log(`[FeedAPI] success=${data.success} code=${data.code}`);

    if (!data.success || !data.data?.items?.length) return null;

    const note = data.data.items[0]?.note_card;
    if (!note) return null;

    const title = decodeHTMLEntities(note.title || note.desc || 'XHS Video');
    const thumbnail = note.cover?.url_default || note.cover?.url || null;

    // Extract video masterUrl
    const video = note.video;
    const masterUrl =
      video?.consumer?.origin_video_key ||
      video?.media?.stream?.h264?.[0]?.master_url ||
      video?.media?.stream?.av1?.[0]?.master_url ||
      video?.media?.stream?.h265?.[0]?.master_url ||
      null;

    if (masterUrl) {
      console.log(`[FeedAPI] masterUrl found`);
      return { title, videoUrl: masterUrl, thumbnail };
    }

    return null;
  } catch (err) {
    console.error('[FeedAPI] Error:', err);
    return null;
  }
}

// Step 3: Fallback — scrape the page HTML for any video URL
// Only works if XHS doesn't block the IP (unlikely from Vercel US-East)
async function scrapePageFallback(pageUrl: string, cookies: string): Promise<{
  title: string;
  videoUrl: string | null;
  thumbnail: string | null;
}> {
  try {
    const res = await fetch(pageUrl, {
      headers: {
        'User-Agent': DESKTOP_UA,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Referer': 'https://www.xiaohongshu.com/',
        'Cookie': cookies,
      },
      redirect: 'follow',
    });

    if (!res.ok) return { title: 'XHS Video', videoUrl: null, thumbnail: null };
    const html = await res.text();

    const title = decodeHTMLEntities(
      (html.match(/<meta[^>]+property="og:title"[^>]+content="([^"]+)"/i)?.[1] ||
       html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] ||
       'XHS Video')
        .replace(' - 小红书', '').replace(' - 小紅書', '').trim()
    );
    const thumbnail =
      html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i)?.[1] || null;

    // Try og:video
    const ogVideo = html.match(/<meta[^>]+property="og:video"[^>]+content="([^"]+)"/i)?.[1] || null;
    if (ogVideo) return { title, videoUrl: ogVideo, thumbnail };

    // Try masterUrl in embedded JSON
    const masterUrlMatch = html.match(/"masterUrl"\s*:\s*"(https?:[^"]+)"/);
    if (masterUrlMatch) {
      return { title, videoUrl: decodeURIComponent(masterUrlMatch[1].replace(/\\u002F/g, '/')), thumbnail };
    }

    return { title, videoUrl: null, thumbnail };
  } catch {
    return { title: 'XHS Video', videoUrl: null, thumbnail: null };
  }
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

    // Extract xsec_token and xsec_source from the share URL
    const parsedUrl = new URL(url.startsWith('http') ? url : `https://www.xiaohongshu.com${url}`);
    const xsecToken = parsedUrl.searchParams.get('xsec_token') || '';
    const xsecSource = parsedUrl.searchParams.get('xsec_source') || 'pc_feed';

    console.log(`[Download API] Processing: ${videoId}, hasToken: ${!!xsecToken}`);

    // Get session cookies
    const cookies = await getXHSCookies();

    // Strategy 1: Feed API with xsec_token (requires real token from share URL)
    if (xsecToken) {
      const feedResult = await fetchViaFeedAPI(videoId, xsecToken, xsecSource, cookies);
      if (feedResult?.videoUrl) {
        return NextResponse.json({
          success: true,
          videoId,
          title: feedResult.title,
          downloadUrl: feedResult.videoUrl,
          thumbnailUrl: feedResult.thumbnail,
          source: 'feed_api',
        });
      }
    }

    // Strategy 2: Page scrape fallback (works if not IP-blocked)
    const pageResult = await scrapePageFallback(url, cookies);
    if (pageResult.videoUrl) {
      return NextResponse.json({
        success: true,
        videoId,
        title: pageResult.title,
        downloadUrl: pageResult.videoUrl,
        thumbnailUrl: pageResult.thumbnail,
        source: 'scrape',
      });
    }

    // No token and scraping failed — tell user to include the full share URL
    const errorMsg = xsecToken
      ? '無法提取視頻連結。請確認連結是公開的視頻筆記，或稍後再試。'
      : '請貼上完整的小紅書分享連結（包含 xsec_token 參數）以確保下載成功。';

    return NextResponse.json({ success: false, error: errorMsg }, { status: 422 });

  } catch (error) {
    console.error('[Download API] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process video. Please try again.' },
      { status: 500 }
    );
  }
}
