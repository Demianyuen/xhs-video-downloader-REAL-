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
    <div className="min-h-screen bg-white flex flex-col">
      {/* Minimalist Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">XHS Video Downloader</h1>
          <nav className="flex gap-8 text-sm">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition">About</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition">Contact</a>
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

          {/* Giant Input + Button */}
          <div className="space-y-4">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste Xiaohongshu URL here..."
              className="w-full px-6 py-5 text-lg border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-5 text-lg rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Download Video'}
            </button>
          </div>

          {/* Simple Instructions */}
          <div className="mt-16 text-center text-sm text-gray-500">
            <p>Paste any Xiaohongshu video link above and click Download</p>
          </div>
        </div>
      </main>

      {/* AdSense Space - Uncomment after setting up AdSense */}
      <div className="py-8 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          {/*
          STEP 1: Get your AdSense Publisher ID from https://www.google.com/adsense
          STEP 2: Update app/layout.tsx with your Publisher ID
          STEP 3: Create an ad unit in AdSense dashboard and get the ad slot ID
          STEP 4: Uncomment the line below and replace 'YOUR_AD_SLOT_ID' with your actual ad slot ID

          <AdSense adSlot="YOUR_AD_SLOT_ID" adFormat="horizontal" />
          */}
          <div className="h-24 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 text-sm">
            Advertisement Space (AdSense Placeholder)
          </div>
        </div>
      </div>

      {/* Minimalist Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-6 text-center text-sm text-gray-500">
          <div className="flex justify-center gap-6 mb-4">
            <a href="/privacy" className="hover:text-gray-900 transition">Privacy Policy</a>
            <a href="/terms" className="hover:text-gray-900 transition">Terms of Service</a>
            <a href="#" className="hover:text-gray-900 transition">Contact Us</a>
          </div>
          <p>&copy; 2026 XHS Video Downloader. For personal use only.</p>
        </div>
      </footer>
    </div>
  );
}
