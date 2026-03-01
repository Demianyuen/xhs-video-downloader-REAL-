'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Does this downloader support 4K resolution?",
      a: "Yes. If the original Xiaohongshu post was uploaded in 4K, our API will fetch and provide the uncompressed 4K file for download.",
    },
    {
      q: "Are the downloads completely watermark-free?",
      a: "Absolutely. We strip all platform watermarks and overlays, delivering the clean source file directly to your device.",
    },
    {
      q: "Can I download images and carousels as well?",
      a: "Currently our downloader supports video links. Paste a video post link and we'll extract the high-quality, watermark-free video file.",
    },
    {
      q: "Is there a limit to how many videos I can download?",
      a: "Free users can download up to 5 videos per day with a 15-second cooldown between downloads. This helps us keep the service fast and reliable for everyone.",
    }
  ];

  return (
    <section id="faq" className="w-full max-w-4xl mx-auto px-6 py-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-6">
          Frequently Asked Questions.
        </h2>
        <p className="text-[#96A5A0] text-lg max-w-xl mx-auto">
          Everything you need to know about our Xiaohongshu extraction engine.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="border border-[#333] hover:border-[#96A5A0]/30 transition-colors rounded-2xl overflow-hidden bg-[#111111]/50 backdrop-blur-sm"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full px-8 py-6 flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F84F1D]/50"
            >
              <span className="text-lg font-medium text-white">{faq.q}</span>
              <ChevronDown
                className={`w-5 h-5 text-[#BFC9C6] transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-[#F84F1D]' : ''}`}
              />
            </button>
            <AnimatePresence>
              {openIndex === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-8 pb-6"
                >
                  <p className="text-[#BFC9C6] leading-relaxed">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
