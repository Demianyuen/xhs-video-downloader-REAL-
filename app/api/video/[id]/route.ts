import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

// SHARED in-memory storage for video data (same instance used by download API)
// TODO: Replace with persistent database (Supabase, PlanetScale, etc.)
export const videoStore = new Map();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const videoId = params.id;
    logger.info('Fetching video data', { videoId });

    // Get from storage
    const videoData = videoStore.get(videoId);

    if (!videoData) {
      logger.warn('Video not found', { videoId });
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(videoData);
  } catch (error) {
    logger.error('Failed to fetch video data', error);
    return NextResponse.json(
      { error: 'Failed to fetch video data' },
      { status: 500 }
    );
  }
}
