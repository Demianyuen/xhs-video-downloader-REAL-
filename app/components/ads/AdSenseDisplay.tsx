'use client';

import { useEffect } from 'react';
import { ADSENSE_CONFIG } from '@/lib/config/adsense-config';
import { trackAdImpression } from '@/lib/utils/ad-utils';

interface AdSenseDisplayProps {
  slotId: string;
  format?: 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
}

export function AdSenseDisplay({ slotId, format = 'horizontal', className = '' }: AdSenseDisplayProps) {
  useEffect(() => {
    if (ADSENSE_CONFIG.enabled && (window as any).adsbygoogle) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        trackAdImpression(slotId);
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, [slotId]);

  if (!ADSENSE_CONFIG.enabled || !slotId) return null;

  const formatClass = {
    horizontal: 'w-full h-24',
    vertical: 'w-64 h-96',
    rectangle: 'w-80 h-60',
  }[format];

  return (
    <div className={`flex justify-center ${formatClass} ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CONFIG.publisherId}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
