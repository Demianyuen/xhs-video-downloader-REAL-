import { ADSENSE_CONFIG } from '@/lib/config/adsense-config';

export function shouldShowAds(pathname: string): boolean {
  if (!ADSENSE_CONFIG.enabled) return false;
  return !ADSENSE_CONFIG.excludePaths.some(path => pathname.startsWith(path));
}

export function trackAdImpression(slotId: string): void {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'ad_impression', { slot_id: slotId });
  }
}

export function trackAffiliateClick(program: string, link: string): void {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'affiliate_click', {
      program,
      link,
      timestamp: new Date().toISOString(),
    });
  }
}
