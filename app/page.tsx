'use client';

import { useState } from 'react';
import { Download, Copy, Zap, Shield, Smartphone, Music, Video } from 'lucide-react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const translations = {
    en: {
      title: 'XHS Video Downloader',
      subtitle: 'Download Xiaohongshu Videos - Free, Fast & No Watermark',
      placeholder: 'Paste XHS video URL here...',
      download: 'Download',
      processing: 'Processing...',
      features: ['One-Click Download', 'No Watermark', 'Lightning Fast', 'Multi-Format', 'HD Quality', 'No Sign-up'],
      howWorks: 'How It Works',
      step1: 'Paste URL',
      step1Desc: 'Copy any XHS video link',
      step2: 'Select Format',
      step2Desc: 'Choose MP4, MP3 or WebM',
      step3: 'Download',
      step3Desc: 'Get your video instantly',
      whyChoose: 'Why Choose XHS Downloader?',
      faq: 'FAQ',
      ready: 'Ready to Download?',
      getStarted: 'Get Started Now',
    },
    'zh-TW': {
      title: 'XHS 影片下載器',
      subtitle: '下載小紅書影片 - 免費、快速、無水印',
      placeholder: '在此貼上 XHS 影片連結...',
      download: '下載',
      processing: '處理中...',
      features: ['一鍵下載', '無水印', '閃電快速', '多種格式', '高清品質', '無需註冊'],
      howWorks: '工作原理',
      step1: '貼上連結',
      step1Desc: '複製任何 XHS 影片連結',
      step2: '選擇格式',
      step2Desc: '選擇 MP4、MP3 或 WebM',
      step3: '下載',
      step3Desc: '立即取得您的影片',
      whyChoose: '為什麼選擇 XHS 下載器？',
      faq: '常見問題',
      ready: '準備好下載了嗎？',
      getStarted: '立即開始',
    },
    'zh-CN': {
      title: 'XHS 视频下载器',
      subtitle: '下载小红书视频 - 免费、快速、无水印',
      placeholder: '在此粘贴 XHS 视频链接...',
      download: '下载',
      processing: '处理中...',
      features: ['一键下载', '无水印', '闪电快速', '多种格式', '高清品质', '无需注册'],
      howWorks: '工作原理',
      step1: '粘贴链接',
      step1Desc: '复制任何 XHS 视频链接',
      step2: '选择格式',
      step2Desc: '选择 MP4、MP3 或 WebM',
      step3: '下载',
      step3Desc: '立即获取您的视频',
      whyChoose: '为什么选择 XHS 下载器？',
      faq: '常见问题',
      ready: '准备好下载了吗？',
      getStarted: '立即开始',
    },
  };

  const t = translations[language as keyof typeof translations];

  const handleDownload = async () => {
    if (!url.trim()) {
      setError('Please enter a valid XHS video URL');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Call the download API
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, format: 'mp4' }),
      });

      if (!response.ok) {
        throw new Error('Failed to process video');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-black/30 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            XHS Downloader
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-3 py-2 bg-purple-900/50 border border-purple-500/30 rounded-lg text-white text-sm hover:border-purple-500 transition-colors"
          >
            <option value="en">English</option>
            <option value="zh-TW">繁體中文</option>
            <option value="zh-CN">简体中文</option>
          </select>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            {t.title}
          </h1>
          <p className="text-xl text-purple-200 mb-8">
            {t.subtitle}
          </p>

          {/* Main Input Section */}
          <div className="bg-gradient-to-br from-purple-900/50 to-cyan-900/50 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-8 mb-8 max-w-2xl mx-auto shadow-2xl">
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                placeholder={t.placeholder}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleDownload()}
                className="flex-1 px-4 py-3 bg-black/30 border border-purple-500/50 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
              <button
                onClick={handleDownload}
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? t.processing : t.download}
              </button>
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            {result && (
              <div className="mt-4 p-4 bg-green-900/30 border border-green-500/50 rounded-lg">
                <p className="text-green-300">✅ Video processed successfully!</p>
                <a
                  href={result.downloadUrl}
                  download
                  className="mt-2 inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Download Video
                </a>
              </div>
            )}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {t.features.map((feature, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 backdrop-blur border border-purple-500/20 rounded-lg p-4 hover:border-purple-500/50 transition-all"
              >
                <p className="text-purple-200 font-semibold text-sm">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-8 mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-white">{t.howWorks}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '1', title: t.step1, desc: t.step1Desc, icon: '📋' },
              { step: '2', title: t.step2, desc: t.step2Desc, icon: '⚙️' },
              { step: '3', title: t.step3, desc: t.step3Desc, icon: '⬇️' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-purple-200 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-pink-900/30 via-purple-900/30 to-cyan-900/30 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-8 mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">{t.whyChoose}</h2>
          <ul className="space-y-3">
            {[
              '100% Free - No hidden charges',
              'No Sign-up Required - Start immediately',
              'No Watermarks - Clean videos',
              'Multi-Language Support',
              'Lightning Fast Downloads',
              'Works on All Devices',
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-purple-100">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* FAQ */}
        <div className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-8 mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">{t.faq}</h2>
          <div className="space-y-4">
            {[
              { q: 'Is it really free?', a: 'Yes, 100% free with no hidden charges.' },
              { q: 'Do I need to sign up?', a: 'No sign-up required. Just paste and download.' },
              { q: 'Will videos have watermarks?', a: 'No, all videos are watermark-free.' },
              { q: 'What formats are supported?', a: 'MP4, MP3, WebM and more formats.' },
              { q: 'Is there a download limit?', a: 'No limits. Download as many as you want.' },
              { q: 'Does it work on mobile?', a: 'Yes, works on all devices and browsers.' },
            ].map((item, i) => (
              <details key={i} className="border-b border-purple-500/20 pb-4">
                <summary className="font-semibold text-white cursor-pointer hover:text-cyan-400 transition-colors">
                  {item.q}
                </summary>
                <p className="text-purple-200 mt-2">{item.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 rounded-2xl p-12 text-white text-center mb-12 shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">{t.ready}</h2>
          <p className="text-lg mb-6 opacity-90">Start downloading XHS videos for free right now!</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            {t.getStarted}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur border-t border-purple-500/20 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-purple-300">
          <p className="mb-2">© 2026 XHS Downloader. All rights reserved.</p>
          <p className="text-sm">
            XHS Downloader is an independent service and is not affiliated with Xiaohongshu or ByteDance.
          </p>
        </div>
      </footer>
    </div>
  );
}
