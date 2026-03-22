'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface VideoData {
  videoId: string;
  title: string;
  author: string;
  videoUrl: string;
  originalUrl?: string;
  transcript?: string;
  duration: number;
  thumbnail: string;
  availableResolutions?: string[];
}

interface ExtractedImages {
  images: Array<{ url: string; thumbnail: string; description?: string }>;
  title: string;
}

interface ExtractedTranscript {
  text: string;
  segments?: Array<{ start: number; end: number; text: string }>;
  wordCount: number;
}

const DEFAULT_RESOLUTIONS = ['1080p', '720p', '480p', '360p'];

export default function DownloadPage() {
  const params = useParams();
  const videoId = params.id as string;
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [selectedResolution, setSelectedResolution] = useState('720p');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'video' | 'transcript' | 'images'>('video');
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [extractedImages, setExtractedImages] = useState<ExtractedImages | null>(null);
  const [extractedTranscript, setExtractedTranscript] = useState<ExtractedTranscript | null>(null);
  const [extractingImages, setExtractingImages] = useState(false);
  const [extractingTranscript, setExtractingTranscript] = useState(false);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await fetch(`/api/video/${videoId}`);
        if (!response.ok) throw new Error('Failed to load video data');
        const data = await response.json();
        if (!data.availableResolutions || !Array.isArray(data.availableResolutions)) {
          data.availableResolutions = DEFAULT_RESOLUTIONS;
        }
        setVideoData(data);
        setSelectedResolution(data.availableResolutions[0] || '720p');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch video data');
      } finally {
        setLoading(false);
      }
    };
    fetchVideoData();
  }, [videoId]);

  const handleDownload = async () => {
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
      try {
        const response = await fetch(url.toString(), { mode: 'cors' });
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `${videoData.title || 'xhs-video'}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      } catch {
        const link = document.createElement('a');
        link.href = url.toString();
        link.download = `${videoData.title || 'xhs-video'}.mp4`;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      setTimeout(() => {
        setDownloading(false);
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3000);
      }, 1500);
    } catch {
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

  const handleExtractImages = async () => {
    if (!videoData?.originalUrl) return;
    setExtractingImages(true);
    try {
      const response = await fetch('/api/extract-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: videoData.originalUrl }),
      });
      const data = await response.json();
      if (data.success) {
        setExtractedImages({ images: data.images, title: data.title || videoData.title });
      } else {
        setError('No images found in this post');
      }
    } catch {
      setError('Failed to extract images');
    } finally {
      setExtractingImages(false);
    }
  };

  const handleExtractTranscript = async () => {
    if (!videoData?.originalUrl) return;
    setExtractingTranscript(true);
    try {
      const response = await fetch('/api/extract-transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: videoData.originalUrl }),
      });
      const data = await response.json();
      if (data.success && data.transcript) {
        setExtractedTranscript({
          text: data.transcript.text || data.transcript,
          segments: data.transcript.segments,
          wordCount: data.wordCount || 0,
        });
      } else {
        setError('No transcript available for this post');
      }
    } catch {
      setError('Failed to extract transcript');
    } finally {
      setExtractingTranscript(false);
    }
  };

  const handleDownloadImage = (imageUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadTranscript = () => {
    if (!extractedTranscript) return;
    const element = document.createElement('a');
    const content = typeof extractedTranscript.text === 'string'
      ? extractedTranscript.text
      : JSON.stringify(extractedTranscript, null, 2);
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `${videoData?.title || 'transcript'}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShareTwitter = () => {
    if (!videoData) return;
    const text = `Check out this XHS video: ${videoData.title}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`, '_blank', 'width=550,height=420');
  };

  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank', 'width=550,height=420');
  };

  const handleShareWhatsApp = () => {
    if (!videoData) return;
    const text = `Check out this XHS video: ${videoData.title} ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const formatDuration = (seconds: number) => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(160deg, #fff1f2 0%, #fff7ed 50%, #fef9c3 100%)' }}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Loading video...</p>
        </div>
      </div>
    );
  }

  if (error || !videoData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(160deg, #fff1f2 0%, #fff7ed 50%, #fef9c3 100%)' }}>
        <div className="card p-8 text-center max-w-md">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
          <p className="text-red-600 font-semibold mb-2">Unable to Load Video</p>
          <p className="text-gray-500 text-sm">{error || 'The video data could not be retrieved. Please try again.'}</p>
          <a href="/" className="btn-primary inline-flex mt-6 text-sm">Go to Homepage</a>
        </div>
      </div>
    );
  }

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
            <a href="/faq" className="text-gray-500 hover:text-gray-900 transition-colors">FAQ</a>
            <LanguageSwitcher />
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 section-container py-8">
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Left: video + tabs */}
          <div className="lg:col-span-2 space-y-5">

            {/* Video card */}
            <div className="card overflow-hidden animate-fade-in">
              <div className="relative bg-gray-900 aspect-video overflow-hidden">
                <img
                  src={videoData.thumbnail}
                  alt={videoData.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x300?text=XHS+Video'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                  <div className="text-white">
                    <p className="text-xs font-medium opacity-75 mb-0.5">Duration</p>
                    <p className="text-base font-bold">{formatDuration(videoData.duration)}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1.5 line-clamp-2 leading-snug">
                    {videoData.title}
                  </h2>
                  <p className="text-sm text-gray-500 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    {videoData.author}
                  </p>
                </div>

                {/* Stats bar */}
                <div className="grid grid-cols-3 divide-x divide-gray-100 border-y border-gray-100 py-3">
                  {[
                    { label: 'Quality', value: selectedResolution, color: 'text-pink-500' },
                    { label: 'Format',  value: 'MP4',              color: 'text-orange-500' },
                    { label: 'Duration',value: formatDuration(videoData.duration), color: 'text-yellow-600' },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="text-center px-3">
                      <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                      <p className={`text-sm font-bold ${color}`}>{value}</p>
                    </div>
                  ))}
                </div>

                {/* Quality selector */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Select Quality</label>
                  <div className="grid grid-cols-4 gap-2">
                    {(videoData.availableResolutions || DEFAULT_RESOLUTIONS).map((res) => (
                      <button
                        key={res}
                        onClick={() => setSelectedResolution(res)}
                        className={`py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                          selectedResolution === res
                            ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-button'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {res}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Download button */}
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="btn-primary w-full text-base"
                >
                  {downloading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                      Downloading...
                    </>
                  ) : downloadSuccess ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                      </svg>
                      Download Started!
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                      </svg>
                      Download Video ({selectedResolution})
                    </>
                  )}
                </button>

                {/* Copy link */}
                <button
                  onClick={handleCopyLink}
                  className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all ${
                    copied
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                  }`}
                >
                  {copied ? (
                    <span className="flex items-center justify-center gap-1.5">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Link Copied!
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                      </svg>
                      Copy Video Link
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="card overflow-hidden animate-fade-in-delay-1">
              <div className="flex border-b border-gray-100">
                {[
                  { id: 'video',     label: 'Info',       icon: (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    ) },
                  { id: 'transcript',label: 'Transcript', icon: (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                    ) },
                  { id: 'images',   label: 'Images',     icon: (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                    ) },
                ].map(({ id, label, icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id as typeof activeTab)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-3.5 text-sm font-semibold transition-all duration-200 border-b-2 ${
                      activeTab === id
                        ? 'border-pink-500 text-pink-600 bg-pink-50/60'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {icon}
                    {label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'video' && (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl p-5 border border-pink-100">
                      <h3 className="font-semibold text-gray-800 mb-3 text-sm">Download Instructions</h3>
                      <ol className="space-y-2 text-sm text-gray-600">
                        {['Select your preferred video quality above', 'Click the Download Video button', 'Your browser will start downloading the file', 'Save the file to your device'].map((step, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-pink-100 text-pink-600 text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 flex items-start gap-2.5">
                      <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                      </svg>
                      <p className="text-xs text-blue-700 leading-relaxed">
                        <strong>Tip:</strong> Higher resolutions provide better quality but take longer to download.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'transcript' && (
                  <div className="space-y-4">
                    {extractedTranscript ? (
                      <>
                        <div className="bg-gray-50 rounded-xl p-4 max-h-80 overflow-y-auto border border-gray-100 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                          {extractedTranscript.text}
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500 bg-blue-50 rounded-xl px-4 py-2.5">
                          <span>{extractedTranscript.wordCount} words</span>
                          <span>~{Math.ceil(extractedTranscript.wordCount / 150)} min read</span>
                        </div>
                        <button onClick={handleDownloadTranscript} className="btn-primary w-full text-sm py-3">
                          Download Transcript
                        </button>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-dashed border-purple-200 mb-4">
                          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
                            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                            </svg>
                          </div>
                          <p className="font-semibold text-gray-800 mb-1">Extract Transcript</p>
                          <p className="text-xs text-gray-500 mb-4">
                            Extract the full text content from this XHS post, including captions and descriptions.
                          </p>
                          <button
                            onClick={handleExtractTranscript}
                            disabled={extractingTranscript}
                            className="btn-primary text-sm py-2.5"
                          >
                            {extractingTranscript ? (
                              <><div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" /> Extracting...</>
                            ) : (
                              'Extract Transcript'
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'images' && (
                  <div className="space-y-4">
                    {extractedImages ? (
                      <>
                        <div className="bg-blue-50 rounded-xl px-4 py-2.5 border border-blue-100 text-xs text-blue-700">
                          Found {extractedImages.images.length} image(s) from this post
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {extractedImages.images.map((image, index) => (
                            <div key={index} className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100 hover:shadow-card transition-all">
                              <img
                                src={image.thumbnail}
                                alt={`Image ${index + 1}`}
                                className="w-full aspect-square object-cover"
                                loading="lazy"
                              />
                              <div className="p-2.5">
                                <button
                                  onClick={() => handleDownloadImage(image.url, `xhs-image-${index + 1}.jpg`)}
                                  className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white text-xs font-semibold py-2 rounded-lg transition-all shadow-sm"
                                >
                                  Download
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-400 text-center">Images are downloaded in their original quality</p>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border-2 border-dashed border-green-200 mb-4">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                          </div>
                          <p className="font-semibold text-gray-800 mb-1">Extract Images</p>
                          <p className="text-xs text-gray-500 mb-4">
                            Extract all images from this XHS post including product photos and lifestyle shots.
                          </p>
                          <button
                            onClick={handleExtractImages}
                            disabled={extractingImages}
                            className="btn-primary text-sm py-2.5"
                          >
                            {extractingImages ? (
                              <><div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" /> Extracting...</>
                            ) : (
                              'Extract Images'
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-yellow-700 bg-yellow-50 rounded-lg px-3 py-2 inline-block border border-yellow-100">
                          Image extraction works best for posts with multiple images.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24 space-y-5">

              {/* Tips */}
              <div>
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Quick Tips</h3>
                <div className="space-y-2.5 text-xs text-gray-500">
                  {[
                    'Select your preferred quality above',
                    'Click Download — file saves to your device',
                    "If download doesn't start, try Copy Link",
                  ].map((tip, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-pink-100 text-pink-500 text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                      {tip}
                    </div>
                  ))}
                </div>
              </div>

              <div className="divider-soft" />

              {/* Share */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-3">Share</h4>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Twitter', bg: 'bg-sky-50 hover:bg-sky-100', text: 'text-sky-600', icon: (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                      ) },
                    { label: 'Facebook', bg: 'bg-blue-50 hover:bg-blue-100', text: 'text-blue-600', icon: (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                      ) },
                    { label: 'WhatsApp', bg: 'bg-green-50 hover:bg-green-100', text: 'text-green-600', icon: (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      ) },
                  ].map(({ label, bg, text, icon }) => (
                    <button
                      key={label}
                      onClick={label === 'Twitter' ? handleShareTwitter : label === 'Facebook' ? handleShareFacebook : handleShareWhatsApp}
                      className={`flex flex-col items-center gap-1 p-3 rounded-xl ${bg} ${text} transition-colors font-medium text-xs`}
                    >
                      {icon}
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="divider-soft" />

              {/* Download another */}
              <a
                href="/"
                className="btn-primary w-full text-sm py-3 text-center"
              >
                Download Another Video
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-400">
          <div className="flex justify-center gap-6 mb-4">
            <a href="/" className="hover:text-pink-500 transition-colors">Home</a>
            <a href="/blog" className="hover:text-pink-500 transition-colors">Blog</a>
            <a href="/privacy" className="hover:text-pink-500 transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-pink-500 transition-colors">Terms</a>
          </div>
          <p>© 2026 XHS Video Downloader. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
