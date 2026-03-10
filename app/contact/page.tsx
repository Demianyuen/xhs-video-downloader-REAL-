'use client';

import { useState } from 'react';
import { useI18n } from '@/app/lib/i18n';
import { Send, CheckCircle, Mail, MessageSquare, BookOpen } from 'lucide-react';

function ContactContent() {
  const { locale } = useI18n();
  const isEn = locale === 'en';
  const isHans = locale === 'zh-Hans';

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');

  const c = {
    title: isEn ? 'Contact Us' : isHans ? '联系我们' : '聯繫我們',
    intro: isEn
      ? "Have a question, bug report, or suggestion? Fill in the form and we'll get back to you within 24 hours."
      : isHans
      ? '有问题、错误报告或建议？填写表单，我们将在 24 小时内回复您。'
      : '有問題、錯誤報告或建議？填寫表單，我們將在 24 小時內回覆您。',
    formTitle: isEn ? 'Send us a message' : isHans ? '给我们发消息' : '給我們發訊息',
    name: isEn ? 'Your Name' : isHans ? '您的姓名' : '您的姓名',
    email: isEn ? 'Email Address' : isHans ? '电子邮件地址' : '電子郵件地址',
    subject: isEn ? 'Subject' : isHans ? '主题' : '主題',
    message: isEn ? 'Message' : isHans ? '留言内容' : '留言內容',
    messagePlaceholder: isEn
      ? 'Describe your issue or suggestion in detail...'
      : isHans ? '请详细描述您的问题或建议...' : '請詳細描述您的問題或建議...',
    send: isEn ? 'Send Message' : isHans ? '发送消息' : '發送訊息',
    sent: isEn ? "Message sent! We'll reply within 24 hours." : isHans ? '消息已发送！我们将在 24 小时内回复。' : '訊息已發送！我們將在 24 小時內回覆。',
    directEmail: isEn ? 'Or email us directly:' : isHans ? '或直接发送电子邮件：' : '或直接發送電子郵件：',
    faqTitle: isEn ? 'Check the Guide first' : isHans ? '先查看使用指南' : '先查看使用指南',
    faqText: isEn
      ? 'Many common questions are answered in our Guide page. Check there before reaching out.'
      : isHans ? '许多常见问题在我们的使用指南页面中都有解答，联系我们之前请先查看。'
      : '許多常見問題在我們的使用指南頁面中都有解答，聯繫我們之前請先查看。',
    guideBtn: isEn ? 'View Guide' : isHans ? '查看指南' : '查看指南',
    reportTitle: isEn ? 'Reporting a bug?' : isHans ? '报告错误？' : '報告錯誤？',
    reportText: isEn
      ? 'Please include: your browser & OS, the video URL you tried, and the exact error message.'
      : isHans ? '请提供：您的浏览器和操作系统、您尝试的视频链接、以及具体的错误信息。'
      : '請提供：您的瀏覽器和作業系統、您嘗試的視頻連結、以及具體的錯誤訊息。',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:support@xhsvideodownloader.com?subject=${encodeURIComponent(form.subject)}&body=${body}`;
    setStatus('sent');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{c.title}</h1>
          <p className="text-gray-600 max-w-xl mx-auto">{c.intro}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Contact Form */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-pink-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-pink-500" />
              {c.formTitle}
            </h2>

            {status === 'sent' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <p className="text-lg font-semibold text-gray-800">{c.sent}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{c.name}</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none transition text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{c.email}</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none transition text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{c.subject}</label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none transition text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{c.message}</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder={c.messagePlaceholder}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none transition text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-pink-500 to-orange-500 text-white flex items-center justify-center gap-2 hover:opacity-90 transition"
                >
                  <Send className="w-4 h-4" />
                  {c.send}
                </button>
              </form>
            )}
          </div>

          {/* Sidebar info */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-5">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-pink-500" />
                {c.directEmail}
              </h3>
              <a
                href="mailto:support@xhsvideodownloader.com"
                className="text-pink-600 hover:underline text-sm break-all"
              >
                support@xhsvideodownloader.com
              </a>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-5">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-pink-500" />
                {c.faqTitle}
              </h3>
              <p className="text-sm text-gray-600 mb-3">{c.faqText}</p>
              <a
                href="/guide"
                className="inline-block text-sm font-medium text-pink-600 hover:underline"
              >
                {c.guideBtn} →
              </a>
            </div>

            <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5">
              <h3 className="font-bold text-gray-900 mb-2 text-sm">🐛 {c.reportTitle}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{c.reportText}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  return <ContactContent />;
}
