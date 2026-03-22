import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog - XHS Video Downloader Tips & Tutorials',
  description: 'Learn how to download Xiaohongshu videos, tips and tutorials for XHS Video Downloader.',
};

const posts = [
  {
    slug: 'how-to-download-xiaohongshu-videos',
    title: '如何下載小紅書視頻？完整教程 2026',
    titleEn: 'How to Download Xiaohongshu Videos - Complete Guide 2026',
    date: '2026-03-04',
    excerpt: '小紅書視頻下載完整教程，包括去水印、高清下載等功能介紹。Learn how to download XHS videos without watermark.',
    readTime: '5 min read',
  },
  {
    slug: 'why-xiaohongshu-is-so-popular',
    title: '小红书为什么会这么火？深度解析',
    titleEn: 'Why Xiaohongshu (RED) Is So Popular: Deep Analysis',
    date: '2026-03-21',
    excerpt: '深入分析小红书火爆的原因，包括社区氛围、用户画像、内容生态和商业模式。Deep dive into why Xiaohongshu became successful.',
    readTime: '8 min read',
  },
  {
    slug: 'xiaohongshu-vs-douyin-comparison',
    title: '小红书vs抖音：内容平台深度对比分析',
    titleEn: 'Xiaohongshu vs Douyin: Comprehensive Platform Comparison',
    date: '2026-03-21',
    excerpt: '深度对比小红书和抖音的特点、用户群体、内容形式、算法机制和商业化模式。Compare XHS and Douyin across all dimensions.',
    readTime: '10 min read',
  },
  {
    slug: 'how-to-succeed-on-xiaohongshu-marketing',
    title: '如何在小红书上做内容营销？完整指南 2026',
    titleEn: 'How to Succeed on Xiaohongshu: Complete Marketing Guide',
    date: '2026-03-21',
    excerpt: '完整的小红书内容营销指南，包括账号定位、内容策略、增长技巧和变现方式。Complete guide to XHS marketing strategy.',
    readTime: '12 min read',
  },
  {
    slug: 'xiaohongshu-recommendation-algorithm-explained',
    title: '小红书推荐算法揭秘：如何让内容获得更多曝光',
    titleEn: 'Xiaohongshu Algorithm Explained: Get More Exposure',
    date: '2026-03-21',
    excerpt: '深度解析小红书推荐算法的工作原理、关键指标、流量池机制和优化技巧。Deep dive into XHS recommendation algorithm.',
    readTime: '15 min read',
  },
  {
    slug: 'xiaohongshu-zhongcao-psychology',
    title: '小红书"种草"文化背后的心理学深度解析',
    titleEn: 'The Psychology Behind Xiaohongshu "Zhongcao" Culture',
    date: '2026-03-21',
    excerpt: '深度解析小红书"种草"现象背后的心理学原理：社会认同、稀缺效应、损失厌恶等。Psychology behind zhongcao culture.',
    readTime: '10 min read',
  },
  {
    slug: 'ai-hallucination-deep-analysis',
    title: 'AI幻觉问题深度解析：大语言模型的信任危机',
    titleEn: 'AI Hallucination: The Trust Crisis of Large Language Models',
    date: '2026-03-21',
    excerpt: '深度解析AI幻觉现象的原因、影响和解决方案，以及为什么小红书等UGC平台更可信。Deep dive into AI hallucination causes, impacts, and solutions.',
    readTime: '12 min read',
  },
  {
    slug: 'xhs-community-trust-system',
    title: '小红书社区信任体系：如何用人为监督抵御AI虚假信息',
    titleEn: 'XHS Community Trust: Human Moderation Against AI Misinformation',
    date: '2026-03-21',
    excerpt: '深度解析小红书的社区信任体系和内容审核机制，如何用人为监督抵御AI虚假信息。How XHS community trust system combats AI misinformation.',
    readTime: '10 min read',
  },
  {
    slug: 'real-time-verification-ugc-platforms',
    title: '实时信息验证：为什么UGC平台在AI时代更具优势',
    titleEn: 'Real-Time Verification: Why UGC Platforms Have Edge in AI Era',
    date: '2026-03-21',
    excerpt: '深度解析UGC平台的实时信息验证优势，以及如何与AI生成内容形成互补。Why UGC platforms have real-time verification advantages over AI.',
    readTime: '8 min read',
  },
  {
    slug: 'ai-hallucination-vs-xhs-real-experiences',
    title: 'AI幻觉 vs 真实体验：对比案例研究',
    titleEn: 'AI Hallucination vs Real Experience: Comparative Case Studies',
    date: '2026-03-21',
    excerpt: '通过真实案例对比AI生成内容与小红书用户实际体验的差异。Compare AI outputs with real XHS user experiences through case studies.',
    readTime: '15 min read',
  },
  {
    slug: 'building-trust-human-verification-ai',
    title: '在AI时代重建信任：人类验证系统的力量',
    titleEn: 'Rebuilding Trust in the AI Era: The Power of Human Verification',
    date: '2026-03-21',
    excerpt: '深度解析如何通过人类验证系统与AI协作，建立更可靠的信息生态。How human verification systems can collaborate with AI for trust.',
    readTime: '11 min read',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50">
      <header className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎬</span>
            <a href="/" className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
              XHS Video Downloader
            </a>
          </div>
          <nav className="flex gap-6 text-sm">
            <a href="/" className="text-gray-600 hover:text-gray-900 transition">Home</a>
            <a href="/blog" className="text-pink-600 font-semibold transition">Blog</a>
            <a href="/about" className="text-gray-600 hover:text-gray-900 transition">About</a>
            <a href="/faq" className="text-gray-600 hover:text-gray-900 transition">FAQ</a>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-xl text-gray-600 mb-2">
            博客 - Tips, tutorials and guides for Xiaohongshu
          </p>
          <p className="text-gray-500">
            小红书视频下载技巧、教程、平台分析和营销指南
          </p>
        </div>

        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                <span>📅 {post.date}</span>
                <span>·</span>
                <span>⏱️ {post.readTime}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                <Link href={`/blog/${post.slug}`} className="hover:text-pink-600 transition">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-500 text-sm mb-1">{post.titleEn}</p>
              <p className="text-gray-600 mt-3 mb-5">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-pink-600 font-semibold hover:text-pink-700 transition"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-pink-100 to-orange-100 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">More Articles Coming Soon</h2>
          <p className="text-gray-700">
            We're regularly publishing new content about Xiaohongshu, AI tools, and video downloading.
            Stay tuned for more tips and tutorials!
          </p>
          <p className="text-gray-600 mt-2 text-sm">
            我们会定期发布关于小红书、AI工具和视频下载的新内容。敬请期待！
          </p>
        </div>
      </main>

      <footer className="border-t border-gray-100 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-500">
          <div className="flex justify-center gap-6 mb-4">
            <a href="/" className="hover:text-pink-500 transition">Home</a>
            <a href="/blog" className="hover:text-pink-500 transition">Blog</a>
            <a href="/about" className="hover:text-pink-500 transition">About</a>
            <a href="/contact" className="hover:text-pink-500 transition">Contact</a>
            <a href="/privacy" className="hover:text-pink-500 transition">Privacy</a>
            <a href="/terms" className="hover:text-pink-500 transition">Terms</a>
          </div>
          <p>© 2026 XHS Video Downloader. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
