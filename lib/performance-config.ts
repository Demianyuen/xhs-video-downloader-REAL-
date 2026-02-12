/**
 * Performance Optimization Utilities
 * Handles image optimization, lazy loading, and performance monitoring
 */

export interface PerformanceMetrics {
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}

/**
 * Image optimization configuration
 */
export const imageOptimization = {
  formats: ['webp', 'jpg'],
  sizes: {
    thumbnail: 150,
    small: 300,
    medium: 600,
    large: 1200,
  },
  quality: {
    webp: 80,
    jpg: 85,
  },
};

/**
 * Get optimized image URL
 */
export function getOptimizedImageUrl(
  originalUrl: string,
  size: 'thumbnail' | 'small' | 'medium' | 'large' = 'medium',
  format: 'webp' | 'jpg' = 'webp'
): string {
  // In production, use image optimization service like Cloudinary or ImageKit
  // For now, return original URL
  return originalUrl;
}

/**
 * Performance monitoring
 */
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return;

  // Measure Web Vitals
  if ('web-vital' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log(`${entry.name}: ${entry.value}`);
      }
    });

    observer.observe({ entryTypes: ['largest-contentful-paint', 'layout-shift', 'first-input'] });
  }
}

/**
 * Get performance metrics
 */
export function getPerformanceMetrics(): Partial<PerformanceMetrics> {
  if (typeof window === 'undefined') return {};

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const paintEntries = performance.getEntriesByType('paint');

  return {
    pageLoadTime: navigation?.loadEventEnd - navigation?.fetchStart,
    firstContentfulPaint: paintEntries.find(e => e.name === 'first-contentful-paint')?.startTime,
  };
}

/**
 * Code splitting configuration
 */
export const codeSplittingConfig = {
  chunks: {
    vendor: ['react', 'react-dom', 'next'],
    common: ['components', 'utils'],
    pages: ['pages'],
  },
};

/**
 * Caching strategy
 */
export const cachingStrategy = {
  static: {
    maxAge: 31536000, // 1 year
    immutable: true,
  },
  dynamic: {
    maxAge: 3600, // 1 hour
    sMaxAge: 86400, // 1 day
  },
  api: {
    maxAge: 300, // 5 minutes
    sMaxAge: 3600, // 1 hour
  },
};

/**
 * Bundle size targets
 */
export const bundleSizeTargets = {
  js: 300, // KB
  css: 50, // KB
  images: 100, // KB per image
  total: 500, // KB
};

/**
 * Performance budget
 */
export const performanceBudget = {
  lighthouse: {
    performance: 90,
    accessibility: 90,
    bestPractices: 90,
    seo: 90,
  },
  webVitals: {
    lcp: 2500, // ms
    fid: 100, // ms
    cls: 0.1,
  },
};
