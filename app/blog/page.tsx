'use client';

import Link from 'next/link';
import { useI18n } from '@/app/lib/i18n';
import { BookOpen, Calendar, ArrowRight } from 'lucide-react';

const blogArticles = [
  {
    slug: 'how-to-download-xhs-videos',
    date: '2026-03-08',
  },
  {
    slug: 'xhs-content-creation-tips',
    date: '2026-03-05',
  },
  {
    slug: 'save-xhs-posts-offline',
    date: '2026-03-01',
  },
  {
    slug: 'xhs-vs-other-platforms',
    date: '2026-02-25',
  },
  {
    slug: 'extract-text-from-xhs-images',
    date: '2026-02-20',
  },
];

export default function BlogPage() {
  const { t, locale } = useI18n();

  const blogContent = {
    'zh-Hant': {
      pageTitle: '部落格',
      pageSubtitle: '小紅書使用技巧、下載教學與內容創作指南',
      readMore: '閱讀全文',
      articles: [
        {
          title: '如何下載小紅書視頻：完整指南',
          excerpt: '詳細介紹如何使用我們的工具快速下載小紅書無水印視頻，包括常見問題解答和最佳實踐建議。',
        },
        {
          title: '小紅書內容創作技巧：打造爆款筆記',
          excerpt: '分享小紅書內容創作的核心策略，從選題、拍攝到文案撰寫，幫助你提升筆記曝光率和互動率。',
        },
        {
          title: '如何保存小紅書內容供離線查看',
          excerpt: '學習如何有效地保存小紅書的視頻和圖文內容，建立個人靈感庫，隨時隨地查看收藏的內容。',
        },
        {
          title: '小紅書 vs 其他社交平台：優勢分析',
          excerpt: '深入比較小紅書與抖音、Instagram、微博等平台的特點，幫助創作者選擇最適合的內容發布平台。',
        },
        {
          title: '如何從小紅書圖文筆記中提取文字',
          excerpt: '介紹使用 OCR 技術從小紅書圖片筆記中提取文字的方法，方便保存和整理有價值的文字內容。',
        },
      ],
    },
    'zh-Hans': {
      pageTitle: '博客',
      pageSubtitle: '小红书使用技巧、下载教学与内容创作指南',
      readMore: '阅读全文',
      articles: [
        {
          title: '如何下载小红书视频：完整指南',
          excerpt: '详细介绍如何使用我们的工具快速下载小红书无水印视频，包括常见问题解答和最佳实践建议。',
        },
        {
          title: '小红书内容创作技巧：打造爆款笔记',
          excerpt: '分享小红书内容创作的核心策略，从选题、拍摄到文案撰写，帮助你提升笔记曝光率和互动率。',
        },
        {
          title: '如何保存小红书内容供离线查看',
          excerpt: '学习如何有效地保存小红书的视频和图文内容，建立个人灵感库，随时随地查看收藏的内容。',
        },
        {
          title: '小红书 vs 其他社交平台：优势分析',
          excerpt: '深入比较小红书与抖音、Instagram、微博等平台的特点，帮助创作者选择最适合的内容发布平台。',
        },
        {
          title: '如何从小红书图文笔记中提取文字',
          excerpt: '介绍使用 OCR 技术从小红书图片笔记中提取文字的方法，方便保存和整理有价值的文字内容。',
        },
      ],
    },
    'en': {
      pageTitle: 'Blog',
      pageSubtitle: 'XHS tips, download guides, and content creation strategies',
      readMore: 'Read More',
      articles: [
        {
          title: 'How to Download XHS Videos: Complete Guide',
          excerpt: 'A detailed guide on using our tool to quickly download Xiaohongshu videos without watermarks, including FAQs and best practices.',
        },
        {
          title: 'XHS Content Creation Tips: Create Viral Posts',
          excerpt: 'Core strategies for creating engaging Xiaohongshu content, from topic selection to filming and copywriting, to boost visibility and engagement.',
        },
        {
          title: 'How to Save XHS Posts for Offline Viewing',
          excerpt: 'Learn how to effectively save Xiaohongshu videos and image posts to build a personal inspiration library accessible anytime, anywhere.',
        },
        {
          title: 'XHS vs Other Social Platforms: Advantages Analysis',
          excerpt: 'In-depth comparison of Xiaohongshu with Douyin, Instagram, Weibo, and other platforms to help creators choose the best publishing platform.',
        },
        {
          title: 'How to Extract Text from XHS Image Posts',
          excerpt: 'Introduction to using OCR technology to extract text from Xiaohongshu image posts, making it easy to save and organize valuable text content.',
        },
      ],
    },
  };

  const content = blogContent[locale];

  return (
    <main className="max-w-4xl mx-auto px-4 pt-8 sm:pt-12 pb-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-orange-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <BookOpen className="w-4 h-4" />
          <span>{content.pageTitle}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-orange-500 mb-4">
          {content.pageTitle}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {content.pageSubtitle}
        </p>
      </div>

      <div className="space-y-6">
        {blogArticles.map((article, index) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="block bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-pink-100 hover:border-pink-300 group"
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <Calendar className="w-4 h-4" />
                <time dateTime={article.date}>{article.date}</time>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">
                {content.articles[index].title}
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {content.articles[index].excerpt}
              </p>
              <div className="flex items-center gap-2 text-pink-600 font-medium group-hover:gap-3 transition-all">
                <span>{content.readMore}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
