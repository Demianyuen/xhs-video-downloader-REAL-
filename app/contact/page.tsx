'use client';

import { useState } from 'react';
import { useI18n } from '@/app/lib/i18n';
import { Send, CheckCircle, MessageSquare, BookOpen, Bug, Lightbulb } from 'lucide-react';

function ContactContent() {
  const { locale } = useI18n();
  const isEn = locale === 'en';
  const isHans = locale === 'zh-Hans';

  const [form, setForm] = useState({ name: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');

  const c = {
    title: isEn ? 'Contact Us' : isHans ? '联系我们' : '聯繫我們',
    intro: isEn
      ? 'Have a question or found a bug? Fill in the form below and we will get back to you.'
      : isHans
      ? '有问题或发现了错误？填写下方表单，我们会尽快回复您。'
      : '有問題或發現了錯誤？填寫下方表單，我們會盡快回覆您。',
    formTitle: isEn ? 'Send a message' : isHans ? '发送消息' : '發送訊息',
    name: isEn ? 'Your Name' : isHans ? '您的姓名' : '您的姓名',
    subject: isEn ? 'Subject' : isHans ? '主题' : '主題',
    message: isEn ? 'Message' : isHans ? '留言内容' : '留言內容',
    messagePlaceholder: isEn
      ? 'Describe your question or issue in detail...'
      : isHans ? '请详细描述您的问题...' : '請詳細描述您的問題...',
    send: isEn ? 'Send Message' : isHans ? '发送消息' : '發送訊息',
    sent: isEn
      ? 'Thanks! Your message has been sent.'
      : isHans ? '感谢！您的消息已发送。' : '感謝！您的訊息已發送。',
    guideTitle: isEn ? 'Check the Guide first' : isHans ? '先查看使用指南' : '先查看使用指南',
    guideText: isEn
      ? 'Most common questions are answered in our step-by-step guide.'
      : isHans ? '大多数常见问题在我们的使用指南中都有解答。'
      : '大多數常見問題在我們的使用指南中都有解答。',
    guideBtn: isEn ? 'View Guide' : isHans ? '查看指南' : '查看指南',
    bugTitle: isEn ? 'Reporting a bug?' : isHans ? '报告错误？' : '報告錯誤？',
    bugText: isEn
      ? 'Please include your browser, OS, the video URL you tried, and the exact error message shown.'
      : isHans ? '请提供您的浏览器、操作系统、尝试的视频链接和具体错误信息。'
      : '請提供您的瀏覽器、作業系統、嘗試的視頻連結和具體錯誤訊息。',
    suggestTitle: isEn ? 'Feature suggestions' : isHans ? '功能建议' : '功能建議',
    suggestText: isEn
      ? 'We welcome ideas for new features or improvements to the tool.'
      : isHans ? '我们欢迎关于新功能或改进工具的想法。'
      : '我們歡迎關於新功能或改進工具的想法。',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(`Name: ${form.name}\n\n${form.message}`);
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
                <CheckCircle className="w-14 h-14 text-green-500 mb-4" />
                <p className="text-lg font-semibold text-gray-800">{c.sent}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
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

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-5">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm">
                <BookOpen className="w-4 h-4 text-pink-500" />
                {c.guideTitle}
              </h3>
              <p className="text-xs text-gray-600 mb-3 leading-relaxed">{c.guideText}</p>
              <a href="/guide" className="inline-block text-sm font-medium text-pink-600 hover:underline">
                {c.guideBtn} →
              </a>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-5">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm">
                <Bug className="w-4 h-4 text-orange-500" />
                {c.bugTitle}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">{c.bugText}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-5">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm">
                <Lightbulb className="w-4 h-4 text-yellow-500" />
                {c.suggestTitle}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">{c.suggestText}</p>
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
