"use client";

import { useState } from "react";
import { PostAnalysis } from "@/lib/post-analyzer";
import { saveAnalysisToHistory } from "@/lib/analysis-history";

export default function AnalyzePage() {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<PostAnalysis | null>(null);
  const [error, setError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleAnalyze = async () => {
    if (!url) {
      setError("請輸入小紅書鏈接");
      return;
    }

    setIsAnalyzing(true);
    setError("");
    setAnalysis(null);
    setSaveSuccess(false);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (data.success) {
        setAnalysis(data.data);
        // Auto-save to history
        try {
          saveAnalysisToHistory(data.data);
          setSaveSuccess(true);
        } catch (err) {
          console.error("Failed to save to history:", err);
        }
      } else {
        setError(data.error || "分析失敗");
      }
    } catch (err) {
      setError("網絡錯誤，請稍後重試");
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getTrendColor = (score: number) => {
    if (score >= 70) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getMonetizationColor = (potential: string) => {
    if (potential === "high") return "bg-green-100 text-green-800";
    if (potential === "medium") return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getSentimentEmoji = (sentiment: string) => {
    if (sentiment === "positive") return "😊";
    if (sentiment === "negative") return "😞";
    return "😐";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">小紅書帖子分析</h1>
              <p className="text-gray-500 mt-1">深度分析帖子熱度、互動和變現潛力</p>
            </div>
            <div className="flex gap-3">
              <a
                href="/history"
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
              >
                查看歷史
              </a>
              <a
                href="/"
                className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
              >
                返回下載
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">輸入帖子鏈接</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="粘貼小紅書帖子鏈接..."
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              onKeyPress={(e) => e.key === "Enter" && !isAnalyzing && handleAnalyze()}
              disabled={isAnalyzing}
            />
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className={`px-8 py-3 rounded-lg font-semibold text-white transition ${
                isAnalyzing
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isAnalyzing ? "分析中..." : "開始分析"}
            </button>
          </div>
          {error && (
            <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg">
              {error}
            </div>
          )}
          {saveSuccess && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
              ✓ 分析結果已保存到歷史記錄
            </div>
          )}
        </div>

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-6">
            {/* Header Info */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm text-gray-500 uppercase tracking-wide">帖子標題</h3>
                  <p className="text-xl font-semibold text-gray-800 mt-2">{analysis.title}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 uppercase tracking-wide">作者</h3>
                  <p className="text-xl font-semibold text-gray-800 mt-2">{analysis.author}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 uppercase tracking-wide">分類</h3>
                  <p className="text-xl font-semibold text-blue-600 mt-2">{analysis.category}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 uppercase tracking-wide">情感傾向</h3>
                  <p className="text-xl font-semibold mt-2">
                    {getSentimentEmoji(analysis.sentiment)} {analysis.sentiment}
                  </p>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow p-6">
                <div className="text-gray-500 text-sm uppercase tracking-wide">點贊</div>
                <div className="text-3xl font-bold text-pink-600 mt-2">
                  {analysis.likes.toLocaleString()}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow p-6">
                <div className="text-gray-500 text-sm uppercase tracking-wide">評論</div>
                <div className="text-3xl font-bold text-blue-600 mt-2">
                  {analysis.comments.toLocaleString()}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow p-6">
                <div className="text-gray-500 text-sm uppercase tracking-wide">分享</div>
                <div className="text-3xl font-bold text-green-600 mt-2">
                  {analysis.shares.toLocaleString()}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow p-6">
                <div className="text-gray-500 text-sm uppercase tracking-wide">互動率</div>
                <div className="text-3xl font-bold text-purple-600 mt-2">
                  {analysis.engagement_rate.toFixed(2)}%
                </div>
              </div>
            </div>

            {/* Trend Score & Monetization */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">熱度評分</h3>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className={`h-4 rounded-full transition-all ${getTrendColor(
                          analysis.trend_score
                        ).replace("text-", "bg-")}`}
                        style={{ width: `${analysis.trend_score}%` }}
                      ></div>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">
                      {analysis.trend_score >= 70
                        ? "🔥 非常熱門"
                        : analysis.trend_score >= 50
                        ? "📈 中等熱度"
                        : "📉 熱度一般"}
                    </p>
                  </div>
                  <div className={`text-4xl font-bold ml-6 ${getTrendColor(analysis.trend_score)}`}>
                    {analysis.trend_score}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">變現潛力</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <span
                      className={`inline-block px-4 py-2 rounded-full font-semibold ${getMonetizationColor(
                        analysis.monetization_potential
                      )}`}
                    >
                      {analysis.monetization_potential === "high"
                        ? "🚀 高潛力"
                        : analysis.monetization_potential === "medium"
                        ? "⭐ 中等潛力"
                        : "📊 低潛力"}
                    </span>
                    <p className="text-gray-600 text-sm mt-4">
                      {analysis.monetization_potential === "high"
                        ? "適合進行商業合作和推廣"
                        : analysis.monetization_potential === "medium"
                        ? "可考慮適度商業化"
                        : "建議先提升內容質量"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Keywords */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">關鍵詞</h3>
              <div className="flex flex-wrap gap-3">
                {analysis.keywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    #{keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">優化建議</h3>
              <ul className="space-y-3">
                {analysis.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold mt-1">✓</span>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Analysis Timestamp */}
            <div className="text-center text-gray-500 text-sm">
              分析時間: {new Date(analysis.analyzed_at).toLocaleString("zh-CN")}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!analysis && !isAnalyzing && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">開始分析帖子</h3>
            <p className="text-gray-500">
              輸入小紅書帖子鏈接，獲取詳細的數據分析和優化建議
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          <p>© 2024 XHS Analyzer. 數據僅供參考。</p>
        </div>
      </footer>
    </div>
  );
}
