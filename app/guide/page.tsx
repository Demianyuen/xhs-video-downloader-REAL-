'use client';

import { I18nProvider, useI18n } from '@/app/lib/i18n';

function GuideContent() {
  const { t, locale } = useI18n();

  const isEn = locale === 'en';
  const isHans = locale === 'zh-Hans';

  const title = isEn ? 'XHS Downloader Complete Guide' : isHans ? 'XHS Downloader 完整使用指南' : 'XHS Downloader 完整使用指南';
  const whatIsTitle = isEn ? 'What is XHS Downloader?' : isHans ? '什么是 XHS Downloader？' : '什麼是 XHS Downloader？';
  const whatIsText = isEn
    ? 'XHS Downloader is a free online tool designed to download video content from Xiaohongshu (XHS). Whether you want to save creative videos, tutorials, or other content, XHS Downloader makes it easy. Our tool is completely free, requires no registration, and respects your privacy.'
    : isHans
    ? 'XHS Downloader 是一个免费的在线工具，专门设计用于从小红书（Xiaohongshu）平台下载视频内容。无论您是想保存喜欢的创意视频、教程还是其他内容，XHS Downloader 都能帮助您轻松完成。我们的工具完全免费、无需注册，并且尊重您的隐私。'
    : 'XHS Downloader 是一個免費的在線工具，專門設計用於從小紅書（Xiaohongshu）平台下載視頻內容。無論您是想保存喜歡的創意視頻、教程還是其他內容，XHS Downloader 都能幫助您輕鬆完成。我們的工具完全免費、無需註冊，並且尊重您的隱私。';

  const whyTitle = isEn ? 'Why Use XHS Downloader?' : isHans ? '为什么使用 XHS Downloader？' : '為什麼使用 XHS Downloader？';
  const features = isEn
    ? [
        { emoji: '✨', title: '100% Free', desc: 'No hidden fees, no premium plans. Free forever.' },
        { emoji: '⚡', title: 'Super Fast', desc: 'Our optimized servers ensure you download videos in seconds.' },
        { emoji: '🔒', title: '100% Safe', desc: 'No software to install, no registration, no personal info required.' },
        { emoji: '📱', title: 'Multi-Device', desc: 'Works seamlessly on desktop, tablet, and mobile.' },
      ]
    : isHans
    ? [
        { emoji: '✨', title: '完全免费', desc: '没有隐藏费用，没有高级计划。永远免费使用。' },
        { emoji: '⚡', title: '超快速度', desc: '我们的优化服务器确保您在几秒内下载视频。' },
        { emoji: '🔒', title: '100% 安全', desc: '无需安装软件，无需注册，无需提供个人信息。' },
        { emoji: '📱', title: '多设备支持', desc: '在桌面、平板或手机上无缝工作。' },
      ]
    : [
        { emoji: '✨', title: '完全免費', desc: '沒有隱藏費用，沒有高級計劃。永遠免費使用。' },
        { emoji: '⚡', title: '超快速度', desc: '我們的優化服務器確保您在幾秒內下載視頻。' },
        { emoji: '🔒', title: '100% 安全', desc: '無需安裝軟件，無需註冊，無需提供個人信息。' },
        { emoji: '📱', title: '多設備支持', desc: '在桌面、平板或手機上無縫工作。' },
      ];

  const stepsTitle = isEn ? 'Step-by-Step Guide' : isHans ? '分步使用指南' : '分步使用指南';
  const steps = isEn
    ? [
        { title: 'Step 1: Find the Video', color: 'pink', desc: 'Open the Xiaohongshu app or website and find the video you want to download.' },
        { title: 'Step 2: Copy the Link', color: 'orange', desc: 'Tap the Share button on the video and select Copy Link. The link usually looks like: https://www.xiaohongshu.com/explore/...' },
        { title: 'Step 3: Paste the Link', color: 'yellow', desc: 'Come back to XHS Downloader and paste the copied link into the input box. Our tool will automatically recognize and validate the link.' },
        { title: 'Step 4: Process', color: 'pink', desc: 'Click the Download button. Our system will process the video and show you a preview.' },
        { title: 'Step 5: Download', color: 'orange', desc: 'Click the Download Video button in the preview card. The video will download directly to your device.' },
        { title: 'Step 6: Enjoy', color: 'yellow', desc: 'Once downloaded, you can watch the video anytime, anywhere, without an internet connection.' },
      ]
    : isHans
    ? [
        { title: '第 1 步：找到视频', color: 'pink', desc: '打开小红书应用或网站，找到您想下载的视频。' },
        { title: '第 2 步：复制视频链接', color: 'orange', desc: '点击视频上的「分享」按钮，选择「复制链接」。链接通常看起来像：https://www.xiaohongshu.com/explore/...' },
        { title: '第 3 步：粘贴链接', color: 'yellow', desc: '回到 XHS Downloader，将复制的链接粘贴到输入框中。我们的工具会自动识别并验证链接。' },
        { title: '第 4 步：处理', color: 'pink', desc: '点击下载按钮。我们的系统将处理视频并显示预览。' },
        { title: '第 5 步：下载', color: 'orange', desc: '点击预览卡片中的下载视频按钮。视频将直接下载到您的设备。' },
        { title: '第 6 步：享受', color: 'yellow', desc: '下载完成后，您可以在任何时间、任何地点观看视频，无需网络连接。' },
      ]
    : [
        { title: '第 1 步：找到視頻', color: 'pink', desc: '打開小紅書應用或網站，找到您想下載的視頻。' },
        { title: '第 2 步：複製視頻鏈接', color: 'orange', desc: '點擊視頻上的「分享」按鈕，選擇「複製鏈接」。鏈接通常看起來像：https://www.xiaohongshu.com/explore/...' },
        { title: '第 3 步：粘貼鏈接', color: 'yellow', desc: '回到 XHS Downloader，將複製的鏈接粘貼到輸入框中。我們的工具會自動識別並驗證鏈接。' },
        { title: '第 4 步：處理', color: 'pink', desc: '點擊下載按鈕。我們的系統將處理視頻並顯示預覽。' },
        { title: '第 5 步：下載', color: 'orange', desc: '點擊預覽卡片中的下載視頻按鈕。視頻將直接下載到您的設備。' },
        { title: '第 6 步：享受', color: 'yellow', desc: '下載完成後，您可以在任何時間、任何地點觀看視頻，無需網絡連接。' },
      ];

  const faqTitle = isEn ? 'FAQ' : isHans ? '常见问题解答' : '常見問題解答';
  const faqs = isEn
    ? [
        { q: 'What if the download fails?', a: 'Try these steps: 1) Check your network connection; 2) Ensure the link is correct; 3) Clear browser cache; 4) Try a different browser. If the issue persists, contact our support team.' },
        { q: 'Will downloaded videos have watermarks?', a: 'Downloaded videos retain all original content including any original watermarks or marks. We do not modify or remove any content.' },
        { q: 'How many videos can I download?', a: 'Free users can download up to 10 videos per day.' },
        { q: 'How long are videos stored?', a: 'Downloaded videos are saved directly to your device. We do not store any videos on our servers.' },
        { q: 'Is this legal?', a: 'XHS Downloader is a legal tool for personal learning and archiving purposes. Users are responsible for ensuring their use of downloaded content complies with applicable laws and Xiaohongshu\'s terms of service.' },
      ]
    : isHans
    ? [
        { q: '下载失败怎么办？', a: '请尝试以下步骤：1) 检查您的网络连接；2) 确保链接正确；3) 清除浏览器缓存；4) 尝试不同的浏览器。如果问题仍然存在，请联系我们的支持团队。' },
        { q: '下载的视频有水印吗？', a: '下载的视频将保留原始视频的所有内容，包括原始的水印或标记。我们不修改或移除任何内容。' },
        { q: '我可以下载多少个视频？', a: '免费用户每天可以下载最多 10 个视频。' },
        { q: '下载的视频会被保存多久？', a: '下载的视频直接保存到您的设备。我们不在我们的服务器上存储任何视频。' },
        { q: '这是合法的吗？', a: 'XHS Downloader 是一个合法的工具，用于个人学习和存档目的。用户有责任确保他们对下载内容的使用符合适用的法律和小红书的服务条款。' },
      ]
    : [
        { q: '下載失敗怎麼辦？', a: '請嘗試以下步驟：1) 檢查您的網絡連接；2) 確保鏈接正確；3) 清除瀏覽器緩存；4) 嘗試不同的瀏覽器。如果問題仍然存在，請聯繫我們的支持團隊。' },
        { q: '下載的視頻有水印嗎？', a: '下載的視頻將保留原始視頻的所有內容，包括原始的水印或標記。我們不修改或移除任何內容。' },
        { q: '我可以下載多少個視頻？', a: '免費用戶每天可以下載最多 10 個視頻。' },
        { q: '下載的視頻會被保存多久？', a: '下載的視頻直接保存到您的設備。我們不在我們的服務器上存儲任何視頻。' },
        { q: '這是合法的嗎？', a: 'XHS Downloader 是一個合法的工具，用於個人學習和存檔目的。用戶有責任確保他們對下載內容的使用符合適用的法律和小紅書的服務條款。' },
      ];

  const tipsTitle = isEn ? 'Tips & Tricks' : isHans ? '提示和技巧' : '提示和技巧';
  const tips = isEn
    ? [
        { bold: 'Best Quality:', text: 'If you have enough storage and bandwidth, choose the highest quality for the best visual experience.' },
        { bold: 'Stable Network:', text: 'Use a WiFi connection for the fastest download speeds.' },
        { bold: 'Check Storage:', text: 'Before downloading, ensure you have enough storage space on your device.' },
        { bold: 'Respect Copyright:', text: 'Only download content you have the right to download, and respect creators\' copyrights.' },
        { bold: 'Troubleshooting:', text: 'If you encounter issues, try refreshing the page or using a different browser.' },
      ]
    : isHans
    ? [
        { bold: '使用最高质量：', text: '如果您有足够的存储空间和网络速度，选择最高质量以获得最佳视觉效果。' },
        { bold: '使用稳定的网络：', text: '使用 WiFi 连接以获得最快的下载速度。' },
        { bold: '检查文件大小：', text: '在下载前确保您有足够的存储空间。' },
        { bold: '尊重版权：', text: '只下载您有权下载的内容，并尊重创作者的版权。' },
        { bold: '遇到问题：', text: '如遇到问题，请尝试刷新页面或使用不同的浏览器。' },
      ]
    : [
        { bold: '使用最高質量：', text: '如果您有足夠的存儲空間和網絡速度，選擇最高質量以獲得最佳視覺效果。' },
        { bold: '使用穩定的網絡：', text: '使用 WiFi 連接以獲得最快的下載速度。' },
        { bold: '檢查文件大小：', text: '在下載前確保您有足夠的存儲空間。' },
        { bold: '尊重版權：', text: '只下載您有權下載的內容，並尊重創作者的版權。' },
        { bold: '遇到問題：', text: '如遇到問題，請嘗試刷新頁面或使用不同的瀏覽器。' },
      ];

  const lastUpdated = isEn ? 'Last updated: February 24, 2026' : isHans ? '最后更新：2026 年 2 月 24 日' : '最後更新：2026 年 2 月 24 日';
  const borderColors = ['border-pink-500', 'border-orange-500', 'border-yellow-500'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">{title}</h1>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{whatIsTitle}</h2>
              <p>{whatIsText}</p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{whyTitle}</h2>
              <div className="space-y-4">
                {features.map((f, i) => (
                  <div key={i} className={`${i % 3 === 0 ? 'bg-pink-50' : i % 3 === 1 ? 'bg-orange-50' : 'bg-yellow-50'} p-4 rounded-lg`}>
                    <h3 className="font-bold text-gray-900 mb-2">{f.emoji} {f.title}</h3>
                    <p>{f.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{stepsTitle}</h2>
              <div className="space-y-6">
                {steps.map((step, i) => (
                  <div key={i} className={`border-l-4 ${borderColors[i % 3]} pl-6`}>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{faqTitle}</h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <details key={i} className="group border border-gray-200 rounded-lg p-4 hover:border-pink-300 transition">
                    <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between">
                      {faq.q}
                      <span className="text-gray-600 group-open:rotate-180 transition">▼</span>
                    </summary>
                    <p className="text-gray-600 mt-3">{faq.a}</p>
                  </details>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{tipsTitle}</h2>
              <ul className="list-disc list-inside space-y-3 ml-4">
                {tips.map((tip, i) => (
                  <li key={i}><strong>{tip.bold}</strong> {tip.text}</li>
                ))}
              </ul>
            </section>

            <section className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600">{lastUpdated}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Guide() {
  return <I18nProvider><GuideContent /></I18nProvider>;
}
