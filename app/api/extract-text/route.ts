import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ success: false, error: 'URL is required' }, { status: 400 });
    }

    if (!url.includes('xiaohongshu.com') && !url.includes('xhslink.com')) {
      return NextResponse.json({ success: false, error: 'Invalid XHS URL' }, { status: 400 });
    }

    // Fetch the XHS page with browser-like headers
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'zh-TW,zh;q=0.9,en;q=0.8',
        'Referer': 'https://www.xiaohongshu.com/',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ success: false, error: `Failed to fetch page: ${response.status}` }, { status: 502 });
    }

    const html = await response.text();

    // Extract text content from meta tags and JSON-LD (most reliable)
    const extracted: string[] = [];

    // Title from og:title or title tag
    const ogTitle = html.match(/<meta[^>]+property="og:title"[^>]+content="([^"]+)"/i)?.[1]
      || html.match(/<meta[^>]+content="([^"]+)"[^>]+property="og:title"/i)?.[1]
      || html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1];
    if (ogTitle) extracted.push(`📌 ${decodeHTMLEntities(ogTitle)}`);

    // Description from og:description or meta description
    const ogDesc = html.match(/<meta[^>]+property="og:description"[^>]+content="([^"]+)"/i)?.[1]
      || html.match(/<meta[^>]+content="([^"]+)"[^>]+property="og:description"/i)?.[1]
      || html.match(/<meta[^>]+name="description"[^>]+content="([^"]+)"/i)?.[1]
      || html.match(/<meta[^>]+content="([^"]+)"[^>]+name="description"/i)?.[1];
    if (ogDesc) extracted.push(`\n📝 ${decodeHTMLEntities(ogDesc)}`);

    // Try to extract from JSON-LD or __INITIAL_STATE__
    const jsonLdMatch = html.match(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i);
    if (jsonLdMatch) {
      try {
        const jsonData = JSON.parse(jsonLdMatch[1]);
        if (jsonData.description) extracted.push(`\n${decodeHTMLEntities(jsonData.description)}`);
        if (jsonData.name && jsonData.name !== ogTitle) extracted.push(decodeHTMLEntities(jsonData.name));
      } catch { /* ignore parse errors */ }
    }

    // Extract hashtags from the page
    const hashtags = [...new Set(html.match(/#[\u4e00-\u9fa5\w]+/g) || [])].slice(0, 20);
    if (hashtags.length > 0) extracted.push(`\n🏷️ ${hashtags.join(' ')}`);

    if (extracted.length === 0) {
      return NextResponse.json({
        success: false,
        error: '無法提取文字內容。小紅書可能需要登入才能查看此筆記。請嘗試使用公開的筆記連結。',
      }, { status: 422 });
    }

    return NextResponse.json({
      success: true,
      text: extracted.join('\n'),
    });

  } catch (error) {
    console.error('[extract-text] Error:', error);
    return NextResponse.json({
      success: false,
      error: '提取失敗，請稍後重試。',
    }, { status: 500 });
  }
}

function decodeHTMLEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)));
}
