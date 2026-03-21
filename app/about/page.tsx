import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - XHS Video Downloader',
  description: 'Learn about XHS Video Downloader - your trusted tool for downloading Xiaohongshu videos without watermark.',
  keywords: 'XHS Video Downloader about, 小红书下载器关于我们',
};

export default function AboutPage() {
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
            <a href="/blog" className="text-gray-600 hover:text-gray-900 transition">Blog</a>
            <a href="/about" className="text-pink-600 font-semibold transition">About</a>
            <a href="/contact" className="text-gray-600 hover:text-gray-900 transition">Contact</a>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About XHS Video Downloader</h1>
          <p className="text-lg text-gray-600 mb-8">
            关于我们 - 你值得信赖的小红书视频下载工具
          </p>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Our Mission</h2>
              <p className="mb-4">
                XHS Video Downloader was founded with a simple mission: to make it easy for everyone to save
                and enjoy Xiaohongshu (小红书) content offline. We believe that content creators work hard to
                produce amazing videos, and users should have the freedom to watch them anytime, anywhere.
              </p>
              <p className="text-gray-600">
                我们的使命很简单：让每个人都能轻松地离线观看小红书内容。我们相信内容创作者辛勤制作精彩视频，
                用户应该有权随时随地欣赏这些内容。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">What We Do</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Download Xiaohongshu videos without watermark</li>
                <li>Support both mobile app and desktop clipboard formats</li>
                <li>Provide high-quality original video downloads</li>
                <li>Maintain a simple, user-friendly interface</li>
                <li>Protect user privacy with minimal data collection</li>
                <li>下载无水印小红书视频</li>
                <li>支持手机和电脑剪贴板格式</li>
                <li>提供高质量原视频下载</li>
                <li>保持简单易用的界面</li>
                <li>保护用户隐私，最少数据收集</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Why Choose Us?</h2>
              <div className="grid md:grid-cols-3 gap-6 mt-4">
                <div className="text-center p-4 bg-pink-50 rounded-lg">
                  <div className="text-3xl mb-2">🚫</div>
                  <h3 className="font-bold mb-2">No Watermark</h3>
                  <p className="text-sm">Download original quality videos without any watermarks</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-3xl mb-2">⚡</div>
                  <h3 className="font-bold mb-2">Fast & Free</h3>
                  <p className="text-sm">Lightning-fast downloads, completely free forever</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-3xl mb-2">🔒</div>
                  <h3 className="font-bold mb-2">Safe & Private</h3>
                  <p className="text-sm">No registration required, no data collection</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">How It Works</h2>
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  <strong>Copy the video link</strong> from Xiaohongshu app or website
                  <br />
                  <span className="text-gray-600">从小红书应用或网站复制视频链接</span>
                </li>
                <li>
                  <strong>Paste the URL</strong> into our input box above
                  <br />
                  <span className="text-gray-600">将链接粘贴到上方的输入框中</span>
                </li>
                <li>
                  <strong>Click Download</strong> and save the video to your device
                  <br />
                  <span className="text-gray-600">点击下载按钮，将视频保存到您的设备</span>
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Privacy & Security</h2>
              <p className="mb-4">
                We take your privacy seriously. Here's our commitment:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>No account registration required</li>
                <li>No personal data collection beyond essential analytics</li>
                <li>Video URLs are automatically deleted after 24 hours</li>
                <li>We don't sell or share your data with third parties</li>
                <li>Secure HTTPS connection for all transfers</li>
                <li>无需注册账户</li>
                <li>除基本分析外不收集个人数据</li>
                <li>视频链接24小时后自动删除</li>
                <li>不与第三方出售或共享您的数据</li>
                <li>所有传输均使用安全HTTPS连接</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Contact Us</h2>
              <p className="mb-4">
                Have questions, feedback, or suggestions? We'd love to hear from you!
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p><strong>Email:</strong> support@xhsvideodownloader.com</p>
                <p><strong>Website:</strong> https://xhsvideodownloader.com</p>
              </div>
            </section>

            <section className="border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-500 text-center">
                © 2026 XHS Video Downloader. All rights reserved.
                <br />
                This tool is for personal use only. Please respect copyright laws and content creators' rights.
                <br />
                本工具仅供个人使用。请遵守版权法并尊重内容创作者的权利。
              </p>
            </section>
          </div>
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
