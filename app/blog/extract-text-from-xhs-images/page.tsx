import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: '如何從小紅書圖文筆記中提取文字 | XHS Downloader',
  description: '介紹使用 OCR 技術從小紅書圖片筆記中提取文字的方法，方便保存和整理有價值的文字內容。',
  alternates: { canonical: '/blog/extract-text-from-xhs-images' },
};

export default function ArticlePage() {
  return (
    <main className="max-w-3xl mx-auto px-4 pt-8 sm:pt-12 pb-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        返回部落格
      </Link>

      <article>
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-orange-100 text-pink-700 px-3 py-1.5 rounded-full text-sm font-medium mb-4">
            <FileText className="w-3.5 h-3.5" />
            文字提取
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            如何從小紅書圖文筆記中提取文字
          </h1>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <time dateTime="2026-02-20">2026年2月20日</time>
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl p-6 mb-8 border border-pink-100">
          <p className="text-gray-700 leading-relaxed text-lg">
            小紅書上有大量以圖片形式呈現的文字內容——食譜、攻略、清單、學習筆記……這些內容無法直接複製，給整理和保存帶來了不便。本文介紹幾種從小紅書圖片中提取文字的實用方法。
          </p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">為什麼小紅書的文字無法直接複製？</h2>
            <p className="leading-relaxed mb-4">
              小紅書的許多筆記採用「圖片 + 文字疊加」的形式發布，創作者將文字直接嵌入圖片中，而非作為獨立的文本內容。這種設計有幾個原因：一是方便在不同平台分享時保持排版一致；二是防止內容被輕易複製；三是圖片形式在視覺上更吸引人。
            </p>
            <p className="leading-relaxed">
              然而，這對需要整理和保存文字信息的用戶造成了困擾。OCR（光學字符識別）技術正是解決這個問題的關鍵工具。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">什麼是 OCR 技術？</h2>
            <p className="leading-relaxed mb-4">
              OCR（Optical Character Recognition，光學字符識別）是一種將圖像中的文字轉換為可編輯文本的技術。現代 OCR 系統基於深度學習，能夠識別多種語言、字體和排版格式，準確率已達到相當高的水平。
            </p>
            <p className="leading-relaxed">
              對於中文 OCR，現代系統能夠識別繁體中文、簡體中文以及中英混排的內容，非常適合處理小紅書上的圖片筆記。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">方法一：使用我們的文字提取工具</h2>
            <p className="leading-relaxed mb-4">
              XHS Downloader 提供了專門的文字提取功能，可以直接從小紅書筆記 URL 提取文字內容。使用步驟如下：
            </p>
            <ol className="list-decimal list-inside space-y-3 ml-4">
              <li className="leading-relaxed">在小紅書 App 中找到你想提取文字的圖文筆記</li>
              <li className="leading-relaxed">點擊分享按鈕，複製筆記連結</li>
              <li className="leading-relaxed">前往我們的<Link href="/extract" className="text-pink-600 hover:text-pink-700 font-medium">文字提取頁面</Link></li>
              <li className="leading-relaxed">將連結貼上到輸入框，點擊「提取文字」</li>
              <li className="leading-relaxed">系統會自動識別並提取筆記中的文字內容</li>
              <li className="leading-relaxed">點擊「一鍵複製」將文字複製到剪貼板</li>
            </ol>
            <p className="leading-relaxed mt-4">
              這個工具特別適合提取食譜步驟、旅遊攻略清單、學習筆記等結構化文字內容。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">方法二：手機內建 OCR 功能</h2>
            <p className="leading-relaxed mb-4">
              現代智能手機都內建了強大的 OCR 功能，無需安裝額外 App：
            </p>

            <div className="space-y-4">
              <div className="bg-white rounded-xl p-5 border border-pink-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">iPhone（iOS 15 及以上）</h3>
                <p className="text-gray-600 leading-relaxed">使用「實況文字」功能。在相機 App 中對準圖片，或在「照片」App 中打開圖片，長按圖片中的文字即可選取和複製。這個功能支持中文識別，準確率很高。</p>
              </div>

              <div className="bg-white rounded-xl p-5 border border-pink-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">Android（Google Lens）</h3>
                <p className="text-gray-600 leading-relaxed">打開 Google 相機或 Google Lens App，對準圖片或從相冊選取圖片，點擊「文字」模式，即可識別並複製圖片中的文字。部分 Android 手機也有廠商自帶的 OCR 功能。</p>
              </div>

              <div className="bg-white rounded-xl p-5 border border-pink-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">小米 / MIUI</h3>
                <p className="text-gray-600 leading-relaxed">MIUI 系統內建「文字識別」功能，在截圖後點擊「提取文字」按鈕，即可自動識別截圖中的所有文字。這個功能對中文的識別效果尤其出色。</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">方法三：第三方 OCR 工具</h2>
            <p className="leading-relaxed mb-4">
              如果內建功能無法滿足需求，以下第三方工具提供更強大的 OCR 能力：
            </p>
            <ul className="list-disc list-inside space-y-3 ml-4">
              <li className="leading-relaxed"><strong>微信掃一掃</strong>：微信的「掃一掃」功能支持識別圖片中的文字，對中文識別效果很好，且無需額外安裝 App</li>
              <li className="leading-relaxed"><strong>百度翻譯 App</strong>：提供拍照翻譯功能，同時支持文字識別，適合需要同時翻譯的場景</li>
              <li className="leading-relaxed"><strong>Adobe Acrobat</strong>：專業的 PDF 和 OCR 工具，適合需要處理大量文件的用戶</li>
              <li className="leading-relaxed"><strong>天若 OCR</strong>：Windows 平台上廣受好評的截圖 OCR 工具，支持多種語言，識別速度快</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">提高 OCR 識別準確率的技巧</h2>
            <p className="leading-relaxed mb-4">
              OCR 的識別準確率受多種因素影響，以下技巧可以幫助你獲得更好的結果：
            </p>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-bold text-gray-900 mb-2">確保圖片清晰</h3>
                <p className="text-gray-600 leading-relaxed">模糊、低分辨率的圖片會大幅降低識別準確率。盡量使用原圖而非截圖，避免多次壓縮導致圖片質量下降。</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-bold text-gray-900 mb-2">注意文字與背景的對比度</h3>
                <p className="text-gray-600 leading-relaxed">深色文字在淺色背景上的識別效果最好。如果圖片背景複雜或文字顏色與背景相近，識別準確率可能較低。</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-bold text-gray-900 mb-2">裁剪到文字區域</h3>
                <p className="text-gray-600 leading-relaxed">如果圖片中只有部分區域有文字，先裁剪到文字區域再進行識別，可以提高準確率並減少處理時間。</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-bold text-gray-900 mb-2">識別後校對</h3>
                <p className="text-gray-600 leading-relaxed">OCR 識別結果並非 100% 準確，特別是對於手寫字體、藝術字或特殊排版。識別完成後，建議快速瀏覽一遍，修正明顯的識別錯誤。</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">提取文字後的整理建議</h2>
            <p className="leading-relaxed mb-4">
              成功提取文字後，如何有效整理這些內容同樣重要：
            </p>
            <ul className="list-disc list-inside space-y-3 ml-4">
              <li className="leading-relaxed"><strong>添加來源標注</strong>：記錄文字來源的筆記連結和作者，方便日後查找原始內容</li>
              <li className="leading-relaxed"><strong>按主題分類</strong>：將提取的文字按主題整理到不同的筆記或文件夾中</li>
              <li className="leading-relaxed"><strong>添加個人備注</strong>：在提取的文字旁邊添加自己的想法和補充，讓內容更有個人價值</li>
              <li className="leading-relaxed"><strong>定期回顧</strong>：建立定期回顧機制，確保保存的內容真正被使用，而不是積累在文件夾中被遺忘</li>
            </ul>
          </section>

          <div className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-2xl p-6 border border-pink-200">
            <p className="text-sm text-gray-600 text-center leading-relaxed">
              提取的文字內容僅供個人學習和研究使用。請尊重原創作者的版權，不要將提取的內容用於商業目的或未經授權的再分發。
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}
