import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 語言類型
export type Locale = 'zh-Hant' | 'zh-Hans' | 'en';

// 翻譯對象
export const translations = {
  'zh-Hant': {
    title: '小紅書視頻下載器',
    subtitle: '免費下載小紅書無水印視頻',
    placeholder: '粘貼小紅書視頻連結...',
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
      rights: '版權所有',
      contact: '聯繫我們',
    },
    language: '語言',
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
      rights: '版权所有',
      contact: '联系我们',
    },
    language: '语言',
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
      contact: 'Contact us',
    },
    language: 'Language',
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