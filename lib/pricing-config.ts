// 三層定價配置
export interface PricingTier {
  id: string;
  name: string;
  nameEn: string;
  price: number; // 美元
  priceCents: number; // Stripe 用（美分）
  period: 'free' | 'month' | 'lifetime';
  description: string;
  descriptionEn: string;
  features: string[];
  featuresEn: string[];
  cta: string;
  ctaEn: string;
  popular?: boolean;
  stripePriceId?: string; // Stripe Price ID
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'free',
    name: '免費版',
    nameEn: 'Free',
    price: 0,
    priceCents: 0,
    period: 'free',
    description: '每日限量下載',
    descriptionEn: 'Limited daily downloads',
    features: [
      '每日 3 次免費下載',
      '標準畫質 (720p)',
      '基本客服支援',
      '15 秒冷卻時間',
    ],
    featuresEn: [
      '3 downloads per day',
      'Standard quality (720p)',
      'Basic support',
      '15s cooldown',
    ],
    cta: '免費開始',
    ctaEn: 'Start Free',
  },
  {
    id: 'monthly',
    name: '專業版',
    nameEn: 'Pro',
    price: 29,
    priceCents: 2900,
    period: 'month',
    description: '無限下載，專業首選',
    descriptionEn: 'Unlimited downloads for professionals',
    features: [
      '無限次數下載',
      '高清畫質 (1080p)',
      '批次下載功能',
      '優先客服支援',
      '無廣告體驗',
      'API 訪問權限',
    ],
    featuresEn: [
      'Unlimited downloads',
      'HD quality (1080p)',
      'Batch download',
      'Priority support',
      'No ads',
      'API access',
    ],
    cta: '立即升級',
    ctaEn: 'Upgrade Now',
    popular: true,
    stripePriceId: 'price_monthly_29', // 需替換成 Stripe 實際 Price ID
  },
  {
    id: 'lifetime',
    name: '尊享版',
    nameEn: 'Lifetime',
    price: 199,
    priceCents: 19900,
    period: 'lifetime',
    description: '一次付費，終身無限',
    descriptionEn: 'One-time payment, lifetime unlimited',
    features: [
      '終身無限下載',
      '4K 超清畫質',
      '高級分析功能',
      '專屬客服通道',
      '優先使用新功能',
      '商業使用授權',
      '專屬 Discord 群組',
    ],
    featuresEn: [
      'Lifetime unlimited',
      '4K Ultra HD',
      'Advanced analytics',
      'Dedicated support',
      'Early feature access',
      'Commercial license',
      'Private Discord',
    ],
    cta: '一勞永逸',
    ctaEn: 'Get Lifetime',
    stripePriceId: 'price_lifetime_199', // 需替換成 Stripe 實際 Price ID
  },
];

// Stripe 產品配置
export const STRIPE_PRODUCTS = {
  monthly: {
    name: 'XHS Downloader Pro - Monthly',
    description: 'Unlimited downloads, HD quality, API access',
    unitAmount: 2900, // $29.00
    currency: 'usd',
    recurring: { interval: 'month' },
  },
  lifetime: {
    name: 'XHS Downloader Lifetime',
    description: 'Lifetime unlimited downloads, 4K quality, commercial license',
    unitAmount: 19900, // $199.00
    currency: 'usd',
    // 一次性付款，無 recurring
  },
};

// 用戶等級權限對照
export const USER_TIERS = {
  free: {
    maxDownloadsPerDay: 3,
    maxQuality: '720p',
    cooldownSeconds: 15,
    batchDownload: false,
    apiAccess: false,
    supportLevel: 'basic',
  },
  monthly: {
    maxDownloadsPerDay: Infinity,
    maxQuality: '1080p',
    cooldownSeconds: 0,
    batchDownload: true,
    apiAccess: true,
    supportLevel: 'priority',
  },
  lifetime: {
    maxDownloadsPerDay: Infinity,
    maxQuality: '4k',
    cooldownSeconds: 0,
    batchDownload: true,
    apiAccess: true,
    supportLevel: 'dedicated',
    commercialUse: true,
  },
};

export type UserTier = keyof typeof USER_TIERS;