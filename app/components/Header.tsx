'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Sparkles } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <header className="w-full bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-red-500">
            XHS Downloader
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          {/* Back to Home (show if not on home) */}
          {!isHome && (
            <Link 
              href="/" 
              className="flex items-center gap-1 text-gray-600 hover:text-pink-600 transition text-sm"
            >
              <Home className="w-4 h-4" />
              <span>返回首页</span>
            </Link>
          )}
          
          {/* About */}
          <Link 
            href="/about" 
            className={`text-sm font-medium transition ${
              pathname === '/about' 
                ? 'text-pink-600' 
                : 'text-gray-600 hover:text-pink-600'
            }`}
          >
            关于
          </Link>
        </nav>
      </div>
    </header>
  );
}
