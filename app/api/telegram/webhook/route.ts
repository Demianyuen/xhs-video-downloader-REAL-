import { NextRequest, NextResponse } from 'next/server';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

/**
 * Telegram Webhook 处理
 * 接收 Telegram 消息并响应
 */
export async function POST(request: NextRequest) {
  try {
    const update = await request.json();
    
    console.log('[Telegram] Received update:', update);

    // 处理消息
    if (update.message) {
      const chatId = update.message.chat.id;
      const text = update.message.text || '';
      const userId = update.message.from.id;
      const userName = update.message.from.first_name;

      console.log(`[Telegram] Message from ${userName} (${userId}): ${text}`);

      // 处理命令
      if (text.startsWith('/')) {
        await handleCommand(chatId, text, userName);
      } else {
        // 处理普通消息
        await handleMessage(chatId, text);
      }
    }

    // 处理回调查询（按钮点击）
    if (update.callback_query) {
      const callbackId = update.callback_query.id;
      const chatId = update.callback_query.message.chat.id;
      const data = update.callback_query.data;

      console.log(`[Telegram] Callback: ${data}`);

      await handleCallback(chatId, data, callbackId);
    }

    return NextResponse.json({ ok: true });

  } catch (error: any) {
    console.error('[Telegram] Webhook error:', error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}

/**
 * 处理命令
 */
async function handleCommand(chatId: number, command: string, userName: string) {
  switch (command) {
    case '/start':
      await sendStartMessage(chatId, userName);
      break;

    case '/test':
      await sendTestLinks(chatId);
      break;

    case '/download':
      await sendDownloadLink(chatId);
      break;

    case '/analyze':
      await sendAnalyzeLink(chatId);
      break;

    case '/pricing':
      await sendPricingLink(chatId);
      break;

    case '/dashboard':
      await sendDashboardLink(chatId);
      break;

    case '/help':
      await sendHelp(chatId);
      break;

    default:
      await sendMessage(chatId, '❓ 不认识这个命令。使用 /help 查看可用命令。');
  }
}

/**
 * 处理普通消息
 */
async function handleMessage(chatId: number, text: string) {
  // 如果消息包含小红书链接，提供下载选项
  if (text.includes('xiaohongshu.com')) {
    await sendMessage(
      chatId,
      '🎉 检测到小红书链接！\n\n点击下方按钮打开下载器：',
      {
        inline_keyboard: [
          [
            { text: '⬇️ 打开下载器', url: `${BASE_URL}/download` },
          ],
        ],
      }
    );
  } else {
    // 其他消息
    await sendMessage(
      chatId,
      '👋 你好！我是 XHS Downloader 机器人。\n\n使用 /help 查看可用命令。'
    );
  }
}

/**
 * 处理回调查询
 */
async function handleCallback(chatId: number, data: string, callbackId: string) {
  // 回复回调查询（移除加载状态）
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      callback_query_id: callbackId,
      text: '✅ 已打开',
      show_alert: false,
    }),
  });
}

/**
 * 发送开始消息
 */
async function sendStartMessage(chatId: number, userName: string) {
  const keyboard = {
    inline_keyboard: [
      [
        { text: '🧪 打开测试', callback_data: 'test' },
        { text: '❓ 帮助', callback_data: 'help' },
      ],
      [
        { text: '🔗 完整测试页面', url: `${BASE_URL}/api/test-links` },
      ],
    ],
  };

  await sendMessage(
    chatId,
    `👋 欢迎 ${userName}！\n\n🌙 <b>XHS Downloader</b>\n\n无水印下载小红书视频，支持分析和变现。\n\n点击下方按钮开始：`,
    keyboard,
    'HTML'
  );
}

/**
 * 发送测试链接
 */
async function sendTestLinks(chatId: number) {
  const keyboard = {
    inline_keyboard: [
      [
        { text: '🏠 首页', url: `${BASE_URL}/` },
        { text: '⬇️ 下载', url: `${BASE_URL}/download` },
      ],
      [
        { text: '📊 分析', url: `${BASE_URL}/analyze` },
        { text: '💰 定价', url: `${BASE_URL}/pricing` },
      ],
      [
        { text: '📈 仪表板', url: `${BASE_URL}/dashboard` },
      ],
      [
        { text: '🔗 完整测试页面', url: `${BASE_URL}/api/test-links` },
      ],
    ],
  };

  await sendMessage(
    chatId,
    '🌙 <b>XHS Downloader 测试链接</b>\n\n点击下方按钮打开功能：',
    keyboard,
    'HTML'
  );
}

/**
 * 发送下载链接
 */
async function sendDownloadLink(chatId: number) {
  const keyboard = {
    inline_keyboard: [
      [
        { text: '⬇️ 打开下载器', url: `${BASE_URL}/download` },
      ],
    ],
  };

  await sendMessage(
    chatId,
    '⬇️ <b>下载功能</b>\n\n无水印下载小红书视频。\n\n点击下方按钮打开：',
    keyboard,
    'HTML'
  );
}

/**
 * 发送分析链接
 */
async function sendAnalyzeLink(chatId: number) {
  const keyboard = {
    inline_keyboard: [
      [
        { text: '📊 打开分析器', url: `${BASE_URL}/analyze` },
      ],
    ],
  };

  await sendMessage(
    chatId,
    '📊 <b>分析功能</b>\n\n分析视频内容、互动率和趋势。\n\n点击下方按钮打开：',
    keyboard,
    'HTML'
  );
}

/**
 * 发送定价链接
 */
async function sendPricingLink(chatId: number) {
  const keyboard = {
    inline_keyboard: [
      [
        { text: '💰 查看定价', url: `${BASE_URL}/pricing` },
      ],
    ],
  };

  const pricingText = `
💰 <b>定价</b>

<b>单次下载</b>
$0.50 / 次

<b>月度订阅</b>
$5.00 / 月
✅ 无限下载
✅ 高级分析
✅ 无广告

<b>年度订阅</b>
$45.00 / 年
✅ 无限下载
✅ 高级分析
✅ 无广告
✅ 省 $5

点击下方按钮查看详情：
  `;

  await sendMessage(chatId, pricingText, keyboard, 'HTML');
}

/**
 * 发送仪表板链接
 */
async function sendDashboardLink(chatId: number) {
  const keyboard = {
    inline_keyboard: [
      [
        { text: '📈 打开仪表板', url: `${BASE_URL}/dashboard` },
      ],
    ],
  };

  await sendMessage(
    chatId,
    '📈 <b>用户仪表板</b>\n\n查看你的下载历史和统计数据。\n\n点击下方按钮打开：',
    keyboard,
    'HTML'
  );
}

/**
 * 发送帮助信息
 */
async function sendHelp(chatId: number) {
  const helpText = `
🌙 <b>XHS Downloader 帮助</b>

<b>可用命令：</b>
/start - 开始
/test - 打开测试链接
/download - 下载功能
/analyze - 分析功能
/pricing - 查看定价
/dashboard - 用户仪表板
/help - 显示此帮助

<b>功能：</b>
✅ 无水印下载小红书视频
✅ 分析视频内容和互动
✅ 支持订阅和付费功能

<b>定价：</b>
💰 单次下载：$0.50
💰 月度订阅：$5.00
💰 年度订阅：$45.00

<b>问题反馈：</b>
如有问题，请访问：${BASE_URL}
  `;

  await sendMessage(chatId, helpText, undefined, 'HTML');
}

/**
 * 发送消息
 */
async function sendMessage(
  chatId: number,
  text: string,
  replyMarkup?: any,
  parseMode: string = 'HTML'
) {
  const payload: any = {
    chat_id: chatId,
    text,
    parse_mode: parseMode,
  };

  if (replyMarkup) {
    payload.reply_markup = replyMarkup;
  }

  const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  console.log('[Telegram] Send message response:', data);
  return data;
}

// 健康检查
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Telegram webhook is running',
    botToken: BOT_TOKEN ? '✅ Configured' : '❌ Not configured',
  });
}
