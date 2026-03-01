/**
 * Post Analyzer Tests
 * 測試分析功能的各個模塊
 */

import {
  extractPostId,
  analyzeEngagement,
  detectSentiment,
  extractKeywords,
  categorizePost,
  calculateTrendScore,
  assessMonetizationPotential,
  generateRecommendations,
} from '@/lib/post-analyzer';

describe('Post Analyzer', () => {
  describe('extractPostId', () => {
    it('should extract post ID from various URL formats', () => {
      const urls = [
        'https://www.xiaohongshu.com/explore/abc123def456',
        'https://www.xiaohongshu.com/feed/xyz789',
        'https://www.xiaohongshu.com/?id=test123',
      ];

      urls.forEach(url => {
        const id = extractPostId(url);
        expect(id).toBeTruthy();
      });
    });

    it('should return null for invalid URLs', () => {
      const id = extractPostId('https://example.com');
      expect(id).toBeNull();
    });
  });

  describe('analyzeEngagement', () => {
    it('should calculate engagement rate correctly', () => {
      const result = analyzeEngagement(1000, 200, 50, 10000);
      expect(result.engagement_rate).toBeGreaterThan(0);
      expect(result.engagement_level).toBeTruthy();
    });

    it('should classify viral content', () => {
      const result = analyzeEngagement(5000, 1000, 500, 10000);
      expect(result.engagement_level).toBe('viral');
    });
  });

  describe('detectSentiment', () => {
    it('should detect positive sentiment', () => {
      const sentiment = detectSentiment('這個產品真的很好，我很喜歡，強烈推薦！');
      expect(sentiment).toBe('positive');
    });

    it('should detect negative sentiment', () => {
      const sentiment = detectSentiment('太差了，非常失望，不推薦購買');
      expect(sentiment).toBe('negative');
    });

    it('should detect neutral sentiment', () => {
      const sentiment = detectSentiment('這是一個普通的產品');
      expect(sentiment).toBe('neutral');
    });
  });

  describe('extractKeywords', () => {
    it('should extract keywords from text', () => {
      const text = '護膚品推薦，美妝技巧，護膚品推薦，美妝教程';
      const keywords = extractKeywords(text, 3);
      expect(keywords.length).toBeLessThanOrEqual(3);
      expect(keywords.length).toBeGreaterThan(0);
    });
  });

  describe('categorizePost', () => {
    it('should categorize beauty posts', () => {
      const category = categorizePost('口紅推薦，粉底液測評', '美妝分享');
      expect(category).toBe('美妝');
    });

    it('should categorize fashion posts', () => {
      const category = categorizePost('穿搭技巧，衣服搭配', '時尚分享');
      expect(category).toBe('時尚');
    });

    it('should categorize food posts', () => {
      const category = categorizePost('美食推薦，餐廳測評', '美食分享');
      expect(category).toBe('美食');
    });
  });

  describe('calculateTrendScore', () => {
    it('should calculate trend score between 0-100', () => {
      const score = calculateTrendScore(5, 'positive', ['關鍵詞1', '關鍵詞2']);
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(100);
    });

    it('should give higher score for positive sentiment', () => {
      const positiveScore = calculateTrendScore(5, 'positive', ['關鍵詞1']);
      const negativeScore = calculateTrendScore(5, 'negative', ['關鍵詞1']);
      expect(positiveScore).toBeGreaterThan(negativeScore);
    });
  });

  describe('assessMonetizationPotential', () => {
    it('should assess high potential for viral content', () => {
      const potential = assessMonetizationPotential(10, 80, '美妝');
      expect(potential).toBe('high');
    });

    it('should assess low potential for low engagement', () => {
      const potential = assessMonetizationPotential(0.5, 20, '其他');
      expect(potential).toBe('low');
    });
  });

  describe('generateRecommendations', () => {
    it('should generate recommendations', () => {
      const recommendations = generateRecommendations({
        engagement_rate: 1,
        sentiment: 'negative',
        keywords: ['關鍵詞'],
        monetization_potential: 'low',
        trend_score: 30,
      });
      expect(recommendations.length).toBeGreaterThan(0);
      expect(recommendations[0]).toBeTruthy();
    });
  });
});
