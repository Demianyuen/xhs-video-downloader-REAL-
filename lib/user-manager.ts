/**
 * User Management System
 * Tracks user credits, daily limits, and payment history
 */

import { logger } from './logger';

export interface User {
  id: string;
  email?: string;
  credits: number;
  dailyFreeCredits: number;
  lastFreeCreditsReset: number;
  totalSpent: number;
  totalTranscriptions: number;
  createdAt: number;
  lastActivityAt: number;
  isPremium: boolean;
  premiumExpiresAt?: number;
}

const DAILY_FREE_CREDITS = 1; // 1 free transcription per day
const CREDITS_PER_TRANSCRIPTION = 1;

class UserManager {
  private users: Map<string, User> = new Map();

  /**
   * Get or create user
   */
  getOrCreate(userId: string, email?: string): User {
    let user = this.users.get(userId);

    if (!user) {
      user = {
        id: userId,
        email,
        credits: 0,
        dailyFreeCredits: DAILY_FREE_CREDITS,
        lastFreeCreditsReset: Date.now(),
        totalSpent: 0,
        totalTranscriptions: 0,
        createdAt: Date.now(),
        lastActivityAt: Date.now(),
        isPremium: false,
      };

      this.users.set(userId, user);
      logger.info('User created', { userId, email });
    }

    return user;
  }

  /**
   * Get user by ID
   */
  get(userId: string): User | null {
    return this.users.get(userId) || null;
  }

  /**
   * Add credits to user
   */
  addCredits(userId: string, amount: number): User | null {
    const user = this.users.get(userId);
    if (!user) {
      logger.warn('User not found for credit addition', { userId });
      return null;
    }

    user.credits += amount;
    user.lastActivityAt = Date.now();
    this.users.set(userId, user);

    logger.info('Credits added', { userId, amount, newBalance: user.credits });

    return user;
  }

  /**
   * Deduct credits from user
   */
  deductCredits(userId: string, amount: number): boolean {
    const user = this.users.get(userId);
    if (!user) {
      logger.warn('User not found for credit deduction', { userId });
      return false;
    }

    if (user.credits < amount) {
      logger.warn('Insufficient credits', {
        userId,
        required: amount,
        available: user.credits,
      });
      return false;
    }

    user.credits -= amount;
    user.lastActivityAt = Date.now();
    this.users.set(userId, user);

    logger.info('Credits deducted', {
      userId,
      amount,
      newBalance: user.credits,
    });

    return true;
  }

  /**
   * Get daily free credits available
   */
  getDailyFreeCredits(userId: string): number {
    const user = this.users.get(userId);
    if (!user) {
      return DAILY_FREE_CREDITS;
    }

    const now = Date.now();
    const dayInMs = 24 * 60 * 60 * 1000;

    // Reset daily credits if 24 hours have passed
    if (now - user.lastFreeCreditsReset > dayInMs) {
      user.dailyFreeCredits = DAILY_FREE_CREDITS;
      user.lastFreeCreditsReset = now;
      this.users.set(userId, user);
    }

    return user.dailyFreeCredits;
  }

  /**
   * Use daily free credit
   */
  useDailyFreeCredit(userId: string): boolean {
    const user = this.users.get(userId);
    if (!user) {
      logger.warn('User not found for daily credit usage', { userId });
      return false;
    }

    const available = this.getDailyFreeCredits(userId);
    if (available <= 0) {
      logger.warn('No daily free credits available', { userId });
      return false;
    }

    user.dailyFreeCredits -= 1;
    user.lastActivityAt = Date.now();
    this.users.set(userId, user);

    logger.info('Daily free credit used', {
      userId,
      remaining: user.dailyFreeCredits,
    });

    return true;
  }

  /**
   * Record transcription
   */
  recordTranscription(userId: string): User | null {
    const user = this.users.get(userId);
    if (!user) {
      logger.warn('User not found for transcription record', { userId });
      return null;
    }

    user.totalTranscriptions += 1;
    user.lastActivityAt = Date.now();
    this.users.set(userId, user);

    logger.info('Transcription recorded', {
      userId,
      total: user.totalTranscriptions,
    });

    return user;
  }

  /**
   * Record payment
   */
  recordPayment(userId: string, amount: number, credits: number): User | null {
    const user = this.users.get(userId);
    if (!user) {
      logger.warn('User not found for payment record', { userId });
      return null;
    }

    user.totalSpent += amount;
    user.credits += credits;
    user.lastActivityAt = Date.now();
    this.users.set(userId, user);

    logger.info('Payment recorded', {
      userId,
      amount,
      credits,
      totalSpent: user.totalSpent,
    });

    return user;
  }

  /**
   * Set premium status
   */
  setPremium(userId: string, expiresAt: number): User | null {
    const user = this.users.get(userId);
    if (!user) {
      logger.warn('User not found for premium upgrade', { userId });
      return null;
    }

    user.isPremium = true;
    user.premiumExpiresAt = expiresAt;
    user.lastActivityAt = Date.now();
    this.users.set(userId, user);

    logger.info('Premium status set', { userId, expiresAt });

    return user;
  }

  /**
   * Check if premium is active
   */
  isPremiumActive(userId: string): boolean {
    const user = this.users.get(userId);
    if (!user || !user.isPremium) {
      return false;
    }

    if (user.premiumExpiresAt && user.premiumExpiresAt < Date.now()) {
      user.isPremium = false;
      this.users.set(userId, user);
      return false;
    }

    return true;
  }

  /**
   * Get user statistics
   */
  getStats() {
    const users = Array.from(this.users.values());
    const premiumUsers = users.filter((u) => this.isPremiumActive(u.id));
    const totalCredits = users.reduce((sum, u) => sum + u.credits, 0);
    const totalSpent = users.reduce((sum, u) => sum + u.totalSpent, 0);
    const totalTranscriptions = users.reduce(
      (sum, u) => sum + u.totalTranscriptions,
      0
    );

    return {
      totalUsers: users.length,
      premiumUsers: premiumUsers.length,
      totalCredits,
      totalSpent,
      totalTranscriptions,
      avgCreditsPerUser: users.length > 0 ? totalCredits / users.length : 0,
      avgSpentPerUser: users.length > 0 ? totalSpent / users.length : 0,
    };
  }

  /**
   * Get all users (for admin)
   */
  listAll(): User[] {
    return Array.from(this.users.values());
  }

  /**
   * Clear all users (for testing)
   */
  clear(): void {
    this.users.clear();
    logger.warn('All users cleared');
  }
}

export const userManager = new UserManager();
