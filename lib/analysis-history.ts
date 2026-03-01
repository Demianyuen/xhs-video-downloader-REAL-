/**
 * Analysis History Manager - Stores and retrieves analysis history
 */

import { PostAnalysis } from './post-analyzer';

const STORAGE_KEY = 'xhs_analysis_history';
const MAX_HISTORY = 50;

export interface AnalysisHistoryItem extends PostAnalysis {
  id: string;
}

/**
 * Save analysis to history
 */
export function saveAnalysisToHistory(analysis: PostAnalysis): AnalysisHistoryItem {
  if (typeof window === 'undefined') {
    throw new Error('History storage only works in browser');
  }

  const id = `${Date.now()}_${Math.random().toString(36).substring(7)}`;
  const item: AnalysisHistoryItem = { ...analysis, id };

  try {
    const history = getAnalysisHistory();
    history.unshift(item);

    // Keep only latest MAX_HISTORY items
    if (history.length > MAX_HISTORY) {
      history.pop();
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    return item;
  } catch (error) {
    console.error('Failed to save analysis history:', error);
    throw error;
  }
}

/**
 * Get all analysis history
 */
export function getAnalysisHistory(): AnalysisHistoryItem[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load analysis history:', error);
    return [];
  }
}

/**
 * Get analysis by ID
 */
export function getAnalysisById(id: string): AnalysisHistoryItem | null {
  const history = getAnalysisHistory();
  return history.find(item => item.id === id) || null;
}

/**
 * Delete analysis from history
 */
export function deleteAnalysis(id: string): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const history = getAnalysisHistory();
    const filtered = history.filter(item => item.id !== id);

    if (filtered.length === history.length) {
      return false; // Item not found
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Failed to delete analysis:', error);
    return false;
  }
}

/**
 * Clear all history
 */
export function clearAnalysisHistory(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear history:', error);
  }
}

/**
 * Export history as JSON
 */
export function exportHistoryAsJSON(): string {
  const history = getAnalysisHistory();
  return JSON.stringify(history, null, 2);
}

/**
 * Export history as CSV
 */
export function exportHistoryAsCSV(): string {
  const history = getAnalysisHistory();

  if (history.length === 0) {
    return '';
  }

  const headers = [
    '分析時間',
    '標題',
    '作者',
    '分類',
    '點贊',
    '評論',
    '分享',
    '互動率',
    '情感',
    '熱度評分',
    '變現潛力',
  ];

  const rows = history.map(item => [
    new Date(item.analyzed_at).toLocaleString('zh-CN'),
    `"${item.title}"`,
    item.author,
    item.category,
    item.likes,
    item.comments,
    item.shares,
    item.engagement_rate.toFixed(2),
    item.sentiment,
    item.trend_score,
    item.monetization_potential,
  ]);

  const csv = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
  return csv;
}

/**
 * Get statistics from history
 */
export function getHistoryStatistics() {
  const history = getAnalysisHistory();

  if (history.length === 0) {
    return null;
  }

  const avgEngagement =
    history.reduce((sum, item) => sum + item.engagement_rate, 0) / history.length;
  const avgTrendScore =
    history.reduce((sum, item) => sum + item.trend_score, 0) / history.length;
  const avgLikes = history.reduce((sum, item) => sum + item.likes, 0) / history.length;

  const sentimentCounts = {
    positive: history.filter(item => item.sentiment === 'positive').length,
    neutral: history.filter(item => item.sentiment === 'neutral').length,
    negative: history.filter(item => item.sentiment === 'negative').length,
  };

  const monetizationCounts = {
    high: history.filter(item => item.monetization_potential === 'high').length,
    medium: history.filter(item => item.monetization_potential === 'medium').length,
    low: history.filter(item => item.monetization_potential === 'low').length,
  };

  const categories = new Map<string, number>();
  history.forEach(item => {
    categories.set(item.category, (categories.get(item.category) || 0) + 1);
  });

  return {
    totalAnalyses: history.length,
    avgEngagement: parseFloat(avgEngagement.toFixed(2)),
    avgTrendScore: parseFloat(avgTrendScore.toFixed(2)),
    avgLikes: parseFloat(avgLikes.toFixed(0)),
    sentimentCounts,
    monetizationCounts,
    topCategories: Array.from(categories.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([category, count]) => ({ category, count })),
  };
}
