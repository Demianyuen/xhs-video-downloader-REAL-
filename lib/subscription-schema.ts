/**
 * Database Schema for XHS Video Downloader
 * Defines the structure for users, subscriptions, and payments
 */

// User subscription tiers
export type SubscriptionTier = 'free' | 'premium' | 'pay-per-use';

// User subscription data
export interface UserSubscription {
  userId: string;
  tier: SubscriptionTier;
  downloadsRemaining: number;
  maxResolution: '480p' | '720p' | '1080p';
  hasTranscript: boolean;
  hasBatchDownload: boolean;
  isAdFree: boolean;
  createdAt: number;
  expiresAt?: number;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}

// Payment record
export interface PaymentRecord {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  tier: SubscriptionTier;
  paymentMethod: 'stripe' | 'wechat' | 'alipay';
  status: 'pending' | 'completed' | 'failed';
  transactionId: string;
  createdAt: number;
  completedAt?: number;
}

// Subscription tier details
export const SUBSCRIPTION_TIERS = {
  free: {
    name: 'Free',
    price: 0,
    currency: 'CNY',
    downloadsPerDay: 5,
    maxResolution: '480p' as const,
    hasTranscript: false,
    hasBatchDownload: false,
    isAdFree: false,
    description: 'Perfect for casual users',
  },
  premium: {
    name: 'Premium',
    price: 35,
    currency: 'CNY',
    downloadsPerDay: -1, // unlimited
    maxResolution: '1080p' as const,
    hasTranscript: true,
    hasBatchDownload: true,
    isAdFree: true,
    description: 'Best for power users',
    billingPeriod: 'month',
  },
  'pay-per-use': {
    name: 'Pay-Per-Use',
    price: 7,
    currency: 'CNY',
    downloadsPerDay: 10,
    maxResolution: '720p' as const,
    hasTranscript: false,
    hasBatchDownload: false,
    isAdFree: false,
    description: 'For occasional users',
  },
};

// In-memory user subscriptions (replace with database in production)
export const userSubscriptions = new Map<string, UserSubscription>();

// In-memory payment records (replace with database in production)
export const paymentRecords = new Map<string, PaymentRecord>();

/**
 * Get or create user subscription
 */
export function getUserSubscription(userId: string): UserSubscription {
  if (userSubscriptions.has(userId)) {
    return userSubscriptions.get(userId)!;
  }

  const subscription: UserSubscription = {
    userId,
    tier: 'free',
    downloadsRemaining: SUBSCRIPTION_TIERS.free.downloadsPerDay,
    maxResolution: SUBSCRIPTION_TIERS.free.maxResolution,
    hasTranscript: SUBSCRIPTION_TIERS.free.hasTranscript,
    hasBatchDownload: SUBSCRIPTION_TIERS.free.hasBatchDownload,
    isAdFree: SUBSCRIPTION_TIERS.free.isAdFree,
    createdAt: Date.now(),
  };

  userSubscriptions.set(userId, subscription);
  return subscription;
}

/**
 * Update user subscription
 */
export function updateUserSubscription(
  userId: string,
  tier: SubscriptionTier,
  expiresAt?: number
): UserSubscription {
  const tierConfig = SUBSCRIPTION_TIERS[tier];
  const subscription: UserSubscription = {
    userId,
    tier,
    downloadsRemaining: tierConfig.downloadsPerDay,
    maxResolution: tierConfig.maxResolution,
    hasTranscript: tierConfig.hasTranscript,
    hasBatchDownload: tierConfig.hasBatchDownload,
    isAdFree: tierConfig.isAdFree,
    createdAt: Date.now(),
    expiresAt,
  };

  userSubscriptions.set(userId, subscription);
  return subscription;
}

/**
 * Record payment
 */
export function recordPayment(
  userId: string,
  amount: number,
  currency: string,
  tier: SubscriptionTier,
  paymentMethod: 'stripe' | 'wechat' | 'alipay',
  transactionId: string
): PaymentRecord {
  const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const payment: PaymentRecord = {
    id: paymentId,
    userId,
    amount,
    currency,
    tier,
    paymentMethod,
    status: 'pending',
    transactionId,
    createdAt: Date.now(),
  };

  paymentRecords.set(paymentId, payment);
  return payment;
}

/**
 * Complete payment
 */
export function completePayment(paymentId: string): PaymentRecord | null {
  const payment = paymentRecords.get(paymentId);
  if (!payment) return null;

  payment.status = 'completed';
  payment.completedAt = Date.now();

  // Update user subscription
  const expiresAt = payment.tier === 'premium' ? Date.now() + 30 * 24 * 60 * 60 * 1000 : undefined;
  updateUserSubscription(payment.userId, payment.tier, expiresAt);

  return payment;
}

/**
 * Check if subscription is expired
 */
export function isSubscriptionExpired(subscription: UserSubscription): boolean {
  if (!subscription.expiresAt) return false;
  return Date.now() > subscription.expiresAt;
}

/**
 * Reset daily downloads
 */
export function resetDailyDownloads(userId: string): void {
  const subscription = getUserSubscription(userId);
  const tierConfig = SUBSCRIPTION_TIERS[subscription.tier];
  subscription.downloadsRemaining = tierConfig.downloadsPerDay;
}
