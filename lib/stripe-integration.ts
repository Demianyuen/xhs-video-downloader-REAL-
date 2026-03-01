/**
 * Stripe 支付集成
 * 为 XHS Downloader 创建支付链接和收款功能
 */

export interface StripeConfig {
  publishableKey: string;
  secretKey: string;
  baseUrl: string;
}

export interface PaymentProduct {
  id: string;
  name: string;
  description: string;
  price: number; // 以美分计
  currency: string;
  type: 'one-time' | 'subscription';
  interval?: 'month' | 'year';
}

/**
 * XHS Downloader 产品定价
 */
export const XHS_PRODUCTS: PaymentProduct[] = [
  {
    id: 'xhs-single-download',
    name: '单次下载',
    description: '下载一个小红书视频',
    price: 50, // $0.50
    currency: 'usd',
    type: 'one-time',
  },
  {
    id: 'xhs-monthly-pass',
    name: '月度会员',
    description: '无限下载 + 高级分析 + 无广告',
    price: 500, // $5.00/月
    currency: 'usd',
    type: 'subscription',
    interval: 'month',
  },
  {
    id: 'xhs-yearly-pass',
    name: '年度会员',
    description: '无限下载 + 高级分析 + 无广告（省 $5）',
    price: 4500, // $45.00/年
    currency: 'usd',
    type: 'subscription',
    interval: 'year',
  },
];

/**
 * 生成 Stripe Payment Link
 * 使用 Stripe API 创建支付链接
 */
export async function createPaymentLink(
  product: PaymentProduct,
  stripeSecretKey: string
): Promise<string> {
  const stripe = require('stripe')(stripeSecretKey);

  try {
    // 创建产品
    const stripeProduct = await stripe.products.create({
      name: product.name,
      description: product.description,
      metadata: {
        productId: product.id,
      },
    });

    // 创建价格
    const priceData: any = {
      product: stripeProduct.id,
      unit_amount: product.price,
      currency: product.currency,
    };

    if (product.type === 'subscription' && product.interval) {
      priceData.recurring = {
        interval: product.interval,
      };
    }

    const price = await stripe.prices.create(priceData);

    // 创建支付链接
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      after_completion: {
        type: 'redirect',
        redirect: {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?product=${product.id}`,
        },
      },
    });

    return paymentLink.url;
  } catch (error) {
    console.error('Failed to create payment link:', error);
    throw error;
  }
}

/**
 * 验证 Stripe Webhook 签名
 */
export function verifyWebhookSignature(
  body: string,
  signature: string,
  webhookSecret: string
): boolean {
  const stripe = require('stripe')('');
  
  try {
    stripe.webhooks.constructEvent(body, signature, webhookSecret);
    return true;
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return false;
  }
}

/**
 * 处理 Stripe Webhook 事件
 */
export async function handleStripeWebhook(event: any) {
  switch (event.type) {
    case 'payment_intent.succeeded':
      console.log('Payment succeeded:', event.data.object);
      // 更新用户订阅状态
      break;

    case 'customer.subscription.created':
      console.log('Subscription created:', event.data.object);
      // 激活用户订阅
      break;

    case 'customer.subscription.deleted':
      console.log('Subscription cancelled:', event.data.object);
      // 取消用户订阅
      break;

    default:
      console.log('Unhandled event type:', event.type);
  }
}

/**
 * 生成 HTML 支付页面
 */
export function generatePaymentPageHTML(
  publishableKey: string,
  products: PaymentProduct[]
): string {
  const productCards = products
    .map(
      (product) => `
    <div class="product-card">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="price">
        $${(product.price / 100).toFixed(2)}
        ${product.type === 'subscription' ? `/${product.interval}` : ''}
      </div>
      <button class="buy-btn" data-product-id="${product.id}">
        立即购买
      </button>
    </div>
  `
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>XHS Downloader - 支付</title>
  <script src="https://js.stripe.com/v3/"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      max-width: 1000px;
      width: 100%;
    }
    .header {
      text-align: center;
      color: white;
      margin-bottom: 40px;
    }
    .header h1 {
      font-size: 2.5em;
      margin-bottom: 10px;
    }
    .header p {
      font-size: 1.1em;
      opacity: 0.9;
    }
    .products {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }
    .product-card {
      background: white;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      transition: transform 0.3s ease;
    }
    .product-card:hover {
      transform: translateY(-5px);
    }
    .product-card h3 {
      font-size: 1.5em;
      margin-bottom: 10px;
      color: #333;
    }
    .product-card p {
      color: #666;
      margin-bottom: 20px;
      font-size: 0.95em;
    }
    .price {
      font-size: 2em;
      font-weight: bold;
      color: #667eea;
      margin-bottom: 20px;
    }
    .buy-btn {
      width: 100%;
      padding: 12px;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 1em;
      cursor: pointer;
      transition: background 0.3s ease;
    }
    .buy-btn:hover {
      background: #764ba2;
    }
    .buy-btn:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    .footer {
      text-align: center;
      color: white;
      opacity: 0.8;
      font-size: 0.9em;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🌙 XHS Downloader</h1>
      <p>选择您的订阅计划</p>
    </div>
    
    <div class="products">
      ${productCards}
    </div>
    
    <div class="footer">
      <p>安全支付 | 30天退款保证 | 24/7 客服支持</p>
    </div>
  </div>

  <script>
    const stripe = Stripe('${publishableKey}');
    
    document.querySelectorAll('.buy-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const productId = e.target.dataset.productId;
        
        // 调用后端创建支付会话
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId }),
        });
        
        const { sessionId } = await response.json();
        
        // 重定向到 Stripe Checkout
        await stripe.redirectToCheckout({ sessionId });
      });
    });
  </script>
</body>
</html>
  `;
}
