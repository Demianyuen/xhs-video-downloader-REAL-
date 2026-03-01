import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // In a real app, this would fetch from a database
    // For now, return a sample structure
    const sampleStats = {
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
      message: '請在客戶端使用 localStorage 中的數據計算統計信息',
    };

    return NextResponse.json({
      success: true,
      data: sampleStats,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || '統計計算失敗',
      },
      { status: 500 }
    );
  }
}
