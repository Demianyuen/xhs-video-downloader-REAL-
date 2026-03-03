'use client';

import { useState } from 'react';
import { Download, Copy, Globe, Zap, Shield, Smartphone } from 'lucide-react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!url.trim()) {
      alert('Please enter a valid XHS video URL');
      return;
    }
    setLoading(true);
    // Simulate download
    setTimeout(() => {
      setLoading(false);
      alert('Download started!');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
            XHS Downloader
          </div>
          <div className="flex gap-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:border-gray-400"
            >
              <option value="en">English</option>
              <option value="zh-TW">繁體中文</option>
              <option value="zh-CN">简体中文</option>
            </select>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-4 text-gray-900">
          Download XHS Videos
          <span className="block text-transparent bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text">
            100% Free & No Watermark 🎉
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Extract videos from Xiaohongshu (小红书) instantly. No sign-up required. No watermarks. No limits.
        </p>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 max-w-2xl mx-auto">
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              placeholder="Paste XHS video URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              onClick={handleDownload}
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Download'}
            </button>
          </div>
          <p className="text-sm text-gray-500">
            ✨ Paste any XHS video link and click Download. That's it!
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <Download className="w-8 h-8 text-pink-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">One-Click Download</h3>
            <p className="text-gray-600 text-sm">Download XHS videos instantly without any hassle</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <Shield className="w-8 h-8 text-pink-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">No Watermark</h3>
            <p className="text-gray-600 text-sm">Get clean videos without any watermarks or logos</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <Zap className="w-8 h-8 text-pink-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Lightning Fast</h3>
            <p className="text-gray-600 text-sm">Download completes in seconds, not minutes</p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">How It Works 🎬</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Paste URL</h3>
              <p className="text-gray-600 text-sm">Copy any XHS video link and paste it above</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Click Download</h3>
              <p className="text-gray-600 text-sm">Hit the download button and wait a few seconds</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Save & Enjoy</h3>
              <p className="text-gray-600 text-sm">Your video is ready! No watermark, no limits</p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-2xl p-8 mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Why Choose XHS Downloader? 🌟</h2>
          <ul className="space-y-3 text-left">
            <li className="flex items-center gap-3">
              <span className="text-pink-500 font-bold">✓</span>
              <span className="text-gray-700">100% Free - No hidden charges or premium plans</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-pink-500 font-bold">✓</span>
              <span className="text-gray-700">No Sign-up Required - Start downloading immediately</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-pink-500 font-bold">✓</span>
              <span className="text-gray-700">No Watermarks - Get clean, original videos</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-pink-500 font-bold">✓</span>
              <span className="text-gray-700">Multi-Language Support - Available in 3 languages</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-pink-500 font-bold">✓</span>
              <span className="text-gray-700">Lightning Fast - Downloads complete in seconds</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-pink-500 font-bold">✓</span>
              <span className="text-gray-700">Mobile Friendly - Works on all devices</span>
            </li>
          </ul>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 max-w-3xl mx-auto text-left">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">FAQ ❓</h2>
          <div className="space-y-4">
            <details className="border-b pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer hover:text-pink-500">
                Is XHS Downloader really free?
              </summary>
              <p className="text-gray-600 mt-2">
                Yes! XHS Downloader is 100% free. No hidden charges, no premium plans, no sign-up required.
              </p>
            </details>

            <details className="border-b pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer hover:text-pink-500">
                Do I need to sign up or create an account?
              </summary>
              <p className="text-gray-600 mt-2">
                No sign-up needed! Just paste the URL and download. It's that simple.
              </p>
            </details>

            <details className="border-b pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer hover:text-pink-500">
                Will the downloaded video have a watermark?
              </summary>
              <p className="text-gray-600 mt-2">
                No! We remove all watermarks. You get clean, original videos.
              </p>
            </details>

            <details className="border-b pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer hover:text-pink-500">
                What video formats are supported?
              </summary>
              <p className="text-gray-600 mt-2">
                We support MP4, WebM, and other common video formats. Downloads are optimized for all devices.
              </p>
            </details>

            <details className="border-b pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer hover:text-pink-500">
                Is there a limit to how many videos I can download?
              </summary>
              <p className="text-gray-600 mt-2">
                No limits! Download as many videos as you want, whenever you want.
              </p>
            </details>

            <details>
              <summary className="font-semibold text-gray-900 cursor-pointer hover:text-pink-500">
                Does it work on mobile devices?
              </summary>
              <p className="text-gray-600 mt-2">
                Yes! XHS Downloader works perfectly on all devices - desktop, tablet, and mobile.
              </p>
            </details>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl p-12 text-white text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Download? 🚀</h2>
          <p className="text-lg mb-6 opacity-90">Start downloading XHS videos for free right now!</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-8 py-3 bg-white text-pink-500 font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="mb-2">© 2026 XHS Downloader. All rights reserved.</p>
          <p className="text-sm">
            XHS Downloader is an independent service and is not affiliated with Xiaohongshu or ByteDance.
          </p>
        </div>
      </footer>
    </div>
  );
}
