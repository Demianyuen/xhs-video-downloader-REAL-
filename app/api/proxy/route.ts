import { NextRequest, NextResponse } from 'next/server';

// Proxy video download to bypass browser CORS restrictions on XHS CDN URLs
export async function GET(request: NextRequest) {
  const videoUrl = request.nextUrl.searchParams.get('url');
  const filename = request.nextUrl.searchParams.get('filename') || 'xhs-video.mp4';

  if (!videoUrl) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  // Only allow XHS CDN domains
  let parsed: URL;
  try {
    parsed = new URL(videoUrl);
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  const allowedHosts = [
    'sns-video-qc.xhscdn.com',
    'sns-video-hw.xhscdn.com',
    'sns-video-bd.xhscdn.com',
    'sns-video-qn.xhscdn.com',
    'sns-video-hw.xhscdn.net',
    'xhscdn.com',
    'xhslink.com',
  ];

  const isAllowed = allowedHosts.some(h => parsed.hostname.endsWith(h));
  if (!isAllowed) {
    return NextResponse.json({ error: 'Domain not allowed' }, { status: 403 });
  }

  try {
    const res = await fetch(videoUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://www.xiaohongshu.com/',
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: `Upstream error: ${res.status}` }, { status: 502 });
    }

    const contentType = res.headers.get('content-type') || 'video/mp4';
    const contentLength = res.headers.get('content-length');

    const headers: Record<string, string> = {
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}.mp4"`,
      'Cache-Control': 'no-store',
    };
    if (contentLength) headers['Content-Length'] = contentLength;

    return new NextResponse(res.body, { status: 200, headers });
  } catch (err) {
    console.error('[Proxy] Error:', err);
    return NextResponse.json({ error: 'Failed to proxy video' }, { status: 500 });
  }
}
