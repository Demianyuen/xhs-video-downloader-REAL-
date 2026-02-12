'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    // Verify payment and update credits
    const verifyPayment = async () => {
      try {
        const response = await fetch('/api/payment/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });

        const data = await response.json();

        if (data.success) {
          setSuccess(true);
          setCredits(data.credits || 0);
        }
      } catch (error) {
        console.error('Payment verification failed:', error);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">验证支付中...</p>
        </div>
      </div>
    );
  }

  if (!success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">支付验证失败</h1>
          <p className="text-gray-600 mb-6">无法验证您的支付。请稍后重试。</p>
          <Link
            href="/"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center animate-scale-in">
        {/* Success Icon */}
        <div className="text-6xl mb-4 animate-bounce">✅</div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">支付成功！</h1>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          感谢您的购买。您的额度已添加到账户。
        </p>

        {/* Credits Display */}
        <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-6 mb-6 hover-lift">
          <p className="text-gray-600 text-sm mb-2">您获得了</p>
          <p className="text-4xl font-bold text-green-600">{credits}</p>
          <p className="text-gray-600 text-sm">转录额度</p>
        </div>

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm text-gray-700">
            <strong>💡 提示：</strong> 您现在可以开始转录视频了。额度将在 30 天后过期。
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 rounded-lg transition hover-scale"
          >
            开始转录
          </Link>
          <Link
            href="/"
            className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition hover-scale"
          >
            返回首页
          </Link>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-6">
          订单 ID: {sessionId}
        </p>
      </div>
    </div>
  );
}
