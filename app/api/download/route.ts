import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs/promises';

const execAsync = promisify(exec);

// 會話存儲
const downloadStore = new Map();

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json(
        { error: '請提供視頻鏈接' },
        { status: 400 }
      );
    }

    // 清理 URL - 支持手機複製的分享文字
    let cleanUrl = url;
    
    // 如果包含分享文字，提取 URL
    const urlMatch = url.match(/https?:\/\/[^\s]+/);
    if (urlMatch) {
      cleanUrl = urlMatch[0];
    }
    
    // 移除追蹤參數
    cleanUrl = cleanUrl.split('?')[0];
    cleanUrl = cleanUrl.replace(/\/$/, ''); // 移除尾部斜線
    
    console.log('[Download] Clean URL:', cleanUrl);

    // 驗證URL格式
    if (!cleanUrl.includes('xiaohongshu.com') && !cleanUrl.includes('xhslink.com')) {
      return NextResponse.json(
        { error: '請提供有效的小紅書鏈接' },
        { status: 400 }
      );
    }

    // 生成會話 ID
    const sessionId = `dl_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    console.log(`[Download] Starting download for session ${sessionId}`);

    // 創建臨時目錄
    const tempDir = path.join('/tmp', 'xhs-downloads', sessionId);
    await fs.mkdir(tempDir, { recursive: true });

    // 調用 yt-dlp 或其他下載工具
    // 使用 yt-dlp 處理小紅書視頻
    const command = `yt-dlp -o "${tempDir}/%(title)s.%(ext)s" --no-warnings "${cleanUrl}" 2>&1`;
    
    console.log('[Download] Executing:', command);
    
    const { stdout, stderr } = await execAsync(command, {
      timeout: 120000, // 2分鐘超時
      env: { ...process.env, PYTHONIOENCODING: 'utf-8' }
    });

    // 讀取下載的文件
    const files = await fs.readdir(tempDir);
    const videoFile = files.find(f => 
      f.endsWith('.mp4') || f.endsWith('.mov') || f.endsWith('.webm')
    );

    if (!videoFile) {
      // 嘗試找到任何文件
      console.error('[Download] No video found. Files:', files);
      console.error('[Download] Stderr:', stderr);
      return NextResponse.json(
        { 
          success: false, 
          error: '下載失敗：無法提取視頻',
          details: '請確認鏈接有效且視頻公開可見'
        },
        { status: 500 }
      );
    }

    const filePath = path.join(tempDir, videoFile);
    const stats = await fs.stat(filePath);
    
    // 生成下載 token
    const token = `tok_${Math.random().toString(36).substr(2, 16)}`;
    
    // 存儲信息
    downloadStore.set(token, {
      filePath,
      fileName: videoFile,
      size: stats.size,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10分鐘過期
      sessionId,
    });

    // 設置過期清理
    setTimeout(() => {
      downloadStore.delete(token);
      // 清理文件
      fs.rm(tempDir, { recursive: true }).catch(console.error);
    }, 10 * 60 * 1000);

    return NextResponse.json({
      success: true,
      token,
      metadata: {
        title: videoFile.replace(/\.[^.]+$/, ''),
        filename: videoFile,
        size: stats.size,
      },
      message: '視頻準備就緒，請點擊下載',
    });

  } catch (error: any) {
    console.error('[Download] Error:', error);
    
    if (error.killed) {
      return NextResponse.json(
        { error: '下載超時，請稍後重試' },
        { status: 408 }
      );
    }
    
    if (error.message?.includes('yt-dlp')) {
      return NextResponse.json(
        { 
          error: '下載引擎未安裝',
          details: '請聯繫管理員安裝 yt-dlp'
        },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { error: '服務器錯誤', details: error.message },
      { status: 500 }
    );
  }
}

// 健康檢查
export async function GET() {
  // 清理過期條目
  const now = Date.now();
  for (const [token, data] of downloadStore.entries()) {
    if (data.expiresAt < now) {
      downloadStore.delete(token);
      fs.rm(data.filePath, { recursive: true }).catch(() => {});
    }
  }
  
  return NextResponse.json({ 
    status: 'ok',
    activeDownloads: downloadStore.size,
  });
}