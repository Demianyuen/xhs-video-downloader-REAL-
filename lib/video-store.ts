/**
 * Shared video store for managing downloaded video data
 * Used by both download and video retrieval APIs
 */

export interface StoredVideoData {
  videoId: string;
  title: string;
  author: string;
  videoUrl: string;
  transcript?: string;
  duration: number;
  thumbnail: string;
  availableResolutions?: string[];
  timestamp: number;
}

// In-memory store (replace with database in production)
export const videoStore = new Map<string, StoredVideoData>();

// Clean up old videos after 24 hours
setInterval(() => {
  const now = Date.now();
  const maxAge = 24 * 60 * 60 * 1000; // 24 hours

  for (const [key, value] of videoStore.entries()) {
    if (now - value.timestamp > maxAge) {
      videoStore.delete(key);
    }
  }
}, 60 * 60 * 1000); // Check every hour
