# API 使用示例

## 下載 API

### 基本使用

```javascript
// 前端代碼示例
async function downloadVideo(url) {
  try {
    const response = await fetch('/api/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();

    if (data.success) {
      // 觸發下載
      const link = document.createElement('a');
      link.href = `/api/download/${data.token}`;
      link.download = `${data.metadata.title}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log('下載成功:', data.metadata);
    } else {
      console.error('下載失敗:', data.error);
    }
  } catch (error) {
    console.error('請求失敗:', error);
  }
}

// 使用
downloadVideo('https://www.xiaohongshu.com/explore/abc123');
```

### cURL 示例

```bash
# 發起下載請求
curl -X POST http://localhost:3000/api/download \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.xiaohongshu.com/explore/abc123"}'

# 響應示例
{
  "success": true,
  "token": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
  "metadata": {
    "title": "美妝分享",
    "author": "美妝博主",
    "type": "視頻"
  }
}

# 下載文件
curl -O http://localhost:3000/api/download/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

---

## 分析 API

### 基本使用

```javascript
// 前端代碼示例
async function analyzePost(url) {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();

    if (data.success) {
      console.log('分析結果:', data.data);
      
      // 訪問各項指標
      console.log('熱度評分:', data.data.trend_score);
      console.log('互動率:', data.data.engagement_rate);
      console.log('變現潛力:', data.data.monetization_potential);
      console.log('優化建議:', data.data.recommendations);
    } else {
      console.error('分析失敗:', data.error);
    }
  } catch (error) {
    console.error('請求失敗:', error);
  }
}

// 使用
analyzePost('https://www.xiaohongshu.com/explore/abc123');
```

### cURL 示例

```bash
# 發起分析請求
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.xiaohongshu.com/explore/abc123"}'

# 響應示例
{
  "success": true,
  "data": {
    "url": "https://www.xiaohongshu.com/explore/abc123",
    "title": "分享我的日常護膚秘訣",
    "author": "美妝博主",
    "likes": 2500,
    "comments": 450,
    "shares": 180,
    "engagement_rate": 16.67,
    "sentiment": "positive",
    "keywords": ["護膚", "美妝", "推薦"],
    "category": "美妝",
    "trend_score": 75,
    "monetization_potential": "high",
    "recommendations": [
      "內容熱度高，建議及時發布相關系列內容",
      "互動率較高，建議保持創作質量"
    ],
    "analyzed_at": "2026-02-19T04:10:00Z"
  }
}
```

### Python 示例

```python
import requests
import json

# 分析 API
def analyze_post(url):
    response = requests.post(
        'http://localhost:3000/api/analyze',
        json={'url': url},
        headers={'Content-Type': 'application/json'}
    )
    
    if response.status_code == 200:
        data = response.json()
        if data['success']:
            analysis = data['data']
            print(f"標題: {analysis['title']}")
            print(f"作者: {analysis['author']}")
            print(f"熱度評分: {analysis['trend_score']}")
            print(f"互動率: {analysis['engagement_rate']}%")
            print(f"變現潛力: {analysis['monetization_potential']}")
            print(f"優化建議:")
            for rec in analysis['recommendations']:
                print(f"  - {rec}")
        else:
            print(f"分析失敗: {data['error']}")
    else:
        print(f"請求失敗: {response.status_code}")

# 使用
analyze_post('https://www.xiaohongshu.com/explore/abc123')
```

### Node.js 示例

```javascript
const fetch = require('node-fetch');

async function analyzePost(url) {
  try {
    const response = await fetch('http://localhost:3000/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();

    if (data.success) {
      const analysis = data.data;
      console.log(`標題: ${analysis.title}`);
      console.log(`作者: ${analysis.author}`);
      console.log(`熱度評分: ${analysis.trend_score}`);
      console.log(`互動率: ${analysis.engagement_rate}%`);
      console.log(`變現潛力: ${analysis.monetization_potential}`);
      console.log('優化建議:');
      analysis.recommendations.forEach(rec => {
        console.log(`  - ${rec}`);
      });
    } else {
      console.error(`分析失敗: ${data.error}`);
    }
  } catch (error) {
    console.error(`請求失敗: ${error}`);
  }
}

// 使用
analyzePost('https://www.xiaohongshu.com/explore/abc123');
```

---

## 歷史記錄 API

### 保存分析結果

```javascript
import { saveAnalysisToHistory } from '@/lib/analysis-history';

const analysis = {
  url: '...',
  title: '...',
  // ... 其他字段
};

const item = saveAnalysisToHistory(analysis);
console.log('已保存，ID:', item.id);
```

### 獲取歷史記錄

```javascript
import { getAnalysisHistory } from '@/lib/analysis-history';

const history = getAnalysisHistory();
console.log('總記錄數:', history.length);
history.forEach(item => {
  console.log(`${item.title} - 熱度: ${item.trend_score}`);
});
```

### 導出數據

```javascript
import { 
  exportHistoryAsJSON, 
  exportHistoryAsCSV 
} from '@/lib/analysis-history';

// 導出為 JSON
const jsonData = exportHistoryAsJSON();
const blob = new Blob([jsonData], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const link = document.createElement('a');
link.href = url;
link.download = 'analysis-history.json';
link.click();

// 導出為 CSV
const csvData = exportHistoryAsCSV();
const csvBlob = new Blob([csvData], { type: 'text/csv' });
const csvUrl = URL.createObjectURL(csvBlob);
const csvLink = document.createElement('a');
csvLink.href = csvUrl;
csvLink.download = 'analysis-history.csv';
csvLink.click();
```

### 獲取統計數據

```javascript
import { getHistoryStatistics } from '@/lib/analysis-history';

const stats = getHistoryStatistics();
console.log('總分析數:', stats.totalAnalyses);
console.log('平均互動率:', stats.avgEngagement);
console.log('平均熱度:', stats.avgTrendScore);
console.log('平均點贊:', stats.avgLikes);
console.log('情感分佈:', stats.sentimentCounts);
console.log('變現潛力分佈:', stats.monetizationCounts);
console.log('熱門分類:', stats.topCategories);
```

---

## 批量分析示例

```javascript
// 批量分析多個帖子
async function batchAnalyze(urls) {
  const results = [];
  
  for (const url of urls) {
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      
      const data = await response.json();
      if (data.success) {
        results.push(data.data);
      }
    } catch (error) {
      console.error(`分析失敗: ${url}`, error);
    }
    
    // 避免過快請求
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  return results;
}

// 使用
const urls = [
  'https://www.xiaohongshu.com/explore/abc123',
  'https://www.xiaohongshu.com/explore/def456',
  'https://www.xiaohongshu.com/explore/ghi789',
];

batchAnalyze(urls).then(results => {
  console.log('分析完成，共', results.length, '條');
  
  // 按熱度排序
  results.sort((a, b) => b.trend_score - a.trend_score);
  
  // 顯示排名
  results.forEach((item, index) => {
    console.log(`${index + 1}. ${item.title} - 熱度: ${item.trend_score}`);
  });
});
```

---

## 錯誤處理示例

```javascript
async function analyzeWithErrorHandling(url) {
  try {
    // 驗證 URL
    if (!url || !url.includes('xiaohongshu.com')) {
      throw new Error('無效的小紅書鏈接');
    }

    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
      timeout: 30000, // 30 秒超時
    });

    // 檢查 HTTP 狀態
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // 檢查 API 響應
    if (!data.success) {
      throw new Error(data.error || '分析失敗');
    }

    return data.data;

  } catch (error) {
    if (error.name === 'TypeError') {
      console.error('網絡錯誤:', error.message);
    } else if (error.message.includes('timeout')) {
      console.error('請求超時');
    } else {
      console.error('分析錯誤:', error.message);
    }
    
    throw error;
  }
}

// 使用
analyzeWithErrorHandling('https://www.xiaohongshu.com/explore/abc123')
  .then(analysis => {
    console.log('分析成功:', analysis);
  })
  .catch(error => {
    console.error('分析失敗:', error);
  });
```

---

## 實時監控示例

```javascript
// 定時分析並監控趨勢
async function monitorTrends(urls, interval = 3600000) {
  setInterval(async () => {
    console.log(`[${new Date().toLocaleString()}] 開始分析...`);
    
    const results = await batchAnalyze(urls);
    
    // 找出熱度最高的帖子
    const topPost = results.reduce((max, item) => 
      item.trend_score > max.trend_score ? item : max
    );
    
    console.log(`熱度最高: ${topPost.title} (${topPost.trend_score})`);
    
    // 找出變現潛力最高的帖子
    const highPotential = results.filter(
      item => item.monetization_potential === 'high'
    );
    
    console.log(`高潛力帖子: ${highPotential.length} 條`);
    
    // 保存結果
    results.forEach(item => {
      saveAnalysisToHistory(item);
    });
    
  }, interval);
}

// 使用 - 每小時檢查一次
monitorTrends([
  'https://www.xiaohongshu.com/explore/abc123',
  'https://www.xiaohongshu.com/explore/def456',
]);
```

---

## 數據可視化示例

```javascript
// 使用 Chart.js 可視化分析數據
import Chart from 'chart.js/auto';

function visualizeAnalysis(analysis) {
  // 互動數據圖表
  const ctx = document.getElementById('engagementChart').getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['點贊', '評論', '分享'],
      datasets: [{
        data: [
          analysis.likes,
          analysis.comments,
          analysis.shares,
        ],
        backgroundColor: [
          '#ec4899',
          '#3b82f6',
          '#10b981',
        ],
      }],
    },
  });

  // 熱度評分進度條
  const scoreCtx = document.getElementById('scoreChart').getContext('2d');
  new Chart(scoreCtx, {
    type: 'bar',
    data: {
      labels: ['熱度評分'],
      datasets: [{
        label: '評分',
        data: [analysis.trend_score],
        backgroundColor: '#f59e0b',
        max: 100,
      }],
    },
    options: {
      indexAxis: 'y',
      scales: {
        x: {
          max: 100,
        },
      },
    },
  });
}
```

---

## 完整應用示例

```javascript
// 完整的分析應用
class XHSAnalyzer {
  constructor() {
    this.history = [];
    this.loadHistory();
  }

  async analyze(url) {
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      if (data.success) {
        this.history.push(data.data);
        this.saveHistory();
        return data.data;
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('分析失敗:', error);
      throw error;
    }
  }

  getTopPosts(limit = 10) {
    return this.history
      .sort((a, b) => b.trend_score - a.trend_score)
      .slice(0, limit);
  }

  getHighPotentialPosts() {
    return this.history.filter(
      item => item.monetization_potential === 'high'
    );
  }

  getStatistics() {
    return {
      total: this.history.length,
      avgTrendScore: this.history.reduce((sum, item) => sum + item.trend_score, 0) / this.history.length,
      avgEngagement: this.history.reduce((sum, item) => sum + item.engagement_rate, 0) / this.history.length,
      topCategory: this.getMostCommonCategory(),
    };
  }

  getMostCommonCategory() {
    const categories = {};
    this.history.forEach(item => {
      categories[item.category] = (categories[item.category] || 0) + 1;
    });
    return Object.entries(categories).sort((a, b) => b[1] - a[1])[0]?.[0];
  }

  saveHistory() {
    localStorage.setItem('xhs_analyzer_history', JSON.stringify(this.history));
  }

  loadHistory() {
    const data = localStorage.getItem('xhs_analyzer_history');
    this.history = data ? JSON.parse(data) : [];
  }

  exportJSON() {
    return JSON.stringify(this.history, null, 2);
  }

  exportCSV() {
    const headers = ['標題', '作者', '點贊', '評論', '分享', '互動率', '熱度', '變現潛力'];
    const rows = this.history.map(item => [
      item.title,
      item.author,
      item.likes,
      item.comments,
      item.shares,
      item.engagement_rate.toFixed(2),
      item.trend_score,
      item.monetization_potential,
    ]);
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }
}

// 使用
const analyzer = new XHSAnalyzer();

// 分析帖子
analyzer.analyze('https://www.xiaohongshu.com/explore/abc123')
  .then(result => {
    console.log('分析完成:', result);
    console.log('統計數據:', analyzer.getStatistics());
    console.log('熱度最高的帖子:', analyzer.getTopPosts(5));
  });
```

---

**更多示例和文檔，請訪問項目 GitHub 倉庫。**
