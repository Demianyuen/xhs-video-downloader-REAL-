'use client';

import { motion } from "framer-motion";
import { DownloadCloud, Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#050505] border-t border-[#333] py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-[#96A5A0] text-sm">

        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 text-white font-medium mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F84F1D] to-[#96A5A0] flex items-center justify-center p-1 shadow-[0_0_15px_rgba(248,79,29,0.3)]">
              <DownloadCloud className="w-5 h-5 text-white" />
            </div>
            <span className="tracking-tight">XHS Downloader</span>
          </div>
          <p className="max-w-xs text-[#BFC9C6] mb-6">
            The fastest, most reliable Xiaohongshu extraction API wrapped in a beautiful interface. Download 4K media without watermarks instantly.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-[#333] flex items-center justify-center hover:bg-[#111111] hover:text-white transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-[#333] flex items-center justify-center hover:bg-[#111111] hover:text-[#1DA1F2] transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-medium mb-4">Product</h4>
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-white transition-colors">Downloader</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Developer API</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-4">Legal</h4>
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[#333]/50 flex flex-col md:flex-row items-center justify-between text-xs text-[#96A5A0]">
        <p>© {new Date().getFullYear()} XHS Downloader. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500" /> API Online
          </span>
        </div>
      </div>
    </footer>
  );
}
