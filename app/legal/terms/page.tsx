'use client';

import { useI18n } from '@/app/lib/i18n';

function TermsContent() {
  const { locale } = useI18n();
  const isEn = locale === 'en';
  const isHans = locale === 'zh-Hans';

  const title = isEn ? 'Terms of Service' : isHans ? '服务条款' : '服務條款';
  const lastUpdated = isEn ? 'Last updated: February 24, 2026' : isHans ? '最后更新：2026 年 2 月 24 日' : '最後更新：2026 年 2 月 24 日';

  const sections = isEn ? [
    { title: '1. Acceptance of Terms', content: 'By accessing and using XHS Downloader ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.' },
    { title: '2. Service Description', content: 'XHS Downloader is an online tool that allows users to download video content from the Xiaohongshu (XHS) platform. The Service is for personal, non-commercial use only.' },
    { title: '3. Usage Restrictions', content: 'You agree not to: use the Service for any illegal activities, infringe on others\' intellectual property or copyrights, upload or distribute malware or harmful code, attempt to disrupt or interfere with the normal operation of the Service, engage in any form of harassment or abuse, or use downloaded content for commercial purposes.' },
    { title: '4. Copyright and Intellectual Property', content: 'The Service allows you to download video content for personal learning and archiving purposes only. You must respect the copyrights of original content creators. We are not responsible for any copyright infringement arising from your use of downloaded content.' },
    { title: '5. Disclaimer', content: 'The Service is provided "as is" without any express or implied warranties. We do not guarantee that: the Service will be uninterrupted or error-free, the download functionality will always be available, or the quality or completeness of downloaded content.' },
    { title: '6. Limitation of Liability', content: 'In no event shall XHS Downloader and its owners, employees, or agents be liable for any direct, indirect, incidental, special, or consequential damages, including but not limited to data loss, business interruption, or loss of profits.' },
    { title: '7. Third-Party Content', content: 'The Service allows you to access third-party content (such as videos on Xiaohongshu). We are not responsible for the accuracy, legality, or appropriateness of third-party content.' },
    { title: '8. Service Modifications', content: 'We reserve the right to modify or terminate the Service at any time without notice. We are not liable for any losses caused by service modifications or termination.' },
    { title: '9. User Conduct', content: 'You are solely responsible for all activities conducted through the Service. You agree not to use the Service for any activities that may violate applicable laws or infringe on the rights of others.' },
    { title: '10. Termination', content: 'We may terminate your access to the Service at any time for any reason without notice.' },
    { title: '11. Governing Law', content: 'These Terms of Service are governed by applicable law. Any disputes shall be resolved through friendly negotiation.' },
    { title: '12. Contact Us', content: 'If you have any questions about these Terms of Service, please contact us at: support@xhsvideodownloader.com' },
  ] : isHans ? [
    { title: '1. 接受条款', content: '通过访问和使用 XHS Downloader（以下简称「本服务」），您同意受本服务条款的约束。如果您不同意这些条款，请不要使用本服务。' },
    { title: '2. 服务描述', content: 'XHS Downloader 是一个在线工具，允许用户从小红书（Xiaohongshu）平台下载视频内容。本服务仅供个人、非商业用途使用。' },
    { title: '3. 使用限制', content: '您同意不会：使用本服务进行任何非法活动、侵犯他人的知识产权或版权、上传或传播恶意软件或有害代码、尝试破坏或干扰本服务的正常运行、进行任何形式的骚扰或滥用、将下载的内容用于商业目的。' },
    { title: '4. 版权和知识产权', content: '本服务允许您下载视频内容仅供个人学习和存档之用。您必须尊重原始内容创作者的版权。我们不对您使用下载内容而产生的任何版权侵犯行为负责。' },
    { title: '5. 免责声明', content: '本服务按「现状」提供，不提供任何明示或暗示的保证。我们不保证：服务将不间断或无错误、下载功能始终可用、下载的内容质量或完整性。' },
    { title: '6. 责任限制', content: '在任何情况下，XHS Downloader 及其所有者、员工或代理人均不对任何直接、间接、附带、特殊或后果性损害负责，包括但不限于数据丢失、业务中断或利润损失。' },
    { title: '7. 第三方内容', content: '本服务允许您访问第三方内容（如小红书上的视频）。我们不对第三方内容的准确性、合法性或适当性负责。' },
    { title: '8. 服务修改', content: '我们保留随时修改或终止本服务的权利，恕不另行通知。我们不对因服务修改或终止而造成的任何损失负责。' },
    { title: '9. 用户行为', content: '您对您通过本服务进行的所有活动负全部责任。您同意不会使用本服务进行任何可能违反适用法律或侵犯他人权利的活动。' },
    { title: '10. 终止', content: '我们可以随时以任何理由终止您对本服务的访问，恕不另行通知。' },
    { title: '11. 准据法', content: '本服务条款受适用法律管辖。任何争议应通过友好协商解决。' },
    { title: '12. 联系我们', content: '如果您对本服务条款有任何疑问，请联系我们：support@xhsvideodownloader.com' },
  ] : [
    { title: '1. 接受條款', content: '通過訪問和使用 XHS Downloader（以下簡稱「本服務」），您同意受本服務條款的約束。如果您不同意這些條款，請不要使用本服務。' },
    { title: '2. 服務描述', content: 'XHS Downloader 是一個在線工具，允許用戶從小紅書（Xiaohongshu）平台下載視頻內容。本服務僅供個人、非商業用途使用。' },
    { title: '3. 使用限制', content: '您同意不會：使用本服務進行任何非法活動、侵犯他人的知識產權或版權、上傳或傳播惡意軟件或有害代碼、嘗試破壞或干擾本服務的正常運行、進行任何形式的騷擾或濫用、將下載的內容用於商業目的。' },
    { title: '4. 版權和知識產權', content: '本服務允許您下載視頻內容僅供個人學習和存檔之用。您必須尊重原始內容創作者的版權。我們不對您使用下載內容而產生的任何版權侵犯行為負責。' },
    { title: '5. 免責聲明', content: '本服務按「現狀」提供，不提供任何明示或暗示的保證。我們不保證：服務將不間斷或無錯誤、下載功能始終可用、下載的內容質量或完整性。' },
    { title: '6. 責任限制', content: '在任何情況下，XHS Downloader 及其所有者、員工或代理人均不對任何直接、間接、附帶、特殊或後果性損害負責，包括但不限於數據丟失、業務中斷或利潤損失。' },
    { title: '7. 第三方內容', content: '本服務允許您訪問第三方內容（如小紅書上的視頻）。我們不對第三方內容的準確性、合法性或適當性負責。' },
    { title: '8. 服務修改', content: '我們保留隨時修改或終止本服務的權利，恕不另行通知。我們不對因服務修改或終止而造成的任何損失負責。' },
    { title: '9. 用戶行為', content: '您對您通過本服務進行的所有活動負全部責任。您同意不會使用本服務進行任何可能違反適用法律或侵犯他人權利的活動。' },
    { title: '10. 終止', content: '我們可以隨時以任何理由終止您對本服務的訪問，恕不另行通知。' },
    { title: '11. 準據法', content: '本服務條款受適用法律管轄。任何爭議應通過友好協商解決。' },
    { title: '12. 聯繫我們', content: '如果您對本服務條款有任何疑問，請聯繫我們：support@xhsvideodownloader.com' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">{title}</h1>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            {sections.map((section, i) => (
              <section key={i}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                <p>{section.content}</p>
              </section>
            ))}
            <section className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600">{lastUpdated}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TermsOfService() {
  return <TermsContent />;
}
