import { NextRequest, NextResponse } from 'next/server';
import {
  generateAdSenseReport,
  monitorAdSenseMetrics,
  getAdSenseAccountInfo,
  projectRevenue,
} from '@/lib/adsense-service';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get('action') || 'report';
    const accessToken = searchParams.get('accessToken') || process.env.ADSENSE_ACCESS_TOKEN;
    const accountId = searchParams.get('accountId') || process.env.ADSENSE_ACCOUNT_ID;
    const period = (searchParams.get('period') as 'daily' | 'weekly' | 'monthly') || 'daily';
    const daysBack = parseInt(searchParams.get('daysBack') || '30');

    if (!accessToken || !accountId) {
      return NextResponse.json(
        { success: false, error: 'Missing accessToken or accountId' },
        { status: 400 }
      );
    }

    let result;

    switch (action) {
      case 'report':
        result = await generateAdSenseReport(accessToken, accountId, period, daysBack);
        break;

      case 'monitor':
        result = await monitorAdSenseMetrics(accessToken, accountId, {
          minDailyRevenue: 30,
          minCPM: 2.5,
        });
        break;

      case 'account':
        result = await getAdSenseAccountInfo(accessToken, accountId);
        break;

      case 'projection':
        const daysAhead = parseInt(searchParams.get('daysAhead') || '30');
        result = await projectRevenue(accessToken, accountId, daysAhead);
        break;

      default:
        return NextResponse.json(
          { success: false, error: 'Unknown action' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      action,
      data: result,
    });
  } catch (error) {
    console.error('[AdSense API] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch AdSense data';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
