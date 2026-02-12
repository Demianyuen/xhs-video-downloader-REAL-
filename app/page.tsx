'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleProcess = async (type: 'download' | 'transcript') => {
    if (!url.trim()) {
      setError('Please paste a valid XHS URL');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, type }),
      });

      const data = await response.json();

      if (data.success) {
        // Redirect to results page
        router.push(`/download/${data.videoId}`);
      } else {
        setError(data.error || 'Failed to process video');
      }
    } catch (err) {
      setError('Error processing video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🎬</span>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                XHS Video Downloader
              </h1>
              <p className="text-xs text-gray-600">Free • No Registration • No Limits</p>
            </div>
          </div>
          <div className="flex gap-2 text-sm">
            <a href="/about" className="text-gray-600 hover:text-gray-800 font-medium">About</a>
            <a href="/privacy" className="text-gray-600 hover:text-gray-800 font-medium">Privacy</a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section - Inspired by y2mate */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3 text-center">
            Download XHS Videos in Seconds
          </h2>
          <p className="text-gray-600 text-center mb-8 text-lg max-w-2xl mx-auto">
            Free, fast, and easy. Download Xiaohongshu videos in multiple resolutions without registration or installation.
          </p>

          {/* Input Section */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste XHS video URL here..."
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:outline-none text-base shadow-sm hover:border-gray-400 transition"
                onKeyPress={(e) => e.key === 'Enter' && !loading && handleProcess('download')}
              />
              <span className="absolute right-4 top-4 text-gray-400 text-sm">e.g., https://www.xiaohongshu.com/...</span>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg flex items-start gap-3">
                <span className="text-xl">⚠️</span>
                <div>
                  <p className="font-semibold">Error</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleProcess('download')}
                disabled={loading}
                className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-4 rounded-xl transition shadow-lg hover:shadow-xl disabled:opacity-50 transform hover:scale-105"
              >
                {loading ? '⏳ Processing...' : '⬇️ Download Video'}
              </button>
              <button
                onClick={() => handleProcess('transcript')}
                disabled={loading}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-4 rounded-xl transition shadow-lg hover:shadow-xl disabled:opacity-50 transform hover:scale-105"
              >
                {loading ? '⏳ Processing...' : '📝 Get Transcript'}
              </button>
            </div>
          </div>
        </div>

        {/* Instructions Section - Like y2mate */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">How to Use</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold">
                  1
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Paste URL</h4>
                <p className="text-gray-600 text-sm">Copy any Xiaohongshu video link and paste it above</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold">
                  2
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Click Download</h4>
                <p className="text-gray-600 text-sm">Choose your preferred quality and click the download button</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold">
                  3
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Save & Enjoy</h4>
                <p className="text-gray-600 text-sm">Your video will download instantly to your device</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-pink-500 hover:shadow-lg transition">
            <div className="text-3xl mb-3">🎁</div>
            <h4 className="font-bold text-gray-900 mb-2">100% Free</h4>
            <p className="text-sm text-gray-600">No hidden fees, no premium plans. Completely free forever.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-orange-500 hover:shadow-lg transition">
            <div className="text-3xl mb-3">⚡</div>
            <h4 className="font-bold text-gray-900 mb-2">Super Fast</h4>
            <p className="text-sm text-gray-600">Download videos in seconds with our optimized servers.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-yellow-500 hover:shadow-lg transition">
            <div className="text-3xl mb-3">🔒</div>
            <h4 className="font-bold text-gray-900 mb-2">100% Safe</h4>
            <p className="text-sm text-gray-600">No installation, no registration, no data collection.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-pink-500 hover:shadow-lg transition">
            <div className="text-3xl mb-3">📱</div>
            <h4 className="font-bold text-gray-900 mb-2">All Devices</h4>
            <p className="text-sm text-gray-600">Works on desktop, mobile, tablet, and all browsers.</p>
          </div>
        </div>

        {/* Supported Formats */}
        <div className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-2xl shadow-lg p-8 mb-12 border border-pink-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Supported Formats & Resolutions</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span>🎥</span> Video Formats
              </h4>
              <div className="flex flex-wrap gap-2">
                {['MP4', '1080p', '720p', '480p', '360p'].map((format) => (
                  <span key={format} className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 border border-pink-200">
                    {format}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span>📝</span> Additional Features
              </h4>
              <div className="flex flex-wrap gap-2">
                {['Transcripts', 'Subtitles', 'Metadata', 'Batch Download'].map((feature) => (
                  <span key={feature} className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 border border-orange-200">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <details className="group border border-gray-200 rounded-lg p-4 hover:border-pink-300 transition">
              <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between">
                How do I use XHS Video Downloader?
                <span className="text-gray-600 group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-gray-600 mt-3 text-sm">Simply paste a Xiaohongshu video URL in the input field above and click "Download Video". Select your preferred quality and the download will start automatically.</p>
            </details>
            <details className="group border border-gray-200 rounded-lg p-4 hover:border-pink-300 transition">
              <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between">
                Is it really free?
                <span className="text-gray-600 group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-gray-600 mt-3 text-sm">Yes! Completely free. No registration, no payment, no hidden fees. Download as many videos as you want.</p>
            </details>
            <details className="group border border-gray-200 rounded-lg p-4 hover:border-pink-300 transition">
              <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between">
                What video qualities are available?
                <span className="text-gray-600 group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-gray-600 mt-3 text-sm">We support multiple resolutions: 1080p, 720p, 480p, and 360p. The available quality depends on the original video.</p>
            </details>
            <details className="group border border-gray-200 rounded-lg p-4 hover:border-pink-300 transition">
              <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between">
                Do I need to install anything?
                <span className="text-gray-600 group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-gray-600 mt-3 text-sm">No installation needed! It's a web-based tool that works directly in your browser on any device.</p>
            </details>
            <details className="group border border-gray-200 rounded-lg p-4 hover:border-pink-300 transition">
              <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between">
                Is it safe to use?
                <span className="text-gray-600 group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-gray-600 mt-3 text-sm">Yes, it's 100% safe. We don't collect personal data, don't require registration, and don't install any software on your device.</p>
            </details>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl shadow-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <div className="text-4xl mb-2">✅</div>
              <p className="font-semibold">No Registration</p>
              <p className="text-sm opacity-90">Start downloading immediately</p>
            </div>
            <div>
              <div className="text-4xl mb-2">⚡</div>
              <p className="font-semibold">Lightning Fast</p>
              <p className="text-sm opacity-90">Download in seconds</p>
            </div>
            <div>
              <div className="text-4xl mb-2">🔒</div>
              <p className="font-semibold">Secure & Private</p>
              <p className="text-sm opacity-90">Your data is safe with us</p>
            </div>
            <div>
              <div className="text-4xl mb-2">♾️</div>
              <p className="font-semibold">Unlimited Downloads</p>
              <p className="text-sm opacity-90">No limits or restrictions</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/" className="hover:text-pink-500">Home</a></li>
                <li><a href="/about" className="hover:text-pink-500">About</a></li>
                <li><a href="/contact" className="hover:text-pink-500">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/privacy" className="hover:text-pink-500">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-pink-500">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/faq" className="hover:text-pink-500">FAQ</a></li>
                <li><a href="/contact" className="hover:text-pink-500">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Follow Us</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-pink-500">Twitter</a></li>
                <li><a href="#" className="hover:text-pink-500">Discord</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-6 text-center text-sm text-gray-600">
            <p>&copy; 2026 XHS Video Downloader. For personal use only. Respect copyright and creators' rights.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
