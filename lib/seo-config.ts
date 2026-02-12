/**
 * SEO Configuration and Metadata
 * Handles meta tags, structured data, and SEO optimization
 */

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  canonical?: string;
}

/**
 * Default SEO metadata
 */
export const defaultSEO: SEOMetadata = {
  title: 'XHS Video Downloader - Free Xiaohongshu Video Download',
  description: 'Download Xiaohongshu videos in multiple resolutions (1080p, 720p, 480p) for free. No registration, no installation required. Fast and easy.',
  keywords: [
    'XHS downloader',
    'Xiaohongshu downloader',
    'video downloader',
    'free video download',
    '小红书下载',
    '小红书视频下载',
  ],
  ogImage: 'https://xhs-downloader.vercel.app/og-image.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
};

/**
 * Page-specific SEO metadata
 */
export const pageSEO: Record<string, SEOMetadata> = {
  '/': defaultSEO,
  '/pricing': {
    title: 'Pricing - XHS Video Downloader',
    description: 'Simple and transparent pricing for XHS Video Downloader. Choose from Free, Premium, or Pay-Per-Use plans.',
    keywords: ['pricing', 'plans', 'subscription', 'premium'],
    canonical: 'https://xhs-downloader.vercel.app/pricing',
  },
  '/faq': {
    title: 'FAQ - XHS Video Downloader',
    description: 'Frequently asked questions about XHS Video Downloader. Find answers to common questions.',
    keywords: ['faq', 'help', 'support', 'questions'],
    canonical: 'https://xhs-downloader.vercel.app/faq',
  },
  '/about': {
    title: 'About - XHS Video Downloader',
    description: 'Learn about XHS Video Downloader, our mission, and values.',
    keywords: ['about', 'mission', 'values', 'team'],
    canonical: 'https://xhs-downloader.vercel.app/about',
  },
  '/privacy': {
    title: 'Privacy Policy - XHS Video Downloader',
    description: 'Privacy policy for XHS Video Downloader. Learn how we protect your data.',
    keywords: ['privacy', 'policy', 'data protection', 'gdpr'],
    canonical: 'https://xhs-downloader.vercel.app/privacy',
  },
  '/terms': {
    title: 'Terms of Service - XHS Video Downloader',
    description: 'Terms of service for XHS Video Downloader. Read our terms and conditions.',
    keywords: ['terms', 'service', 'conditions', 'legal'],
    canonical: 'https://xhs-downloader.vercel.app/terms',
  },
};

/**
 * Generate structured data (JSON-LD)
 */
export function generateStructuredData(page: string) {
  const baseStructure = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'XHS Video Downloader',
    description: 'Free Xiaohongshu video downloader',
    url: 'https://xhs-downloader.vercel.app',
    applicationCategory: 'Utility',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  if (page === '/pricing') {
    return {
      ...baseStructure,
      '@type': 'Product',
      offers: [
        {
          '@type': 'Offer',
          name: 'Free',
          price: '0',
          priceCurrency: 'CNY',
        },
        {
          '@type': 'Offer',
          name: 'Premium',
          price: '35',
          priceCurrency: 'CNY',
          priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        },
      ],
    };
  }

  return baseStructure;
}

/**
 * Generate sitemap entries
 */
export function generateSitemapEntries() {
  const baseUrl = 'https://xhs-downloader.vercel.app';
  const pages = [
    { url: '/', priority: 1.0, changefreq: 'daily' },
    { url: '/pricing', priority: 0.8, changefreq: 'weekly' },
    { url: '/faq', priority: 0.7, changefreq: 'monthly' },
    { url: '/about', priority: 0.6, changefreq: 'monthly' },
    { url: '/contact', priority: 0.6, changefreq: 'monthly' },
    { url: '/privacy', priority: 0.5, changefreq: 'yearly' },
    { url: '/terms', priority: 0.5, changefreq: 'yearly' },
  ];

  return pages.map(page => ({
    ...page,
    url: `${baseUrl}${page.url}`,
    lastmod: new Date().toISOString().split('T')[0],
  }));
}

/**
 * Get SEO metadata for a page
 */
export function getSEOMetadata(page: string): SEOMetadata {
  return pageSEO[page] || defaultSEO;
}

/**
 * Generate robots.txt content
 */
export function generateRobotsTxt() {
  return `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: https://xhs-downloader.vercel.app/sitemap.xml

# Crawl delay
Crawl-delay: 1

# Request rate
Request-rate: 1/1s
`;
}
