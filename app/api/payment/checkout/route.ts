/**
 * Payment Checkout API
 * Creates Stripe checkout sessions
 */

import { NextRequest, NextResponse } from 'next/server';
import { paymentManager } from '@/lib/payment-manager';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const { productId, userId } = await request.json();

    if (!productId || !userId) {
      return NextResponse.json(
        { error: 'Missing productId or userId' },
        { status: 400 }
      );
    }

    const product = paymentManager.getProduct(productId);
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
    const successUrl = `${baseUrl}/payment/success`;
    const cancelUrl = `${baseUrl}/payment/cancel`;

    const sessionId = await paymentManager.createCheckoutSession(
      productId,
      userId,
      successUrl,
      cancelUrl
    );

    return NextResponse.json({
      success: true,
      sessionId,
      product,
    });
  } catch (error) {
    logger.error('Checkout creation failed', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create checkout session',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const products = paymentManager.listProducts();

    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    logger.error('Failed to list products', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to list products',
      },
      { status: 500 }
    );
  }
}
