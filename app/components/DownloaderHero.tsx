'use client';

import { useState, useEffect, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Link, Download, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { I18nProvider, useI18n } from '../lib/i18n';
import { getUsageStatus, recordDownload, getMaxDailyDownloads, UsageStatus } from '@/lib/usage-limiter';

function DownloaderHeroContent() {
  const { t } = useI18n();
  const [url, setUrl] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [usage, setUsage] = useState<UsageStatus | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
    const xhsRegex = /https?:\/\/[^\s]*xiaohongshu\.com\/(?:explore|discovery\/item)\/[a-zA-Z0-9]+/;
    const match = input.match(xhsRegex);
    return match ? match[0] : input.trim();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawInput = e.target.value;
    setError('');
    setSuccess('');
    if (rawInput.includes('\n') || rawInput.includes(' ')) {
      setUrl(extractXHUrl(rawInput));
    } else {
      setUrl(rawInput);
    }
  };

  const handleDownload = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const cleanUrl = extractXHUrl(url);
    if (!cleanUrl) { setError(t.error.emptyUrl); return; }

    const currentUsage = getUsageStatus();
    if (!currentUsage.canDownload) {
      setError(currentUsage.isLimitReached
        ? t.error.limitReached
        : t.error.waitCooldown.replace('$0', String(currentUsage.cooldownRemaining)));
      return;
    }

    setUrl(cleanUrl);
    setIsDownloading(true);
    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: cleanUrl }),
      });
      const data = await response.json();
      if (data.success && data.token) {
        recordDownload();
        setUsage(getUsageStatus());
        setCooldown(15);
        setSuccess('Video ready — downloading now...');
        const downloadUrl = `/api/download/${data.token}`;
        const filename = `${data.metadata?.title || 'xhs-video'}.mp4`;
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
        setUrl('');
      } else {
        setError(t.error.downloadFailed + ': ' + (data.error || t.error.unknown));
      }
    } catch {
      setError(t.error.downloadFailed + ' — ' + t.error.retry);
    } finally {
      setIsDownloading(false);
    }
  };

  const canDownload = usage?.canDownload && !isDownloading && cooldown === 0;

  return (
    <section id="downloader" className="relative w-full pt-48 pb-32 overflow-hidden flex flex-col items-center justify-center min-h-[90vh]">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#F84F1D]/15 rounded-[100%] blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[300px] bg-[#FEB372]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#96A5A0]/30 bg-white/5 backdrop-blur-sm text-[#FECE9D] text-xs font-medium mb-8 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#F84F1D] animate-pulse" />
            Xiaohongshu Video Downloader
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            Download Without <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FEB372] via-[#F84F1D] to-[#FECE9D]">
              Watermarks
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[#BFC9C6] max-w-2xl mx-auto mb-12 font-light">
            Paste any Xiaohongshu video link and download it in seconds — free, no watermark, no registration.
          </p>
        </motion.div>

        {/* Usage counter */}
        {usage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-6 text-xs text-[#96A5A0] bg-white/5 border border-[#333] rounded-full px-4 py-2"
          >
            <span>{t.dailyLimit}:</span>
            <span className="font-bold text-[#FEB372] text-sm">{usage.downloadsRemaining}</span>
            <span>/ {getMaxDailyDownloads()}</span>
          </motion.div>
        )}

        {/* Download form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleDownload}
          className="relative max-w-2xl mx-auto group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#FEB372]/20 via-[#F84F1D]/20 to-[#96A5A0]/20 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />

          <div className="relative flex items-center bg-[#111111] border border-[#333] hover:border-[#96A5A0]/50 transition-colors rounded-full p-2 h-16 md:h-20 shadow-2xl backdrop-blur-xl">
            <div className="pl-6 pr-4 flex items-center text-[#BFC9C6]">
              <Link className="w-5 h-5 md:w-6 md:h-6" />
            </div>

            <input
              type="text"
              placeholder="Paste Xiaohongshu video link here..."
              value={url}
              onChange={handleInputChange}
              disabled={isDownloading || cooldown > 0}
              className="flex-1 bg-transparent border-none outline-none text-white text-sm md:text-base placeholder:text-[#96A5A0] h-full disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={!canDownload}
              className="h-full px-6 md:px-8 bg-[#F84F1D] hover:bg-[#F84F1D]/90 text-white font-medium rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] border border-[#F84F1D] transition-all flex items-center justify-center min-w-[120px] md:min-w-[160px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDownloading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span className="hidden md:inline mr-2">Download</span>
                  <Download className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </motion.form>

        {/* Cooldown display */}
        {cooldown > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 inline-flex items-center gap-2 text-sm text-[#96A5A0] bg-white/5 border border-[#333] rounded-full px-4 py-2"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            Next download in {cooldown}s
          </motion.div>
        )}

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 inline-flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </motion.div>
        )}

        {/* Success message */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 inline-flex items-center gap-2 text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2"
          >
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            {success}
          </motion.div>
        )}

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex items-center justify-center gap-6 text-sm text-[#96A5A0]"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" /> No Watermarks
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FEB372]" /> 100% Free
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F84F1D]" /> No Registration
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function DownloaderHero() {
  return (
    <I18nProvider>
      <DownloaderHeroContent />
    </I18nProvider>
  );
}
