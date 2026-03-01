# XHS Analyzer - API 參考文檔

## 📋 目錄

1. [API 概述](#api-概述)
2. [認證](#認證)
3. [端點文檔](#端點文檔)
4. [錯誤處理](#錯誤處理)
5. [速率限制](#速率限制)
6. [示例代碼](#示例代碼)

---

## API 概述

### 基本信息

- **基礎 URL**: `http://localhost:3000` (開發) / `https://your-domain.com` (生產)
- **API 版本**: v1
- **內容類型**: `application/json`
- **字符編碼**: UTF-8

### 支持的 HTTP 方法

- `GET`: 獲取資源
- `POST`: 創建資源
- `PUT`: 更新資源
- `DELETE`: 刪除資源

---

## 認證

當前版本不需要認證。生產環境建議添加以下認證方式：

### API Key 認證

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  http://localhost:3000/api/analyze
```

### JWT 認證

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:3000/api/analyze
```

---

## 端點文檔

### 1. 分析帖子

**端點**: `POST /api/analyze`

**描述**: 分析小紅書帖子並返回詳細的分析結果

**請求頭**:
```
Content-Type: application/json
```

**請求體**:
```json
{
  "url": "https://www.xiaohongshu.com/discovery/item/696dd8150000000021031a64",
  "includeMetadata": true,
  "includeSentiment": true
}
```

**請求參數**:

| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| url | string | 是 | 小紅書帖子鏈接 |
| includeMetadata | boolean | 否 | 是否包含元數據（默認: true） |
| includeSentiment | boolean | 否 | 是否進行情感分析（默認: true） |

**成功響應** (200):
```json
{
  "success": true,
  "data": {
    "url": "https://www.xiaohongshu.com/discovery/item/696dd8150000000021031a64",
    "title": "分享我的日常護膚秘訣",
    "author": "美妝博主",
    "likes": 2500,
    "comments": 450,
    "shares": 180,
    "engagement_rate": 18.33,
    "sentiment": "positive",
    "keywords": ["護膚", "美妝", "秘訣"],
    "category": "美妝",
    "trend_score": 85,
    "monetization_potential": "high",
    "recommendations": [
      "內容表現良好，繼續保持創作質量",
      "建議發布相關系列內容以保持熱度"
    ],
    "analyzed_at": "2024-02-19T12:00:00Z"
  }
}
```

**錯誤響應** (400):
```json
{
  "success": false,
  "error": "請提供有效的小紅書鏈接"
}
```

**錯誤響應** (500):
```json
{
  "success": false,
  "error": "分析失敗，請稍後重試"
}
```

**cURL 示例**:
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.xiaohongshu.com/discovery/item/696dd8150000000021031a64"
  }'
```

**JavaScript 示例**:
```javascript
const response = await fetch('/api/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://www.xiaohongshu.com/discovery/item/696dd8150000000021031a64'
  })
});

const data = await response.json();
console.log(data);
```

---

### 2. 獲取統計信息

**端點**: `GET /api/statistics`

**描述**: 獲取所有分析數據的統計信息

**查詢參數**:

| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| startDate | string | 否 | 開始日期 (ISO 8601 格式) |
| endDate | string | 否 | 結束日期 (ISO 8601 格式) |

**成功響應** (200):
```json
{
  "success": true,
  "data": {
    "totalAnalyses": 50,
    "dateRange": {
      "start": "2024-02-01T00:00:00Z",
      "end": "2024-02-19T23:59:59Z"
    },
    "engagement": {
      "average": 5.23,
      "highest": 25.5,
      "lowest": 0.5,
      "median": 4.2
    },
    "trend": {
      "average": 62,
      "highest": 95,
      "lowest": 15,
      "distribution": {
        "viral": 8,
        "high": 15,
        "medium": 20,
        "low": 7
      }
    },
    "sentiment": {
      "positive": 35,
      "neutral": 10,
      "negative": 5,
      "positiveRate": 70
    },
    "monetization": {
      "high": 20,
      "medium": 20,
      "low": 10,
      "highRate": 40
    },
    "categories": [
      {
        "name": "美妝",
        "count": 15,
        "avgTrend": 68,
        "avgEngagement": 6.5
      }
    ],
    "topKeywords": [
      {
        "keyword": "護膚",
        "frequency": 12
      }
    ]
  }
}
```

**cURL 示例**:
```bash
curl http://localhost:3000/api/statistics
```

**JavaScript 示例**:
```javascript
const response = await fetch('/api/statistics');
const data = await response.json();
console.log(data.data);
```

---

### 3. 導出數據

**端點**: `GET /api/export`

**描述**: 導出分析數據為指定格式

**查詢參數**:

| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| format | string | 是 | 導出格式: json, csv, excel |
| startDate | string | 否 | 開始日期 (ISO 8601 格式) |
| endDate | string | 否 | 結束日期 (ISO 8601 格式) |

**成功響應** (200):
- 返回文件下載

**錯誤響應** (400):
```json
{
  "error": "無效的導出格式"
}
```

**cURL 示例**:
```bash
# 導出為 JSON
curl http://localhost:3000/api/export?format=json > data.json

# 導出為 CSV
curl http://localhost:3000/api/export?format=csv > data.csv

# 導出為 Excel
curl http://localhost:3000/api/export?format=excel > data.xlsx
```

**JavaScript 示例**:
```javascript
async function exportData(format) {
  const response = await fetch(`/api/export?format=${format}`);
  const blob = await response.blob();
  
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `data.${format}`;
  link.click();
  URL.revokeObjectURL(url);
}

exportData('json');
```

---

### 4. 下載視頻

**端點**: `POST /api/download`

**描述**: 初始化視頻下載

**請求體**:
```json
{
  "url": "https://www.xiaohongshu.com/discovery/item/696dd8150000000021031a64"
}
```

**成功響應** (200):
```json
{
  "success": true,
  "token": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
  "metadata": {
    "title": "視頻標題",
    "author": "作者名稱",
    "type": "video"
  }
}
```

**cURL 示例**:
```bash
curl -X POST http://localhost:3000/api/download \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.xiaohongshu.com/discovery/item/696dd8150000000021031a64"
  }'
```

---

### 5. 獲取下載文件

**端點**: `GET /api/download/[token]`

**描述**: 使用令牌獲取下載文件

**路徑參數**:

| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| token | string | 是 | 下載令牌 |

**成功響應** (200):
- 返回視頻文件

**錯誤響應** (404):
```json
{
  "error": "令牌無效或已過期"
}
```

**cURL 示例**:
```bash
curl http://localhost:3000/api/download/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6 \
  -o video.mp4
```

---

## 錯誤處理

### 錯誤代碼

| 代碼 | 含義 | 描述 |
|------|------|------|
| 200 | OK | 請求成功 |
| 400 | Bad Request | 請求參數錯誤 |
| 401 | Unauthorized | 未授權 |
| 403 | Forbidden | 禁止訪問 |
| 404 | Not Found | 資源不存在 |
| 429 | Too Many Requests | 請求過於頻繁 |
| 500 | Internal Server Error | 服務器錯誤 |
| 503 | Service Unavailable | 服務不可用 |

### 錯誤響應格式

```json
{
  "success": false,
  "error": "錯誤描述",
  "code": "ERROR_CODE",
  "details": {
    "field": "錯誤字段",
    "message": "詳細錯誤信息"
  }
}
```

### 錯誤處理示例

```javascript
async function analyzePost(url) {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || '分析失敗');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('分析錯誤:', error.message);
    // 顯示用戶友好的錯誤信息
    alert(`錯誤: ${error.message}`);
  }
}
```

---

## 速率限制

### 限制規則

- **免費層**: 100 請求/小時
- **付費層**: 1000 請求/小時
- **企業層**: 無限制

### 限制頭

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1708345200
```

### 超限響應

```json
{
  "error": "請求過於頻繁，請稍後再試",
  "retryAfter": 3600
}
```

---

## 示例代碼

### Python 示例

```python
import requests
import json

# 分析帖子
url = "http://localhost:3000/api/analyze"
payload = {
    "url": "https://www.xiaohongshu.com/discovery/item/696dd8150000000021031a64"
}

response = requests.post(url, json=payload)
data = response.json()

if data['success']:
    analysis = data['data']
    print(f"標題: {analysis['title']}")
    print(f"熱度評分: {analysis['trend_score']}")
    print(f"變現潛力: {analysis['monetization_potential']}")
else:
    print(f"錯誤: {data['error']}")

# 獲取統計信息
stats_url = "http://localhost:3000/api/statistics"
stats_response = requests.get(stats_url)
stats = stats_response.json()

print(f"總分析數: {stats['data']['totalAnalyses']}")
print(f"平均互動率: {stats['data']['engagement']['average']}%")
```

### Node.js 示例

```javascript
const axios = require('axios');

async function analyzePost(url) {
  try {
    const response = await axios.post('http://localhost:3000/api/analyze', {
      url: url
    });

    const analysis = response.data.data;
    console.log(`標題: ${analysis.title}`);
    console.log(`熱度評分: ${analysis.trend_score}`);
    console.log(`變現潛力: ${analysis.monetization_potential}`);
  } catch (error) {
    console.error('錯誤:', error.message);
  }
}

analyzePost('https://www.xiaohongshu.com/discovery/item/696dd8150000000021031a64');
```

### cURL 示例

```bash
#!/bin/bash

# 分析帖子
echo "分析帖子..."
ANALYSIS=$(curl -s -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.xiaohongshu.com/discovery/item/696dd8150000000021031a64"
  }')

echo $ANALYSIS | jq .

# 獲取統計信息
echo "獲取統計信息..."
STATS=$(curl -s http://localhost:3000/api/statistics)

echo $STATS | jq .

# 導出數據
echo "導出數據..."
curl -s http://localhost:3000/api/export?format=json > data.json
echo "數據已導出到 data.json"
```

---

## 最佳實踐

### 1. 錯誤處理

```javascript
async function safeApiCall(endpoint, options = {}) {
  try {
    const response = await fetch(endpoint, options);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API 調用失敗: ${error.message}`);
    throw error;
  }
}
```

### 2. 重試邏輯

```javascript
async function apiCallWithRetry(endpoint, options = {}, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fetch(endpoint, options).then(r => r.json());
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}
```

### 3. 緩存

```javascript
const cache = new Map();

async function cachedApiCall(endpoint, ttl = 3600000) {
  if (cache.has(endpoint)) {
    const { data, timestamp } = cache.get(endpoint);
    if (Date.now() - timestamp < ttl) {
      return data;
    }
  }
  
  const data = await fetch(endpoint).then(r => r.json());
  cache.set(endpoint, { data, timestamp: Date.now() });
  return data;
}
```

---

## 版本歷史

### v1.0.0 (2024-02-19)
- 初始版本
- 支持帖子分析
- 支持統計信息
- 支持數據導出
- 支持視頻下載

---

**版本**: 1.0.0  
**最後更新**: 2024-02-19  
**維護者**: XHS Analyzer Team
