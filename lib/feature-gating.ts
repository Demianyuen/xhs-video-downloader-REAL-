/**
 * Feature Gating System
 * Controls access to premium features based on subscription tier
 */

import { getUserSubscription, isSubscriptionExpired } from './subscription-schema';

export interface FeatureGates {
  canDownload: boolean;
  canGetTranscript: boolean;
  canBatchDownload: boolean;
  isAdFree: boolean;
  maxResolution: '480p' | '720p' | '1080p';
  downloadsRemaining: number;
}

/**
 * Get feature gates for a user
 */
export function getFeatureGates(userId: string): FeatureGates {
  const subscription = getUserSubscription(userId);

  // Check if subscription is expired
  if (isSubscriptionExpired(subscription)) {
    // Reset to free tier
    subscription.tier = 'free';
  }

  return {
    canDownload: subscription.downloadsRemaining > 0,
    canGetTranscript: subscription.hasTranscript,
    canBatchDownload: subscription.hasBatchDownload,
    isAdFree: subscription.isAdFree,
    maxResolution: subscription.maxResolution,
    downloadsRemaining: subscription.downloadsRemaining,
  };
}

/**
 * Check if user can access a specific feature
 */
export function canAccessFeature(
  userId: string,
  feature: 'transcript' | 'batchDownload' | '1080p' | '720p' | 'download'
): boolean {
  const gates = getFeatureGates(userId);

  switch (feature) {
    case 'transcript':
      return gates.canGetTranscript;
    case 'batchDownload':
      return gates.canBatchDownload;
    case '1080p':
      return gates.maxResolution === '1080p';
    case '720p':
      return gates.maxResolution === '720p' || gates.maxResolution === '1080p';
    case 'download':
      return gates.canDownload;
    default:
      return false;
  }
}

/**
 * Decrement download count
 */
export function decrementDownloadCount(userId: string): boolean {
  const subscription = getUserSubscription(userId);

  if (subscription.downloadsRemaining <= 0) {
    return false;
  }

  subscription.downloadsRemaining--;
  return true;
}

/**
 * Get upgrade message for user
 */
export function getUpgradeMessage(userId: string, feature: string): string {
  const subscription = getUserSubscription(userId);

  const messages = {
    transcript: 'AI transcripts are available in Premium tier',
    batchDownload: 'Batch download is available in Premium tier',
    '1080p': 'Download in 1080p with Premium tier',
    '720p': 'Download in 720p with Premium tier or Pay-Per-Use',
    download: 'You have reached your daily download limit. Upgrade to Premium for unlimited downloads',
  };

  return messages[feature as keyof typeof messages] || 'Upgrade to access this feature';
}

/**
 * Get feature comparison
 */
export function getFeatureComparison() {
  return {
    free: {
      downloadsPerDay: 5,
      maxResolution: '480p',
      transcript: false,
      batchDownload: false,
      adFree: false,
    },
    premium: {
      downloadsPerDay: -1, // unlimited
      maxResolution: '1080p',
      transcript: true,
      batchDownload: true,
      adFree: true,
    },
    'pay-per-use': {
      downloadsPerDay: 10,
      maxResolution: '720p',
      transcript: false,
      batchDownload: false,
      adFree: false,
    },
  };
}
