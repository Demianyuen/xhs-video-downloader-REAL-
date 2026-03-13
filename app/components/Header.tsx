'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Sparkles } from 'lucide-react';
import { useI18n, LanguageSwitcher } from '@/app/lib/i18n';

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const { t, locale } = useI18n();

  const navLink = (href: string, label: string, extra = '') =>
    `text-sm font-medium transition ${extra} ${pathname === href || pathname.startsWith(href + '/') ? 'text-pink-600' : 'text-gray-600 hover:text-pink-600'}`;

  return (
    <header className="w-full bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-red-500">
            XHS Downloader
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-3">
            {!isHome && (
              <Link href="/" className="flex items-center gap-1 text-gray-600 hover:text-pink-600 transition text-sm">
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">{t.header.backToHome}</span>
              </Link>
            )}
            <Link href="/blog" className={navLink('/blog', '')}>
              {locale === 'en' ? 'Blog' : locale === 'zh-Hans' ? '博客' : '部落格'}
            </Link>
            <Link href="/guide" className={navLink('/guide', '', 'hidden sm:inline')}>
              {locale === 'en' ? 'Guide' : '指南'}
            </Link>
            <Link href="/about" className={navLink('/about', '', 'hidden sm:inline')}>
              {t.header.about}
            </Link>
            <Link href="/contact" className={navLink('/contact', '', 'hidden sm:inline')}>
              {locale === 'en' ? 'Contact' : locale === 'zh-Hans' ? '联系' : '聯繫'}
            </Link>
          </nav>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
