/**
 * Transcription API
 * Handles audio transcription requests
 */

import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { userManager } from '@/lib/user-manager';

function getUserId(request: NextRequest): string {
  const cookie = request.cookies.get('userId')?.value;
  const header = request.headers.get('x-user-id');
  return cookie || header || `user_${Date.now()}_${Math.random().toString(36).substring(7)}`;
}

export async function POST(request: NextRequest) {
  try {
    const userId = getUserId(request);
    const { audioUrl, videoId } = await request.json();

    if (!audioUrl) {
      return NextResponse.json(
        { error: 'Missing audioUrl' },
        { status: 400 }
      );
    }

    logger.info('Transcription requested', { userId, videoId });

    // Get or create user
    const user = userManager.getOrCreate(userId);

    // Check if user has free credits available
    const dailyFreeCredits = userManager.getDailyFreeCredits(userId);
    let canTranscribe = false;
    let usedFreeCredit = false;

    if (dailyFreeCredits > 0) {
      // Use free credit
      const used = userManager.useDailyFreeCredit(userId);
      if (used) {
        canTranscribe = true;
        usedFreeCredit = true;
        logger.info('Free transcription credit used', { userId });
      }
    } else if (user.credits >= 1) {
      // Use paid credits
      const deducted = userManager.deductCredits(userId, 1);
      if (deducted) {
        canTranscribe = true;
        logger.info('Paid transcription credit used', { userId });
      }
    }

    if (!canTranscribe) {
      logger.warn('Insufficient credits for transcription', {
        userId,
        credits: user.credits,
        dailyFree: dailyFreeCredits,
      });

      return NextResponse.json(
        {
          error: 'Insufficient credits',
          credits: user.credits,
          dailyFreeCredits,
          message: 'Please purchase credits to continue',
        },
        { status: 402 } // Payment Required
      );
    }

    // TODO: Implement actual transcription with OpenAI Whisper API
    // For now, return a placeholder response
    const mockTranscription = {
      text: '[Transcription will be generated here]',
      language: 'zh-CN',
      duration: 0,
      confidence: 0,
    };

    // Record transcription
    userManager.recordTranscription(userId);

    const updatedUser = userManager.get(userId);

    return NextResponse.json({
      success: true,
      transcription: mockTranscription,
      usedFreeCredit,
      user: {
        credits: updatedUser?.credits || 0,
        dailyFreeCredits: userManager.getDailyFreeCredits(userId),
        totalTranscriptions: updatedUser?.totalTranscriptions || 0,
      },
    });
  } catch (error) {
    logger.error('Transcription failed', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Transcription failed',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    return NextResponse.json({
      status: 'ok',
      message: 'Transcription service is running',
      features: {
        transcription: process.env.ENABLE_TRANSCRIPTION === 'true',
        payments: process.env.ENABLE_PAYMENTS === 'true',
      },
    });
  } catch (error) {
    logger.error('Transcription service check failed', error);

    return NextResponse.json(
      { error: 'Service check failed' },
      { status: 500 }
    );
  }
}
