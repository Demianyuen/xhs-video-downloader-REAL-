import { NextRequest, NextResponse } from 'next/server';
import { extractVideoId, fetchXHSVideoInfo, getVideoDownloadUrl } from '@/lib/xhs-service';
import { processXHSVideo } from '@/lib/video-processor';

export async function POST(request: NextRequest) {
  try {
    const { url, format = 'mp4', removeWatermark = true, extractTranscript = true } = await request.json();

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'URL is required' },
        { status: 400 }
      );
    }

    // Extract video ID from XHS URL
    const videoId = extractVideoId(url);
    
    if (!videoId) {
      return NextResponse.json(
        { success: false, error: 'Invalid XHS URL. Please provide a valid Xiaohongshu video link.' },
        { status: 400 }
      );
    }

    console.log(`[Download API] Processing video: ${videoId}`);

    // Fetch video information
    const videoInfo = await fetchXHSVideoInfo(videoId);
    console.log(`[Download API] Video info fetched:`, videoInfo);

    // Process video (remove watermark, extract transcript)
    const processedVideo = await processXHSVideo(videoId, {
      removeWatermark,
      extractTranscript,
      format: format as 'mp4' | 'mp3' | 'webm',
      quality: '1080p',
    });

    // Get download URL
    const downloadUrl = await getVideoDownloadUrl(videoId, format);

    return NextResponse.json({
      success: true,
      videoId,
      title: videoInfo.title,
      author: videoInfo.author,
      duration: `${Math.floor(videoInfo.duration / 60)}:${String(videoInfo.duration % 60).padStart(2, '0')}`,
      format,
      quality: '1080p',
      hasWatermark: videoInfo.hasWatermark,
      watermarkRemoved: processedVideo.watermarkRemoved,
      transcript: processedVideo.transcript,
      downloadUrl,
      thumbnailUrl: videoInfo.thumbnailUrl,
      message: 'Video processed successfully! Click the download button to get your video.',
    });
  } catch (error) {
    console.error('[Download API] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to process video';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
