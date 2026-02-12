/**
 * Stripe Payment Integration
 * Handles payment processing and webhook verification
 */

import Stripe from 'stripe';
import { logger } from './logger';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export interface PaymentProduct {
  id: string;
  name: string;
  description: string;
  priceUsd: number;
  credits: number;
}

// Product catalog
export const PRODUCTS: Record<string, PaymentProduct> = {
  TRANSCRIPTION_10: {
    id: 'transcription_10',
    name: '10 Transcriptions',
    description: 'Get 10 transcriptions',
    priceUsd: 0.99,
    credits: 10,
  },
  TRANSCRIPTION_50: {
    id: 'transcription_50',
    name: '50 Transcriptions',
    description: 'Get 50 transcriptions (Save 20%)',
    priceUsd: 3.99,
    credits: 50,
  },
  MONTHLY_UNLIMITED: {
    id: 'monthly_unlimited',
    name: 'Monthly Unlimited',
    description: 'Unlimited transcriptions for 1 month',
    priceUsd: 4.99,
    credits: 999, // Effectively unlimited
  },
};

class PaymentManager {
  /**
   * Create checkout session
   */
  async createCheckoutSession(
    productId: string,
    userId: string,
    successUrl: string,
    cancelUrl: string
  ): Promise<string> {
    try {
      const product = PRODUCTS[productId];
      if (!product) {
        throw new Error(`Product not found: ${productId}`);
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: product.name,
                description: product.description,
              },
              unit_amount: Math.round(product.priceUsd * 100), // Convert to cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: cancelUrl,
        metadata: {
          userId,
          productId,
          credits: product.credits.toString(),
        },
      });

      logger.info('Checkout session created', {
        sessionId: session.id,
        userId,
        productId,
        amount: product.priceUsd,
      });

      return session.id;
    } catch (error) {
      logger.error('Failed to create checkout session', error);
      throw error;
    }
  }

  /**
   * Get checkout session details
   */
  async getCheckoutSession(sessionId: string) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      return session;
    } catch (error) {
      logger.error('Failed to retrieve checkout session', error);
      throw error;
    }
  }

  /**
   * Verify webhook signature
   */
  verifyWebhookSignature(
    body: string,
    signature: string,
    webhookSecret: string
  ): Stripe.Event | null {
    try {
      const event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      );
      return event;
    } catch (error) {
      logger.error('Webhook signature verification failed', error);
      return null;
    }
  }

  /**
   * Handle payment success
   */
  async handlePaymentSuccess(sessionId: string): Promise<{
    userId: string;
    productId: string;
    credits: number;
    amount: number;
  } | null> {
    try {
      const session = await this.getCheckoutSession(sessionId);

      if (session.payment_status !== 'paid') {
        logger.warn('Payment not completed', { sessionId });
        return null;
      }

      const userId = session.metadata?.userId;
      const productId = session.metadata?.productId;
      const credits = parseInt(session.metadata?.credits || '0', 10);
      const amount = (session.amount_total || 0) / 100; // Convert from cents

      if (!userId || !productId) {
        logger.error('Missing metadata in session', { sessionId });
        return null;
      }

      logger.info('Payment successful', {
        sessionId,
        userId,
        productId,
        credits,
        amount,
      });

      return { userId, productId, credits, amount };
    } catch (error) {
      logger.error('Failed to handle payment success', error);
      return null;
    }
  }

  /**
   * Get product by ID
   */
  getProduct(productId: string): PaymentProduct | null {
    return PRODUCTS[productId] || null;
  }

  /**
   * List all products
   */
  listProducts(): PaymentProduct[] {
    return Object.values(PRODUCTS);
  }
}

export const paymentManager = new PaymentManager();
