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
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      {/* Header */}
      <header className="bg-yellow-400 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-gray-800">XHS Video Downloader</h1>
          <p className="text-gray-700">Download videos & get transcripts for free</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">
            Download XHS Videos & Get Transcripts
          </h2>
          <p className="text-gray-600 text-center mb-8 text-lg">
            Paste any Xiaohongshu video link below to download or get a transcript
          </p>

          {/* Input Section */}
          <div className="space-y-4">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste XHS video URL here... (e.g., https://www.xiaohongshu.com/...)"
              className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none text-lg"
              onKeyPress={(e) => e.key === 'Enter' && !loading && handleProcess('download')}
            />

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleProcess('download')}
                disabled={loading}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-4 rounded-lg transition disabled:opacity-50 text-lg"
              >
                {loading ? 'Processing...' : '📥 Download Video'}
              </button>
              <button
                onClick={() => handleProcess('transcript')}
                disabled={loading}
                className="bg-orange-400 hover:bg-orange-500 text-gray-800 font-bold py-4 rounded-lg transition disabled:opacity-50 text-lg"
              >
                {loading ? 'Processing...' : '📝 Get Transcript'}
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-4xl mb-2">📥</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Download</h3>
            <p className="text-gray-600">Download videos in multiple resolutions (1080p, 720p, 480p)</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-4xl mb-2">📝</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Transcript</h3>
            <p className="text-gray-600">Get AI-powered transcripts with timestamps</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-4xl mb-2">⚡</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Fast & Free</h3>
            <p className="text-gray-600">No registration required, completely free to use</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">FAQ</h3>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray-800">How do I use this?</p>
              <p className="text-gray-600">Simply paste a Xiaohongshu video URL and click either "Download Video" or "Get Transcript"</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Is it free?</p>
              <p className="text-gray-600">Yes, completely free! No registration or payment required.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">What formats are supported?</p>
              <p className="text-gray-600">We support all Xiaohongshu video links including direct links and share links.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; 2024 XHS Video Downloader. For personal use only.</p>
        </div>
      </footer>
    </div>
  );
}
