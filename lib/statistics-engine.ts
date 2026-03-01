/**
 * Statistics Engine - Generate insights from analysis data
 */

import { AnalysisHistoryItem } from './analysis-history';

export interface Statistics {
  totalAnalyses: number;
  dateRange: {
    start: string;
    end: string;
  };
  engagement: {
    average: number;
    highest: number;
    lowest: number;
    median: number;
  };
  trend: {
    average: number;
    highest: number;
    lowest: number;
    distribution: {
      viral: number;
      high: number;
      medium: number;
      low: number;
    };
  };
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
    positiveRate: number;
  };
  monetization: {
    high: number;
    medium: number;
    low: number;
    highRate: number;
  };
  categories: Array<{
    name: string;
    count: number;
    avgTrend: number;
    avgEngagement: number;
  }>;
  topKeywords: Array<{
    keyword: string;
    frequency: number;
  }>;
  timeSeriesData: Array<{
    date: string;
    count: number;
    avgTrend: number;
  }>;
}

/**
 * Calculate statistics from analysis data
 */
export function calculateStatistics(data: AnalysisHistoryItem[]): Statistics {
  if (data.length === 0) {
    return getEmptyStatistics();
  }

  const engagementRates = data.map(d => d.engagement_rate);
  const trendScores = data.map(d => d.trend_score);

  // Calculate engagement stats
  const engagement = {
    average: parseFloat((engagementRates.reduce((a, b) => a + b, 0) / data.length).toFixed(2)),
    highest: Math.max(...engagementRates),
    lowest: Math.min(...engagementRates),
    median: calculateMedian(engagementRates),
  };

  // Calculate trend stats
  const trendDistribution = {
    viral: trendScores.filter(s => s > 70).length,
    high: trendScores.filter(s => s > 50 && s <= 70).length,
    medium: trendScores.filter(s => s > 30 && s <= 50).length,
    low: trendScores.filter(s => s <= 30).length,
  };

  const trend = {
    average: parseFloat((trendScores.reduce((a, b) => a + b, 0) / data.length).toFixed(2)),
    highest: Math.max(...trendScores),
    lowest: Math.min(...trendScores),
    distribution: trendDistribution,
  };

  // Calculate sentiment stats
  const sentimentCounts = {
    positive: data.filter(d => d.sentiment === 'positive').length,
    neutral: data.filter(d => d.sentiment === 'neutral').length,
    negative: data.filter(d => d.sentiment === 'negative').length,
  };

  const sentiment = {
    ...sentimentCounts,
    positiveRate: parseFloat(((sentimentCounts.positive / data.length) * 100).toFixed(2)),
  };

  // Calculate monetization stats
  const monetizationCounts = {
    high: data.filter(d => d.monetization_potential === 'high').length,
    medium: data.filter(d => d.monetization_potential === 'medium').length,
    low: data.filter(d => d.monetization_potential === 'low').length,
  };

  const monetization = {
    ...monetizationCounts,
    highRate: parseFloat(((monetizationCounts.high / data.length) * 100).toFixed(2)),
  };

  // Calculate category stats
  const categoryMap = new Map<string, AnalysisHistoryItem[]>();
  data.forEach(item => {
    if (!categoryMap.has(item.category)) {
      categoryMap.set(item.category, []);
    }
    categoryMap.get(item.category)!.push(item);
  });

  const categories = Array.from(categoryMap.entries())
    .map(([name, items]) => ({
      name,
      count: items.length,
      avgTrend: parseFloat(
        (items.reduce((sum, item) => sum + item.trend_score, 0) / items.length).toFixed(2)
      ),
      avgEngagement: parseFloat(
        (items.reduce((sum, item) => sum + item.engagement_rate, 0) / items.length).toFixed(2)
      ),
    }))
    .sort((a, b) => b.count - a.count);

  // Extract top keywords
  const keywordFreq = new Map<string, number>();
  data.forEach(item => {
    item.keywords.forEach(keyword => {
      keywordFreq.set(keyword, (keywordFreq.get(keyword) || 0) + 1);
    });
  });

  const topKeywords = Array.from(keywordFreq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([keyword, frequency]) => ({ keyword, frequency }));

  // Generate time series data
  const timeSeriesMap = new Map<string, AnalysisHistoryItem[]>();
  data.forEach(item => {
    const date = new Date(item.analyzed_at).toLocaleDateString('zh-CN');
    if (!timeSeriesMap.has(date)) {
      timeSeriesMap.set(date, []);
    }
    timeSeriesMap.get(date)!.push(item);
  });

  const timeSeriesData = Array.from(timeSeriesMap.entries())
    .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
    .map(([date, items]) => ({
      date,
      count: items.length,
      avgTrend: parseFloat(
        (items.reduce((sum, item) => sum + item.trend_score, 0) / items.length).toFixed(2)
      ),
    }));

  const sortedData = [...data].sort(
    (a, b) => new Date(a.analyzed_at).getTime() - new Date(b.analyzed_at).getTime()
  );

  return {
    totalAnalyses: data.length,
    dateRange: {
      start: sortedData[0].analyzed_at,
      end: sortedData[sortedData.length - 1].analyzed_at,
    },
    engagement,
    trend,
    sentiment,
    monetization,
    categories,
    topKeywords,
    timeSeriesData,
  };
}

/**
 * Calculate median value
 */
function calculateMedian(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/**
 * Get empty statistics object
 */
function getEmptyStatistics(): Statistics {
  return {
    totalAnalyses: 0,
    dateRange: {
      start: new Date().toISOString(),
      end: new Date().toISOString(),
    },
    engagement: {
      average: 0,
      highest: 0,
      lowest: 0,
      median: 0,
    },
    trend: {
      average: 0,
      highest: 0,
      lowest: 0,
      distribution: {
        viral: 0,
        high: 0,
        medium: 0,
        low: 0,
      },
    },
    sentiment: {
      positive: 0,
      neutral: 0,
      negative: 0,
      positiveRate: 0,
    },
    monetization: {
      high: 0,
      medium: 0,
      low: 0,
      highRate: 0,
    },
    categories: [],
    topKeywords: [],
    timeSeriesData: [],
  };
}

/**
 * Get insights and recommendations
 */
export function generateInsights(stats: Statistics): string[] {
  const insights: string[] = [];

  if (stats.totalAnalyses === 0) {
    return ['開始分析帖子以獲取洞察'];
  }

  // Engagement insights
  if (stats.engagement.average > 5) {
    insights.push('🎯 整體互動率表現優秀，平均互動率超過5%');
  } else if (stats.engagement.average > 2) {
    insights.push('📈 互動率處於中等水平，建議優化內容質量');
  } else {
    insights.push('⚠️ 互動率較低，需要改進內容策略');
  }

  // Trend insights
  if (stats.trend.distribution.viral > stats.totalAnalyses * 0.3) {
    insights.push('🔥 超過30%的帖子達到病毒級熱度，內容質量優秀');
  }

  // Sentiment insights
  if (stats.sentiment.positiveRate > 70) {
    insights.push('😊 正面情感佔比超過70%，用戶反饋良好');
  }

  // Monetization insights
  if (stats.monetization.highRate > 40) {
    insights.push('💰 高變現潛力帖子佔比超過40%，商業化機會充足');
  }

  // Category insights
  if (stats.categories.length > 0) {
    const topCategory = stats.categories[0];
    insights.push(`📌 最活躍分類是"${topCategory.name}"，共${topCategory.count}篇分析`);
  }

  // Keyword insights
  if (stats.topKeywords.length > 0) {
    const topKeyword = stats.topKeywords[0];
    insights.push(`🏷️ 最常見關鍵詞是"${topKeyword.keyword}"，出現${topKeyword.frequency}次`);
  }

  return insights;
}

/**
 * Compare two time periods
 */
export function comparePeriods(
  data: AnalysisHistoryItem[],
  period1Start: Date,
  period1End: Date,
  period2Start: Date,
  period2End: Date
): {
  period1: Statistics;
  period2: Statistics;
  comparison: {
    engagementChange: number;
    trendChange: number;
    volumeChange: number;
  };
} {
  const period1Data = data.filter(item => {
    const date = new Date(item.analyzed_at);
    return date >= period1Start && date <= period1End;
  });

  const period2Data = data.filter(item => {
    const date = new Date(item.analyzed_at);
    return date >= period2Start && date <= period2End;
  });

  const stats1 = calculateStatistics(period1Data);
  const stats2 = calculateStatistics(period2Data);

  return {
    period1: stats1,
    period2: stats2,
    comparison: {
      engagementChange: parseFloat(
        ((stats2.engagement.average - stats1.engagement.average) / stats1.engagement.average * 100).toFixed(2)
      ),
      trendChange: parseFloat(
        ((stats2.trend.average - stats1.trend.average) / stats1.trend.average * 100).toFixed(2)
      ),
      volumeChange: stats2.totalAnalyses - stats1.totalAnalyses,
    },
  };
}
