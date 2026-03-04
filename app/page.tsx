'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDownload = async () => {
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
        body: JSON.stringify({ url, type: 'download' }),
      });

      const data = await response.json();

      if (data.success) {
        // Redirect to download page where user can choose options
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50 flex flex-col">
      {/* Header with gradient style */}
      <header className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎬</span>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
              XHS Video Downloader
            </h1>
          </div>
          <nav className="flex gap-8 text-sm">
            <a href="/privacy" className="text-gray-600 hover:text-gray-900 transition">Privacy</a>
            <a href="/terms" className="text-gray-600 hover:text-gray-900 transition">Terms</a>
          </nav>
        </div>
      </header>

      {/* Hero Section - Centered Giant Input */}
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-3xl">
          {/* Main Heading */}
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              XHS Video Downloader
            </h2>
            <p className="text-xl text-gray-600">
              Free, fast Xiaohongshu video downloader. No watermarks, no registration.
            </p>
          </div>

          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="space-y-4">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste Xiaohongshu URL here..."
                className="w-full px-6 py-5 text-lg border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none transition"
                onKeyPress={(e) => e.key === 'Enter' && !loading && handleDownload()}
              />

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handleDownload}
                disabled={loading}
                className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-5 text-lg rounded-lg transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Processing...
                  </span>
                ) : (
                  '⬇️ Download Video'
                )}
              </button>
            </div>
          </div>

          {/* Simple Instructions */}
          <div className="text-center text-sm text-gray-500">
            <p>Paste any Xiaohongshu video link above and click Download</p>
          </div>
        </div>
      </main>

      {/* AdSense Space */}
      <div className="py-8 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="h-24 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 text-sm">
            Advertisement Space (AdSense Placeholder)
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-5xl mx-auto px-6 text-center text-sm text-gray-500">
          <div className="flex justify-center gap-6 mb-4">
            <a href="/privacy" className="hover:text-pink-500 transition">Privacy Policy</a>
            <a href="/terms" className="hover:text-pink-500 transition">Terms of Service</a>
          </div>
          <p>&copy; 2026 XHS Video Downloader. For personal use only.</p>
        </div>
      </footer>
    </div>
  );
}
