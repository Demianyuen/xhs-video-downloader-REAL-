'use client';

import { useState } from 'react';
import { useI18n } from '@/app/lib/i18n';
import { FileText, Copy, Check, Loader2, AlertCircle } from 'lucide-react';

const extractContent = {
  'zh-Hant': {
    badge: '文字提取工具',
    title: '從小紅書筆記提取文字',
    subtitle: '貼上小紅書筆記連結，自動提取圖文中的文字內容',
    inputLabel: '小紅書筆記連結',
    inputPlaceholder: '貼上小紅書連結，例如 https://www.xiaohongshu.com/explore/...',
    extractBtn: '提取文字',
    extracting: '提取中...',
    copyBtn: '一鍵複製',
    copied: '已複製！',
    resultTitle: '提取結果',
    howTitle: '這個工具能做什麼？',
    howDesc: '本工具透過分析小紅書筆記頁面，提取其中的文字內容，包括標題、正文描述和標籤。特別適合保存食譜步驟、旅遊攻略、學習筆記等有價值的文字資訊。',
    useCases: [
      '保存食譜和烹飪步驟',
      '整理旅遊攻略和景點資訊',
      '收集學習筆記和知識要點',
      '提取穿搭建議和購物清單',
      '保存健身計劃和運動教學',
    ],
    note: '注意：本工具提取的是筆記的文字描述內容。圖片中嵌入的文字需要使用 OCR 功能識別。',
    errorEmpty: '請輸入小紅書連結',
    errorInvalid: '請輸入有效的小紅書連結',
    errorFailed: '提取失敗，請稍後重試',
  },
  'zh-Hans': {
    badge: '文字提取工具',
    title: '从小红书笔记提取文字',
    subtitle: '粘贴小红书笔记链接，自动提取图文中的文字内容',
    inputLabel: '小红书笔记链接',
    inputPlaceholder: '粘贴小红书链接，例如 https://www.xiaohongshu.com/explore/...',
    extractBtn: '提取文字',
    extracting: '提取中...',
    copyBtn: '一键复制',
    copied: '已复制！',
    resultTitle: '提取结果',
    howTitle: '这个工具能做什么？',
    howDesc: '本工具通过分析小红书笔记页面，提取其中的文字内容，包括标题、正文描述和标签。特别适合保存食谱步骤、旅游攻略、学习笔记等有价值的文字信息。',
    useCases: [
      '保存食谱和烹饪步骤',
      '整理旅游攻略和景点信息',
      '收集学习笔记和知识要点',
      '提取穿搭建议和购物清单',
      '保存健身计划和运动教学',
    ],
    note: '注意：本工具提取的是笔记的文字描述内容。图片中嵌入的文字需要使用 OCR 功能识别。',
    errorEmpty: '请输入小红书链接',
    errorInvalid: '请输入有效的小红书链接',
    errorFailed: '提取失败，请稍后重试',
  },
  'en': {
    badge: 'Text Extraction Tool',
    title: 'Extract Text from XHS Posts',
    subtitle: 'Paste a Xiaohongshu post URL to automatically extract its text content',
    inputLabel: 'Xiaohongshu Post URL',
    inputPlaceholder: 'Paste XHS link, e.g. https://www.xiaohongshu.com/explore/...',
    extractBtn: 'Extract Text',
    extracting: 'Extracting...',
    copyBtn: 'Copy All',
    copied: 'Copied!',
    resultTitle: 'Extracted Text',
    howTitle: 'What does this tool do?',
    howDesc: 'This tool analyzes Xiaohongshu post pages and extracts their text content, including titles, body descriptions, and hashtags. Ideal for saving recipes, travel guides, study notes, and other valuable text information.',
    useCases: [
      'Save recipes and cooking steps',
      'Organize travel guides and attraction info',
      'Collect study notes and key knowledge points',
      'Extract outfit tips and shopping lists',
      'Save workout plans and exercise tutorials',
    ],
    note: 'Note: This tool extracts the text description of a post. Text embedded inside images requires OCR recognition.',
    errorEmpty: 'Please enter a Xiaohongshu URL',
    errorInvalid: 'Please enter a valid Xiaohongshu URL',
    errorFailed: 'Extraction failed, please try again later',
  },
};

export default function ExtractPage() {
  const { locale } = useI18n();
  const c = extractContent[locale];

  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleExtract = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) { setError(c.errorEmpty); return; }
    if (!trimmed.includes('xiaohongshu.com') && !trimmed.includes('xhslink.com')) {
      setError(c.errorInvalid);
      return;
    }

    setError(null);
    setResult(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/extract-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: trimmed }),
      });
      const data = await res.json();
      if (data.success && data.text) {
        setResult(data.text);
      } else {
        setError(data.error || c.errorFailed);
      }
    } catch {
      setError(c.errorFailed);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 pt-8 sm:pt-12 pb-16">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-orange-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <FileText className="w-4 h-4" />
          <span>{c.badge}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-orange-500 mb-4">
          {c.title}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {c.subtitle}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-pink-100 mb-8">
        <form onSubmit={handleExtract} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {c.inputLabel}
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => { setUrl(e.target.value); setError(null); }}
              placeholder={c.inputPlaceholder}
              disabled={isLoading}
              className="w-full px-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:border-pink-500 transition outline-none disabled:bg-gray-50"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 rounded-xl px-4 py-3 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 rounded-xl font-bold text-base bg-gradient-to-r from-pink-500 to-orange-500 text-white disabled:opacity-50 transition flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {c.extracting}
              </>
            ) : (
              <>
                <FileText className="w-5 h-5" />
                {c.extractBtn}
              </>
            )}
          </button>
        </form>

        {result && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">{c.resultTitle}</h3>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:opacity-90 transition"
              >
                {copied ? (
                  <><Check className="w-4 h-4" />{c.copied}</>
                ) : (
                  <><Copy className="w-4 h-4" />{c.copyBtn}</>
                )}
              </button>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
                {result}
              </pre>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-br from-gray-50 to-pink-50 rounded-2xl p-6 sm:p-8 border border-pink-100">
        <h2 className="text-xl font-bold text-gray-900 mb-3">{c.howTitle}</h2>
        <p className="text-gray-600 leading-relaxed mb-5">{c.howDesc}</p>

        <ul className="space-y-2 mb-5">
          {c.useCases.map((uc, i) => (
            <li key={i} className="flex items-center gap-3 text-gray-700">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-white" />
              </div>
              {uc}
            </li>
          ))}
        </ul>

        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800">
          {c.note}
        </div>
      </div>
    </main>
  );
}
