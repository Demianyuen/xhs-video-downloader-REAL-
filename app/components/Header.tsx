'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { DownloadCloud } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-md">
      {/* 1px gradient glow bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FEB372]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-white font-medium">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F84F1D] to-[#96A5A0] flex items-center justify-center p-1 shadow-[0_0_15px_rgba(248,79,29,0.3)]">
            <DownloadCloud className="w-5 h-5 text-white" />
          </div>
          <span className="tracking-tight">XHS Downloader</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-[#BFC9C6]">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-to" className="hover:text-white transition-colors">How it Works</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </nav>

        <div className="flex items-center gap-4">
          <motion.a
            href="#downloader"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 text-sm font-medium text-white rounded-full bg-[#F84F1D] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),_0_0_20px_rgba(248,79,29,0.3)] border border-[#F84F1D]/50 hover:bg-[#F84F1D]/90 transition-all"
          >
            Download Free
          </motion.a>
        </div>
      </div>
    </header>
  );
}
