'use client';

import { useState } from 'react';
import { Metadata } from 'next';

// This is needed for static page with 'use client'
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with email service or form handler
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

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
            <a href="/about" className="text-gray-600 hover:text-gray-900 transition">About</a>
            <a href="/contact" className="text-pink-600 font-semibold transition">Contact</a>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">
            联系我们 - We'd love to hear from you!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-2xl">📧</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">support@xhsvideodownloader.com</p>
                  <p className="text-sm text-gray-500">技术支持：tech@xhsvideodownloader.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-2xl">🌐</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Website</h3>
                  <p className="text-gray-600">https://xhsvideodownloader.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-2xl">🕐</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Response Time</h3>
                  <p className="text-gray-600">通常24小时内回复</p>
                  <p className="text-sm text-gray-500">Usually within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                Thank you! Your message has been sent. We'll get back to you soon!
                <br />
                感谢您的留言！我们会尽快回复。
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name / 姓名 *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email / 邮箱 *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject / 主题 *
                  </label>
                  <select
                    id="subject"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="">Select a topic / 选择主题</option>
                    <option value="general">General Inquiry / 一般咨询</option>
                    <option value="technical">Technical Support / 技术支持</option>
                    <option value="feedback">Feedback / 反馈建议</option>
                    <option value="bug">Bug Report / 错误报告</option>
                    <option value="business">Business Inquiry / 商务合作</option>
                    <option value="other">Other / 其他</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message / 留言 *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="How can we help you? / 我们可以如何帮助您？"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-3 rounded-lg transition shadow-lg"
                >
                  Send Message / 发送留言
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 mb-6">
            Before contacting us, check out our <a href="/faq" className="text-pink-600 hover:underline">FAQ page</a>
            for quick answers to common questions.
          </p>
          <p className="text-gray-600">
            在联系我们之前，请查看我们的 <a href="/faq" className="text-pink-600 hover:underline">常见问题</a>
            页面，获取常见问题的快速解答。
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
