import { Metadata } from 'next';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export const metadata: Metadata = {
  title: 'About Us - XHS Video Downloader',
  description: 'Learn about XHS Video Downloader - your trusted tool for downloading Xiaohongshu videos without watermark.',
  keywords: 'XHS Video Downloader about, 小红书下载器关于我们',
};

const stats = [
  { value: '100%', label: 'Free Forever', icon: '💯' },
  { value: '0',    label: 'No Registration', icon: '🔒' },
  { value: 'HD',   label: 'Original Quality', icon: '✨' },
];

const values = [
  {
    icon: (
      <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
      </svg>
    ),
    title: 'No Watermark',
    desc: 'Download original quality videos without any watermarks or branding added.',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    ),
    title: 'Fast & Free',
    desc: 'Lightning-fast downloads with no hidden charges, subscription fees, or limits.',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
      </svg>
    ),
    title: 'Safe & Private',
    desc: 'No account required. We never collect personal data and auto-delete video URLs after 24 hours.',
  },
];

export default function AboutPage() {
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
            <a href="/about" className="text-pink-600 font-semibold">About</a>
            <a href="/faq" className="text-gray-500 hover:text-gray-900 transition-colors">FAQ</a>
            <LanguageSwitcher />
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 section-container py-16 max-w-4xl">

        {/* Page title */}
        <div className="text-center mb-12">
          <span className="badge mb-4">About Us</span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">About XHS Video Downloader</h1>
          <p className="text-lg text-gray-500">关于我们 — 你值得信赖的小红书视频下载工具</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {stats.map(({ value, label, icon }) => (
            <div key={label} className="card p-6 text-center">
              <div className="text-3xl mb-1">{icon}</div>
              <p className="text-2xl font-extrabold gradient-text">{value}</p>
              <p className="text-xs text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="card p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            XHS Video Downloader was founded with a simple mission: to make it easy for everyone to save
            and enjoy Xiaohongshu (小红书) content offline. We believe that content creators work hard to
            produce amazing videos, and users should have the freedom to watch them anytime, anywhere.
          </p>
          <p className="text-gray-500 leading-relaxed">
            我们的使命很简单：让每个人都能轻松地离线观看小红书内容。我们相信内容创作者辛勤制作精彩视频，
            用户应该有权随时随地欣赏这些内容。
          </p>
        </div>

        {/* What we do */}
        <div className="card p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Do</h2>
          <ul className="grid md:grid-cols-2 gap-2">
            {[
              'Download Xiaohongshu videos without watermark',
              'Support both mobile app and desktop clipboard formats',
              'Provide high-quality original video downloads',
              'Maintain a simple, user-friendly interface',
              'Protect user privacy with minimal data collection',
              '下载无水印小红书视频',
              '支持手机和电脑剪贴板格式',
              '提供高质量原视频下载',
              '保持简单易用的界面',
              '保护用户隐私，最少数据收集',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-pink-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Why choose us */}
        <div className="card p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {values.map(({ icon, title, desc }) => (
              <div key={title} className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-xl p-5 text-center border border-pink-100/60">
                <div className="flex justify-center mb-3">{icon}</div>
                <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="card p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
          <ol className="space-y-4">
            {[
              { n: '1', strong: 'Copy the video link', text: ' from Xiaohongshu app or website', zh: '从小红书应用或网站复制视频链接' },
              { n: '2', strong: 'Paste the URL', text: ' into our input box above', zh: '将链接粘贴到上方的输入框中' },
              { n: '3', strong: 'Click Download', text: ' and save the video to your device', zh: '点击下载按钮，将视频保存到您的设备' },
            ].map(({ n, strong, text, zh }) => (
              <li key={n} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                  {n}
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    <strong className="text-gray-900">{strong}</strong>{text}
                  </p>
                  <p className="text-xs text-gray-400">{zh}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Privacy */}
        <div className="card p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy & Security</h2>
          <ul className="grid md:grid-cols-2 gap-2">
            {[
              'No account registration required',
              'No personal data collection beyond essential analytics',
              'Video URLs are automatically deleted after 24 hours',
              "We don't sell or share your data with third parties",
              'Secure HTTPS connection for all transfers',
              '无需注册账户',
              '除基本分析外不收集个人数据',
              '视频链接24小时后自动删除',
              '不与第三方出售或共享您的数据',
              '所有传输均使用安全HTTPS连接',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="card p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Contact Us</h2>
          <p className="text-gray-500 mb-4">Have questions, feedback, or suggestions? We'd love to hear from you!</p>
          <div className="bg-gray-50 rounded-xl p-4 inline-flex flex-col gap-1 text-sm text-gray-600">
            <p><strong>Email:</strong> support@xhsvideodownloader.com</p>
            <p><strong>Website:</strong> https://xhsvideodownloader.com</p>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-gray-400 text-center mt-8 leading-relaxed">
          This tool is for personal use only. Please respect copyright laws and content creators' rights.
          <br />
          本工具仅供个人使用。请遵守版权法并尊重内容创作者的权利。
        </p>
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
