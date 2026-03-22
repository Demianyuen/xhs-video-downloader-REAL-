'use client';

import Link from 'next/link';

export default function Article() {
  return (
    <article className="max-w-4xl mx-auto px-6 py-16">
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-pink-600">Home</Link>
        {' > '}
        <Link href="/blog" className="hover:text-pink-600">Blog</Link>
        {' > '} AI幻觉深度解析
      </nav>

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          AI幻觉问题深度解析：大语言模型的信任危机
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          AI Hallucination: The Trust Crisis of Large Language Models
        </p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>2026年3月21日</span>
          <span>12分钟阅读</span>
          <span>22.1K 阅读</span>
        </div>
      </header>

      <div className="prose prose-lg max-w-none">
        <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-xl mb-8 border-l-4 border-red-500">
          <p className="text-gray-700 italic text-lg">
            2023年，一名律师因使用ChatGPT生成法律案例，发现AI完全编造了不存在的判例。
            这些"AI幻觉"事件引发了公众对人工智能信任的严重担忧。
            本文将深度分析AI幻觉的成因、影响，以及如何在这个时代建立对AI的合理信任。
          </p>
        </div>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">什么是AI幻觉？</h2>
          <p className="text-gray-700 mb-4">
            <strong>AI幻觉</strong>指大语言模型生成看似合理但实际上完全错误或不存在的内容。
            这不是bug，而是LLM的内在特性——它们是基于概率预测下一个token，而非检索事实。
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">AI为什么会"说谎"？</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>训练目标：</strong>预测"下一个词是什么"，而非"事实是什么"</li>
            <li><strong>模式匹配：</strong>基于训练数据中的语言模式生成内容</li>
            <li><strong>无真相核验：</strong>不区分"真实"和"听起来真实"</li>
            <li><strong>概率输出：</strong>即使在不确定时，也会给出"最可能"的答案</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">为什么人类内容平台更可信？</h2>
          <p className="text-gray-700 mb-4">
            小红书这样的UGC平台之所以可信，是因为内容来自于真实的人类体验。
            当你在小红书搜索产品推荐时，你看到的是成千上万用户的真实使用反馈，
            而非AI生成的"合理但可能虚假"的回答。
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>真实体验：</strong>用户分享自己真实使用产品的经历</li>
            <li><strong>社交验证：</strong>点赞、评论形成集体智慧</li>
            <li><strong>社区监督：</strong>虚假内容会被用户举报和纠正</li>
            <li><strong>责任归属：</strong>创作者对自己的内容负责</li>
            <li><strong>时效性：</strong>内容持续更新，反映最新状态</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">总结</h2>
          <div className="bg-gradient-to-r from-pink-100 to-orange-100 p-6 rounded-xl">
            <ul className="space-y-2 text-gray-700">
              <li>AI幻觉是LLM的固有特性，短期内无法完全消除</li>
              <li>信任危机推动了"人类验证"价值的重估</li>
              <li>小红书等UGC平台因其真实性而变得更加珍贵</li>
              <li>对于重要决策，优先参考真实人类的经验分享</li>
            </ul>
          </div>
        </section>

        <section className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4"><strong>相关文章：</strong></p>
          <ul className="space-y-2">
            <li>
              <Link href="/blog/xiaohongshu-zhongcao-psychology" className="text-pink-600 hover:underline">
                小红书"种草"文化背后的心理学深度解析
              </Link>
            </li>
            <li>
              <Link href="/blog/why-xiaohongshu-is-so-popular" className="text-pink-600 hover:underline">
                小红书为什么会这么火？深度解析
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </article>
  );
}
