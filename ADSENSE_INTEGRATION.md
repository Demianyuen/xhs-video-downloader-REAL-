# 📋 AdSense Integration Guide

## 配置步驟

### 1. Google AdSense API 設置

#### 1.1 創建 Google Cloud 項目
```bash
# 訪問 Google Cloud Console
https://console.cloud.google.com/

# 創建新項目
# 項目名稱: XHS Downloader AdSense
```

#### 1.2 啟用 AdSense Management API
```bash
# 在 Google Cloud Console 中搜索 "AdSense Management API"
# 點擊啟用
```

#### 1.3 創建 OAuth 2.0 認證
```bash
# 轉到 "認證" 頁面
# 創建 OAuth 2.0 客戶端 ID
# 應用類型: Web 應用
# 授權的重定向 URI:
#   - http://localhost:3000/api/auth/callback
#   - https://xhsvideodownloader.com/api/auth/callback
```

### 2. 環境變量配置

在 `.env.local` 中添加：

```env
# Google AdSense API
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=https://xhsvideodownloader.com/api/auth/callback

# AdSense Account
ADSENSE_ACCOUNT_ID=pub-xxxxxxxxxxxxxxxx
ADSENSE_ACCESS_TOKEN=ya29.xxxxx

# AdSense Monitoring
ADSENSE_MIN_DAILY_REVENUE=10
ADSENSE_MIN_CPM=2.5
ADSENSE_MAX_CTR=5
```

### 3. 實現 OAuth 2.0 流程

創建 `/app/api/auth/callback/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!code) {
    return NextResponse.json(
      { error: 'No authorization code provided' },
      { status: 400 }
    );
  }

  try {
    // 交換授權碼以獲取訪問令牌
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenResponse.json();
    
    // 保存訪問令牌到數據庫或 session
    // 這裡應該使用安全的存儲方式

    return NextResponse.redirect('/dashboard?auth=success');
  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect('/dashboard?auth=failed');
  }
}
```

### 4. 實現 AdSense 監測端點

更新 `/app/api/adsense/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { generateAdSenseReport, monitorAdSenseMetrics } from '@/lib/adsense-service';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const accessToken = process.env.ADSENSE_ACCESS_TOKEN;
  const accountId = process.env.ADSENSE_ACCOUNT_ID;

  if (!accessToken || !accountId) {
    return NextResponse.json(
      { error: 'AdSense credentials not configured' },
      { status: 500 }
    );
  }

  try {
    switch (action) {
      case 'report':
        const period = (searchParams.get('period') || 'daily') as 'daily' | 'weekly' | 'monthly';
        const daysBack = parseInt(searchParams.get('daysBack') || '30');
        const report = await generateAdSenseReport(accessToken, accountId, period, daysBack);
        return NextResponse.json(report);

      case 'monitor':
        const thresholds = {
          minDailyRevenue: parseFloat(process.env.ADSENSE_MIN_DAILY_REVENUE || '10'),
          minCPM: parseFloat(process.env.ADSENSE_MIN_CPM || '2.5'),
          maxCTR: parseFloat(process.env.ADSENSE_MAX_CTR || '5'),
        };
        const monitoring = await monitorAdSenseMetrics(accessToken, accountId, thresholds);
        return NextResponse.json(monitoring);

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('AdSense API error:', error);
    return NextResponse.json(
      { error: 'Failed to process AdSense request' },
      { status: 500 }
    );
  }
}
```

### 5. 前端集成

創建 `/components/adsense-dashboard.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';

export function AdsenseDashboard() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch('/api/adsense?action=report&period=daily&daysBack=30');
        const data = await response.json();
        setReport(data);
      } catch (error) {
        console.error('Failed to fetch AdSense report:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!report) return <div>No data available</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">AdSense Dashboard</h2>
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 bg-blue-50 rounded">
          <p className="text-gray-600">Total Revenue</p>
          <p className="text-2xl font-bold">${report.totalRevenue.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-green-50 rounded">
          <p className="text-gray-600">Total Impressions</p>
          <p className="text-2xl font-bold">{report.totalImpressions.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-purple-50 rounded">
          <p className="text-gray-600">Average CTR</p>
          <p className="text-2xl font-bold">{report.averageCTR.toFixed(2)}%</p>
        </div>
        <div className="p-4 bg-orange-50 rounded">
          <p className="text-gray-600">Average CPM</p>
          <p className="text-2xl font-bold">${report.averageCPM.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
```

## 測試

### 本地測試
```bash
# 1. 設置環境變量
cp .env.example .env.local
# 編輯 .env.local 添加 AdSense 認證信息

# 2. 啟動開發服務器
npm run dev

# 3. 訪問 http://localhost:3000/api/adsense?action=report
```

### 生產部署
```bash
# 1. 在 Vercel 中設置環境變量
# 轉到 Project Settings → Environment Variables
# 添加所有 ADSENSE_* 和 GOOGLE_* 變量

# 2. 部署
git push origin main
```

## 故障排除

### 常見問題

1. **401 Unauthorized**
   - 檢查 `ADSENSE_ACCESS_TOKEN` 是否有效
   - 令牌可能已過期，需要刷新

2. **403 Forbidden**
   - 檢查 `ADSENSE_ACCOUNT_ID` 是否正確
   - 確保 API 已在 Google Cloud 中啟用

3. **404 Not Found**
   - 檢查 AdSense 帳戶是否存在
   - 確保帳戶已批准並處於活動狀態

## 下一步

- [ ] 實現令牌刷新機制
- [ ] 添加數據庫存儲 AdSense 指標
- [ ] 創建 Cron 任務定期更新指標
- [ ] 實現警報通知系統
- [ ] 添加圖表和可視化
