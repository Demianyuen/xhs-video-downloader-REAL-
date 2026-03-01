import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export async function POST(request: NextRequest) {
  try {
    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { error: '缺少产品 ID' },
        { status: 400 }
      );
    }

    // 产品配置
    const products: { [key: string]: any } = {
      'xhs-single-download': {
        name: '单次下载',
        price: 50, // $0.50
        description: '下载一个小红书视频',
      },
      'xhs-monthly-pass': {
        name: '月度会员',
        price: 500, // $5.00
        description: '无限下载 + 高级分析 + 无广告',
        recurring: { interval: 'month' },
      },
      'xhs-yearly-pass': {
        name: '年度会员',
        price: 4500, // $45.00
        description: '无限下载 + 高级分析 + 无广告',
        recurring: { interval: 'year' },
      },
    };

    const product = products[productId];
    if (!product) {
      return NextResponse.json(
        { error: '无效的产品 ID' },
        { status: 400 }
      );
    }

    // 创建 Stripe 产品
    const stripeProduct = await stripe.products.create({
      name: product.name,
      description: product.description,
      metadata: {
        productId,
      },
    });

    // 创建价格
    const priceData: any = {
      product: stripeProduct.id,
      unit_amount: product.price,
      currency: 'usd',
    };

    if (product.recurring) {
      priceData.recurring = product.recurring;
    }

    const price = await stripe.prices.create(priceData);

    // 创建 Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: product.recurring ? 'subscription' : 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&product=${productId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
      customer_email_collection: {
        enabled: true,
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });

  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      {
        error: error.message || '创建支付会话失败',
      },
      { status: 500 }
    );
  }
}
