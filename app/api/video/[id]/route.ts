import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

// In-memory storage for video data (replace with database later)
const videoStore = new Map();

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

// Export for use in download API
export { videoStore };
