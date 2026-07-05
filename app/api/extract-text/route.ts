import { NextRequest, NextResponse } from 'next/server';
import { extractSupportedUrl, isSupportedXHSUrl, normalizeXHSUrl } from '@/lib/xhs-url';

const DESKTOP_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 });
    }

    const { url } = body;

    if (!url) {
      return NextResponse.json({ success: false, error: 'URL is required' }, { status: 400 });
    }

    const extractedUrl = extractSupportedUrl(url);

    if (!isSupportedXHSUrl(extractedUrl)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a Xiaohongshu, XHS short link, or RedNote URL.' },
        { status: 400 },
      );
    }

    const normalizedUrl = normalizeXHSUrl(extractedUrl);
    const response = await fetch(normalizedUrl, {
      headers: {
        'User-Agent': DESKTOP_UA,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'zh-TW,zh;q=0.9,en;q=0.8',
        'Referer': 'https://www.xiaohongshu.com/',
      },
      redirect: 'follow',
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: `Failed to fetch page: ${response.status}` },
        { status: 502 },
      );
    }

    const html = await response.text();
    const extracted = extractPostText(html);

    if (extracted.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Could not extract text from this post. The post may be private, region-blocked, or rendered only after login.',
        },
        { status: 422 },
      );
    }

    return NextResponse.json({
      success: true,
      url: normalizedUrl,
      text: extracted.join('\n'),
    });
  } catch (error) {
    console.error('[extract-text] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Text extraction failed. Please try again later.' },
      { status: 500 },
    );
  }
}

function extractPostText(html: string): string[] {
  const extracted: string[] = [];

  const title = firstMetaContent(html, ['og:title', 'twitter:title']) || firstTitle(html);
  if (title) extracted.push(`Title: ${decodeHTMLEntities(title)}`);

  const description = firstMetaContent(html, ['og:description', 'description', 'twitter:description']);
  if (description) extracted.push(`Description: ${decodeHTMLEntities(description)}`);

  const jsonLd = extractJsonLd(html);
  for (const value of jsonLd) {
    if (value.name && value.name !== title) extracted.push(`Name: ${decodeHTMLEntities(value.name)}`);
    if (value.description && value.description !== description) {
      extracted.push(`Post text: ${decodeHTMLEntities(value.description)}`);
    }
  }

  const hashtags = [...new Set(html.match(/#[\u4e00-\u9fa5\w-]+/g) || [])].slice(0, 20);
  if (hashtags.length > 0) extracted.push(`Hashtags: ${hashtags.join(' ')}`);

  return [...new Set(extracted.map((line) => line.trim()).filter(Boolean))];
}

function firstMetaContent(html: string, names: string[]): string | null {
  for (const name of names) {
    const propertyPattern = new RegExp(`<meta[^>]+property=["']${escapeRegExp(name)}["'][^>]+content=["']([^"']+)["']`, 'i');
    const namePattern = new RegExp(`<meta[^>]+name=["']${escapeRegExp(name)}["'][^>]+content=["']([^"']+)["']`, 'i');
    const reversePattern = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${escapeRegExp(name)}["']`, 'i');
    const match = html.match(propertyPattern) || html.match(namePattern) || html.match(reversePattern);
    if (match?.[1]) return match[1];
  }
  return null;
}

function firstTitle(html: string): string | null {
  return html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] || null;
}

function extractJsonLd(html: string): Array<{ name?: string; description?: string }> {
  const scripts = html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
  const values: Array<{ name?: string; description?: string }> = [];

  for (const script of scripts) {
    try {
      const parsed = JSON.parse(script[1]);
      const entries = Array.isArray(parsed) ? parsed : [parsed];
      for (const entry of entries) {
        if (entry && typeof entry === 'object') values.push(entry);
      }
    } catch {
      // Ignore malformed embedded metadata.
    }
  }

  return values;
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

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
