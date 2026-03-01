'use client';

import { useState } from 'react';
import { Check, Sparkles, Zap, Crown, Loader2 } from 'lucide-react';
import { PRICING_TIERS } from '@/lib/pricing-config';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PricingPage() {
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const handleSubscribe = async (tierId: string, stripePriceId?: string) => {
    if (tierId === 'free') {
      window.location.href = '/';
      return;
    }

    if (!stripePriceId) {
      alert('此方案暫未開放');
      return;
    }

    setLoadingTier(tierId);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: stripePriceId }),
      });

      const { sessionId } = await response.json();

      const stripe = await stripePromise;
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('支付初始化失敗，請重試');
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          選擇適合你的方案
        </h1>
        <p className="text-xl text-gray-600">
          免費開始，隨時升級。付費方案享無限下載與高級功能。
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-10">
        <div className="bg-gray-100 rounded-full p-1 flex">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              billingCycle === 'monthly'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            月付
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
              billingCycle === 'yearly'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            年付
            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
              省 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards - 3 Columns */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {PRICING_TIERS.map((tier) => {
          const isFree = tier.id === 'free';
          const isPopular = tier.popular;
          const isLifetime = tier.id === 'lifetime';

          // 計算顯示價格
          const displayPrice = billingCycle === 'yearly' && tier.period === 'month'
            ? Math.round(tier.price * 12 * 0.8) // 年付 8 折
            : tier.price;

          return (
            <div
              key={tier.id}
              className={`relative rounded-3xl p-8 ${
                isPopular
                  ? 'bg-gradient-to-b from-pink-500 to-red-500 text-white shadow-xl shadow-pink-200 scale-105 ring-4 ring-pink-200'
                  : isLifetime
                  ? 'bg-gradient-to-b from-purple-500 to-indigo-600 text-white shadow-xl shadow-purple-200'
                  : 'bg-white border border-gray-200 text-gray-900'
              }`}
            >
              {/* Popular Badge */}
              {isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    最受歡迎
                  </span>
                </div>
              )}

              {/* Lifetime Badge */}
              {isLifetime && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-purple-300 text-purple-900 px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <Crown className="w-4 h-4" />
                    尊享
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className="mb-4">
                {isFree && <Zap className={`w-8 h-8 ${isPopular || isLifetime ? 'text-white' : 'text-gray-400'}`} />}
                {isPopular && <Sparkles className="w-8 h-8 text-white" />}
                {isLifetime && <Crown className="w-8 h-8 text-white" />}
              </div>

              {/* Tier Name */}
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <p className={`text-sm mb-6 ${isPopular || isLifetime ? 'text-white/80' : 'text-gray-500'}`}>
                {tier.description}
              </p>

              {/* Price */}
              <div className="mb-6">
                <span className="text-5xl font-bold">
                  ${isFree ? '0' : displayPrice}
                </span>
                {!isFree && (
                  <span className={`text-lg ${isPopular || isLifetime ? 'text-white/70' : 'text-gray-500'}`}>
                    {isLifetime ? '' : billingCycle === 'yearly' ? '/年' : '/月'}
                  </span>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 ${
                      isPopular || isLifetime ? 'text-white' : 'text-green-500'
                    }`} />
                    <span className={isPopular || isLifetime ? 'text-white/90' : 'text-gray-600'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => handleSubscribe(tier.id, tier.stripePriceId)}
                disabled={loadingTier === tier.id}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${
                  isFree
                    ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    : isPopular || isLifetime
                    ? 'bg-white text-gray-900 hover:bg-gray-100 shadow-lg'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                } ${loadingTier === tier.id ? 'opacity-70 cursor-wait' : ''}`}
              >
                {loadingTier === tier.id ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    處理中...
                  </span>
                ) : (
                  tier.cta
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Trust Indicators */}
      <div className="max-w-4xl mx-auto mt-16 text-center">
        <p className="text-gray-500 mb-4">安全支付 · 30天退款保證 · 隨時取消</p>
        <div className="flex justify-center gap-4">
          <span className="text-2xl">🔒</span>
          <span className="text-2xl">💳</span>
          <span className="text-2xl">✅</span>
        </div>
      </div>

      {/* FAQ Preview */}
      <div className="max-w-3xl mx