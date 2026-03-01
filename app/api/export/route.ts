import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const format = searchParams.get('format') || 'json';

    // In a real app, this would fetch from a database
    // For now, we return a sample structure
    const sampleData = {
      exportDate: new Date().toISOString(),
      format,
      message: '請在客戶端使用 localStorage 中的數據進行導出',
      note: '分析數據存儲在瀏覽器 localStorage 中，使用前端導出功能',
    };

    const filename = `xhs-analysis-${Date.now()}.${format === 'csv' ? 'csv' : 'json'}`;

    return NextResponse.json(sampleData, {
      headers: {
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || '導出失敗' },
      { status: 500 }
    );
  }
}
