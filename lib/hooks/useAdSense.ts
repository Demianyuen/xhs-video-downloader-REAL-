'use client';

import { usePathname } from 'next/navigation';
import { shouldShowAds } from '@/lib/utils/ad-utils';

export function useAdSense() {
  const pathname = usePathname();
  const showAds = shouldShowAds(pathname);

  return { showAds, pathname };
}
