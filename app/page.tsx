"use client";

import { useState, useEffect } from "react";
import { Globe } from "lucide-react";

type Language = "en" | "zh-TW" | "zh-CN";

const translations = {
  en: {
    title: "XHS Video Downloader",
    subtitle: "Download Xiaohongshu videos without watermark",
    placeholder: "Paste Xiaohongshu video link here...",
    download: "Download",
    transcript: "Get Transcript",
    language: "Language",
    downloading: "Downloading...",
    success: "Download started!",
    error: "Download failed",
    enterUrl: "Please enter a video URL",
  },
  "zh-TW": {
    title: "小紅書視頻下載器",
    subtitle: "下載小紅書視頻，無水印",
    placeholder: "粘貼小紅書視頻鏈接...",
    download: "下載",
    transcript: "獲取轉錄",
    language: "語言",
    downloading: "下載中...",
    success: "下載已開始！",
    error: "下載失敗",
    enterUrl: "請輸入視頻 URL",
  },
  "zh-CN": {
    title: "小红书视频下载器",
    subtitle: "下载小红书视频，无水印",
    placeholder: "粘贴小红书视频链接...",
    download: "下载",
    transcript: "获取转录",
    language: "语言",
    downloading: "下载中...",
    success: "下载已开始！",
    error: "下载失败",
    enterUrl: "请输入视频 URL",
  },
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const t = translations[language];

  const handleDownload = async () => {
    if (!url) {
      setMessage(t.enterUrl);
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (data.success && data.token) {
        const downloadUrl = `/api/download/${data.token}`;
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = `${data.metadata?.title || "video"}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setMessage(t.success);
        setUrl("");
      } else {
        setMessage(t.error + ": " + (data.error || "Unknown error"));
      }
    } catch (error) {
      setMessage(t.error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTranscript = async () => {
    if (!url) {
      setMessage(t.enterUrl);
      return;
    }
    // TODO: Implement transcript feature
    setMessage("Transcript feature coming soon!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-sm text-slate-600">{t.subtitle}</p>
          </div>
          <button
            onClick={() => {
              const langs: Language[] = ["en", "zh-TW", "zh-CN"];
              const currentIndex = langs.indexOf(language);
              setLanguage(langs[(currentIndex + 1) % langs.length]);
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <Globe size={18} />
            <span className="text-sm font-medium">
              {language === "en" ? "EN" : language === "zh-TW" ? "繁" : "简"}
            </span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Input Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={t.placeholder}
              className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              onKeyPress={(e) => e.key === "Enter" && handleDownload()}
            />
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleDownload}
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-medium rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
            >
              {isLoading ? t.downloading : t.download}
            </button>
            <button
              onClick={handleTranscript}
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50"
            >
              {t.transcript}
            </button>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`p-4 rounded-lg mb-6 ${
              message.includes(t.error)
                ? "bg-red-50 text-red-700 border border-red-200"
                : "bg-green-50 text-green-700 border border-green-200"
            }`}
          >
            {message}
          </div>
        )}

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: "⚡", title: "Fast", desc: "Download in seconds" },
            { icon: "🎬", title: "No Watermark", desc: "Clean video files" },
            { icon: "🌍", title: "Multi-language", desc: "Support 3 languages" },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-4 border border-slate-200 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">{feature.icon}</div>
              <h3 className="font-semibold text-slate-900">{feature.title}</h3>
              <p className="text-sm text-slate-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* AdSense Banner */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg border border-slate-200 p-4 text-center text-slate-400">
          {/* AdSense will be inserted here */}
          <div className="h-[90px] flex items-center justify-center">
            Ad Space
          </div>
        </div>
      </div>
    </div>
  );
}
