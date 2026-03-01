'use client';

import { motion } from "framer-motion";
import { Link, Clipboard, DownloadCloud } from "lucide-react";

export function HowToUse() {
  const steps = [
    {
      title: "Copy the Link",
      description: "Open Xiaohongshu, find the video or image post you want to save, tap share, and select 'Copy Link'.",
      icon: <Link className="w-6 h-6 text-[#FEB372]" />,
    },
    {
      title: "Paste the URL",
      description: "Return to our downloader and paste the link into the input field above.",
      icon: <Clipboard className="w-6 h-6 text-[#F84F1D]" />,
    },
    {
      title: "Download HQ File",
      description: "Click download. Our servers will process the link and provide you with a high-quality, watermark-free file.",
      icon: <DownloadCloud className="w-6 h-6 text-[#FECE9D]" />,
    }
  ];

  return (
    <section id="how-to" className="w-full bg-[#111111] border-y border-[#333] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-6">
            Three Steps to <br />
            <span className="text-[#F84F1D]">Golden Quality.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-[1px] bg-gradient-to-r from-transparent via-[#96A5A0]/30 to-transparent" />

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="relative flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 rounded-2xl bg-[#0A0A0A] border border-[#333] group-hover:border-[#F84F1D]/50 transition-colors flex items-center justify-center mb-8 relative z-10 shadow-xl">
                {step.icon}
                <div className="absolute -inset-2 bg-[#F84F1D]/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <h3 className="text-xl font-medium text-white mb-4">
                {step.title}
              </h3>

              <p className="text-[#BFC9C6] leading-relaxed max-w-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
