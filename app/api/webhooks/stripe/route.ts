import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

/**
 * Stripe Webhook 处理
 * 处理支付成功、订阅创建/取消等事件
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature') || '';

    // 验证 Webhook 签名
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error: any) {
      console.error('Webhook signature verification failed:', error.message);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    console.log(`[Webhook] Received event: ${event.type}`);

    // 处理不同的事件类型
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;

      case 'charge.succeeded':
        await handleChargeSucceeded(event.data.object as Stripe.Charge);
        break;

      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;

      default:
        console.log(`[Webhook] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });

  } catch (error: any) {
    console.error('[Webhook] Error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

/**
 * 处理支付成功
 */
async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log(`[Payment] Payment succeeded: ${paymentIntent.id}`);
  console.log(`[Payment] Amount: ${paymentIntent.amount / 100} ${paymentIntent.currency}`);
  console.log(`[Payment] Customer: ${paymentIntent.customer}`);

  // TODO: 更新数据库中的用户订阅状态
  // TODO: 发送确认邮件
  // TODO: 记录交易日志
}

/**
 * 处理费用成功
 */
async function handleChargeSucceeded(charge: Stripe.Charge) {
  console.log(`[Charge] Charge succeeded: ${charge.id}`);
  console.log(`[Charge] Amount: ${charge.amount / 100} ${charge.currency}`);
  console.log(`[Charge] Description: ${charge.description}`);

  // TODO: 更新用户账户
  // TODO: 发送收据
}

/**
 * 处理订阅创建
 */
async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log(`[Subscription] Subscription created: ${subscription.id}`);
  console.log(`[Subscription] Customer: ${subscription.customer}`);
  console.log(`[Subscription] Status: ${subscription.status}`);

  // TODO: 在数据库中创建订阅记录
  // TODO: 激活用户的高级功能
  // TODO: 发送欢迎邮件
}

/**
 * 处理订阅更新
 */
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log(`[Subscription] Subscription updated: ${subscription.id}`);
  console.log(`[Subscription] Status: ${subscription.status}`);

  // TODO: 更新数据库中的订阅状态
  // TODO: 如果暂停，禁用高级功能
  // TODO: 如果恢复，重新启用高级功能
}

/**
 * 处理订阅取消
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log(`[Subscription] Subscription deleted: ${subscription.id}`);
  console.log(`[Subscription] Customer: ${subscription.customer}`);

  // TODO: 在数据库中标记订阅为已取消
  // TODO: 禁用用户的高级功能
  // TODO: 发送取消确认邮件
}

/**
 * 处理发票支付成功
 */
async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log(`[Invoice] Invoice payment succeeded: ${invoice.id}`);
  console.log(`[Invoice] Amount: ${invoice.amount_paid / 100} ${invoice.currency}`);
  console.log(`[Invoice] Subscription: ${invoice.subscription}`);

  // TODO: 更新订阅续期日期
  // TODO: 发送发票邮件
  // TODO: 更新用户的订阅状态
}
