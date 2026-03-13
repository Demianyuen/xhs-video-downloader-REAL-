'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 語言類型
export type Locale = 'zh-Hant' | 'zh-Hans' | 'en';

// 翻譯對象
export const translations = {
  'zh-Hant': {
    title: '小紅書視頻下載器',
    subtitle: '免費下載小紅書無水印視頻',
    placeholder: '粘貼小紅書連結...',
    downloadBtn: '立即下載',
    downloading: '下載中...',
    cooldown: '秒後可再次下載',
    dailyLimit: '今日剩餘下載次數',
    error: {
      emptyUrl: '請輸入小紅書視頻連結',
      invalidUrl: '請提供有效的小紅書連結',
      limitReached: '今日下載次數已用完，明天再來！',
      waitCooldown: '請等待 $0 秒後再下載',
      downloadFailed: '下載失敗',
      unknown: '未知錯誤',
      retry: '請稍後重試',
    },
    features: {
      free: {
        title: '100% 免費',
        desc: '無隱藏費用，無高級計劃。永遠免費。',
      },
      fast: {
        title: '超級快速',
        desc: '使用優化伺服器，秒速下載視頻。',
      },
      safe: {
        title: '100% 安全',
        desc: '無需安裝，無需註冊，不收集數據。',
      },
    },
    footer: {
      rights: '保留所有權利',
      contact: '聯繫我們',
      desc: '免費下載小紅書視頻，無水印，無需註冊。',
      links: '快速連結',
      legal: '法律',
      guide: '使用指南',
      blog: '部落格',
      about: '關於我們',
      privacy: '隱私政策',
      terms: '服務條款',
    },
    faq: {
      title: '常見問題',
      items: [
        { q: '如何獲取小紅書分享連結？', a: '打開小紅書 App，找到想下載的視頻，點擊右上角「⋯」→「分享」→「複製連結」。複製的連結包含 xsec_token 參數，貼上到本站即可下載。' },
        { q: '為什麼需要完整的分享連結？', a: '小紅書的視頻需要驗證 token 才能訪問。完整的分享連結包含這個 token，讓我們的服務器能夠安全地提取視頻。' },
        { q: '下載的視頻有水印嗎？', a: '沒有。我們直接提取原始視頻文件，不含任何水印。' },
        { q: '支持哪些設備？', a: '支持所有設備：電腦（Windows/Mac）、手機（iOS/Android）、平板。只需瀏覽器即可，無需安裝任何軟件。' },
        { q: '每天可以下載幾個視頻？', a: '目前每天最多可免費下載 10 個視頻。如需更多，明天再來即可重置。' },
        { q: '下載的視頻可以商業使用嗎？', a: '不可以。本工具僅供個人學習和研究使用。請尊重原創作者的版權，不得將下載內容用於商業目的。' },
        { q: '視頻連結多久後失效？', a: '提取的視頻連結通常在 24 小時內有效。建議提取後立即下載。' },
        { q: '支持下載圖文筆記嗎？', a: '目前主要支持視頻下載。圖文筆記的圖片提取功能正在開發中，敬請期待。' },
      ],
    },
    language: '語言',
    header: {
      about: '關於',
      backToHome: '返回首頁',
    },
    badge: '',
    input: {
      placeholder: '粘貼小紅書分享連結（含 xsec_token）...',
      hint: '💡 在小紅書 App 點「分享 → 複製連結」，貼上完整連結即可',
    },
    trust: {
      ssl: 'SSL 加密',
      free: '無限免費',
    },
    preview: {
      title: '視頻預覽',
      downloadBtn: '下載視頻',
      downloading: '下載中...',
    },
    seo: {
      heading: '關於小紅書媒體存檔工具',
      whatIsTitle: '什麼是媒體存檔工具？',
      whatIsP1: 'XHS Downloader 是一個專為個人學習和研究目的設計的社交媒體內容存檔工具。我們的平台允許用戶安全地保存來自小紅書（Xiaohongshu）的視頻內容，用於離線查看、學習分析和個人收藏。這個工具特別適合內容創作者、研究人員、教育工作者和希望建立個人媒體庫的用戶。',
      whatIsP2: '我們的服務完全基於網頁技術，無需安裝任何軟件或瀏覽器擴展。只需複製小紅書視頻的分享鏈接，粘貼到我們的輸入框中，系統會自動處理並提供高質量的視頻文件供您保存。整個過程簡單、快速且完全免費。',
      techTitle: '技術原理與工作流程',
      techIntro: '我們的系統採用先進的 Web 技術棧構建，包括 Next.js 16、React 19 和 TypeScript。當您提交一個小紅書鏈接時，我們的後端服務器會：',
      techSteps: [
        '驗證鏈接的有效性和格式',
        '通過安全的 API 請求獲取視頻元數據',
        '提取視頻的原始媒體流地址',
        '處理並優化視頻文件以確保最佳質量',
        '通過加密的 HTTPS 連接將文件傳輸到您的設備',
      ],
      techOutro: '整個過程通常在 5-15 秒內完成，具體時間取決於視頻大小和您的網絡速度。我們的服務器部署在全球多個地區，確保無論您身在何處都能獲得快速穩定的服務。',
      formatsTitle: '支持的格式與質量選項',
      formatsIntro: '我們的工具支持小紅書平台上的所有視頻格式，包括標準視頻、短視頻和直播回放。系統會自動檢測可用的最高質量版本，通常提供以下選項：',
      formatsList: [
        '1080p Full HD：適合大屏幕觀看和專業用途',
        '720p HD：平衡質量與文件大小的理想選擇',
        '480p SD：適合移動設備和節省存儲空間',
        '360p：快速預覽和低帶寬環境',
      ],
      formatsOutro: '所有視頻都以 MP4 格式提供，這是最廣泛支持的視頻格式，可在幾乎所有設備和播放器上流暢播放。',
      privacyTitle: '隱私與安全保障',
      privacyIntro: '您的隱私是我們的首要關注。我們的服務遵循以下原則：',
      privacyList: [
        '不收集或存儲任何個人身份信息',
        '不記錄您訪問的視頻鏈接或內容',
        '所有通信通過 SSL/TLS 加密保護',
        '視頻處理完成後立即從服務器刪除',
        '不使用追蹤 Cookie 或第三方分析工具（除了基本的 Google Analytics）',
      ],
      privacyOutro: '我們建議用戶僅將此工具用於個人學習、研究和合法的內容存檔目的。請尊重原創作者的版權，不要將保存的內容用於商業用途或未經授權的再分發。',
      tipsTitle: '使用建議與最佳實踐',
      tipsIntro: '為了獲得最佳體驗，我們建議：',
      tipsList: [
        '使用穩定的網絡連接以確保下載不中斷',
        '在移動設備上使用時，確保有足夠的存儲空間',
        '遵守每日下載限制以確保服務對所有用戶公平可用',
        '定期清理下載文件夾以管理存儲空間',
        '如遇到問題，請嘗試刷新頁面或使用不同的瀏覽器',
      ],
      legalNotice: '法律聲明：本工具僅供個人學習和研究使用。用戶有責任確保其使用方式符合適用的法律法規和平台服務條款。我們不對用戶的使用行為承擔責任。',
    },
  },
  'zh-Hans': {
    title: '小红书视频下载器',
    subtitle: '免费下载小红书无水印视频',
    placeholder: '粘贴小红书视频链接...',
    downloadBtn: '立即下载',
    downloading: '下载中...',
    cooldown: '秒后可再次下载',
    dailyLimit: '今日剩余下载次数',
    error: {
      emptyUrl: '请输入小红书视频链接',
      invalidUrl: '请提供有效的小红书链接',
      limitReached: '今日下载次数已用完，明天再来！',
      waitCooldown: '请等待 $0 秒后再下载',
      downloadFailed: '下载失败',
      unknown: '未知错误',
      retry: '请稍后重试',
    },
    features: {
      free: {
        title: '100% 免费',
        desc: '无隐藏费用，无高级计划。永远免费。',
      },
      fast: {
        title: '超级快速',
        desc: '使用优化服务器，秒速下载视频。',
      },
      safe: {
        title: '100% 安全',
        desc: '无需安装，无需注册，不收集数据。',
      },
    },
    footer: {
      rights: '保留所有权利',
      contact: '联系我们',
      desc: '免费下载小红书视频，无水印，无需注册。',
      links: '快速链接',
      legal: '法律',
      guide: '使用指南',
      blog: '博客',
      about: '关于我们',
      privacy: '隐私政策',
      terms: '服务条款',
    },
    faq: {
      title: '常见问题',
      items: [
        { q: '如何获取小红书分享链接？', a: '打开小红书 App，找到想下载的视频，点击右上角「⋯」→「分享」→「复制链接」。复制的链接包含 xsec_token 参数，粘贴到本站即可下载。' },
        { q: '为什么需要完整的分享链接？', a: '小红书的视频需要验证 token 才能访问。完整的分享链接包含这个 token，让我们的服务器能够安全地提取视频。' },
        { q: '下载的视频有水印吗？', a: '没有。我们直接提取原始视频文件，不含任何水印。' },
        { q: '支持哪些设备？', a: '支持所有设备：电脑（Windows/Mac）、手机（iOS/Android）、平板。只需浏览器即可，无需安装任何软件。' },
        { q: '每天可以下载几个视频？', a: '目前每天最多可免费下载 10 个视频。如需更多，明天再来即可重置。' },
        { q: '下载的视频可以商业使用吗？', a: '不可以。本工具仅供个人学习和研究使用。请尊重原创作者的版权，不得将下载内容用于商业目的。' },
        { q: '视频链接多久后失效？', a: '提取的视频链接通常在 24 小时内有效。建议提取后立即下载。' },
        { q: '支持下载图文笔记吗？', a: '目前主要支持视频下载。图文笔记的图片提取功能正在开发中，敬请期待。' },
      ],
    },
    language: '语言',
    header: {
      about: '关于',
      backToHome: '返回首页',
    },
    badge: '',
    input: {
      placeholder: '粘贴小红书分享链接（含 xsec_token）...',
      hint: '💡 在小红书 App 点「分享 → 复制链接」，粘贴完整链接即可',
    },
    trust: {
      ssl: 'SSL 加密',
      free: '无限免费',
    },
    preview: {
      title: '视频预览',
      downloadBtn: '下载视频',
      downloading: '下载中...',
    },
    seo: {
      heading: '关于小红书媒体存档工具',
      whatIsTitle: '什么是媒体存档工具？',
      whatIsP1: 'XHS Downloader 是一个专为个人学习和研究目的设计的社交媒体内容存档工具。我们的平台允许用户安全地保存来自小红书（Xiaohongshu）的视频内容，用于离线查看、学习分析和个人收藏。这个工具特别适合内容创作者、研究人员、教育工作者和希望建立个人媒体库的用户。',
      whatIsP2: '我们的服务完全基于网页技术，无需安装任何软件或浏览器扩展。只需复制小红书视频的分享链接，粘贴到我们的输入框中，系统会自动处理并提供高质量的视频文件供您保存。整个过程简单、快速且完全免费。',
      techTitle: '技术原理与工作流程',
      techIntro: '我们的系统采用先进的 Web 技术栈构建，包括 Next.js 16、React 19 和 TypeScript。当您提交一个小红书链接时，我们的后端服务器会：',
      techSteps: [
        '验证链接的有效性和格式',
        '通过安全的 API 请求获取视频元数据',
        '提取视频的原始媒体流地址',
        '处理并优化视频文件以确保最佳质量',
        '通过加密的 HTTPS 连接将文件传输到您的设备',
      ],
      techOutro: '整个过程通常在 5-15 秒内完成，具体时间取决于视频大小和您的网络速度。我们的服务器部署在全球多个地区，确保无论您身在何处都能获得快速稳定的服务。',
      formatsTitle: '支持的格式与质量选项',
      formatsIntro: '我们的工具支持小红书平台上的所有视频格式，包括标准视频、短视频和直播回放。系统会自动检测可用的最高质量版本，通常提供以下选项：',
      formatsList: [
        '1080p Full HD：适合大屏幕观看和专业用途',
        '720p HD：平衡质量与文件大小的理想选择',
        '480p SD：适合移动设备和节省存储空间',
        '360p：快速预览和低带宽环境',
      ],
      formatsOutro: '所有视频都以 MP4 格式提供，这是最广泛支持的视频格式，可在几乎所有设备和播放器上流畅播放。',
      privacyTitle: '隐私与安全保障',
      privacyIntro: '您的隐私是我们的首要关注。我们的服务遵循以下原则：',
      privacyList: [
        '不收集或存储任何个人身份信息',
        '不记录您访问的视频链接或内容',
        '所有通信通过 SSL/TLS 加密保护',
        '视频处理完成后立即从服务器删除',
        '不使用追踪 Cookie 或第三方分析工具（除了基本的 Google Analytics）',
      ],
      privacyOutro: '我们建议用户仅将此工具用于个人学习、研究和合法的内容存档目的。请尊重原创作者的版权，不要将保存的内容用于商业用途或未经授权的再分发。',
      tipsTitle: '使用建议与最佳实践',
      tipsIntro: '为了获得最佳体验，我们建议：',
      tipsList: [
        '使用稳定的网络连接以确保下载不中断',
        '在移动设备上使用时，确保有足够的存储空间',
        '遵守每日下载限制以确保服务对所有用户公平可用',
        '定期清理下载文件夹以管理存储空间',
        '如遇到问题，请尝试刷新页面或使用不同的浏览器',
      ],
      legalNotice: '法律声明：本工具仅供个人学习和研究使用。用户有责任确保其使用方式符合适用的法律法规和平台服务条款。我们不对用户的使用行为承担责任。',
    },
  },
  'en': {
    title: 'XHS Video Downloader',
    subtitle: 'Download Xiaohongshu videos without watermark',
    placeholder: 'Paste Xiaohongshu video URL...',
    downloadBtn: 'Download Now',
    downloading: 'Downloading...',
    cooldown: 'seconds until next download',
    dailyLimit: 'Downloads remaining today',
    error: {
      emptyUrl: 'Please enter a video URL',
      invalidUrl: 'Please provide a valid Xiaohongshu link',
      limitReached: "Daily limit reached. Come back tomorrow!",
      waitCooldown: 'Please wait $0 seconds before downloading',
      downloadFailed: 'Download failed',
      unknown: 'Unknown error',
      retry: 'Please try again later',
    },
    features: {
      free: {
        title: '100% Free',
        desc: 'No hidden fees, no premium plans. Completely free forever.',
      },
      fast: {
        title: 'Super Fast',
        desc: 'Download videos in seconds with optimized servers.',
      },
      safe: {
        title: '100% Safe',
        desc: 'No installation, no registration, no data collection.',
      },
    },
    footer: {
      rights: 'All rights reserved',
      contact: 'Contact',
      desc: 'Free Xiaohongshu video downloader. No watermark, no registration.',
      links: 'Quick Links',
      legal: 'Legal',
      guide: 'Guide',
      blog: 'Blog',
      about: 'About',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        { q: 'How do I get the XHS share link?', a: 'Open the XHS app, find the video you want, tap the ⋯ menu → Share → Copy Link. The copied link includes an xsec_token parameter — paste the full link here to download.' },
        { q: 'Why do I need the full share link?', a: 'XHS videos require a security token to access. The full share link from the app contains this token, which lets our server securely extract the video for you.' },
        { q: 'Are downloaded videos watermark-free?', a: 'Yes. We extract the original video file directly, with no watermarks added.' },
        { q: 'What devices are supported?', a: 'All devices — desktop (Windows/Mac), mobile (iOS/Android), and tablet. No software installation needed, just a browser.' },
        { q: 'How many videos can I download per day?', a: 'Up to 10 videos per day for free. The limit resets daily at midnight.' },
        { q: 'Can I use downloaded videos commercially?', a: 'No. This tool is for personal learning and research only. Please respect the original creator\'s copyright.' },
        { q: 'How long are download links valid?', a: 'Extracted video links are typically valid for 24 hours. We recommend downloading immediately after extraction.' },
        { q: 'Can I download image posts too?', a: 'Currently we focus on video downloads. Image post extraction is in development — stay tuned.' },
      ],
    },
    language: 'Language',
    header: {
      about: 'About',
      backToHome: 'Back to Home',
    },
    badge: '',
    input: {
      placeholder: 'Paste Xiaohongshu share link (with xsec_token)...',
      hint: '💡 In the XHS app, tap Share → Copy Link, then paste the full link here',
    },
    trust: {
      ssl: 'SSL Encrypted',
      free: 'Unlimited Free',
    },
    preview: {
      title: 'Video Preview',
      downloadBtn: 'Download Video',
      downloading: 'Downloading...',
    },
    seo: {
      heading: 'About XHS Media Archive Tool',
      whatIsTitle: 'What is a Media Archive Tool?',
      whatIsP1: 'XHS Downloader is a social media content archiving tool designed for personal learning and research purposes. Our platform allows users to safely save video content from Xiaohongshu for offline viewing, learning analysis, and personal collections. This tool is especially suitable for content creators, researchers, educators, and users who want to build a personal media library.',
      whatIsP2: 'Our service is entirely web-based — no software or browser extensions required. Simply copy the share link of a Xiaohongshu video, paste it into our input box, and the system will automatically process and provide a high-quality video file for you to save. The entire process is simple, fast, and completely free.',
      techTitle: 'How It Works',
      techIntro: 'Our system is built with an advanced web technology stack including Next.js, React, and TypeScript. When you submit a Xiaohongshu link, our backend server will:',
      techSteps: [
        'Validate the link format and authenticity',
        'Fetch video metadata via secure API requests',
        'Extract the original media stream URL',
        'Process and optimize the video file for best quality',
        'Transfer the file to your device via encrypted HTTPS',
      ],
      techOutro: 'The entire process typically completes in 5–15 seconds, depending on video size and your network speed. Our servers are deployed across multiple global regions to ensure fast, stable service wherever you are.',
      formatsTitle: 'Supported Formats & Quality Options',
      formatsIntro: 'Our tool supports all video formats on the Xiaohongshu platform, including standard videos, short videos, and live replays. The system automatically detects the highest available quality, typically offering:',
      formatsList: [
        '1080p Full HD: Best for large screens and professional use',
        '720p HD: Ideal balance of quality and file size',
        '480p SD: Great for mobile devices and saving storage',
        '360p: Quick preview and low-bandwidth environments',
      ],
      formatsOutro: 'All videos are provided in MP4 format, the most widely supported video format, playable on virtually all devices and players.',
      privacyTitle: 'Privacy & Security',
      privacyIntro: 'Your privacy is our top priority. Our service follows these principles:',
      privacyList: [
        'No collection or storage of personally identifiable information',
        'No logging of video links or content you access',
        'All communications protected by SSL/TLS encryption',
        'Videos deleted from servers immediately after processing',
        'No tracking cookies or third-party analytics (except basic Google Analytics)',
      ],
      privacyOutro: 'We recommend using this tool only for personal learning, research, and lawful content archiving. Please respect original creators\' copyrights and do not use saved content for commercial purposes or unauthorized redistribution.',
      tipsTitle: 'Tips & Best Practices',
      tipsIntro: 'For the best experience, we recommend:',
      tipsList: [
        'Use a stable network connection to ensure uninterrupted downloads',
        'On mobile devices, ensure you have sufficient storage space',
        'Respect daily download limits to keep the service fair for all users',
        'Regularly clean your downloads folder to manage storage',
        'If you encounter issues, try refreshing the page or using a different browser',
      ],
      legalNotice: 'Legal Notice: This tool is for personal learning and research use only. Users are responsible for ensuring their use complies with applicable laws and platform terms of service. We are not liable for user actions.',
    },
  },
};

// i18n Context
type I18nContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: typeof translations['zh-Hant'];
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('zh-Hant');

  useEffect(() => {
    // 从 localStorage 读取
    const saved = localStorage.getItem('xhs-locale') as Locale;
    if (saved && translations[saved]) {
      setLocaleState(saved);
    } else {
      // 检测浏览器语言
      const browserLang = navigator.language;
      if (browserLang.startsWith('zh')) {
        setLocaleState(browserLang.includes('Hans') || browserLang === 'zh-CN' ? 'zh-Hans' : 'zh-Hant');
      } else {
        setLocaleState('en');
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('xhs-locale', newLocale);
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: translations[locale] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}

// 语言切换组件
export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-gray-400">{t.language}:</span>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        className="bg-transparent text-gray-600 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-pink-500"
      >
        <option value="zh-Hant">繁體中文</option>
        <option value="zh-Hans">简体中文</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}