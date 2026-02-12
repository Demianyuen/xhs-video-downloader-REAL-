/**
 * User API
 * Get user information and credits
 */

import { NextRequest, NextResponse } from 'next/server';
import { userManager } from '@/lib/user-manager';
import { logger } from '@/lib/logger';

function getUserId(request: NextRequest): string {
  // Get user ID from cookie or header
  const cookie = request.cookies.get('userId')?.value;
  const header = request.headers.get('x-user-id');

  return cookie || header || `user_${Date.now()}_${Math.random().toString(36).substring(7)}`;
}

export async function GET(request: NextRequest) {
  try {
    const userId = getUserId(request);
    const user = userManager.getOrCreate(userId);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        credits: user.credits,
        dailyFreeCredits: userManager.getDailyFreeCredits(user.id),
        totalTranscriptions: user.totalTranscriptions,
        totalSpent: user.totalSpent,
        isPremium: userManager.isPremiumActive(user.id),
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    logger.error('Failed to get user', error);

    return NextResponse.json(
      { error: 'Failed to get user' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = getUserId(request);
    const { action, amount } = await request.json();

    if (action === 'use-free-credit') {
      const used = userManager.useDailyFreeCredit(userId);

      if (!used) {
        return NextResponse.json(
          { error: 'No daily free credits available' },
          { status: 400 }
        );
      }

      const user = userManager.get(userId);
      return NextResponse.json({
        success: true,
        user,
      });
    }

    if (action === 'deduct-credits') {
      if (!amount || amount <= 0) {
        return NextResponse.json(
          { error: 'Invalid amount' },
          { status: 400 }
        );
      }

      const deducted = userManager.deductCredits(userId, amount);

      if (!deducted) {
        return NextResponse.json(
          { error: 'Insufficient credits' },
          { status: 400 }
        );
      }

      const user = userManager.get(userId);
      return NextResponse.json({
        success: true,
        user,
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    logger.error('Failed to process user action', error);

    return NextResponse.json(
      { error: 'Failed to process action' },
      { status: 500 }
    );
  }
}
