import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { url, format = 'mp4' } = await request.json();

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'URL is required' },
        { status: 400 }
      );
    }

    // Extract video ID from XHS URL
    // XHS URLs typically look like: https://www.xiaohongshu.com/explore/xxx or https://xhslink.com/xxx
    const videoIdMatch = url.match(/(?:xiaohongshu\.com|xhslink\.com)\/(?:explore\/)?([a-zA-Z0-9]+)/);
    
    if (!videoIdMatch) {
      return NextResponse.json(
        { success: false, error: 'Invalid XHS URL' },
        { status: 400 }
      );
    }

    const videoId = videoIdMatch[1];

    // TODO: Integrate with actual XHS download service
    // For now, return a mock response
    // In production, you would:
    // 1. Use a library like yt-dlp or similar for XHS
    // 2. Process the video (remove watermark, extract transcript)
    // 3. Return the download URL

    const mockDownloadUrl = `/api/download/${videoId}?format=${format}`;

    return NextResponse.json({
      success: true,
      videoId,
      format,
      downloadUrl: mockDownloadUrl,
      title: `XHS Video ${videoId}`,
      duration: '2:30',
      quality: 'HD',
      hasWatermark: false,
      transcript: 'Sample transcript will be available here...',
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process video' },
      { status: 500 }
    );
  }
}
