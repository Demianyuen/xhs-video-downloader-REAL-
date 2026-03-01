/**
 * Post Analyzer - Analyzes XHS posts for engagement metrics and trends
 */

export interface PostAnalysis {
  url: string;
  title: string;
  author: string;
  likes: number;
  comments: number;
  shares: number;
  engagement_rate: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  keywords: string[];
  category: string;
  trend_score: number; // 0-100
  monetization_potential: 'high' | 'medium' | 'low';
  recommendations: string[];
  analyzed_at: string;
}

export interface AnalysisRequest {
  url: string;
  includeMetadata?: boolean;
  includeSentiment?: boolean;
}

/**
 * Extract post ID from XHS URL
 */
export function extractPostId(url: string): string | null {
  const patterns = [
    /\/explore\/(\w+)/,
    /\/feed\/(\w+)/,
    /id=(\w+)/,
    /\/(\w{20,})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

/**
 * Analyze engagement metrics
 */
export function analyzeEngagement(
  likes: number,
  comments: number,
  shares: number,
  views: number = 1000
): {
  engagement_rate: number;
  engagement_level: 'viral' | 'high' | 'medium' | 'low';
} {
  const totalEngagement = likes + comments * 2 + shares * 3;
  const engagement_rate = (totalEngagement / views) * 100;

  let engagement_level: 'viral' | 'high' | 'medium' | 'low' = 'low';
  if (engagement_rate > 10) engagement_level = 'viral';
  else if (engagement_rate > 5) engagement_level = 'high';
  else if (engagement_rate > 2) engagement_level = 'medium';

  return { engagement_rate, engagement_level };
}

/**
 * Detect sentiment from text
 */
export function detectSentiment(text: string): 'positive' | 'neutral' | 'negative' {
  const positiveWords = ['好', '喜欢', '爱', '棒', '完美', '推荐', '赞', '美', '优秀', '开心', '满意'];
  const negativeWords = ['差', '讨厌', '烦', '糟糕', '失望', '不好', '垃圾', '难看', '生气', '不满'];

  const lowerText = text.toLowerCase();
  let positiveCount = 0;
  let negativeCount = 0;

  positiveWords.forEach(word => {
    positiveCount += (lowerText.match(new RegExp(word, 'g')) || []).length;
  });

  negativeWords.forEach(word => {
    negativeCount += (lowerText.match(new RegExp(word, 'g')) || []).length;
  });

  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
}

/**
 * Extract keywords from text
 */
export function extractKeywords(text: string, limit: number = 5): string[] {
  // Simple keyword extraction - in production, use NLP library
  const words = text.split(/[\s,，。！？\n]+/).filter(w => w.length > 2);
  const wordFreq = new Map<string, number>();

  words.forEach(word => {
    wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
  });

  return Array.from(wordFreq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word]) => word);
}

/**
 * Categorize post content
 */
export function categorizePost(text: string, title: string): string {
  const content = `${title} ${text}`.toLowerCase();

  const categories: { [key: string]: string[] } = {
    '美妆': ['化妆', '口红', '粉底', '眼影', '护肤', '面膜', '精油'],
    '时尚': ['穿搭', '衣服', '鞋', '包包', '配饰', '风格', '搭配'],
    '美食': ['食物', '菜', '餐厅', '烹饪', '食谱', '美食', '吃'],
    '旅游': ['旅游', '旅行', '景点', '酒店', '度假', '攻略', '游记'],
    '生活': ['日常', '生活', '家居', '装修', '家具', '收纳', '生活方式'],
    '健身': ['健身', '运动', '瑜伽', '减肥', '健身房', '锻炼', '身材'],
    '教育': ['学习', '教程', '课程', '技能', '知识', '学生', '教育'],
    '科技': ['手机', '电脑', '软件', '应用', '科技', '数码', '电子'],
  };

  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => content.includes(keyword))) {
      return category;
    }
  }

  return '其他';
}

/**
 * Calculate trend score (0-100)
 */
export function calculateTrendScore(
  engagement_rate: number,
  sentiment: string,
  keywords: string[]
): number {
  let score = 0;

  // Engagement score (0-40)
  score += Math.min(40, engagement_rate * 4);

  // Sentiment score (0-20)
  if (sentiment === 'positive') score += 20;
  else if (sentiment === 'neutral') score += 10;

  // Keyword diversity score (0-40)
  score += Math.min(40, keywords.length * 8);

  return Math.min(100, Math.round(score));
}

/**
 * Assess monetization potential
 */
export function assessMonetizationPotential(
  engagement_rate: number,
  trend_score: number,
  category: string
): 'high' | 'medium' | 'low' {
  const highValueCategories = ['美妆', '时尚', '美食', '旅游'];

  if (trend_score > 70 && engagement_rate > 5) {
    return 'high';
  }

  if (highValueCategories.includes(category) && trend_score > 50) {
    return 'high';
  }

  if (trend_score > 50 && engagement_rate > 3) {
    return 'medium';
  }

  if (trend_score > 30) {
    return 'medium';
  }

  return 'low';
}

/**
 * Generate recommendations
 */
export function generateRecommendations(
  analysis: Partial<PostAnalysis>
): string[] {
  const recommendations: string[] = [];

  if (analysis.engagement_rate && analysis.engagement_rate < 2) {
    recommendations.push('互动率较低，建议优化内容质量或增加互动引导');
  }

  if (analysis.sentiment === 'negative') {
    recommendations.push('内容情感偏负面，建议调整表达方式或内容角度');
  }

  if (analysis.keywords && analysis.keywords.length < 3) {
    recommendations.push('关键词不足，建议丰富内容主题');
  }

  if (analysis.monetization_potential === 'low') {
    recommendations.push('变现潜力有限，建议参考高热度内容进行优化');
  }

  if (analysis.trend_score && analysis.trend_score > 70) {
    recommendations.push('内容热度高，建议及时发布相关系列内容');
  }

  if (!recommendations.length) {
    recommendations.push('内容表现良好，继续保持创作质量');
  }

  return recommendations;
}

/**
 * Main analysis function
 */
export async function analyzePost(request: AnalysisRequest): Promise<PostAnalysis> {
  const postId = extractPostId(request.url);

  if (!postId) {
    throw new Error('无法从URL提取帖子ID');
  }

  // Mock data - in production, fetch from XHS API or scrape
  const mockData = {
    title: '分享我的日常护肤秘诀',
    author: '美妆博主',
    likes: 2500,
    comments: 450,
    shares: 180,
    views: 15000,
    text: '今天分享我的护肤心得，坚持使用这套护肤品已经3个月了，皮肤状态明显改善。推荐给所有皮肤干燥的小伙伴！',
  };

  const { engagement_rate, engagement_level } = analyzeEngagement(
    mockData.likes,
    mockData.comments,
    mockData.shares,
    mockData.views
  );

  const sentiment = detectSentiment(mockData.text);
  const keywords = extractKeywords(mockData.text);
  const category = categorizePost(mockData.text, mockData.title);
  const trend_score = calculateTrendScore(engagement_rate, sentiment, keywords);
  const monetization_potential = assessMonetizationPotential(
    engagement_rate,
    trend_score,
    category
  );

  const analysis: PostAnalysis = {
    url: request.url,
    title: mockData.title,
    author: mockData.author,
    likes: mockData.likes,
    comments: mockData.comments,
    shares: mockData.shares,
    engagement_rate: parseFloat(engagement_rate.toFixed(2)),
    sentiment,
    keywords,
    category,
    trend_score,
    monetization_potential,
    recommendations: generateRecommendations({
      engagement_rate,
      sentiment,
      keywords,
      monetization_potential,
      trend_score,
    }),
    analyzed_at: new Date().toISOString(),
  };

  return analysis;
}
