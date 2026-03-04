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
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50">
      <header className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎬</span>
            <a href="/" className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
              XHS Video Downloader
            </a>
          </div>
          <nav className="flex gap-6 text-sm">
            <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
            <a href="/blog" className="text-pink-600 font-semibold">Blog</a>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
        <p className="text-xl text-gray-600 mb-12">Tips, tutorials and guides for downloading Xiaohongshu videos</p>

        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime}</span>
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
      </main>

      <footer className="border-t border-gray-100 py-8 mt-16">
        <div className="max-w-5xl mx-auto px-6 text-center text-sm text-gray-500">
          <div className="flex justify-center gap-6 mb-4">
            <a href="/" className="hover:text-pink-500">Home</a>
            <a href="/privacy" className="hover:text-pink-500">Privacy Policy</a>
            <a href="/terms" className="hover:text-pink-500">Terms of Service</a>
          </div>
          <p>© 2026 XHS Video Downloader. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
