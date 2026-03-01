import { NextRequest, NextResponse } from 'next/server';

/**
 * Telegram 测试链接 API
 * 生成可在 Telegram 中一键打开的测试链接
 */

export async function GET(request: NextRequest) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    // 生成测试链接
    const testLinks = {
      homepage: `${baseUrl}/`,
      download: `${baseUrl}/download`,
      analyze: `${baseUrl}/analyze`,
      pricing: `${baseUrl}/pricing`,
      dashboard: `${baseUrl}/dashboard`,
    };

    // 生成 Telegram 分享链接
    const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(baseUrl)}&text=🌙%20XHS%20Downloader%20-%20%E5%B0%8F%E7%BA%A2%E4%B9%A6%E8%A7%86%E9%A2%91%E4%B8%8B%E8%BD%BD%E5%99%A8`;

    // 生成 HTML 响应，可在 Telegram 中预览
    const html = `
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta property="og:title" content="🌙 XHS Downloader - 小红书视频下载器">
  <meta property="og:description" content="无水印下载小红书视频，支持分析和变现">
  <meta property="og:image" content="${baseUrl}/og-image.png">
  <meta property="og:url" content="${baseUrl}">
  <title>XHS Downloader - 测试链接</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      width: 100%;
      background: white;
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
    }
    .header h1 {
      font-size: 2.5em;
      margin-bottom: 10px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .header p {
      color: #666;
      font-size: 1.1em;
    }
    .test-links {
      display: grid;
      gap: 15px;
      margin-bottom: 30px;
    }
    .test-link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px 20px;
      background: #f5f5f5;
      border-radius: 10px;
      text-decoration: none;
      color: #333;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }
    .test-link:hover {
      background: #667eea;
      color: white;
      border-color: #667eea;
    }
    .test-link-name {
      font-weight: 600;
      font-size: 1.1em;
    }
    .test-link-icon {
      font-size: 1.5em;
    }
    .divider {
      height: 1px;
      background: #eee;
      margin: 30px 0;
    }
    .share-section {
      text-align: center;
    }
    .share-section h3 {
      margin-bottom: 15px;
      color: #333;
    }
    .share-btn {
      display: inline-block;
      padding: 12px 30px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1em;
      cursor: pointer;
      text-decoration: none;
      transition: transform 0.3s ease;
    }
    .share-btn:hover {
      transform: scale(1.05);
    }
    .status {
      margin-top: 30px;
      padding: 15px;
      background: #e8f5e9;
      border-radius: 8px;
      color: #2e7d32;
      text-align: center;
      font-size: 0.95em;
    }
    .status.warning {
      background: #fff3e0;
      color: #e65100;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🌙 XHS Downloader</h1>
      <p>小红书视频下载器 - 测试版</p>
    </div>

    <div class="test-links">
      <a href="${testLinks.homepage}" class="test-link" target="_blank">
        <span class="test-link-name">首页</span>
        <span class="test-link-icon">🏠</span>
      </a>
      <a href="${testLinks.download}" class="test-link" target="_blank">
        <span class="test-link-name">下载功能</span>
        <span class="test-link-icon">⬇️</span>
      </a>
      <a href="${testLinks.analyze}" class="test-link" target="_blank">
        <span class="test-link-name">分析功能</span>
        <span class="test-link-icon">📊</span>
      </a>
      <a href="${testLinks.pricing}" class="test-link" target="_blank">
        <span class="test-link-name">定价页面</span>
        <span class="test-link-icon">💰</span>
      </a>
      <a href="${testLinks.dashboard}" class="test-link" target="_blank">
        <span class="test-link-name">用户仪表板</span>
        <span class="test-link-icon">📈</span>
      </a>
    </div>

    <div class="divider"></div>

    <div class="share-section">
      <h3>分享到 Telegram</h3>
      <a href="${telegramShareUrl}" class="share-btn" target="_blank">
        📱 分享链接
      </a>
    </div>

    <div class="status warning">
      ⚠️ 这是测试版本，功能还在开发中
    </div>

    <div class="status">
      ✅ 所有链接都可以在 Telegram 中直接打开
    </div>
  </div>

  <script>
    // 如果在 Telegram 中打开，显示特殊提示
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      
      // 设置主按钮
      tg.MainButton.text = '返回 Telegram';
      tg.MainButton.show();
      tg.MainButton.onClick(() => {
        tg.close();
      });
    }
  </script>
</body>
</html>
    `;

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });

  } catch (error: any) {
    console.error('[Test Links] Error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
