"use client";

import { useState, useEffect, FormEvent } from "react";
import { useI18n } from "./lib/i18n";
import { getUsageStatus, recordDownload, getMaxDailyDownloads, UsageStatus } from "@/lib/usage-limiter";
import { Sparkles, Zap, Shield, Download, Loader2, BookOpen, Code, Globe, FileText, Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import AdSense from "@/components/AdSense";

function HomeContent() {
  const { t } = useI18n();
  const [url, setUrl] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [usage, setUsage] = useState<UsageStatus | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const [videoData, setVideoData] = useState<{ downloadUrl: string; title: string; transcript?: string } | null>(null);
  const [isDownloadingFile, setIsDownloadingFile] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [transcriptCopied, setTranscriptCopied] = useState(false);

  useEffect(() => {
    setUsage(getUsageStatus());
  }, []);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => {
        setCooldown((prev) => prev - 1);
        if (cooldown === 1) setUsage(getUsageStatus());
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const extractXHUrl = (input: string): string => {
    // Preserve xsec_token and xsec_source query params — required for XHS API auth
    const xhsRegex = /https?:\/\/[^\s]*xiaohongshu\.com\/(?:explore|discovery\/item)\/[a-zA-Z0-9]+(?:\?[^\s]*)?/;
    const match = input.match(xhsRegex);
    return match ? match[0] : input.trim();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawInput = e.target.value;
    if (rawInput.includes('\n') || rawInput.includes(' ')) {
      const extracted = extractXHUrl(rawInput);
      setUrl(extracted);
    } else {
      setUrl(rawInput);
    }
  };

  const handleDownload = async (e: FormEvent) => {
    e.preventDefault();
    const cleanUrl = extractXHUrl(url);
    if (!cleanUrl) { alert(t.error.emptyUrl); return; }

    const currentUsage = getUsageStatus();
    if (!currentUsage.canDownload) {
      alert(currentUsage.isLimitReached
        ? t.error.limitReached
        : t.error.waitCooldown.replace('$0', String(currentUsage.cooldownRemaining)));
      return;
    }

    setUrl(cleanUrl);
    setIsDownloading(true);
    setVideoData(null);
    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: cleanUrl }),
      });
      const data = await response.json();
      if (data.success && data.downloadUrl) {
        recordDownload();
        setUsage(getUsageStatus());
        setCooldown(15);
        setVideoData({ downloadUrl: data.downloadUrl, title: data.title || 'xhs-video', transcript: data.transcript || '' });
        setUrl('');
      } else {
        alert(t.error.downloadFailed + ': ' + (data.error || t.error.unknown));
      }
    } catch (error) {
      console.error('Download error:', error);
      alert(t.error.downloadFailed + ' - ' + t.error.retry);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleFileDownload = async () => {
    if (!videoData) return;
    setIsDownloadingFile(true);
    try {
      // Proxy through our API to bypass CORS on XHS CDN URLs
      const proxyUrl = `/api/proxy?url=${encodeURIComponent(videoData.downloadUrl)}&filename=${encodeURIComponent(videoData.title)}`;
      const res = await fetch(proxyUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = objectUrl;
      a.download = `${videoData.title}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(objectUrl);
    } catch {
      alert(t.error.downloadFailed);
    } finally {
      setIsDownloadingFile(false);
    }
  };

  const canDownload = usage?.canDownload && !isDownloading && cooldown === 0;

  return (
    <>
      <main className="max-w-4xl mx-auto px-4 pt-8 sm:pt-12 pb-16">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-4">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{t.badge}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 px-2">{t.title}</h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto px-2">{t.subtitle}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 border border-pink-100 mb-10">
          {usage && (
            <div className="flex items-center justify-center gap-1 sm:gap-2 mb-4 text-xs sm:text-sm text-gray-500 bg-gray-50 rounded-full py-2 px-3">
              <span>{t.dailyLimit}:</span>
              <span className="font-bold text-pink-600 text-base sm:text-lg">{usage.downloadsRemaining}</span>
              <span className="text-gray-400">/ {getMaxDailyDownloads()}</span>
            </div>
          )}

          <form onSubmit={handleDownload} className="space-y-3">
            <input
              type="text"
              value={url}
              onChange={handleInputChange}
              placeholder={t.input.placeholder}
              disabled={isDownloading || cooldown > 0}
              className="w-full px-4 py-4 text-base sm:text-lg border-2 border-gray-200 rounded-xl focus:border-pink-500 transition outline-none disabled:bg-gray-50"
            />
            <p className="text-xs text-gray-400 px-1">
              {t.input.hint}
            </p>

            {cooldown > 0 && (
              <div className="bg-pink-50 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-pink-600 mb-1">{cooldown}</div>
                <p className="text-sm text-gray-600">{t.cooldown}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={!canDownload}
              className={`w-full py-4 px-6 rounded-xl font-bold text-base transition min-h-[52px] ${
                canDownload ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white' : 'bg-gray-200 text-gray-400'
              }`}
            >
              {isDownloading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" /> {t.downloading}
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" /> {t.downloadBtn}
                </span>
              )}
            </button>
          </form>

          {videoData && (
            <div className="mt-6 bg-gray-50 rounded-2xl p-4 border border-pink-100">
              <h3 className="font-semibold text-gray-800 mb-3 text-sm">{t.preview.title}</h3>
              <video
                src={videoData.downloadUrl}
                controls
                className="w-full rounded-xl mb-3 max-h-64 bg-black"
              />
              <p className="text-sm text-gray-600 mb-3 truncate">{videoData.title}</p>
              <button
                onClick={handleFileDownload}
                disabled={isDownloadingFile}
                className="w-full py-3 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-pink-500 to-red-500 text-white disabled:opacity-50 flex items-center justify-center gap-2 mb-3"
              >
                <Download className="w-4 h-4" />
                {isDownloadingFile ? t.preview.downloading : t.preview.downloadBtn}
              </button>

              {videoData.transcript && (
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setShowTranscript(v => !v)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 transition text-sm font-medium text-gray-700"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-pink-500" />
                      {'字幕 / Transcript'}
                    </span>
                    {showTranscript ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {showTranscript && (
                    <div className="bg-gray-50 px-4 pb-4 pt-2">
                      <div className="flex justify-end mb-2">
                        <button
                          onClick={async () => {
                            await navigator.clipboard.writeText(videoData.transcript!);
                            setTranscriptCopied(true);
                            setTimeout(() => setTranscriptCopied(false), 2000);
                          }}
                          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-pink-100 text-pink-700 hover:bg-pink-200 transition"
                        >
                          {transcriptCopied ? <><Check className="w-3 h-3" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy</>}
                        </button>
                      </div>
                      <pre className="whitespace-pre-wrap text-xs text-gray-700 font-sans leading-relaxed max-h-48 overflow-y-auto">
                        {videoData.transcript}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-4 text-[10px] sm:text-xs text-gray-400">
            <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-green-500" /> {t.trust.ssl}</span>
            <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-yellow-500" /> {t.trust.free}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mb-12">
          {[
            { icon: Sparkles, title: t.features.free.title, desc: t.features.free.desc },
            { icon: Zap, title: t.features.fast.title, desc: t.features.fast.desc },
            { icon: Shield, title: t.features.safe.title, desc: t.features.safe.desc },
          ].map((f, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-gray-100">
              <f.icon className="w-6 h-6 text-pink-500 mx-auto mb-2" />
              <h3 className="font-bold text-gray-800 mb-1 text-sm">{f.title}</h3>
              <p className="text-xs text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-pink-50 rounded-2xl p-6 sm:p-10 mb-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
              {t.seo.heading}
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-5 h-5 text-pink-500" />
                  <h3 className="text-xl font-bold text-gray-900">{t.seo.whatIsTitle}</h3>
                </div>
                <p className="leading-relaxed">{t.seo.whatIsP1}</p>
                <p className="leading-relaxed mt-3">{t.seo.whatIsP2}</p>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Code className="w-5 h-5 text-pink-500" />
                  <h3 className="text-xl font-bold text-gray-900">{t.seo.techTitle}</h3>
                </div>
                <p className="leading-relaxed">{t.seo.techIntro}</p>
                <ol className="list-decimal list-inside space-y-2 ml-4 mt-3">
                  {t.seo.techSteps.map((step, i) => <li key={i}>{step}</li>)}
                </ol>
                <p className="leading-relaxed mt-3">{t.seo.techOutro}</p>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-5 h-5 text-pink-500" />
                  <h3 className="text-xl font-bold text-gray-900">{t.seo.formatsTitle}</h3>
                </div>
                <p className="leading-relaxed">{t.seo.formatsIntro}</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  {t.seo.formatsList.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
                <p className="leading-relaxed mt-3">{t.seo.formatsOutro}</p>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-pink-500" />
                  <h3 className="text-xl font-bold text-gray-900">{t.seo.privacyTitle}</h3>
                </div>
                <p className="leading-relaxed">{t.seo.privacyIntro}</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  {t.seo.privacyList.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
                <p className="leading-relaxed mt-3">{t.seo.privacyOutro}</p>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-pink-500" />
                  <h3 className="text-xl font-bold text-gray-900">{t.seo.tipsTitle}</h3>
                </div>
                <p className="leading-relaxed">{t.seo.tipsIntro}</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  {t.seo.tipsList.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </section>

              <div className="mt-8 p-4 bg-pink-50 rounded-xl border border-pink-200">
                <p className="text-sm text-gray-600 text-center">
                  {t.seo.legalNotice}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* AdSense Ad Placement - Top Banner */}
        <div className="mt-8 max-w-4xl mx-auto px-4">
          <div className="bg-gray-50 rounded-xl p-4 border border-pink-100">
            <AdSense
              adSlot="YOUR_AD_SLOT_ID_1"
              adFormat="horizontal"
              style={{ display: 'block', minHeight: '90px' }}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default function Home() {
  return <HomeContent />;
}
