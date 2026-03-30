export type Language = 'en' | 'zh-CN' | 'zh-TW';

export const languages: Record<Language, { name: string; flag: string }> = {
  'en':    { name: 'English',    flag: '🇺🇸' },
  'zh-CN': { name: '简体中文',    flag: '🇨🇳' },
  'zh-TW': { name: '繁體中文',    flag: '🇹🇼' },
};

type TranslationKeys = {
  // Header
  header: {
    home: string;
    blog: string;
    about: string;
    faq: string;
  };
  // Hero
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
  };
  // Input
  input: {
    label: string;
    placeholder: string;
    button: string;
    processing: string;
    errorEmpty: string;
    errorGeneric: string;
  };
  // Features
  features: {
    noWatermark: { title: string; desc: string };
    fastFree: { title: string; desc: string };
    safePrivate: { title: string; desc: string };
  };
  // How it works
  howItWorks: {
    title: string;
    step1: { strong: string; text: string };
    step2: { strong: string; text: string };
    step3: { strong: string; text: string };
  };
  // Footer
  footer: {
    home: string;
    blog: string;
    about: string;
    privacy: string;
    terms: string;
    copyright: string;
    adSpace: string;
  };
  // Download page
  download: {
    loadingVideo: string;
    unableToLoad: string;
    dataNotRetrieved: string;
    goToHomepage: string;
    duration: string;
    quality: string;
    format: string;
    selectQuality: string;
    downloadVideo: string;
    downloading: string;
    downloadStarted: string;
    copyVideoLink: string;
    linkCopied: string;
    tabInfo: string;
    tabTranscript: string;
    tabImages: string;
    downloadInstructions: string;
    instructionSteps: string[];
    tipLabel: string;
    tipText: string;
    quickTips: string;
    quickTipItems: string[];
    share: string;
    downloadAnother: string;
    extractTranscript: string;
    extractingTranscript: string;
    extractTranscriptDesc: string;
    downloadTranscript: string;
    words: string;
    minRead: string;
    extractImages: string;
    extractingImages: string;
    extractImagesDesc: string;
    foundImages: string;
    imagesOriginalQuality: string;
    imageExtractionTip: string;
    noImagesFound: string;
    noTranscript: string;
    failedToExtract: string;
  };
};

const translations: Record<Language, TranslationKeys> = {
  en: {
    header: {
      home: 'Home',
      blog: 'Blog',
      about: 'About',
      faq: 'FAQ',
    },
    hero: {
      badge: 'Free · No Watermark · No Registration',
      title: 'XHS Video Downloader',
      subtitle: '小红书视频下载器',
      description: 'Free Xiaohongshu video downloader — no watermark, no registration, HD quality.',
    },
    input: {
      label: 'Paste Xiaohongshu URL',
      placeholder: 'https://www.xiaohongshu.com/explore/...',
      button: 'Download Video',
      processing: 'Processing...',
      errorEmpty: 'Please paste a valid XHS URL',
      errorGeneric: 'Error processing video. Please try again.',
    },
    features: {
      noWatermark: { title: 'No Watermark', desc: 'Original quality, no branding' },
      fastFree: { title: 'Fast & Free', desc: 'Lightning downloads, always free' },
      safePrivate: { title: 'Safe & Private', desc: 'No signup, no data collection' },
    },
    howItWorks: {
      title: 'How It Works',
      step1: { strong: 'Copy the video link', text: ' from the Xiaohongshu app or website.' },
      step2: { strong: 'Paste the URL', text: ' into the input box above.' },
      step3: { strong: 'Download', text: ' and save the video to your device.' },
    },
    footer: {
      home: 'Home',
      blog: 'Blog',
      about: 'About',
      privacy: 'Privacy',
      terms: 'Terms',
      copyright: '© 2026 XHS Video Downloader. All rights reserved.',
      adSpace: 'Advertisement Space',
    },
    download: {
      loadingVideo: 'Loading video...',
      unableToLoad: 'Unable to Load Video',
      dataNotRetrieved: 'The video data could not be retrieved. Please try again.',
      goToHomepage: 'Go to Homepage',
      duration: 'Duration',
      quality: 'Quality',
      format: 'Format',
      selectQuality: 'Select Quality',
      downloadVideo: 'Download Video',
      downloading: 'Downloading...',
      downloadStarted: 'Download Started!',
      copyVideoLink: 'Copy Video Link',
      linkCopied: 'Link Copied!',
      tabInfo: 'Info',
      tabTranscript: 'Transcript',
      tabImages: 'Images',
      downloadInstructions: 'Download Instructions',
      instructionSteps: [
        'Select your preferred video quality above',
        'Click the Download Video button',
        'Your browser will start downloading the file',
        'Save the file to your device',
      ],
      tipLabel: 'Tip:',
      tipText: 'Higher resolutions provide better quality but take longer to download.',
      quickTips: 'Quick Tips',
      quickTipItems: [
        'Select your preferred quality above',
        'Click Download — file saves to your device',
        "If download doesn't start, try Copy Link",
      ],
      share: 'Share',
      downloadAnother: 'Download Another Video',
      extractTranscript: 'Extract Transcript',
      extractingTranscript: 'Extracting...',
      extractTranscriptDesc: 'Extract the full text content from this XHS post, including captions and descriptions.',
      downloadTranscript: 'Download Transcript',
      words: 'words',
      minRead: 'min read',
      extractImages: 'Extract Images',
      extractingImages: 'Extracting...',
      extractImagesDesc: 'Extract all images from this XHS post including product photos and lifestyle shots.',
      foundImages: 'Found {count} image(s) from this post',
      imagesOriginalQuality: 'Images are downloaded in their original quality',
      imageExtractionTip: 'Image extraction works best for posts with multiple images.',
      noImagesFound: 'No images found in this post',
      noTranscript: 'No transcript available for this post',
      failedToExtract: 'Failed to extract',
    },
  },
  'zh-CN': {
    header: {
      home: '首页',
      blog: '博客',
      about: '关于',
      faq: '常见问题',
    },
    hero: {
      badge: '免费 · 无水印 · 无需注册',
      title: '小红书视频下载器',
      subtitle: 'XHS Video Downloader',
      description: '免费小红书视频下载工具 — 无水印、无需注册、高清画质。',
    },
    input: {
      label: '粘贴小红书链接',
      placeholder: 'https://www.xiaohongshu.com/explore/...',
      button: '下载视频',
      processing: '处理中...',
      errorEmpty: '请粘贴有效的小红书链接',
      errorGeneric: '处理视频时出错，请重试。',
    },
    features: {
      noWatermark: { title: '无水印', desc: '原始画质，无品牌标记' },
      fastFree: { title: '快速免费', desc: '闪电下载，永久免费' },
      safePrivate: { title: '安全私密', desc: '无需注册，不收集数据' },
    },
    howItWorks: {
      title: '使用方法',
      step1: { strong: '复制视频链接', text: '，从小红书 App 或网页复制。' },
      step2: { strong: '粘贴链接', text: '，粘贴到上方的输入框中。' },
      step3: { strong: '下载视频', text: '，保存视频到您的设备。' },
    },
    footer: {
      home: '首页',
      blog: '博客',
      about: '关于',
      privacy: '隐私政策',
      terms: '服务条款',
      copyright: '© 2026 XHS 视频下载器。保留所有权利。',
      adSpace: '广告位',
    },
    download: {
      loadingVideo: '加载视频中...',
      unableToLoad: '无法加载视频',
      dataNotRetrieved: '无法获取视频数据，请重试。',
      goToHomepage: '返回首页',
      duration: '时长',
      quality: '画质',
      format: '格式',
      selectQuality: '选择画质',
      downloadVideo: '下载视频',
      downloading: '下载中...',
      downloadStarted: '下载已开始！',
      copyVideoLink: '复制视频链接',
      linkCopied: '已复制！',
      tabInfo: '信息',
      tabTranscript: '文字稿',
      tabImages: '图片',
      downloadInstructions: '下载说明',
      instructionSteps: [
        '在上方选择您偏好的视频画质',
        '点击下载视频按钮',
        '浏览器将开始下载文件',
        '将文件保存到您的设备',
      ],
      tipLabel: '提示：',
      tipText: '更高的分辨率提供更好的画质，但下载时间更长。',
      quickTips: '使用提示',
      quickTipItems: [
        '在上方选择您偏好的画质',
        '点击下载 — 文件将保存到您的设备',
        '如果下载未开始，请尝试复制链接',
      ],
      share: '分享',
      downloadAnother: '下载另一个视频',
      extractTranscript: '提取文字稿',
      extractingTranscript: '提取中...',
      extractTranscriptDesc: '提取此小红书帖子的完整文字内容，包括标题和描述。',
      downloadTranscript: '下载文字稿',
      words: '字',
      minRead: '分钟阅读',
      extractImages: '提取图片',
      extractingImages: '提取中...',
      extractImagesDesc: '提取此小红书帖子的所有图片，包括产品照片和生活照片。',
      foundImages: '共找到 {count} 张图片',
      imagesOriginalQuality: '图片以原始画质下载',
      imageExtractionTip: '图片提取功能最适合包含多张图片的帖子。',
      noImagesFound: '此帖子中没有找到图片',
      noTranscript: '此帖子暂无文字稿',
      failedToExtract: '提取失败',
    },
  },
  'zh-TW': {
    header: {
      home: '首頁',
      blog: '部落格',
      about: '關於',
      faq: '常見問題',
    },
    hero: {
      badge: '免費 · 無浮水印 · 免註冊',
      title: '小紅書影片下載器',
      subtitle: 'XHS Video Downloader',
      description: '免費小紅書影片下載工具 — 無浮水印、免註冊、高畫質。',
    },
    input: {
      label: '貼上小紅書連結',
      placeholder: 'https://www.xiaohongshu.com/explore/...',
      button: '下載影片',
      processing: '處理中...',
      errorEmpty: '請貼上有效的小紅書連結',
      errorGeneric: '處理影片時發生錯誤，請重試。',
    },
    features: {
      noWatermark: { title: '無浮水印', desc: '原始畫質，無品牌標記' },
      fastFree: { title: '快速免費', desc: '閃電下載，永久免費' },
      safePrivate: { title: '安全私密', desc: '免註冊，不收集資料' },
    },
    howItWorks: {
      title: '使用方法',
      step1: { strong: '複製影片連結', text: '，從小紅書 App 或網頁複製。' },
      step2: { strong: '貼上連結', text: '，貼到上方的輸入框中。' },
      step3: { strong: '下載影片', text: '，儲存影片到您的裝置。' },
    },
    footer: {
      home: '首頁',
      blog: '部落格',
      about: '關於',
      privacy: '隱私權政策',
      terms: '服務條款',
      copyright: '© 2026 XHS 影片下載器。保留所有權利。',
      adSpace: '廣告位',
    },
    download: {
      loadingVideo: '載入影片中...',
      unableToLoad: '無法載入影片',
      dataNotRetrieved: '無法取得影片資料，請重試。',
      goToHomepage: '返回首頁',
      duration: '時長',
      quality: '畫質',
      format: '格式',
      selectQuality: '選擇畫質',
      downloadVideo: '下載影片',
      downloading: '下載中...',
      downloadStarted: '下載已開始！',
      copyVideoLink: '複製影片連結',
      linkCopied: '已複製！',
      tabInfo: '資訊',
      tabTranscript: '文字稿',
      tabImages: '圖片',
      downloadInstructions: '下載說明',
      instructionSteps: [
        '在上方選擇您偏好的影片畫質',
        '點擊下載影片按鈕',
        '瀏覽器將開始下載檔案',
        '將檔案儲存到您的裝置',
      ],
      tipLabel: '提示：',
      tipText: '更高的解析度提供更好的畫質，但下載時間更長。',
      quickTips: '使用提示',
      quickTipItems: [
        '在上方選擇您偏好的畫質',
        '點擊下載 — 檔案將儲存到您的裝置',
        '如果下載未開始，請嘗試複製連結',
      ],
      share: '分享',
      downloadAnother: '下載另一個影片',
      extractTranscript: '擷取文字稿',
      extractingTranscript: '擷取中...',
      extractTranscriptDesc: '擷取此小紅書貼文的完整文字內容，包括標題和描述。',
      downloadTranscript: '下載文字稿',
      words: '字',
      minRead: '分鐘閱讀',
      extractImages: '擷取圖片',
      extractingImages: '擷取中...',
      extractImagesDesc: '擷取此小紅書貼文的所有圖片，包括產品照片和生活照片。',
      foundImages: '共找到 {count} 張圖片',
      imagesOriginalQuality: '圖片以原始畫質下載',
      imageExtractionTip: '圖片擷取功能最適合包含多張圖片的貼文。',
      noImagesFound: '此貼文中沒有找到圖片',
      noTranscript: '此貼文暫無文字稿',
      failedToExtract: '擷取失敗',
    },
  },
};

export function t(lang: Language): TranslationKeys {
  return translations[lang];
}
