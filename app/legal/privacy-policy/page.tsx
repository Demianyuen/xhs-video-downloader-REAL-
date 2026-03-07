'use client';

import { useI18n } from '@/app/lib/i18n';

function PrivacyContent() {
  const { locale } = useI18n();
  const isEn = locale === 'en';
  const isHans = locale === 'zh-Hans';

  const title = isEn ? 'Privacy Policy' : isHans ? '隐私权政策' : '隱私權政策';
  const lastUpdated = isEn ? 'Last updated: February 24, 2026' : isHans ? '最后更新：2026 年 2 月 24 日' : '最後更新：2026 年 2 月 24 日';

  const sections = isEn ? [
    { title: '1. Introduction', content: 'XHS Downloader ("the Service") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal information.' },
    { title: '2. Information We Collect', content: 'We do not collect personal information. This Service is completely anonymous — we do not require you to provide any personal data, including: name or email address, phone number or address, payment information (unless you choose to purchase premium features), or location data or device identifiers.' },
    { title: '3. Automatically Collected Information', content: 'When you use the Service, we may automatically collect: Log Data (IP address, browser type, access time), Cookies (to improve user experience and analytics), and Analytics Data (anonymous usage statistics via Google Analytics).' },
    { title: '4. Use of Information', content: 'Information we collect is used only to: improve service quality and user experience, analyze usage trends and statistics, detect and prevent fraud or abuse, and comply with legal obligations.' },
    { title: '5. Third-Party Services', content: 'This Service uses the following third-party services which may collect your information: Google Analytics (for website analytics), Google AdSense (for advertising), and Stripe (for payment processing, if applicable). Please review their privacy policies to understand how they handle your data.' },
    { title: '6. Data Security', content: 'We take appropriate technical and organizational measures to protect your information from unauthorized access, alteration, or destruction.' },
    { title: '7. Cookie Policy', content: 'This Service uses cookies to enhance user experience. You can control cookie usage through your browser settings.' },
    { title: '8. Children\'s Privacy', content: 'This Service is not directed at children under 13. We do not knowingly collect personal information from children under 13.' },
    { title: '9. Policy Changes', content: 'We may update this Privacy Policy from time to time. Any significant changes will be communicated by posting a new version on this page.' },
    { title: '10. Contact Us', content: 'If you have any questions about this Privacy Policy, please contact us at: support@xhsvideodownloader.com' },
  ] : isHans ? [
    { title: '1. 简介', content: 'XHS Downloader（以下简称「本服务」）致力于保护您的隐私。本隐私权政策说明我们如何收集、使用和保护您的个人信息。' },
    { title: '2. 我们收集的信息', content: '我们不收集个人信息。本服务是完全匿名的，我们不要求您提供任何个人数据，包括：姓名或电子邮件地址、电话号码或地址、支付信息（除非您选择购买高级功能）、位置数据或设备标识符。' },
    { title: '3. 自动收集的信息', content: '当您使用本服务时，我们可能会自动收集以下信息：日志数据（IP 地址、浏览器类型、访问时间）、Cookie（用于改进用户体验和分析）、分析数据（通过 Google Analytics 收集的匿名使用统计）。' },
    { title: '4. 信息的使用', content: '我们收集的信息仅用于以下目的：改进服务质量和用户体验、分析使用趋势和统计、检测和防止欺诈或滥用、遵守法律义务。' },
    { title: '5. 第三方服务', content: '本服务使用以下第三方服务，这些服务可能收集您的信息：Google Analytics（用于网站分析）、Google AdSense（用于广告投放）、Stripe（用于支付处理，如适用）。请查阅这些服务的隐私政策以了解他们如何处理您的数据。' },
    { title: '6. 数据安全', content: '我们采取适当的技术和组织措施来保护您的信息免受未经授权的访问、更改或销毁。' },
    { title: '7. Cookie 政策', content: '本服务使用 Cookie 来增强用户体验。您可以通过浏览器设置控制 Cookie 的使用。' },
    { title: '8. 儿童隐私', content: '本服务不针对 13 岁以下的儿童。我们不会故意收集 13 岁以下儿童的个人信息。' },
    { title: '9. 政策变更', content: '我们可能会不时更新本隐私权政策。任何重大变更将通过在本页面上发布新版本来通知您。' },
    { title: '10. 联系我们', content: '如果您对本隐私权政策有任何疑问，请通过以下方式联系我们：support@xhsvideodownloader.com' },
  ] : [
    { title: '1. 簡介', content: 'XHS Downloader（以下簡稱「本服務」）致力於保護您的隱私。本隱私權政策說明我們如何收集、使用和保護您的個人信息。' },
    { title: '2. 我們收集的信息', content: '我們不收集個人信息。本服務是完全匿名的，我們不要求您提供任何個人數據，包括：姓名或電子郵件地址、電話號碼或地址、支付信息（除非您選擇購買高級功能）、位置數據或設備標識符。' },
    { title: '3. 自動收集的信息', content: '當您使用本服務時，我們可能會自動收集以下信息：日誌數據（IP 地址、瀏覽器類型、訪問時間）、Cookie（用於改進用戶體驗和分析）、分析數據（通過 Google Analytics 收集的匿名使用統計）。' },
    { title: '4. 信息的使用', content: '我們收集的信息僅用於以下目的：改進服務質量和用戶體驗、分析使用趨勢和統計、檢測和防止欺詐或濫用、遵守法律義務。' },
    { title: '5. 第三方服務', content: '本服務使用以下第三方服務，這些服務可能收集您的信息：Google Analytics（用於網站分析）、Google AdSense（用於廣告投放）、Stripe（用於支付處理，如適用）。請查閱這些服務的隱私政策以了解他們如何處理您的數據。' },
    { title: '6. 數據安全', content: '我們採取適當的技術和組織措施來保護您的信息免受未經授權的訪問、更改或銷毀。' },
    { title: '7. Cookie 政策', content: '本服務使用 Cookie 來增強用戶體驗。您可以通過瀏覽器設置控制 Cookie 的使用。' },
    { title: '8. 兒童隱私', content: '本服務不針對 13 歲以下的兒童。我們不會故意收集 13 歲以下兒童的個人信息。' },
    { title: '9. 政策變更', content: '我們可能會不時更新本隱私權政策。任何重大變更將通過在本頁面上發布新版本來通知您。' },
    { title: '10. 聯繫我們', content: '如果您對本隱私權政策有任何疑問，請通過以下方式聯繫我們：support@xhsvideodownloader.com' },
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

export default function PrivacyPolicy() {
  return <PrivacyContent />;
}
