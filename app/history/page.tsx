"use client";

import { useState, useEffect } from "react";
import {
  getAnalysisHistory,
  deleteAnalysis,
  clearAnalysisHistory,
  exportHistoryAsJSON,
  exportHistoryAsCSV,
  getHistoryStatistics,
  AnalysisHistoryItem,
} from "@/lib/analysis-history";

export default function HistoryPage() {
  const [history, setHistory] = useState<AnalysisHistoryItem[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [filter, setFilter] = useState<"all" | "high" | "medium" | "low">("all");
  const [sortBy, setSortBy] = useState<"date" | "trend" | "engagement">("date");

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const data = getAnalysisHistory();
    setHistory(data);
    setStats(getHistoryStatistics());
  };

  const handleDelete = (id: string) => {
    if (confirm("確定要刪除此分析記錄嗎？")) {
      deleteAnalysis(id);
      loadHistory();
    }
  };

  const handleClearAll = () => {
    if (confirm("確定要清空所有分析記錄嗎？此操作無法撤銷。")) {
      clearAnalysisHistory();
      loadHistory();
    }
  };

  const handleExport = (format: "json" | "csv") => {
    const data = format === "json" ? exportHistoryAsJSON() : exportHistoryAsCSV();
    const filename = `xhs-analysis-${Date.now()}.${format}`;
    const blob = new Blob([data], {
      type: format === "json" ? "application/json" : "text/csv",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getFilteredAndSorted = () => {
    let filtered = history;

    if (filter !== "all") {
      filtered = filtered.filter(item => item.monetization_potential === filter);
    }

    return filtered.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.analyzed_at).getTime() - new Date(a.analyzed_at).getTime();
      } else if (sortBy === "trend") {
        return b.trend_score - a.trend_score;
      } else {
        return b.engagement_rate - a.engagement_rate;
      }
    });
  };

  const getMonetizationBadge = (potential: string) => {
    if (potential === "high") return "bg-green-100 text-green-800";
    if (potential === "medium") return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getSentimentEmoji = (sentiment: string) => {
    if (sentiment === "positive") return "😊";
    if (sentiment === "negative") return "😞";
    return "😐";
  };

  const filteredData = getFilteredAndSorted();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">分析歷史</h1>
              <p className="text-gray-500 mt-1">查看和管理所有分析記錄</p>
            </div>
            <a
              href="/analyze"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              新增分析
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Statistics */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="text-gray-500 text-sm uppercase tracking-wide">總分析數</div>
              <div className="text-3xl font-bold text-blue-600 mt-2">{stats.totalAnalyses}</div>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <div className="text-gray-500 text-sm uppercase tracking-wide">平均互動率</div>
              <div className="text-3xl font-bold text-purple-600 mt-2">
                {stats.avgEngagement.toFixed(2)}%
              </div>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <div className="text-gray-500 text-sm uppercase tracking-wide">平均熱度</div>
              <div className="text-3xl font-bold text-pink-600 mt-2">
                {stats.avgTrendScore.toFixed(0)}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <div className="text-gray-500 text-sm uppercase tracking-wide">平均點贊</div>
              <div className="text-3xl font-bold text-green-600 mt-2">
                {stats.avgLikes.toLocaleString()}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <div className="text-gray-500 text-sm uppercase tracking-wide">高潛力帖子</div>
              <div className="text-3xl font-bold text-orange-600 mt-2">
                {stats.monetizationCounts.high}
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                按變現潛力篩選
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">全部</option>
                <option value="high">高潛力</option>
                <option value="medium">中等潛力</option>
                <option value="low">低潛力</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                排序方式
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="date">最新優先</option>
                <option value="trend">熱度最高</option>
                <option value="engagement">互動最高</option>
              </select>
            </div>
            <div className="flex items-end gap-2">
              <button
                onClick={() => handleExport("json")}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                導出 JSON
              </button>
            </div>
            <div className="flex items-end gap-2">
              <button
                onClick={() => handleExport("csv")}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                導出 CSV
              </button>
            </div>
          </div>
          {history.length > 0 && (
            <button
              onClick={handleClearAll}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              清空所有記錄
            </button>
          )}
        </div>

        {/* History List */}
        {filteredData.length > 0 ? (
          <div className="space-y-4">
            {filteredData.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow hover:shadow-lg transition p-6">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-start">
                  {/* Title & Author */}
                  <div className="md:col-span-2">
                    <h3 className="font-semibold text-gray-800 line-clamp-2">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">作者: {item.author}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(item.analyzed_at).toLocaleString("zh-CN")}
                    </p>
                  </div>

                  {/* Metrics */}
                  <div className="md:col-span-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">點贊:</span>
                        <span className="font-semibold text-pink-600 ml-1">
                          {item.likes.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">評論:</span>
                        <span className="font-semibold text-blue-600 ml-1">
                          {item.comments.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">互動率:</span>
                        <span className="font-semibold text-purple-600 ml-1">
                          {item.engagement_rate.toFixed(2)}%
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">熱度:</span>
                        <span className="font-semibold text-orange-600 ml-1">
                          {item.trend_score}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <div className="flex gap-2 flex-wrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getMonetizationBadge(item.monetization_potential)}`}>
                        {item.monetization_potential === "high"
                          ? "🚀 高潛力"
                          : item.monetization_potential === "medium"
                          ? "⭐ 中等"
                          : "📊 低潛力"}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {getSentimentEmoji(item.sentiment)} {item.sentiment}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                    >
                      刪除
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">暫無分析記錄</h3>
            <p className="text-gray-500 mb-6">開始分析帖子，記錄將顯示在這裡</p>
            <a
              href="/analyze"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              開始分析
            </a>
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
