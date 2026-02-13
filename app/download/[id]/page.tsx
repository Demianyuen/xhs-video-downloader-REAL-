'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { AdSenseDisplay } from '@/app/components/ads/AdSenseDisplay';
import { AffiliateLinks } from '@/app/components/ads/AffiliateLinks';
import { AdContainer } from '@/app/components/ads/AdContainer';
import { useAdSense } from '@/lib/hooks/useAdSense';

interface VideoData {
  videoId: string;
  title: string;
  author: string;
  videoUrl: string;
  transcript?: string;
  duration: number;
  thumbnail: string;
  availableResolutions?: string[];
}

const DEFAULT_RESOLUTIONS = ['1080p', '720p', '480p', '360p'];

export default function DownloadPage() {
  const params = useParams();
  const { showAds } = useAdSense();
  const videoId = params.id as string;
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [selectedResolution, setSelectedResolution] = useState('720p');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'video' | 'transcript'>('video');
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await fetch(`/api/video/${videoId}`);
        if (!response.ok) {
          throw new Error('Failed to load video data');
        }
        const data = await response.json();

        // Ensure availableResolutions has a default value
        if (!data.availableResolutions || !Array.isArray(data.availableResolutions)) {
          data.availableResolutions = DEFAULT_RESOLUTIONS;
        }

        setVideoData(data);
        setSelectedResolution(data.availableResolutions[0] || '720p');
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch video data';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [videoId]);

  const handleDownload = () => {
    if (!videoData) return;
    setDownloading(true);
    setDownloadSuccess(false);

    try {
      const url = new URL(videoData.videoUrl);
      if (!['http:', 'https:'].includes(url.protocol)) {
        setError('Invalid video URL');
        setDownloading(false);
        return;
      }

      window.open(url.toString(), '_blank', 'noopener,noreferrer');

      // Show success message after 1.5 seconds
      setTimeout(() => {
        setDownloading(false);
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3000);
      }, 1500);
    } catch (err) {
      setError('Failed to download video');
      setDownloading(false);
    }
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

  const handleShareTwitter = () => {
    if (!videoData) return;
    const text = `Check out this XHS video: ${videoData.title}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'width=550,height=420');
  };

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'width=550,height=420');
  };

  const handleShareWhatsApp = () => {
    if (!videoData) return;
    const text = `Check out this XHS video: ${videoData.title} ${window.location.href}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const formatDuration = (seconds: number) => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-orange-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-200 border-t-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading video...</p>
        </div>
      </div>
    );
  }

  if (error || !videoData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-orange-50">
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg max-w-md">
          <p className="text-red-500 text-lg font-semibold mb-2">Unable to Load Video</p>
          <p className="text-gray-600 text-sm">{error || 'The video data could not be retrieved. Please try again.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎬</span>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
              XHS Video Downloader
            </h1>
          </div>
          <a href="/" className="text-gray-600 hover:text-gray-800 font-medium">
            ← Back
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Video Preview & Download */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Preview Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow animate-fade-in">
              <div className="relative bg-gray-900 aspect-video overflow-hidden">
                <img
                  src={videoData.thumbnail}
                  alt={videoData.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x300?text=XHS+Video';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4">
                  <div className="text-white">
                    <p className="text-sm font-medium opacity-90">Duration</p>
                    <p className="text-lg font-bold">{formatDuration(videoData.duration)}</p>
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-6 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {videoData.title}
                  </h2>
                  <p className="text-gray-600 flex items-center gap-2">
                    <span>👤</span>
                    <span className="font-medium">{videoData.author}</span>
                  </p>
                </div>

                {/* Video Stats */}
                <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Quality</p>
                    <p className="text-lg font-bold text-pink-500">1080p</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Format</p>
                    <p className="text-lg font-bold text-orange-500">MP4</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Size</p>
                    <p className="text-lg font-bold text-yellow-500">~50MB</p>
                  </div>
                </div>

                {/* Download Section */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Select Quality:
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {(videoData.availableResolutions || DEFAULT_RESOLUTIONS).map((res, idx) => (
                        <button
                          key={res}
                          onClick={() => setSelectedResolution(res)}
                          className={`py-3 px-4 rounded-lg font-semibold transition-all hover-scale ${
                            selectedResolution === res
                              ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg animate-scale-in'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                          style={{animationDelay: `${idx * 0.05}s`}}
                        >
                          {res}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {downloading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        Downloading...
                      </>
                    ) : downloadSuccess ? (
                      <>
                        ✅ Download Started!
                      </>
                    ) : (
                      <>
                        ⬇️ Download Video ({selectedResolution})
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleCopyLink}
                    className={`w-full py-3 rounded-xl font-semibold transition-all ${
                      copied
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                  >
                    {copied ? '✓ Link Copied!' : '🔗 Copy Video Link'}
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs Section */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-fade-in-delay-1">
              {/* Tab Buttons */}
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('video')}
                  className={`flex-1 py-4 px-6 font-semibold transition-all ${
                    activeTab === 'video'
                      ? 'bg-gradient-to-r from-pink-50 to-orange-50 border-b-2 border-pink-500 text-pink-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  📥 Download Info
                </button>
                <button
                  onClick={() => setActiveTab('transcript')}
                  className={`flex-1 py-4 px-6 font-semibold transition-all ${
                    activeTab === 'transcript'
                      ? 'bg-gradient-to-r from-pink-50 to-orange-50 border-b-2 border-pink-500 text-pink-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  📝 Transcript
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'video' && (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-lg p-4 border border-pink-200">
                      <h3 className="font-semibold text-gray-800 mb-3">Download Instructions:</h3>
                      <ol className="space-y-2 text-sm text-gray-700">
                        <li>1. Select your preferred video quality above</li>
                        <li>2. Click the &quot;Download Video&quot; button</li>
                        <li>3. Your browser will start downloading the file</li>
                        <li>4. Save the file to your device</li>
                      </ol>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <p className="text-sm text-blue-800">
                        💡 <strong>Tip:</strong> Higher resolutions provide better quality but take longer to download.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'transcript' && (
                  <div className="space-y-4">
                    {videoData.transcript ? (
                      <>
                        <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto border border-gray-200">
                          <p className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed font-mono">
                            {videoData.transcript}
                          </p>
                        </div>
                        <button
                          onClick={handleTranscriptDownload}
                          className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-xl"
                        >
                          ⬇️ Download Transcript
                        </button>
                      </>
                    ) : (
                      <div className="text-center py-12 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg border-2 border-dashed border-orange-200">
                        <p className="text-gray-600 text-lg mb-2">📝 Transcript Coming Soon</p>
                        <p className="text-gray-500 text-sm mb-4">
                          AI-powered transcription is being developed. Download the video first!
                        </p>
                        <p className="text-xs text-gray-400">
                          Expected: Q2 2026
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Features & Info */}
          <div className="lg:col-span-1">
            {/* Features Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4 space-y-6 animate-slide-in-right">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>✨</span> Features
                </h3>
                <div className="space-y-3">
                  <div className="p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg border border-pink-200 hover:shadow-md transition-shadow hover-lift animate-fade-in-delay-1">
                    <p className="font-semibold text-gray-800 mb-1">📋 Summary</p>
                    <p className="text-xs text-gray-600">AI-powered video summary</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200 hover:shadow-md transition-shadow hover-lift animate-fade-in-delay-2">
                    <p className="font-semibold text-gray-800 mb-1">🎯 Key Points</p>
                    <p className="text-xs text-gray-600">Extract main topics</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200 hover:shadow-md transition-shadow hover-lift animate-fade-in-delay-3">
                    <p className="font-semibold text-gray-800 mb-1">⏱️ Timestamps</p>
                    <p className="text-xs text-gray-600">Jump to sections</p>
                  </div>
                </div>
              </div>

              {/* Share Section */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span>🔗</span> Share
                </h4>
                <div className="space-y-2">
                  <button onClick={handleShareFacebook} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all text-sm hover-scale animate-fade-in-delay-1">
                    Share on Facebook
                  </button>
                  <button onClick={handleShareTwitter} className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition-all text-sm hover-scale animate-fade-in-delay-2">
                    Share on Twitter
                  </button>
                  <button onClick={handleShareWhatsApp} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-all text-sm hover-scale animate-fade-in-delay-3">
                    Share on WhatsApp
                  </button>
                </div>
              </div>

              {/* Info Section */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span>ℹ️</span> Info
                </h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-semibold">Video ID:</span>
                    <br />
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded break-all">
                      {videoData.videoId}
                    </code>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Ad Section - After Main Content */}
      {showAds && (
        <>
          <AdContainer position="middle">
            <AdSenseDisplay slotId="results_banner" format="horizontal" />
          </AdContainer>
          <AdContainer position="middle">
            <AffiliateLinks />
          </AdContainer>
        </>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-600 text-sm">
          <p>
            Made with ❤️ for XHS lovers •
            <a href="/privacy" className="text-pink-500 hover:text-pink-600 ml-1">Privacy</a> •
            <a href="/terms" className="text-pink-500 hover:text-pink-600 ml-1">Terms</a>
          </p>
          <p className="mt-2 text-xs text-gray-500">
            For personal use only. Please respect copyright and creators&apos; rights.
          </p>
        </div>
      </footer>
    </div>
  );
}
