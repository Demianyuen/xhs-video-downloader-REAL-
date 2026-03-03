import { NextRequest, NextResponse } from 'next/server';
import {
  extractVideoId,
  fetchXHSVideoInfo,
  processXHSVideo,
  cleanupTempFiles,
} from '@/lib/xhs-service-production';

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

    try {
      // Fetch video information
      const videoInfo = await fetchXHSVideoInfo(videoId);
      console.log(`[Download API] Video info fetched:`, videoInfo);

      // Process video (download, remove watermark, extract transcript)
      const processedVideo = await processXHSVideo(videoId, {
        removeWatermark,
        extractTranscript,
        format: format as 'mp4' | 'mp3' | 'webm',
        quality: '1080p',
      });

      // Generate download token (in production, this would be a signed URL)
      const downloadToken = Buffer.from(JSON.stringify({
        videoId,
        timestamp: Date.now(),
        path: processedVideo.downloadPath,
      })).toString('base64');

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
        fileSize: processedVideo.fileSize,
        downloadToken,
        downloadUrl: `/api/download/${videoId}?token=${downloadToken}`,
        thumbnailUrl: videoInfo.thumbnailUrl,
        message: 'Video processed successfully! Click the download button to get your video.',
      });
    } catch (error) {
      // Cleanup temp files on error
      await cleanupTempFiles(videoId);
      throw error;
    }
  } catch (error) {
    console.error('[Download API] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to process video';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
