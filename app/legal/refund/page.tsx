'use client';

import { useI18n } from '@/app/lib/i18n';

function RefundContent() {
  const { locale } = useI18n();
  const isEn = locale === 'en';
  const isHans = locale === 'zh-Hans';

  const title = isEn ? 'Refund Policy' : isHans ? '退款政策' : '退款政策';
  const lastUpdated = isEn ? 'Last updated: February 24, 2026' : isHans ? '最后更新：2026 年 2 月 24 日' : '最後更新：2026 年 2 月 24 日';

  const sections = isEn ? [
    { title: '30-Day Money-Back Guarantee', content: 'We are confident in our service. If you are unsatisfied with our premium service within 30 days of purchase, we will provide a full refund, no questions asked.' },
    { title: 'Refund Process', content: '1. Contact Us: Send an email to support@xhsvideodownloader.com stating your refund request. 2. Provide Details: Include your order ID and reason for refund. 3. Confirmation: We will verify your request and confirm the refund. 4. Processing: The refund will be processed within 5-10 business days to your original payment method.' },
    { title: 'Refund Conditions', content: 'Refunds may not be available in the following cases: more than 30 days after purchase, significant service quota already used, violation of our Terms of Service, or repeated refund requests.' },
    { title: 'Subscription Cancellation', content: 'You may cancel your subscription at any time. After cancellation, you will no longer have access to premium features, but will not be charged further.' },
    { title: 'Technical Issues', content: 'If you are unable to use the service due to technical issues, please contact us immediately. We will work to resolve the issue or provide a refund.' },
    { title: 'Contact Support', content: 'Have questions about refunds? Contact our support team at: support@xhsvideodownloader.com' },
  ] : isHans ? [
    { title: '30 天退款保证', content: '我们对我们的服务充满信心。如果您在购买后 30 天内对我们的高级服务不满意，我们将全额退款，无需提出任何问题。' },
    { title: '退款流程', content: '1. 联系我们：发送电子邮件至 support@xhsvideodownloader.com，说明您要求退款。2. 提供详情：包括您的订单 ID 和退款原因。3. 确认：我们将验证您的请求并确认退款。4. 处理：退款将在 5-10 个工作日内处理到您的原始支付方式。' },
    { title: '退款条件', content: '以下情况下可能无法获得退款：购买后超过 30 天、已使用大量服务配额、违反我们的服务条款、重复退款请求。' },
    { title: '订阅取消', content: '您可以随时取消订阅。取消后，您将无法访问高级功能，但不会被收取进一步的费用。' },
    { title: '技术问题', content: '如果您因技术问题无法使用服务，请立即联系我们。我们将努力解决问题或提供退款。' },
    { title: '联系支持', content: '有任何关于退款的问题？请联系我们的支持团队：support@xhsvideodownloader.com' },
  ] : [
    { title: '30 天退款保證', content: '我們對我們的服務充滿信心。如果您在購買後 30 天內對我們的高級服務不滿意，我們將全額退款，無需提出任何問題。' },
    { title: '退款流程', content: '1. 聯繫我們：發送電子郵件至 support@xhsvideodownloader.com，說明您要求退款。2. 提供詳情：包括您的訂單 ID 和退款原因。3. 確認：我們將驗證您的請求並確認退款。4. 處理：退款將在 5-10 個工作日內處理到您的原始支付方式。' },
    { title: '退款條件', content: '以下情況下可能無法獲得退款：購買後超過 30 天、已使用大量服務配額、違反我們的服務條款、重複退款請求。' },
    { title: '訂閱取消', content: '您可以隨時取消訂閱。取消後，您將無法訪問高級功能，但不會被收取進一步的費用。' },
    { title: '技術問題', content: '如果您因技術問題無法使用服務，請立即聯繫我們。我們將努力解決問題或提供退款。' },
    { title: '聯繫支持', content: '有任何關於退款的問題？請聯繫我們的支持團隊：support@xhsvideodownloader.com' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">{title}</h1>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            {sections.map((section, i) => (
              <section key={i}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                <p>{section.content}</p>
              </section>
            ))}
            <section className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600">{lastUpdated}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RefundPolicy() {
  return <RefundContent />;
}
