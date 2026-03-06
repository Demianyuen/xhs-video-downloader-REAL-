'use client';

import { I18nProvider, useI18n } from '@/app/lib/i18n';

function AboutContent() {
  const { t } = useI18n();
  const a = t.seo; // reuse seo translations for about page context

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            {t.header.about === 'About' ? 'About XHS Downloader' : t.header.about === '关于' ? '关于 XHS Downloader' : '關於 XHS Downloader'}
          </h1>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t.header.about === 'About' ? 'Our Mission' : t.header.about === '关于' ? '我们的使命' : '我們的使命'}
              </h2>
              <p>
                {t.header.about === 'About'
                  ? 'XHS Downloader is dedicated to providing a simple, fast, and secure way for users worldwide to download and archive video content from Xiaohongshu. We believe information should be easy to access and save, especially for personal learning and research purposes.'
                  : t.header.about === '关于'
                  ? 'XHS Downloader 致力于为全球用户提供一个简单、快速、安全的方式来下载和存档小红书上的视频内容。我们相信信息应该易于访问和保存，特别是对于个人学习和研究目的。'
                  : 'XHS Downloader 致力於為全球用戶提供一個簡單、快速、安全的方式來下載和存檔小紅書上的視頻內容。我們相信信息應該易於訪問和保存，特別是對於個人學習和研究目的。'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t.header.about === 'About' ? 'Why Choose Us?' : t.header.about === '关于' ? '为什么选择我们？' : '為什麼選擇我們？'}
              </h2>
              <ul className="list-disc list-inside space-y-3 ml-4">
                {t.features.free && (
                  <>
                    <li><strong>{t.features.free.title}:</strong> {t.features.free.desc}</li>
                    <li><strong>{t.header.about === 'About' ? 'No Registration' : t.header.about === '关于' ? '无需注册' : '無需註冊'}:</strong> {t.header.about === 'About' ? 'Start immediately, no account or personal info required.' : t.header.about === '关于' ? '立即开始使用，无需创建帐户或提供个人信息。' : '立即開始使用，無需創建帳戶或提供個人信息。'}</li>
                    <li><strong>{t.features.fast.title}:</strong> {t.features.fast.desc}</li>
                    <li><strong>{t.features.safe.title}:</strong> {t.features.safe.desc}</li>
                    <li><strong>{t.header.about === 'About' ? 'Multi-Device' : t.header.about === '关于' ? '多设备支持' : '多設備支持'}:</strong> {t.header.about === 'About' ? 'Works seamlessly on desktop, tablet, and mobile.' : t.header.about === '关于' ? '在桌面、平板或手机上无缝工作。' : '在桌面、平板或手機上無縫工作。'}</li>
                  </>
                )}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t.header.about === 'About' ? 'Our Technology' : t.header.about === '关于' ? '我们的技术' : '我們的技術'}
              </h2>
              <p>
                {t.header.about === 'About'
                  ? 'XHS Downloader is built with the latest web technologies including Next.js, React, and TypeScript. Our infrastructure is deployed on globally reliable cloud platforms to ensure high availability and fast performance.'
                  : t.header.about === '关于'
                  ? 'XHS Downloader 使用最新的 Web 技术构建，包括 Next.js、React 和 TypeScript。我们的基础设施部署在全球最可靠的云平台上，确保高可用性和快速性能。'
                  : 'XHS Downloader 使用最新的 Web 技術構建，包括 Next.js、React 和 TypeScript。我們的基礎設施部署在全球最可靠的雲平台上，確保高可用性和快速性能。'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.seo.privacyTitle}</h2>
              <p>
                {t.header.about === 'About'
                  ? 'Your privacy is our top priority. We do not collect, store, or share any personal information. All communications are conducted over secure HTTPS connections. We comply with international privacy standards and regulations.'
                  : t.header.about === '关于'
                  ? '您的隐私是我们的首要优先事项。我们不收集、存储或共享任何个人信息。所有通信都通过安全的 HTTPS 连接进行。我们遵守国际隐私标准和法规。'
                  : '您的隱私是我們的首要優先事項。我們不收集、存儲或共享任何個人信息。所有通信都通過安全的 HTTPS 連接進行。我們遵守國際隱私標準和法規。'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t.header.about === 'About' ? 'Legal Use' : t.header.about === '关于' ? '合法使用' : '合法使用'}
              </h2>
              <p>
                {t.header.about === 'About'
                  ? 'XHS Downloader is intended for personal learning, research, and archiving purposes. We respect the copyrights of content creators. Users are responsible for ensuring their use of downloaded content complies with applicable laws and Xiaohongshu\'s terms of service.'
                  : t.header.about === '关于'
                  ? 'XHS Downloader 旨在用于个人学习、研究和存档目的。我们尊重内容创作者的版权。用户有责任确保他们对下载内容的使用符合适用的法律和小红书的服务条款。'
                  : 'XHS Downloader 旨在用於個人學習、研究和存檔目的。我們尊重內容創作者的版權。用戶有責任確保他們對下載內容的使用符合適用的法律和小紅書的服務條款。'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t.header.about === 'About' ? 'Contact Us' : t.footer.contact}
              </h2>
              <p>
                {t.header.about === 'About'
                  ? 'Have questions or suggestions? We\'d love to hear from you.'
                  : t.header.about === '关于'
                  ? '有任何问题或建议？我们很乐意听取您的意见。'
                  : '有任何問題或建議？我們很樂意聽取您的意見。'}
              </p>
              <p className="mt-4">
                <strong>{t.header.about === 'About' ? 'Email' : '電子郵件'}:</strong> support@xhsvideodownloader.com
              </p>
            </section>

            <section className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                {t.header.about === 'About' ? 'Last updated: February 24, 2026' : t.header.about === '关于' ? '最后更新：2026 年 2 月 24 日' : '最後更新：2026 年 2 月 24 日'}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return <I18nProvider><AboutContent /></I18nProvider>;
}
