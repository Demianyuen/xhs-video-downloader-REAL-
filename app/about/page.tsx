import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于我们 - 小红书视频下载器",
  description: "关于小红书视频下载器",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">关于我们</h1>

          <div className="space-y-6 text-gray-600">
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">我们的服务</h2>
              <p>
                小红书视频下载器是一个免费的在线工具，帮助用户下载小红书平台上的视频内容。我们致力于提供简单、快速、安全的下载体验。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">功能特点</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>免费使用 - 每天可免费下载5个视频</li>
                <li>无水印 - 下载原始高清视频</li>
                <li>简单易用 - 粘贴链接即可下载</li>
                <li>安全可靠 - 不保存任何用户数据</li>
                <li>跨平台 - 支持电脑和手机浏览器</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">使用说明</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>打开小红书 App 或网页</li>
                <li>找到想要下载的视频</li>
                <li>点击分享按钮，复制链接</li>
                <li>将链接粘贴到本网站的输入框</li>
                <li>点击下载按钮</li>
              </ol>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">免责声明</h2>
              <p>
                本工具仅供个人学习和研究使用。用户应尊重原创作者的版权，不得将下载的内容用于商业用途或侵犯他人权益。使用本工具即表示您同意遵守相关法律法规和平台规定。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">联系方式</h2>
              <p>
                如有问题或建议，欢迎通过以下方式联系我们：
              </p>
              <p className="mt-2">
                邮箱：support@xhsdownloader.top
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t">
            <a href="/" className="text-pink-600 hover:text-pink-700 transition">
              ← 返回首页
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
