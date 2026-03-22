'use client';

import { useState } from 'react';

const faqs = [
  {
    question: 'How do I download Xiaohongshu videos?',
    questionZh: '如何下载小红书视频？',
    answer: 'Simply copy the video URL from the Xiaohongshu app or website, paste it into our input box, and click Download. The video will be processed and available for download within seconds.',
    answerZh: '只需从小红书应用或网站复制视频链接，粘贴到我们的输入框中，然后点击下载。视频将在几秒钟内处理完毕并可供下载。',
  },
  {
    question: 'Is the video quality the same as the original?',
    questionZh: '下载的视频质量与原视频一样吗？',
    answer: 'Yes! We download the original quality video from Xiaohongshu without any compression or quality loss.',
    answerZh: '是的！我们从小红书下载原始质量的视频，没有任何压缩或质量损失。',
  },
  {
    question: 'Are the downloaded videos watermark-free?',
    questionZh: '下载的视频没有水印吗？',
    answer: 'Yes, all videos downloaded through our tool are completely watermark-free. We fetch the original video source directly.',
    answerZh: '是的，通过我们工具下载的所有视频都完全没有水印。我们直接获取原始视频源。',
  },
  {
    question: 'Why does my download fail sometimes?',
    questionZh: '为什么有时下载会失败？',
    answer: 'This could happen if: 1) The video has been deleted by the creator, 2) The video URL is incorrect, 3) The video is private or restricted, 4) Server is temporarily overloaded. Please try again later.',
    answerZh: '这可能是由于：1) 创作者已删除视频，2) 视频链接不正确，3) 视频是私密或受限的，4) 服务器暂时过载。请稍后重试。',
  },
  {
    question: 'Is this service free to use?',
    questionZh: '这个服务是免费的吗？',
    answer: 'Yes, XHS Video Downloader is completely free to use with no hidden charges or subscription fees.',
    answerZh: '是的，XHS视频下载器完全免费使用，没有隐藏费用或订阅费。',
  },
  {
    question: 'Do I need to register an account?',
    questionZh: '我需要注册账户吗？',
    answer: "No registration required! Just paste the URL and download. We respect your privacy and don't collect personal information.",
    answerZh: "无需注册！只需粘贴链接即可下载。我们尊重您的隐私，不收集个人信息。",
  },
  {
    question: 'Can I download videos on mobile devices?',
    questionZh: '我可以在移动设备上下载视频吗？',
    answer: 'Yes! Our website is fully responsive and works on all devices including smartphones and tablets. Both iOS and Android are supported.',
    answerZh: '可以！我们的网站完全响应式，适用于所有设备，包括智能手机和平板电脑。支持iOS和Android。',
  },
  {
    question: 'What formats can I download videos in?',
    questionZh: '我可以下载什么格式的视频？',
    answer: 'Videos are downloaded in their original format (typically MP4) from Xiaohongshu. The quality depends on the original upload.',
    answerZh: '视频以小红书的原始格式（通常是MP4）下载。质量取决于原始上传。',
  },
  {
    question: 'Is it legal to download Xiaohongshu videos?',
    questionZh: '下载小红书视频合法吗？',
    answer: "Downloading videos for personal viewing is generally acceptable. However, redistributing, selling, or using copyrighted content for commercial purposes without permission may violate copyright laws. Please respect content creators' rights.",
    answerZh: '下载视频供个人观看通常是可以接受的。但是，未经许可重新分发、出售或出于商业目的使用受版权保护的内容可能违反版权法。请尊重内容创作者的权利。',
  },
  {
    question: 'Why does mobile app copy-paste not work sometimes?',
    questionZh: '为什么手机应用复制粘贴有时不工作？',
    answer: "We've fixed this issue! Our tool now supports mobile app clipboard format. Simply copy from the Xiaohongshu app (which includes the video title) and paste directly. It works automatically.",
    answerZh: '我们已经修复了这个问题！我们的工具现在支持移动应用剪贴板格式。只需从小红书应用复制（包含视频标题）并直接粘贴即可。它会自动工作。',
  },
  {
    question: 'How long are downloaded links valid?',
    questionZh: '下载的链接有效期是多久？',
    answer: "Download links are valid for 24 hours. After that, you'll need to generate a new link by pasting the URL again.",
    answerZh: '下载链接的有效期为24小时。之后，您需要通过再次粘贴URL来生成新链接。',
  },
  {
    question: 'Can I batch download multiple videos?',
    questionZh: '我可以批量下载多个视频吗？',
    answer: 'Currently, we support single video downloads. Batch download feature is coming soon for premium users. Stay tuned!',
    answerZh: '目前，我们支持单个视频下载。批量下载功能即将为高级用户推出。敬请期待！',
  },
  {
    question: 'What browsers are supported?',
    questionZh: '支持哪些浏览器？',
    answer: 'Our tool works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. We recommend using the latest version for the best experience.',
    answerZh: '我们的工具适用于所有现代浏览器，包括Chrome、Firefox、Safari、Edge和Opera。我们建议使用最新版本以获得最佳体验。',
  },
  {
    question: 'Is my data safe when using this service?',
    questionZh: '使用此服务时我的数据安全吗？',
    answer: "Absolutely! We don't collect personal information, don't require registration, and all video URLs are automatically deleted after 24 hours. We use secure HTTPS encryption for all connections.",
    answerZh: '绝对安全！我们不收集个人信息，不需要注册，所有视频链接在24小时后自动删除。我们对所有连接使用安全的HTTPS加密。',
  },
  {
    question: 'How can I report a bug or request a feature?',
    questionZh: '如何报告错误或请求功能？',
    answer: 'Please use our <a href="/contact" class="text-pink-600 hover:underline">contact form</a> to report bugs or suggest new features. We value your feedback and continuously improve our service.',
    answerZh: '请使用我们的<a href="/contact" class="text-pink-600 hover:underline">联系表单</a>报告错误或建议新功能。我们重视您的反馈并持续改进我们的服务。',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(160deg, #fff1f2 0%, #fff7ed 50%, #fef9c3 100%)' }}>

      {/* Header */}
      <header className="bg-white/70 backdrop-blur-md border-b border-pink-100/60 sticky top-0 z-50">
        <div className="section-container py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white text-sm font-bold shadow-button">
              X
            </div>
            <span className="text-xl font-extrabold gradient-text hidden sm:block">XHS Downloader</span>
          </a>
          <nav className="flex gap-5 text-sm items-center">
            <a href="/" className="text-gray-500 hover:text-gray-900 transition-colors">Home</a>
            <a href="/blog" className="text-gray-500 hover:text-gray-900 transition-colors">Blog</a>
            <a href="/about" className="text-gray-500 hover:text-gray-900 transition-colors">About</a>
            <a href="/faq" className="text-pink-600 font-semibold">FAQ</a>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 section-container py-16">
        <div className="text-center mb-12">
          <span className="badge mb-4">FAQ</span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            常见问题解答 — Find answers to common questions about XHS Video Downloader
          </p>
        </div>

        {/* FAQ accordion */}
        <div className="card divide-y divide-gray-100 overflow-hidden mb-10">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 hover:bg-pink-50/40 transition-colors duration-200 group"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm leading-snug">{faq.question}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{faq.questionZh}</p>
                </div>
                <svg
                  className={`w-5 h-5 flex-shrink-0 mt-0.5 text-gray-400 group-hover:text-pink-500 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-pink-500' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed animate-fade-in">
                  <p className="mb-1.5">{faq.answer}</p>
                  <p className="text-gray-400">{faq.answerZh}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="card p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Still Have Questions?</h2>
          <p className="text-gray-500 mb-1">Can't find the answer you're looking for? Please reach out to our support team.</p>
          <p className="text-gray-400 text-sm mb-6">找不到您想要的答案？请联系我们的支持团队。</p>
          <a
            href="/contact"
            className="btn-primary inline-flex"
          >
            Contact Us
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-400">
          <div className="flex justify-center gap-6 mb-4">
            <a href="/" className="hover:text-pink-500 transition-colors">Home</a>
            <a href="/blog" className="hover:text-pink-500 transition-colors">Blog</a>
            <a href="/about" className="hover:text-pink-500 transition-colors">About</a>
            <a href="/privacy" className="hover:text-pink-500 transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-pink-500 transition-colors">Terms</a>
          </div>
          <p>© 2026 XHS Video Downloader. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
