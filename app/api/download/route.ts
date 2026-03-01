import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs/promises';
import {
  generateToken,
  generateSessionId,
  storeDownload,
} from '@/lib/download-manager';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: '請提供視頻鏈接' },
        { status: 400 }
      );
    }

    // 驗證URL格式
    if (!url.includes('xiaohongshu.com')) {
      return NextResponse.json(
        { error: '請提供有效的小紅書鏈接' },
        { status: 400 }
      );
    }

    // Generate unique session ID
    const sessionId = generateSessionId();
    console.log(`[Download] Starting download for session ${sessionId}`);

    // Create temp directory for this session
    const tempDir = path.join(process.cwd(), 'temp', sessionId, 'Download');
    await fs.mkdir(tempDir, { recursive: true });

    // Python腳本路徑
    const pythonPath = path.join(
      'C:',
      'Users',
      'kin16',
      'Documents',
      '爬蟲',
      'XHS-Downloader-master',
      'venv',
      'Scripts',
      'python.exe'
    );

    const scriptPath = path.join(
      'C:',
      'Users',
      'kin16',
      'Documents',
      '爬蟲',
      'XHS-Downloader-master',
      'download_video_simple.py'
    );

    // 構建命令 - 使用自定義輸出目錄
    const command = `"${pythonPath}" "${scriptPath}" "${url}" -o "${tempDir}"`;

    console.log('[Download] Executing command:', command);

    // 執行下載
    const { stdout, stderr } = await execAsync(command, {
      timeout: 60000, // 60秒超時
    });

    if (stderr && stderr.includes('錯誤')) {
      console.error('[Download] Error:', stderr);
      return NextResponse.json(
        {
          success: false,
          error: '下載失敗',
          details: stderr
        },
        { status: 500 }
      );
    }

    // 解析輸出，提取下載信息
    const titleMatch = stdout.match(/標題: (.+)/);
    const authorMatch = stdout.match(/作者: (.+)/);
    const typeMatch = stdout.match(/類型: (.+)/);

    const metadata = {
      title: titleMatch ? titleMatch[1].trim() : '未知',
      author: authorMatch ? authorMatch[1].trim() : '未知',
      type: typeMatch ? typeMatch[1].trim() : '未知',
    };

    // Find the downloaded video file
    const files = await fs.readdir(tempDir);
    const videoFile = files.find(file => file.endsWith('.mp4'));

    if (!videoFile) {
      console.error('[Download] No video file found in temp directory');
      return NextResponse.json(
        {
          success: false,
          error: '下載失敗：未找到視頻文件',
        },
        { status: 500 }
      );
    }

    const filePath = path.join(tempDir, videoFile);
    console.log(`[Download] Video file found: ${filePath}`);

    // Generate download token
    const token = generateToken();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    // Store download info
    storeDownload(token, {
      filePath,
      metadata,
      expiresAt,
      sessionId,
    });

    console.log(`[Download] Download ready - token: ${token}, session: ${sessionId}`);

    return NextResponse.json({
      success: true,
      token,
      metadata,
    });

  } catch (error: any) {
    console.error('[Download] API Error:', error);

    if (error.killed) {
      return NextResponse.json(
        { error: '下載超時，請稍後重試' },
        { status: 408 }
      );
    }

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
    message: '下載服務運行正常'
  });
}
