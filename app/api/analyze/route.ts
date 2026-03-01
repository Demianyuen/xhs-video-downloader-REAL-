import { NextRequest, NextResponse } from 'next/server';
import { analyzePost, AnalysisRequest } from '@/lib/post-analyzer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body as AnalysisRequest;

    if (!url) {
      return NextResponse.json(
        { error: '請提供小紅書鏈接' },
        { status: 400 }
      );
    }

    if (!url.includes('xiaohongshu.com')) {
      return NextResponse.json(
        { error: '請提供有效的小紅書鏈接' },
        { status: 400 }
      );
    }

    console.log(`[Analyzer] Starting analysis for URL: ${url}`);

    const analysis = await analyzePost({ url });

    console.log(`[Analyzer] Analysis complete - trend_score: ${analysis.trend_score}`);

    return NextResponse.json({
      success: true,
      data: analysis,
    });

  } catch (error: any) {
    console.error('[Analyzer] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || '分析失敗',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: '分析服務運行正常',
  });
}
