import { Metadata } from 'next';
import Link from 'next/link';
import { UserDemographicsChart, PlatformComparisonChart, GrowthTrendChart } from '@/components/blog-charts';
import { VisualSection, StatCard, UnsplashImage, FeatureCard } from '@/components/blog-visuals';

export const metadata: Metadata = {
  title: '小红书为什么会这么火？深度解析 | Why Xiaohongshu (XHS) Is So Popular - Deep Analysis',
  description: '深入���析小红书火爆的原因，包括社区氛围、用户画像、内容生态和商业模式。Deep dive into why Xiaohongshu (RED) became so popular: community, demographics, content ecosystem, and business model.',
  keywords: '小红书火的原因, Xiaohongshu popular, RED app analysis, 小红书用户分析, XHS success factors, 为什么小红书这么火',
};

const userDemographicsData = [
  { name: 'Female', value: 70, color: '#ec4899' },
  { name: 'Male', value: 30, color: '#3b82f6' },
];

const ageDistributionData = [
  { name: '18-24', value: 35, color: '#ec4899' },
  { name: '25-30', value: 30, color: '#f97316' },
  { name: '31-35', value: 20, color: '#eab308' },
  { name: '35+', value: 15, color: '#22c55e' },
];

const contentCategoriesData = [
  { metric: 'Beauty & Makeup', xiaohongshu: 85, douyin: 45 },
  { metric: 'Fashion', xiaohongshu: 72, douyin: 38 },
  { metric: 'Food', xiaohongshu: 65, douyin: 55 },
  { metric: 'Travel', xiaohongshu: 58, douyin: 42 },
];

const growthData = [
  { month: '2023-Q1', users: 180, engagement: 12 },
  { month: '2023-Q2', users: 195, engagement: 14 },
  { month: '2023-Q3', users: 210, engagement: 15 },
  { month: '2023-Q4', users: 230, engagement: 16 },
  { month: '2024-Q1', users: 250, engagement: 17 },
  { month: '2024-Q2', users: 265, engagement: 18 },
];

export default function Article() {
  return (
    <article className="max-w-4xl mx-auto px-6 py-16">
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-pink-600">Home</Link>
        {' > '}
        <Link href="/blog" className="hover:text-pink-600">Blog</Link>
        {' > '} 小红书为什么会这么火？
      </nav>

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          小红书为什么会这么火？深度解析
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Why Xiaohongshu (RED) Became So Popular: A Deep Analysis
        </p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>📅 2026年3月21日</span>
          <span>⏱️ 8分钟阅读</span>
          <span>👁️ 5.2K 阅读</span>
        </div>
      </header>

      {/* Hero Image from Unsplash */}
      <UnsplashImage
        src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=600&fit=crop"
        alt="People using smartphones for social media"
        caption="Social media has transformed how we discover and share content"
        className="rounded-2xl mb-8"
      />

      <div className="prose prose-lg max-w-none">
        <div className="bg-gradient-to-r from-pink-50 to-orange-50 p-6 rounded-xl mb-8 border-l-4 border-pink-500">
          <p className="text-gray-700 italic text-lg">
            小红书（Xiaohongshu，又称RED）已经成为中国最受欢迎的社交电商平台之一，月活用户超过2亿。
            但它为什么会如此火爆？本文将从多个角度深度分析小红书成功的原因。
            <br /><br />
            Xiaohongshu (RED) has become one of China's most popular social e-commerce platforms,
            with over 200 million monthly active users. But why is it so successful?
            This article provides a comprehensive analysis from multiple perspectives.
          </p>
        </div>

        {/* Key Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          <StatCard value="200M+" label="月活用户" labelEn="Monthly Active Users" icon="👥" color="pink" />
          <StatCard value="70%" label="女性用户" labelEn="Female Users" icon="👩" color="pink" />
          <StatCard value="87%" label="内容可信度" labelEn="Content Trust" icon="✅" color="green" />
          <StatCard value="2亿+" label="月活用户" labelEn="MAU" icon="📱" color="blue" />
        </div>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">一、独特的社区氛围</h2>
          <p className="text-gray-600 mb-4">
            Unique Community Atmosphere / 独特的社区氛围
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-3">1.1 真实分享文化</h3>
          <p className="text-gray-700 mb-4">
            与其他平台充斥着营销内容不同，小红书建立了一个以"真实分享"为核心的社区文化。
            用户分享的是真实的使用体验、生活技巧和产品测评，这种真实性建立了深厚的信任感。
            研究显示，<strong>87%的用户</strong>认为小红书的内容"值得信赖"，远高于其他社交平台。
          </p>

          <div className="grid md:grid-cols-3 gap-4 my-6">
            <FeatureCard
              emoji="📸"
              title="真实体验"
              description="用户分享真实的使用体验，而非营销话术"
              descriptionEn="Authentic experiences, not marketing copy"
            />
            <FeatureCard
              emoji="💬"
              title="深度互动"
              description="评论区讨论深入，形成真实社区氛围"
              descriptionEn="Deep engagement in comments"
            />
            <FeatureCard
              emoji="🤝"
              title="信任建立"
              description="长期积累的信任度让推荐更有说服力"
              descriptionEn="Trust built over time makes recommendations persuasive"
            />
          </div>

          <UnsplashImage
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop"
            alt="Friends sharing content on social media"
            caption="Authentic sharing creates deep community bonds"
          />
        </section>

        <section className="mt-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">二、精准的用户定位</h2>

          {/* User Demographics Chart */}
          <UserDemographicsChart data={userDemographicsData} />

          <div className="grid md:grid-cols-2 gap-6 my-6">
            <div className="bg-pink-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-pink-700 mb-3">👩 女性用户为主</h3>
              <p className="text-gray-700 mb-4">
                女性用户占约<strong>70%</strong>，主要集中在18-35岁年龄段。
                这一群体的消费能力和社会影响力正在快速增长。
              </p>
              <p className="text-gray-600 text-sm">
                Women account for about 70% of users, mainly aged 18-35.
                This demographic has rapidly growing purchasing power.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-blue-700 mb-3">🌆 一二线城市</h3>
              <p className="text-gray-700 mb-4">
                <strong>65%</strong>的用户来自一二线城市，
                具有较高的教育水平和消费能力。
              </p>
              <p className="text-gray-600 text-sm">
                65% of users are from tier-1 and tier-2 cities,
                with higher education and purchasing power.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">三、多元化的内容生态</h2>

          {/* Content Categories Chart */}
          <PlatformComparisonChart data={contentCategoriesData} />

          <h3 className="text-2xl font-semibold text-gray-800 mb-3">3.1 从美妆到万物</h3>
          <p className="text-gray-700 mb-4">
            小红书已经从最初的"美妆护肤分享平台"演变为涵盖<strong>美妆、时尚、美食、旅行、健身、
            职场、情感、育儿</strong>等全方位的生活方式平台。这种多元化确保了平台的持续活力和用户粘性。
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
            <div className="text-center p-4 bg-gradient-to-br from-pink-100 to-pink-50 rounded-xl">
              <div className="text-3xl mb-2">💄</div>
              <p className="font-semibold">美妆护肤</p>
              <p className="text-xs text-gray-600">Beauty</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl">
              <div className="text-3xl mb-2">👗</div>
              <p className="font-semibold">时尚穿搭</p>
              <p className="text-xs text-gray-600">Fashion</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-xl">
              <div className="text-3xl mb-2">🍜</div>
              <p className="font-semibold">美食探店</p>
              <p className="text-xs text-gray-600">Food</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-100 to-green-50 rounded-xl">
              <div className="text-3xl mb-2">✈️</div>
              <p className="font-semibold">旅行攻略</p>
              <p className="text-xs text-gray-600">Travel</p>
            </div>
          </div>

          <UnsplashImage
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=400&fit=crop"
            alt="Online shopping on mobile device"
            caption="From beauty to lifestyle, XHS covers all aspects of life"
          />
        </section>

        <section className="mt-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">四、增长趋势分析</h2>

          {/* Growth Trend Chart */}
          <GrowthTrendChart data={growthData} />

          <VisualSection
            title="持续创新驱动增长"
            titleEn="Continuous Innovation Drives Growth"
            icon="📈"
            gradient="from-blue-50 to-purple-50"
          >
            <div className="grid md:grid-cols-3 gap-4">
              <StatCard value="300%" label="年增长率" labelEn="Annual Growth" color="blue" />
              <StatCard value="45min" label="日均使用时长" labelEn="Daily Usage" color="orange" />
              <StatCard value="12+" label="月均访问次数" labelEn="Monthly Visits" color="green" />
            </div>
          </VisualSection>

          <UnsplashImage
            src="https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?w=800&h=400&fit=crop"
            alt="Business growth chart"
            caption="Continuous innovation keeps users engaged and growing"
          />
        </section>

        <section className="mt-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">五、商业模式创新</h2>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl my-6">
            <h3 className="text-xl font-bold text-purple-900 mb-3">💰 内容即广告，社交即电商</h3>
            <p className="text-gray-700 mb-4">
              小红书开创了"原生广告"模式，品牌方通过KOL/KOC创作高质量内容而非传统硬广。
              这种方式用户接受度更高，<strong>转化率是传统广告的3-5倍</strong>。
            </p>
            <div className="flex items-center gap-4 text-sm text-purple-700">
              <span>🎯 精准触达</span>
              <span>📊 高转化率</span>
              <span>🔄 闭环交易</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 my-6">
            <div className="border-2 border-pink-200 p-6 rounded-xl">
              <h4 className="font-bold text-pink-700 mb-2">品牌合作 (KOL Marketing)</h4>
              <p className="text-gray-700 text-sm">
                通过蒲公英平台连接品牌与创作者，实现原生内容营销
              </p>
            </div>
            <div className="border-2 border-orange-200 p-6 rounded-xl">
              <h4 className="font-bold text-orange-700 mb-2">直播带货 (Live Commerce)</h4>
              <p className="text-gray-700 text-sm">
                实时互动促进销售转化，打造沉浸式购物体验
              </p>
            </div>
            <div className="border-2 border-green-200 p-6 rounded-xl">
              <h4 className="font-bold text-green-700 mb-2">小红书商城 (RED Mall)</h4>
              <p className="text-gray-700 text-sm">
                完成从内容到交易的闭环，直接在平台内购买
              </p>
            </div>
            <div className="border-2 border-blue-200 p-6 rounded-xl">
              <h4 className="font-bold text-blue-700 mb-2">数据赋能 (Data Analytics)</h4>
              <p className="text-gray-700 text-sm">
                为品牌提供深度数据分析，优化营销策略
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">总结 Summary</h2>

          <VisualSection
            title="小红书成功的核心要素"
            titleEn="Key Success Factors of Xiaohongshu"
            icon="✨"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <FeatureCard
                emoji="🤝"
                title="真实可信的社区氛围"
                description="Authentic community atmosphere"
              />
              <FeatureCard
                emoji="👩"
                title="精准的女性用户定位"
                description="Precise female user positioning"
              />
              <FeatureCard
                emoji="📱"
                title="多元化的内容生态"
                description="Diversified content ecosystem"
              />
              <FeatureCard
                emoji="🧠"
                title="强大的推荐算法"
                description="Powerful recommendation algorithm"
              />
              <FeatureCard
                emoji="💡"
                title="创新的商业模式"
                description="Innovative business model"
              />
              <FeatureCard
                emoji="🚀"
                title="持续的迭代进化能力"
                description="Continuous iteration and evolution"
              />
            </div>
          </VisualSection>

          <div className="bg-gradient-to-r from-pink-100 to-orange-100 p-6 rounded-xl text-center">
            <p className="text-gray-800 font-semibold text-lg">
              🎯 小红书的成功不是偶然，而是深刻理解用户需求、持续创新、精准执行的结果。
              <br /><br />
              Xiaohongshu's success is no accident – it's the result of deeply understanding user needs,
              continuous innovation, and precise execution.
            </p>
          </div>
        </section>

        <section className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4">
            <strong>相关文章：</strong>
          </p>
          <ul className="space-y-2">
            <li>
              <Link href="/blog/xiaohongshu-vs-douyin-comparison" className="text-pink-600 hover:underline">
                小红书vs抖音：内容平台深度对比分析
              </Link>
            </li>
            <li>
              <Link href="/blog/how-to-succeed-on-xiaohongshu-marketing" className="text-pink-600 hover:underline">
                如何在小红书上做内容营销？完整指南
              </Link>
            </li>
            <li>
              <Link href="/blog/xiaohongshu-recommendation-algorithm-explained" className="text-pink-600 hover:underline">
                小红书推荐算法揭秘：如何让你的内容获得更多曝光
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </article>
  );
}
