'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface VideoData {
  videoId: string;
  title: string;
  author: string;
  videoUrl: string;
  transcript?: string;
  duration: number;
  thumbnail: string;
  availableResolutions: string[];
}

export default function DownloadPage() {
  const params = useParams();
  const videoId = params.id as string;
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [selectedResolution, setSelectedResolution] = useState('720p');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'video' | 'transcript'>('video');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await fetch(`/api/video/${videoId}`);
        const data = await response.json();
        setVideoData(data);
        if (data.availableResolutions && data.availableResolutions.length > 0) {
          setSelectedResolution(data.availableResolutions[0]);
        }
      } catch (error) {
        console.error('Failed to fetch video data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [videoId]);

  const handleDownload = () => {
    if (!videoData) return;
    window.open(videoData.videoUrl, '_blank');
  };

  const handleCopyLink = () => {
    if (!videoData) return;
    navigator.clipboard.writeText(videoData.videoUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTranscriptDownload = () => {
    if (!videoData?.transcript) return;
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(videoData.transcript)
    );
    element.setAttribute('download', `${videoData.title}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading video...</p>
        </div>
      </div>
    );
  }

  if (!videoData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 text-xl">Failed to load video</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-yellow-400 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">XHS Video Downloader</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column: Video & Download Options */}
          <div className="md:col-span-2">
            {/* Video Preview */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
              <img
                src={videoData.thumbnail}
                alt={videoData.title}
                className="w-full h-96 object-cover bg-gray-200"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{videoData.title}</h2>
                <p className="text-gray-600 mb-4">By {videoData.author}</p>

                {/* Tabs */}
                <div className="flex gap-4 mb-6 border-b">
                  <button
                    onClick={() => setActiveTab('video')}
                    className={`pb-2 font-semibold transition ${
                      activeTab === 'video'
                        ? 'border-b-2 border-yellow-400 text-yellow-600'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    📥 Download Video
                  </button>
                  <button
                    onClick={() => setActiveTab('transcript')}
                    className={`pb-2 font-semibold transition ${
                      activeTab === 'transcript'
                        ? 'border-b-2 border-yellow-400 text-yellow-600'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    📝 Transcript
                  </button>
                </div>

                {/* Video Download Tab */}
                {activeTab === 'video' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Select Resolution:
                      </label>
                      <select
                        value={selectedResolution}
                        onChange={(e) => setSelectedResolution(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none"
                      >
                        {videoData.availableResolutions.map((res) => (
                          <option key={res} value={res}>
                            {res}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={handleDownload}
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 rounded-lg transition"
                    >
                      ⬇️ Download Video ({selectedResolution})
                    </button>

                    <button
                      onClick={handleCopyLink}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition"
                    >
                      {copied ? '✓ Copied!' : '🔗 Copy Link'}
                    </button>
                  </div>
                )}

                {/* Transcript Tab */}
                {activeTab === 'transcript' && (
                  <div className="space-y-4">
                    {videoData.transcript ? (
                      <>
                        <div className="bg-gray-100 rounded-lg p-4 max-h-96 overflow-y-auto">
                          <p className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">
                            {videoData.transcript}
                          </p>
                        </div>
                        <button
                          onClick={handleTranscriptDownload}
                          className="w-full bg-orange-400 hover:bg-orange-500 text-gray-800 font-bold py-3 rounded-lg transition"
                        >
                          ⬇️ Download Transcript
                        </button>
                      </>
                    ) : (
                      <p className="text-gray-600 text-center py-8">
                        Transcript not available for this video. Try downloading the video first.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: AI Features & Premium */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">✨ Features</h3>

              <div className="space-y-3 mb-6">
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="font-semibold text-gray-800">📋 Summary</p>
                  <p className="text-sm text-gray-600">Coming soon</p>
                </div>

                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <p className="font-semibold text-gray-800">🎯 Key Points</p>
                  <p className="text-sm text-gray-600">Coming soon</p>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="font-semibold text-gray-800">⏱️ Timestamps</p>
                  <p className="text-sm text-gray-600">Coming soon</p>
                </div>
              </div>

              {/* Share Section */}
              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-800 mb-3">Share</h4>
                <div className="space-y-2">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition text-sm">
                    Share on Facebook
                  </button>
                  <button className="w-full bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 rounded-lg transition text-sm">
                    Share on Twitter
                  </button>
                </div>
              </div>
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
