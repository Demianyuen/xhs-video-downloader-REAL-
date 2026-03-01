"use client";

import { useState, useEffect, FormEvent } from "react";
import { I18nProvider, useI18n, LanguageSwitcher } from "./lib/i18n";
import { getUsageStatus, recordDownload, getMaxDailyDownloads, UsageStatus } from "@/lib/usage-limiter";
import { Sparkles, Zap, Shield, Download, Loader2 } from "lucide-react";

function HomeContent() {
  const { t } = useI18n();
  const [url, setUrl] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [usage, setUsage] = useState<UsageStatus | null>(null);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    setUsage(getUsageStatus());
  }, []);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => {
        setCooldown((prev) => prev - 1);
        if (cooldown === 1) {
          setUsage(getUsageStatus());
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleDownload = async (e: FormEvent) => {
    e.preventDefault();
    if (!url) {
      alert(t.error.emptyUrl);
      return;
    }

    const currentUsage = getUsageStatus();
    if (!currentUsage.canDownload) {
      if (currentUsage.isLimitReached) {
        alert(t.error.limitReached);
      } else {
        alert(t.error.waitCooldown.replace('$0', String(currentUsage.cooldownRemaining)));
      }
      return;
    }

    setIsDownloading(true);
    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      if (data.success && data.token) {
        recordDownload();
        const newUsage = getUsageStatus();
        setUsage(newUsage);
        setCooldown(15);

        // Force download as blob
        const downloadUrl = `/api/download/${data.token}`;
        const filename = `${data.metadata?.title || 'video'}.mp4`;
        
        const downloadResponse = await fetch(downloadUrl);
        if (!downloadResponse.ok) throw new Error('Download failed');
        
        const blob = await downloadResponse.blob();
        const blobUrl = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
        setUrl("");
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

  const canDownload = usage?.canDownload && !isDownloading && cooldown === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50">
      {/* Header with Language Switcher */}
      <header className="w-full bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">小</span>
            </div>
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-red-500">
              XHS Downloader
            </span>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-4 pt-16 pb-24">
        {/* Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>2025 最新版</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Download Box - 小紅書風格 */}
        <div className="bg-white rounded-3xl shadow-xl shadow-pink-100/50 p-6 md:p-10 border border-pink-100 mb-12">
          {/* Usage Status */}
          {usage && (
            <div className="flex items-center justify-center gap-2 mb-6 text-sm text-gray-500 bg-gray-50 rounded-full py-2 px-4">
              <span>{t.dailyLimit}:</span>
              <span className="font-bold text-pink-600 text-lg">{usage.downloadsRemaining}</span>
              <span className="text-gray-400">/ {getMaxDailyDownloads()}</span>
            </div>
          )}

          {/* Input Form */}
          <form onSubmit={handleDownload} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={t.placeholder}
                disabled={isDownloading || cooldown > 0}
                className="w-full px-6 py-5 text-lg border-2 border-gray-200 rounded-2xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all outline-none disabled:bg-gray-50 disabled:text-gray-400"
              />
            </div>

            {/* Cooldown Display */}
            {cooldown > 0 && (
              <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-xl p-6 text-center">
                <div className="text-5xl font-bold text-pink-600 mb-2 font-mono">
                  {cooldown}
                </div>
                <p className="text-gray-600">{t.cooldown}</p>
              </div>
            )}

            {/* Download Button */}
            <button
              type="submit"
              disabled={!canDownload}
              className={`w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all transform ${
                canDownload
                  ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white hover:shadow-lg hover:shadow-pink-200 hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isDownloading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t.downloading}
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  {t.downloadBtn}
                </span>
              )}
            </button>
          </form>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-green-500" /> SSL 加密傳輸
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-yellow-500" /> 無限免費
            </span>
            <span>無需註冊 · 無需登入</span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Sparkles, ...t.features.free, color: 'text-pink-600', bg: 'bg-pink-50' },
            { icon: