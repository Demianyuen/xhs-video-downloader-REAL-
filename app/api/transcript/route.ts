import { NextRequest, NextResponse } from 'next/server';
import { extractSupportedUrl, isSupportedXHSUrl } from '@/lib/xhs-url';
import { transcribeMediaUrl } from '@/lib/transcript-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 });
    }

    const { mediaUrl, url, language = 'zh' } = body;
    const sourceUrl = mediaUrl || url;

    if (!sourceUrl) {
      return NextResponse.json(
        { success: false, error: 'Please provide mediaUrl or a Xiaohongshu/RedNote post URL.' },
        { status: 400 },
      );
    }

    let directMediaUrl = mediaUrl;
    let source = 'direct_media_url';

    if (!directMediaUrl) {
      const extractedUrl = extractSupportedUrl(url);
      if (!isSupportedXHSUrl(extractedUrl)) {
        return NextResponse.json(
          { success: false, error: 'Please provide a valid Xiaohongshu, XHS short link, or RedNote URL.' },
          { status: 400 },
        );
      }

      const downloadResponse = await fetch(new URL('/api/download', request.url), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: extractedUrl }),
      });
      const downloadPayload = await downloadResponse.json();

      if (!downloadPayload.success || !downloadPayload.downloadUrl) {
        return NextResponse.json(
          {
            success: false,
            error: downloadPayload.error || 'Could not resolve a downloadable media URL for transcription.',
          },
          { status: 422 },
        );
      }

      directMediaUrl = downloadPayload.downloadUrl;
      source = downloadPayload.source || 'post_download_resolution';
    }

    const transcript = await transcribeMediaUrl(directMediaUrl, { language });

    return NextResponse.json({
      success: true,
      transcript: transcript.text,
      language,
      model: transcript.model,
      source,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to transcribe media.';
    console.error('[transcript] Error:', message);

    return NextResponse.json(
      { success: false, error: message },
      { status: message.includes('OPENAI_API_KEY') ? 503 : 500 },
    );
  }
}
