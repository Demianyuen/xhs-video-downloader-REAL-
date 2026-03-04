import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '如何下載小紅書視頻？完整教程 2026 | How to Download Xiaohongshu Videos',
  description: '詳細教程：如何免費下載小紅書視頻，去水印高清下載。Step-by-step guide to download Xiaohongshu (XHS) videos without watermark for free.',
  keywords: '小红书视频下载教程, 如何下载小红书视频, 小红书去水印, xhs video download tutorial',
};

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-white">
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
            <a href="/blog" className="text-gray-600 hover:text-gray-900 transition">Blog</a>
            <a href="/privacy" className="text-gray-600 hover:text-gray-900 transition">Privacy</a>
            <a href="/terms" className="text-gray-600 hover:text-gray-900 transition">Terms</a>
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-8">
          <Link href="/blog" className="text-pink-600 hover:text-pink-700 text-sm">← Back to Blog</Link>
        </div>

        <article>
          <header className="mb-10">
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
              <span>March 4, 2026</span>
              <span>·</span>
              <span>5 min read</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              如何下載小紅書視頻？完整教程 2026
            </h1>
            <p className="text-xl text-gray-500">How to Download Xiaohongshu Videos - Complete Guide 2026</p>
          </header>

          <div className="prose prose-lg max-w-none space-y-8 text-gray-700">

            <section>
              <p className="text-lg leading-relaxed">
                小紅書（Xiaohongshu / RED）是中國最受歡迎的社交媒體平台之一，擁有數億用戶分享生活、美食、旅遊和時尚內容。
                然而，小紅書官方並不提供視頻下載功能。本教程將教你如何免費下載小紅書視頻，並去除水印。
              </p>
              <p className="text-base text-gray-500 mt-2">
                Xiaohongshu (XHS / RED) is one of China's most popular social media platforms. However, it doesn't offer a built-in video download feature. This guide shows you how to download XHS videos for free without watermarks.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">為什麼需要下載小紅書視頻？</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>保存喜歡的視頻到本地設備</li>
                <li>創作者備份自己的內容</li>
                <li>離線觀看（無需網絡）</li>
                <li>分享到其他平台</li>
                <li>用於學習和參考</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">方法一：使用 XHS Video Downloader（推薦）</h2>
              <p className="mb-4">這是最簡單、最快速的方法，無需安裝任何軟件。</p>

              <div className="space-y-6">
                <div className="flex gap-4 p-4 bg-pink-50 rounded-xl border border-pink-100">
                  <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">打開小紅書，找到你想下載的視頻</h3>
                    <p className="text-sm text-gray-600">在小紅書 App 或網頁版找到你想下載的視頻內容。</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">複製視頻鏈接</h3>
                    <p className="text-sm text-gray-600">點擊分享按鈕，選擇「複製鏈接」。鏈接格式通常為：<code className="bg-gray-100 px-1 rounded">https://www.xiaohongshu.com/explore/...</code></p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                  <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">前往 XHS Video Downloader</h3>
                    <p className="text-sm text-gray-600">打開 <a href="https://xhsvideodownloader.com" className="text-pink-600 hover:underline">xhsvideodownloader.com</a>，將鏈接粘貼到輸入框中。</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
                  <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">4</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">點擊下載</h3>
                    <p className="text-sm text-gray-600">點擊「⬇️ Download Video」按鈕，選擇畫質，視頻將自動下載到你的設備。</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">常見問題 FAQ</h2>
              <div className="space-y-4">
                <details className="border border-gray-200 rounded-lg p-4">
                  <summary className="font-semibold cursor-pointer">下載的視頻有水印嗎？</summary>
                  <p className="mt-3 text-sm text-gray-600">使用 XHS Video Downloader 下載的視頻通常沒有水印，因為我們直接獲取原始視頻文件。</p>
                </details>
                <details className="border border-gray-200 rounded-lg p-4">
                  <summary className="font-semibold cursor-pointer">支持哪些視頻格式？</summary>
                  <p className="mt-3 text-sm text-gray-600">支持 MP4 格式，畫質從 360p 到 1080p 不等，取決於原始視頻的畫質。</p>
                </details>
                <details className="border border-gray-200 rounded-lg p-4">
                  <summary className="font-semibold cursor-pointer">每天可以下載多少個視頻？</summary>
                  <p className="mt-3 text-sm text-gray-600">免費版每天可以下載 5 個視頻。如需更多，請考慮升級到高級版。</p>
                </details>
                <details className="border border-gray-200 rounded-lg p-4">
                  <summary className="font-semibold cursor-pointer">下載是否合法？</summary>
                  <p className="mt-3 text-sm text-gray-600">下載視頻僅供個人使用。請勿將下載的視頻用於商業用途或重新發布，以尊重原創作者的版權。</p>
                </details>
              </div>
            </section>

            <section className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-2xl p-8 border border-pink-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">立即開始下載</h2>
              <p className="text-gray-600 mb-6">免費、快速、無需注册。現在就試試 XHS Video Downloader！</p>
              <a
                href="/"
                className="inline-block bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold py-3 px-8 rounded-lg hover:from-pink-600 hover:to-orange-600 transition shadow-lg"
              >
                ⬇️ 開始下載 Start Downloading
              </a>
            </section>

          </div>
        </article>
      </main>

      <footer className="border-t border-gray-100 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-500">
          <div className="flex justify-center gap-6 mb-4">
            <a href="/" className="hover:text-pink-500 transition">Home</a>
            <a href="/blog" className="hover:text-pink-500 transition">Blog</a>
            <a href="/privacy" className="hover:text-pink-500 transition">Privacy Policy</a>
            <a href="/terms" className="hover:text-pink-500 transition">Terms of Service</a>
          </div>
          <p>© 2026 XHS Video Downloader. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
