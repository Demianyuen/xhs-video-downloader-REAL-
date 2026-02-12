/**
 * Payment Cancel Page
 * Displays when user cancels payment
 */

'use client';

import Link from 'next/link';

export default function PaymentCancel() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {/* Cancel Icon */}
        <div className="text-6xl mb-4">⚠️</div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">支付已取消</h1>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          您已取消支付。您的账户未被收费。
        </p>

        {/* Info */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm text-gray-700">
            <strong>💡 提示：</strong> 您仍然可以使用每天的免费转录额度。如需更多额度，请重试购买。
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 rounded-lg transition"
          >
            返回首页
          </Link>
          <Link
            href="/payment/checkout"
            className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition"
          >
            重新购买
          </Link>
        </div>

        {/* FAQ */}
        <div className="mt-8 text-left">
          <h3 className="font-semibold text-gray-800 mb-3">常见问题</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div>
              <p className="font-semibold text-gray-700">为什么我被收费了？</p>
              <p>您没有被收费。支付已取消，您的账户未被收费。</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">我可以重试吗？</p>
              <p>是的，您可以随时重新购买。点击上面的"重新购买"按钮。</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">我需要帮助吗？</p>
              <p>如有任何问题，请联系我们的支持团队。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
