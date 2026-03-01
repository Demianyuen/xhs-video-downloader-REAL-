'use client';

import { motion } from "framer-motion";
import { Zap, ShieldCheck, Download, Layers } from "lucide-react";

export function Features() {
  const cards = [
    {
      title: "Lightning Fast API",
      description: "Our distributed network extracts media in milliseconds, straight from the source.",
      icon: <Zap className="w-5 h-5 text-[#FEB372]" />,
      colSpan: "col-span-1 md:col-span-2",
      bgClass: "bg-gradient-to-br from-[#111111] to-[#0A0A0A]",
      visual: (
        <div className="absolute right-0 bottom-0 opacity-20 w-48 h-48 translate-x-12 translate-y-12">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FEB372" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,89.9,-16.3,89.3,-0.3C88.6,15.6,84.9,31.3,76.5,44.5C68.1,57.7,55,68.5,40.6,75.1C26.1,81.7,10.1,84.2,-5.1,82.8C-20.3,81.4,-34.7,76.1,-48.8,69C-62.8,61.9,-76.5,52.9,-84.6,39.9C-92.7,26.9,-95.3,9.8,-92.9,-6.2C-90.4,-22.1,-82.9,-37,-71.8,-48.5C-60.7,-59.9,-46,-67.9,-31.9,-75.1C-17.8,-82.3,-4.2,-88.7,10.1,-88.1C24.4,-87.6,30.5,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
        </div>
      )
    },
    {
      title: "Zero Watermarks",
      description: "Clean original files, perfect for repurposing and offline viewing.",
      icon: <ShieldCheck className="w-5 h-5 text-[#BFC9C6]" />,
      colSpan: "col-span-1",
      bgClass: "bg-[#111111]",
      visual: null
    },
    {
      title: "Golden Gated Security",
      description: "We never store your downloads. Every extraction is encrypted and ephemeral.",
      icon: <Layers className="w-5 h-5 text-[#F84F1D]" />,
      colSpan: "col-span-1",
      bgClass: "bg-[#111111]",
      visual: null
    },
    {
      title: "4K & High Framerate Support",
      description: "If the creator uploaded it in 4K, you get it in 4K. No compression on our end.",
      icon: <Download className="w-5 h-5 text-[#FECE9D]" />,
      colSpan: "col-span-1 md:col-span-2",
      bgClass: "relative overflow-hidden",
      visual: (
        <div className="absolute inset-0 bg-gradient-to-br from-[#F84F1D]/20 via-[#FEB372]/10 to-transparent" />
      )
    }
  ];

  return (
    <section id="features" className="w-full max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-4">
          Built for Scale. <br className="hidden md:block" />
          <span className="text-[#96A5A0]">Designed for Speed.</span>
        </h2>
        <p className="text-[#BFC9C6] text-lg max-w-xl mx-auto">
          The ultimate Xiaohongshu extraction toolkit, wrapped in a developer-first interface.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`group relative rounded-2xl border border-[#333] hover:border-[#96A5A0]/50 transition-colors p-8 overflow-hidden flex flex-col justify-between min-h-[280px] ${card.colSpan} ${card.bgClass}`}
          >
            {card.visual}

            <div className="relative z-20 flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 mb-8 backdrop-blur-md shadow-lg shadow-black/50">
              {card.icon}
            </div>

            <div className="relative z-20">
              <h3 className="text-xl font-medium text-white mb-3 tracking-tight">
                {card.title}
              </h3>
              <p className="text-[#BFC9C6] leading-relaxed text-sm max-w-sm">
                {card.description}
              </p>
            </div>

            {/* Subtle glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#F84F1D]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
