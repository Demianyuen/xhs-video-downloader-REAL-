/**
 * Payment Checkout Page
 * Displays available products and payment options
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description: string;
  priceUsd: number;
  credits: number;
}

export default function PaymentCheckout() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    // Get user ID from cookie or generate new one
    const cookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('userId='))
      ?.split('=')[1];

    const id = cookie || `user_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    setUserId(id);

    // Set cookie
    document.cookie = `userId=${id}; path=/; max-age=31536000`;

    // Fetch products
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/payment/checkout');
        const data = await response.json();

        if (data.success) {
          setProducts(data.products);
          setSelectedProduct(data.products[0]?.id);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCheckout = async () => {
    if (!selectedProduct || !userId) return;

    setProcessing(true);

    try {
      const response = await fetch('/api/payment/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: selectedProduct,
          userId,
        }),
      });

      const data = await response.json();

      if (data.success && data.sessionId) {
        // Redirect to Stripe checkout
        const stripe = (window as any).Stripe;
        if (stripe) {
          stripe.redirectToCheckout({ sessionId: data.sessionId });
        } else {
          // Fallback: redirect to Stripe hosted checkout
          window.location.href = `https://checkout.stripe.com/pay/${data.sessionId}`;
        }
      } else {
        alert('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">购买转录额度</h1>
          <p className="text-gray-600">选择适合您的套餐</p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product.id)}
              className={`rounded-lg p-6 cursor-pointer transition transform hover:scale-105 ${
                selectedProduct === product.id
                  ? 'bg-gradient-to-br from-pink-500 to-red-500 text-white shadow-lg'
                  : 'bg-white text-gray-800 shadow hover:shadow-lg'
              }`}
            >
              {/* Badge */}
              {product.id === 'TRANSCRIPTION_50' && (
                <div className="inline-block bg-yellow-400 text-gray-800 text-xs font-bold px-3 py-1 rounded-full mb-3">
                  省钱 20%
                </div>
              )}

              {/* Product Name */}
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>

              {/* Description */}
              <p className={`text-sm mb-4 ${selectedProduct === product.id ? 'text-pink-100' : 'text-gray-600'}`}>
                {product.description}
              </p>

              {/* Credits */}
              <div className="mb-4">
                <p className={`text-3xl font-bold ${selectedProduct === product.id ? 'text-white' : 'text-pink-600'}`}>
                  {product.credits}
                </p>
                <p className={`text-sm ${selectedProduct === product.id ? 'text-pink-100' : 'text-gray-600'}`}>
                  转录额度
                </p>
              </div>

              {/* Price */}
              <div className={`text-2xl font-bold ${selectedProduct === product.id ? 'text-white' : 'text-gray-800'}`}>
                ${product.priceUsd.toFixed(2)}
              </div>

              {/* Per Unit */}
              <p className={`text-xs ${selectedProduct === product.id ? 'text-pink-100' : 'text-gray-500'}`}>
                每个 ${(product.priceUsd / product.credits).toFixed(3)}
              </p>

              {/* Checkmark */}
              {selectedProduct === product.id && (
                <div className="mt-4 text-2xl">✓</div>
              )}
            </div>
          ))}
        </div>

        {/* Checkout Button */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <button
            onClick={handleCheckout}
            disabled={!selectedProduct || processing}
            className={`w-full py-4 rounded-lg font-semibold text-white text-lg transition ${
              processing || !selectedProduct
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-500 to-red-500 hover:shadow-lg'
            }`}
          >
            {processing ? '处理中...' : '继续支付'}
          </button>

          {/* Info */}
          <p className="text-center text-sm text-gray-600 mt-4">
            💳 安全支付由 Stripe 提供
          </p>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">常见问题</h3>

          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray-800 mb-1">额度会过期吗？</p>
              <p className="text-gray-600 text-sm">是的，额度在购买后 30 天过期。</p>
            </div>

            <div>
              <p className="font-semibold text-gray-800 mb-1">支付安全吗？</p>
              <p className="text-gray-600 text-sm">是的，我们使用 Stripe 处理所有支付，确保您的信息安全。</p>
            </div>

            <div>
              <p className="font-semibold text-gray-800 mb-1">可以退款吗？</p>
              <p className="text-gray-600 text-sm">是的，在 7 天内可以申请退款。请联系我们的支持团队。</p>
            </div>

            <div>
              <p className="font-semibold text-gray-800 mb-1">需要帮助？</p>
              <p className="text-gray-600 text-sm">
                如有任何问题，请{' '}
                <a href="mailto:support@example.com" className="text-pink-600 hover:underline">
                  联系我们
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-8">
          <Link href="/" className="text-pink-600 hover:underline">
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
