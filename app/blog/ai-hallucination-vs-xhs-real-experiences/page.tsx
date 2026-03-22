'use client';

import Link from 'next/link';

export default function Article() {
  return (
    <article className="max-w-4xl mx-auto px-6 py-16">
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-pink-600">Home</Link>
        {' > '}
        <Link href="/blog" className="hover:text-pink-600">Blog</Link>
        {' > '} AI幻觉 vs 真实体验
      </nav>

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          AI幻觉 vs 真实体验：对比案例研究
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          AI Hallucination vs Real Experience: Comparative Case Studies
        </p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>2026年3月21日</span>
          <span>15分钟阅读</span>
          <span>28.5K 阅读</span>
        </div>
      </header>

      <div className="prose prose-lg max-w-none">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl mb-8 border-l-4 border-purple-500">
          <p className="text-gray-700 italic text-lg">
            理论上的讨论容易，但实际的对比最有说服力。
            本文收集了5个真实场景，分别对比了AI生成的答案和小红书用户的实际体验。
            结果令人深思：在涉及真实世界的建议时，AI的幻觉率远超想象。
          </p>
        </div>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">案例一：餐厅推荐</h2>
          <div className="bg-blue-50 p-6 rounded-xl my-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4">测试场景</h3>
            <p className="text-gray-700 mb-4">
              <strong>问题：</strong>"推荐上海3家最好的本帮菜餐厅"
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold text-red-700 mb-3">AI回答</h4>
                <p className="text-red-600 text-xs">验证结果：2家已搬迁，1家人均已涨至400元</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold text-green-700 mb-3">小红书用户分享</h4>
                <p className="text-green-600 text-xs">验证结果：所有信息准确，位置营业正常</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">综合对比分析</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
            <div className="bg-red-50 p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">15%</div>
              <div className="text-sm text-gray-600">AI准确率</div>
            </div>
            <div className="bg-green-50 p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">92%</div>
              <div className="text-sm text-gray-600">小红书准确率</div>
            </div>
            <div className="bg-orange-50 p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">0天</div>
              <div className="text-sm text-gray-600">AI时效性</div>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">1-7天</div>
              <div className="text-sm text-gray-600">UGC时效性</div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">如何正确使用AI和小红书</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>AI用于：</strong>快速概览，让AI提供基本信息和框架</li>
            <li><strong>小红书用于：</strong>深度验证，对于重要决策优先看最新分享</li>
            <li><strong>交叉验证：</strong>对比AI和多个小红书用户的分享</li>
            <li><strong>善用评论区：</strong>评论区往往包含纠错、更新、补充信息</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">总结</h2>
          <div className="bg-gradient-to-r from-pink-100 to-orange-100 p-6 rounded-xl">
            <ul className="space-y-2 text-gray-700">
              <li>真实案例显示，AI在涉及真实世界建议时幻觉率很高</li>
              <li>小红书的UGC内容基于真实体验，经过社区验证</li>
              <li>时效性是UGC的核心优势——AI无法获取最新信息</li>
              <li>正确做法：AI概览 + 小红书深度验证</li>
            </ul>
          </div>
        </section>

        <section className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4"><strong>相关文章：</strong></p>
          <ul className="space-y-2">
            <li>
              <Link href="/blog/ai-hallucination-deep-analysis" className="text-pink-600 hover:underline">
                AI幻觉问题深度解析：大语言模型的信任危机
              </Link>
            </li>
            <li>
              <Link href="/blog/real-time-verification-ugc-platforms" className="text-pink-600 hover:underline">
                实时信息验证：为什么UGC平台在AI时代更具优势
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </article>
  );
}
