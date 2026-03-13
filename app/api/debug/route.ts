import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { url } = await request.json();
  const results: Record<string, unknown> = {};

  const UAs = [
    ['desktop', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'],
    ['mobile', 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'],
    ['googlebot', 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'],
  ];

  for (const [name, ua] of UAs) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': ua,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'zh-CN,zh;q=0.9',
          'Referer': 'https://www.xiaohongshu.com/',
        },
        redirect: 'follow',
      });
      const html = await res.text();
      results[name] = {
        status: res.status,
        finalUrl: res.url,
        length: html.length,
        hasMasterUrl: html.includes('"masterUrl"'),
        hasOgVideo: html.includes('og:video'),
        hasSnsVideo: html.includes('sns-video-qc') || html.includes('sns-video-hw'),
        hasMp4: html.includes('.mp4'),
        hasInitialState: html.includes('__INITIAL_STATE__'),
        preview: html.substring(0, 300),
      };
    } catch (e: unknown) {
      results[name] = { error: String(e) };
    }
  }

  return NextResponse.json(results);
}
