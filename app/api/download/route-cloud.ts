import { NextRequest, NextResponse } from 'next/server';
import https from 'https';
import http from 'http';
import { URL } from 'url';
import {
  generateToken,
  generateSessionId,
  storeDownload,
} from '@/lib/download-manager';

/**
 * 云端兼容的下载 API
 * 使用 HTTP 请求而不是本地 Python 脚本
 */

interface XHSVideoInfo {
  title: string;
  author: string;
  videoUrl: string;
  coverUrl?: string;
}

/**
 * 从小红书 URL 提取视频信息
 * 使用公开 API 或爬虫库
 */
async function extractXHSVideoInfo(url: string): Promise<XHSVideoInfo> {
  try {
    // 方案 1: 使用第三方 API（推荐用于云端）
    // 例如: https://api.xiaohongshu.com 或其他公开 API
    
    // 临时方案：返回模拟数据（用于测试）
    const postId = url.match(/item\/(\w+)/)?.[1] || 'unknown';
    
    return {
      title: `小红书视频 - ${postId}`,
      author: '内容创作者',
      videoUrl: `https://example.com/video/${postId}.mp4`,
      coverUrl: `https://example.com/cover/${postId}.jpg`,
    };
  } catch (error) {
    throw new Error('无法提取视频信息');
  }
}

/**
 * 从 URL 下载文件到内存
 */
async function downloadFileToBuffer(fileUrl: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const protocol = fileUrl.startsWith('https') ? https : http;
    
    protocol.get(fileUrl, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`下载失败: ${response.statusCode}`));
        return;
      }

      const chunks: Buffer[] = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
      response.on('error', reject);
    }).on('error', reject);
  });
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: '請提供視頻鏈接' },
        { status: 400 }
      );
    }

    // 驗證 URL 格式
    if (!url.includes('xiaohongshu.com')) {
      return NextResponse.json(
        { error: '請提供有效的小紅書鏈接' },
        { status: 400 }
      );
    }

    console.log(`[Download] Starting cloud download for URL: ${url}`);

    // 生成會話 ID
    const sessionId = generateSessionId();

    // 提取視頻信息
    const videoInfo = await extractXHSVideoInfo(url);
    console.log(`[Download] Video info extracted: ${videoInfo.title}`);

    // 下載視頻文件到內存
    // 注意：實際部署時需要使用真實的小紅書 API 或爬蟲服務
    // 這裡使用模擬數據進行演示
    
    // 生成下載令牌
    const token = generateToken();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 分鐘

    // 存儲下載信息（使用內存或 Redis）
    storeDownload(token, {
      sessionId,
      metadata: {
        title: videoInfo.title,
        author: videoInfo.author,
        url: videoInfo.videoUrl,
      },
      expiresAt,
      // 在實際部署中，這裡應該存儲視頻數據或 URL
      videoBuffer: null, // 暫時為 null，實際使用時存儲視頻數據
    });

    console.log(`[Download] Download ready - token: ${token}, session: ${sessionId}`);

    return NextResponse.json({
      success: true,
      token,
      metadata: {
        title: videoInfo.title,
        author: videoInfo.author,
        type: 'video',
      },
    });

  } catch (error: any) {
    console.error('[Download] API Error:', error);

    return NextResponse.json(
      {
        error: '服務器錯誤',
        details: error.message
      },
      { status: 500 }
    );
  }
}

// 健康檢查端點
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: '雲端下載服務運行正常',
    version: '2.0-cloud',
  });
}
