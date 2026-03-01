"use client";

import { useState, useEffect } from "react";
import {
  getAnalysisHistory,
  getHistoryStatistics,
} from "@/lib/analysis-history";
import { calculateStatistics, generateInsights } from "@/lib/statistics-engine";
import type { Statistics } from "@/lib/statistics-engine";

export default function StatsPage() {
  const [stats, setStats] = useState<Statistics | null>(null);
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = () => {
    try {
      const history = getAnalysisHistory();
      const calculatedStats = calculateStatistics(history);
      setStats(calculatedStats);
      setInsights(generateInsights(calculatedStats));
    } catch (error) {
      console.error("Failed to load statistics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加載統計數據中...</p>
        </div>
      </div>
    );
  }

  if (!stats || stats.totalAnalyses === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">統計分析</h1>
                <p className="text-gray-500 mt-1">查看分析數據的統計信息和趨勢</p>
              </div>
              <a
                href="/analyze"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                開始分析
              </a>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">暫無統計數據</h3>
            <p className="text-gray-500 mb-6">分析帖子後，統計信息將顯示在這裡</p>
            <a
              href="/analyze"
              className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              開始分析
            </a>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">統計分析</h1>
              <p className="text-gray-500 mt-1">查看分析數據的統計信息和趨勢</p>
            </div>
            <div className="flex gap-3">
              <a
                href="/history"
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
              >
                查看歷史
              </a>
              <a
                href="/analyze"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                新增分析
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-gray-500 text-sm uppercase tracking-wide">總分析數</div>
            <div className="text-3xl font-bold text-indigo-600 mt-2">
              {stats.totalAnalyses}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-gray-500 text-sm uppercase tracking-wide">平均互動率</div>
            <div className="text-3xl font-bold text-purple-600 mt-2">
              {stats.engagement.average.toFixed(2)}%
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-gray-500 text-sm uppercase tracking-wide">平均熱度</div>
            <div className="text-3xl font-bold text-pink-600 mt-2">
              {stats.trend.average.toFixed(0)}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-gray-500 text-sm uppercase tracking-wide">正面情感率</div>
            <div className="text-3xl font-bold text-green-600 mt-2">
              {stats.sentiment.positiveRate.toFixed(0)}%
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-gray-500 text-sm uppercase tracking-wide">高潛力帖子</div>
            <div className="text-3xl font-bold text-orange-600 mt-2">
              {stats.monetization.highRate.toFixed(0)}%
            </div>
          </div>
        </div>

        {/* Insights */}
        {insights.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">💡 洞察與建議</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {insights.map((insight, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border-l-4 border-indigo-600"
                >
                  <p className="text-gray-700">{insight}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Engagement Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">互動率分析</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">平均互動率</span>
                  <span className="font-semibold text-indigo-600">
                    {stats.engagement.average.toFixed(2)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${Math.min(stats.engagement.average * 10, 100)}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">最高互動率</span>
                  <span className="font-semibold text-green-600">
                    {stats.engagement.highest.toFixed(2)}%
                  </span>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">最低互動率</span>
                  <span className="font-semibold text-red-600">
                    {stats.engagement.lowest.toFixed(2)}%
                  </span>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">中位數</span>
                  <span className="font-semibold text-purple-600">
                    {stats.engagement.median.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">熱度分布</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">🔥 病毒級 (>70)</span>
                  <span className="font-semibold text-red-600">
                    {stats.trend.distribution.viral}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full"
                    style={{
                      width: `${(stats.trend.distribution.viral / stats.totalAnalyses) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">📈 高熱度 (50-70)</span>
                  <span className="font-semibold text-orange-600">
                    {stats.trend.distribution.high}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-600 h-2 rounded-full"
                    style={{
                      width: `${(stats.trend.distribution.high / stats.totalAnalyses) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">📊 中等 (30-50)</span>
                  <span className="font-semibold text-yellow-600">
                    {stats.trend.distribution.medium}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-600 h-2 rounded-full"
                    style={{
                      width: `${(stats.trend.distribution.medium / stats.totalAnalyses) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">📉 低熱度 (≤30)</span>
                  <span className="font-semibold text-gray-600">
                    {stats.trend.distribution.low}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gray-600 h-2 rounded-full"
                    style={{
                      width: `${(stats.trend.distribution.low / stats.totalAnalyses) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sentiment & Monetization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">情感分析</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <span className="text-gray-700">😊 正面</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{
                        width: `${(stats.sentiment.positive / stats.totalAnalyses) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="font-semibold text-green-600 w-12 text-right">
                    {stats.sentiment.positive}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700">😐 中立</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gray-600 h-2 rounded-full"
                      style={{
                        width: `${(stats.sentiment.neutral / stats.totalAnalyses) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="font-semibold text-gray-600 w-12 text-right">
                    {stats.sentiment.neutral}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                <span className="text-gray-700">😞 負面</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-600 h-2 rounded-full"
                      style={{
                        width: `${(stats.sentiment.negative / stats.totalAnalyses) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="font-semibold text-red-600 w-12 text-right">
                    {stats.sentiment.negative}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">變現潛力</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <span className="text-gray-700">🚀 高潛力</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{
                        width: `${(stats.monetization.high / stats.totalAnalyses) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="font-semibold text-green-600 w-12 text-right">
                    {stats.monetization.high}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                <span className="text-gray-700">⭐ 中等潛力</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-600 h-2 rounded-full"
                      style={{
                        width: `${(stats.monetization.medium / stats.totalAnalyses) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="font-semibold text-yellow-600 w-12 text-right">
                    {stats.monetization.medium}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                <span className="text-gray-700">📊 低潛力</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-600 h-2 rounded-full"
                      style={{
                        width: `${(stats.monetization.low / stats.totalAnalyses) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="font-semibold text-red-600 w-12 text-right">
                    {stats.monetization.low}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        {stats.categories.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">分類統計</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.categories.map((cat, idx) => (
                <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3">{cat.name}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">帖子數</span>
                      <span className="font-semibold">{cat.count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">平均熱度</span>
                      <span className="font-semibold text-indigo-600">
                        {cat.avgTrend.toFixed(0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">平均互動</span>
                      <span className="font-semibold text-purple-600">
                        {cat.avgEngagement.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Keywords */}
        {stats.topKeywords.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">熱門關鍵詞</h3>
            <div className="flex flex-wrap gap-3">
              {stats.topKeywords.map((kw, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full"
                >
                  <span className="text-indigo-800 font-medium">#{kw.keyword}</span>
                  <span className="text-indigo-600 ml-2 text-sm">({kw.frequency})</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          <p>© 2024 XHS Analyzer. 數據僅供參考。</p>
        </div>
      </footer>
    </div>
  );
}
