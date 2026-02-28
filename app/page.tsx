"use client";

import { useState, useEffect, FormEvent } from "react";
import { I18nProvider, useI18n, LanguageSwitcher } from "./lib/i18n";
import { getUsageStatus, recordDownload, getMaxDailyDownloads, UsageStatus } from "@/lib/usage-limiter";
import { Sparkles, Zap, Shield, Download, Loader2, Check, BookOpen, Code, Globe } from "lucide-react";

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
      alert(currentUsage.isLimitReached ? t.error.limitReached : t.error.waitCooldown.replace('$0', String(currentUsage.cooldownRemaining)));
      return;
    }
    
    setUrl(cleanUrl);
    setIsDownloading(true);
    try {
      const response = await fetch('/api/download', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url }) });
      const data = await response.json();
      if (data.success && data.videoUrl) {
        recordDownload();
        setUsage(getUsageStatus());
        setCooldown(15);
        const link = document.createElement('a');
        link.href = data.videoUrl;
        link.download = `${data.title || 'xhs-video'}.mp4`;
        link.target = '_blank';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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

  const canDownload = usage?.canDownload && !isDownloading && cooldown === 0;

  return (
    <>
      <main className="max-w-4xl mx-auto px-4 pt-8 sm:pt-12 pb-16">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-4">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>2025 最新版</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 px-2"> {t.title} </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto px-2"> {t.subtitle} </p>
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
              placeholder="粘貼小紅書連結（自動提取）..."
              disabled={isDownloading || cooldown > 0}
              className="w-full px-4 py-4 text-base sm:text-lg border-2 border-gray-200 rounded-xl focus:border-pink-500 transition outline-none disabled:bg-gray-50"
            />

            {cooldown > 0 && (
              <div className="bg-pink-50 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-pink-600 mb-1"> {cooldown} </div>
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

          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-4 text-[10px] sm:text-xs text-gray-400">
            <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-green-500" /> SSL 加密</span>
            <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-yellow-500" /> 無限免費</span>
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

        {/* SEO Content Section - 500+ words */}
        <div className="bg-gradient-to-br from-gray-50 to-pink-50 rounded-2xl p-6 sm:p-10 mb-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
              關於小紅書媒體存檔工具
            </h2>
            
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-5 h-5 text-pink-500" />
                  <h3 className="text-xl font-bold text-gray-900">什麼是媒體存檔工具？</h3>
                </div>
                <p className="leading-relaxed">
                  XHS Downloader 是一個專為個人學習和研究目的設計的社交媒體內容存檔工具。我們的平台允許用戶安全地保存來自小紅書（Xiaohongshu）的視頻內容，用於離線查看、學習分析和個人收藏。這個工具特別適合內容創作者、研究人員、教育工作者和希望建立個人媒體庫的用戶。
                </p>
                <p className="leading-relaxed mt-3">
                  我們的服務完全基於網頁技術，無需安裝任何軟件或瀏覽器擴展。只需複製小紅書視頻的分享鏈接，粘貼到我們的輸入框中，系統會自動處理並提供高質量的視頻文件供您保存。整個過程簡單、快速且完全免費。
                </p>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Code className="w-5 h-5 text-pink-500" />
                  <h3 className="text-xl font-bold text-gray-900">技術原理與工作流程</h3>
                </div>
                <p className="leading-relaxed">
                  我們的系統採用先進的 Web 技術棧構建，包括 Next.js 16、React 19 和 TypeScript。當您提交一個小紅書鏈接時，我們的後端服務器會：
                </p>
                <ol className="list-decimal list-inside space-y-2 ml-4 mt-3">
                  <li>驗證鏈接的有效性和格式</li>
                  <li>通過安全的 API 請求獲取視頻元數據</li>
                  <li>提取視頻的原始媒體流地址</li>
                  <li>處理並優化視頻文件以確保最佳質量</li>
                  <li>通過加密的 HTTPS 連接將文件傳輸到您的設備</li>
                </ol>
                <p className="leading-relaxed mt-3">
                  整個過程通常在 5-15 秒內完成，具體時間取決於視頻大小和您的網絡速度。我們的服務器部署在全球多個地區，確保無論您身在何處都能獲得快速穩定的服務。
                </p>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-5 h-5 text-pink-500" />
                  <h3 className="text-xl font-bold text-gray-900">支持的格式與質量選項</h3>
                </div>
                <p className="leading-relaxed">
                  我們的工具支持小紅書平台上的所有視頻格式，包括標準視頻、短視頻和直播回放。系統會自動檢測可用的最高質量版本，通常提供以下選項：
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  <li><strong>1080p Full HD：</strong>適合大屏幕觀看和專業用途</li>
                  <li><strong>720p HD：</strong>平衡質量與文件大小的理想選擇</li>
                  <li><strong>480p SD：</strong>適合移動設備和節省存儲空間</li>
                  <li><strong>360p：</strong>快速預覽和低帶寬環境</li>
                </ul>
                <p className="leading-relaxed mt-3">
                  所有視頻都以 MP4 格式提供，這是最廣泛支持的視頻格式，可在幾乎所有設備和播放器上流暢播放。
                </p>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-pink-500" />
                  <h3 className="text-xl font-bold text-gray-900">隱私與安全保障</h3>
                </div>
                <p className="leading-relaxed">
                  您的隱私是我們的首要關注。我們的服務遵循以下原則：
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  <li>不收集或存儲任何個人身份信息</li>
                  <li>不記錄您訪問的視頻鏈接或內容</li>
                  <li>所有通信通過 SSL/TLS 加密保護</li>
                  <li>視頻處理完成後立即從服務器刪除</li>
                  <li>不使用追蹤 Cookie 或第三方分析工具（除了基本的 Google Analytics）</li>
                </ul>
                <p className="leading-relaxed mt-3">
                  我們建議用戶僅將此工具用於個人學習、研究和合法的內容存檔目的。請尊重原創作者的版權，不要將保存的內容用於商業用途或未經授權的再分發。
                </p>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-pink-500" />
                  <h3 className="text-xl font-bold text-gray-900">使用建議與最佳實踐</h3>
                </div>
                <p className="leading-relaxed">
                  為了獲得最佳體驗，我們建議：
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  <li>使用穩定的網絡連接以確保下載不中斷</li>
                  <li>在移動設備上使用時，確保有足夠的存儲空間</li>
                  <li>遵守每日下載限制以確保服務對所有用戶公平可用</li>
                  <li>定期清理下載文件夾以管理存儲空間</li>
                  <li>如遇到問題，請嘗試刷新頁面或使用不同的瀏覽器</li>
                </ul>
              </section>

              <div className="mt-8 p-4 bg-pink-50 rounded-xl border border-pink-200">
                <p className="text-sm text-gray-600 text-center">
                  <strong>法律聲明：</strong>本工具僅供個人學習和研究使用。用戶有責任確保其使用方式符合適用的法律法規和平台服務條款。我們不對用戶的使用行為承擔責任。
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default function Home() {
  return (
    <I18nProvider>
      <HomeContent />
    </I18nProvider>
  );
}
