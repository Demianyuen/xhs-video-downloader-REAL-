'use client';

import { useI18n } from '@/app/lib/i18n';
import { useEffect } from 'react';

export default function FontProvider({ children }: { children: React.ReactNode }) {
  const { locale } = useI18n();

  useEffect(() => {
    const fontFamily = locale === 'zh-Hant'
      ? "'Noto Sans TC', sans-serif"
      : locale === 'zh-Hans'
      ? "'Noto Sans SC', sans-serif"
      : "var(--font-geist-sans), sans-serif";

    document.body.style.fontFamily = fontFamily;
    document.documentElement.lang = locale === 'zh-Hant' ? 'zh-TW'
      : locale === 'zh-Hans' ? 'zh-CN'
      : 'en';
  }, [locale]);

  return <>{children}</>;
}
