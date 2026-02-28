import { NextRequest, NextResponse } from 'next/server';

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.0',
  'Referer': 'https://www.xiaohongshu.com/',
  'Accept': 'application/json, text/plain, */*',
};

async function resolveXhslinkUrl(url: string): Promise<string> {
  const res = await fetch(url, { method: 'GET', redirect: 'follow', headers: HEADERS });
  return res.url;
}

async function extractVideoUrl(postUrl: string): Promise<{ videoUrl: string; title: string }> {
  // Extract post ID from URL
  const idMatch = postUrl.match(/\/(?:explore|discovery\/item)\/([a-zA-Z0-9]+)/);
  if (!idMatch) throw new Error('无法解析链接');
  const noteId = idMatch[1];

  // Fetch the page HTML
  const res = await fetch(`https://www.xiaohongshu.com/explore/${noteId}`, {
    headers: HEADERS,
  });
  const html = await res.text();

  // Extract __INITIAL_STATE__ JSON from page
  const stateMatch = html.match(/window\.__INITIAL_STATE__\s*=\s*(\{.+?\});?\s*<\/script>/s);
  if (!stateMatch) throw new Error('无法提取视频数据');

  const state = JSON.parse(stateMatch[1]);
  const note = state?.note?.noteDetailMap?.[noteId]?.note;
  if (!note) throw new Error('找不到视频信息');

  const videoUrl = note?.video?.media?.stream?.h264?.[0]?.masterUrl
    || note?.video?.media?.stream?.h265?.[0]?.masterUrl;

  if (!videoUrl) throw new Error('该内容不包含视频或视频不可用');

  return { videoUrl, title: note?.title || 'xhs-video' };
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    if (!url) return NextResponse.json({ error: '请提供视频链接' }, { status: 400 });

    // Extract URL from share text
    const urlMatch = url.match(/https?:\/\/[^\s]+/);
    let cleanUrl = urlMatch ? urlMatch[0] : url.trim();

    // Resolve xhslink.com short URLs
    if (cleanUrl.includes('xhslink.com')) {
      cleanUrl = await resolveXhslinkUrl(cleanUrl);
    }

    if (!cleanUrl.includes('xiaohongshu.com')) {
      return NextResponse.json({ error: '请提供有效的小红书链接' }, { status: 400 });
    }

    const { videoUrl, title } = await extractVideoUrl(cleanUrl);

    return NextResponse.json({
      success: true,
      videoUrl,
      title,
      message: '视频准备就绪',
    });

  } catch (error: any) {
    console.error('[Download] Error:', error);
    return NextResponse.json(
      { error: error.message || '服务器错误，请稍后重试' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok' });
}
