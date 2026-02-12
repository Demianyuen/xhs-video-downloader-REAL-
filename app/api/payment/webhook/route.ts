/**
 * Stripe Webhook Handler
 * Processes payment events from Stripe
 */

import { NextRequest, NextResponse } from 'next/server';
import { paymentManager } from '@/lib/payment-manager';
import { userManager } from '@/lib/user-manager';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      logger.warn('Missing Stripe signature');
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      logger.error('STRIPE_WEBHOOK_SECRET not configured');
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    const event = paymentManager.verifyWebhookSignature(
      body,
      signature,
      webhookSecret
    );

    if (!event) {
      logger.warn('Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    logger.info('Webhook received', { type: event.type });

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any;
        const paymentResult = await paymentManager.handlePaymentSuccess(
          session.id
        );

        if (paymentResult) {
          const { userId, credits, amount } = paymentResult;

          // Add credits to user
          userManager.recordPayment(userId, amount, credits);

          logger.info('Payment processed successfully', {
            userId,
            credits,
            amount,
          });
        }
        break;
      }

      case 'charge.failed': {
        const charge = event.data.object as any;
        logger.warn('Payment failed', {
          chargeId: charge.id,
          error: charge.failure_message,
        });
        break;
      }

      default:
        logger.debug('Unhandled webhook event', { type: event.type });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    logger.error('Webhook processing failed', error);

    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
