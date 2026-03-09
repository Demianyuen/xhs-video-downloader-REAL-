/**
 * AdSense Integration Component
 *
 * This component displays Google AdSense ads on your website.
 *
 * SETUP INSTRUCTIONS:
 * 1. Get your AdSense Publisher ID from https://www.google.com/adsense
 * 2. Update app/layout.tsx with your Publisher ID (ALREADY DONE: ca-pub-7935038704820292)
 * 3. Create ad units in your AdSense dashboard
 * 4. Replace the data-ad-slot values below with your actual ad slot IDs
 * 5. Ads will automatically appear once your AdSense account is approved
 */

'use client';

import { useEffect } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
}

export default function AdSense({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  style = { display: 'block' },
}: AdSenseProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-client="ca-pub-7935038704820292"
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive.toString()}
    />
  );
}

/**
 * USAGE EXAMPLES:
 *
 * 1. Display Ad (Top of page):
 * <AdSense adSlot="1234567890" adFormat="horizontal" />
 *
 * 2. In-feed Ad (Between content):
 * <AdSense adSlot="0987654321" adFormat="fluid" />
 *
 * 3. Sidebar Ad:
 * <AdSense adSlot="1122334455" adFormat="vertical" />
 */
