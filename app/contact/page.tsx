'use client';

import { I18nProvider, useI18n } from '@/app/lib/i18n';

function ContactContent() {
  const { locale } = useI18n();
  const isEn = locale === 'en';
  const isHans = locale === 'zh-Hans';

  const title = isEn ? 'Contact Us' : isHans ? '联系我们' : '聯繫我們';
  const lastUpdated = isEn ? 'Last updated: February 24, 2026' : isHans ? '最后更新：2026 年 2 月 24 日' : '最後更新：2026 年 2 月 24 日';

  const intro = isEn
    ? "Whether you have questions, suggestions, or feedback, we'd love to hear from you. Please reach out through the following channels."
    : isHans
    ? '无论您有问题、建议还是反馈，我们都想听取您的意见。请通过以下方式与我们联系。'
    : '無論您有問題、建議還是反饋，我們都想聽取您的意見。請通過以下方式與我們聯繫。';

  const emailLabel = isEn ? 'Email' : isHans ? '电子邮件' : '電子郵件';
  const emailNote = isEn ? 'We typically respond to all emails within 24 hours.' : isHans ? '我们通常在 24 小时内回复所有电子邮件。' : '我們通常在 24 小時內回覆所有電子郵件。';
  const socialLabel = isEn ? 'Social Media' : isHans ? '社交媒体' : '社交媒體';
  const socialNote = isEn ? 'Follow us on Twitter and Discord for the latest updates and announcements.' : isHans ? '在 Twitter 和 Discord 上关注我们以获取最新更新和公告。' : '在 Twitter 和 Discord 上關注我們以獲取最新更新和公告。';
  const faqTitle = isEn ? 'FAQ' : isHans ? '常见问题' : '常見問題';
  const faqText = isEn ? 'Before contacting us, check our FAQ page — you may find your answer there.' : isHans ? '在联系我们之前，请查看我们的常见问题页面，您可能会找到答案。' : '在聯繫我們之前，請查看我們的常見問題頁面，您可能會找到答案。';
  const reportTitle = isEn ? 'Report an Issue' : isHans ? '报告问题' : '報告問題';
  const reportText = isEn ? 'If you encounter a technical issue or find a bug, please provide: your browser and version, your operating system, a detailed description of the issue, the video URL you tried to download (if applicable), and any error messages.' : isHans ? '如果您遇到技术问题或发现错误，请提供以下信息：您使用的浏览器和版本、您的操作系统、问题的详细描述、您尝试下载的视频 URL（如果适用）、错误消息（如果有）。' : '如果您遇到技術問題或發現錯誤，請提供以下信息：您使用的瀏覽器和版本、您的操作系統、問題的詳細描述、您嘗試下載的視頻 URL（如果適用）、錯誤消息（如果有）。';
  const feedbackTitle = isEn ? 'Feedback & Suggestions' : isHans ? '反馈和建议' : '反饋和建議';
  const feedbackText = isEn ? 'Your feedback helps us improve XHS Downloader. Whether positive or negative, we appreciate it.' : isHans ? '您的反馈帮助我们改进 XHS Downloader。无论是正面还是负面的反馈，我们都很感谢。' : '您的反饋幫助我們改進 XHS Downloader。無論是正面還是負面的反饋，我們都很感謝。';

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">{title}</h1>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <p>{intro}</p>
            </section>

            <section>
              <div className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">📧 {emailLabel}</h3>
                <p className="text-lg"><strong>support@xhsvideodownloader.com</strong></p>
                <p className="text-gray-600 mt-2">{emailNote}</p>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">🐦 {socialLabel}</h3>
                <p className="text-gray-600">{socialNote}</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{faqTitle}</h2>
              <p>{faqText}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{reportTitle}</h2>
              <p>{reportText}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{feedbackTitle}</h2>
              <p>{feedbackText}</p>
            </section>

            <section className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600">{lastUpdated}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  return <I18nProvider><ContactContent /></I18nProvider>;
}
