# XHS Analyzer - 完整功能文檔

## 📋 目錄

1. [功能概述](#功能概述)
2. [系統架構](#系統架構)
3. [API 文檔](#api-文檔)
4. [使用指南](#使用指南)
5. [數據導出](#數據導出)
6. [統計分析](#統計分析)
7. [故障排除](#故障排除)

---

## 功能概述

### 核心功能

#### 1. 帖子分析引擎
- **實時分析**：輸入小紅書鏈接，立即獲取詳細分析
- **多維度指標**：
  - 互動率計算（點贊、評論、分享加權）
  - 熱度評分（0-100）
  - 情感傾向檢測（正面/中立/負面）
  - 關鍵詞提取
  - 分類識別
  - 變現潛力評估

#### 2. 分析頁面 (`/analyze`)
- 實時帖子分析
- 詳細指標展示
- 優化建議生成
- 自動保存到歷史記錄

#### 3. 歷史記錄管理 (`/history`)
- 查看所有分析記錄
- 按變現潛力篩選
- 按日期/熱度/互動率排序
- 單條刪除或批量清空
- 數據導出（JSON/CSV）

#### 4. 統計分析 (`/stats`)
- 綜合統計儀表板
- 趨勢分析
- 分類統計
- 熱門關鍵詞
- 智能洞察和建議

#### 5. 視頻下載 (`/`)
- 一鍵下載小紅書視頻
- 自動清理臨時文件
- 安全的令牌機制

---

## 系統架構

### 前端架構

```
app/
├── page.tsx                 # 下載頁面
├── analyze/page.tsx         # 分析頁面
├── history/page.tsx         # 歷史記錄頁面
├── stats/page.tsx           # 統計分析頁面
├── layout.tsx               # 全局佈局
└── api/
    ├── download/route.ts    # 下載 API
    ├── download/[token]/route.ts  # 文件流 API
    ├── analyze/route.ts     # 分析 API
    ├── export/route.ts      # 導出 API
    └── statistics/route.ts  # 統計 API
```

### 後端庫

```
lib/
├── post-analyzer.ts         # 分析引擎
├── analysis-history.ts      # 歷史管理
├── statistics-engine.ts     # 統計引擎
├── data-exporter.ts         # 數據導出
├── download-manager.ts      # 下載管理
├── cleanup.ts               # 文件清理
└── usage-limiter.ts         # 使用限制
```

### 數據流

```
用戶輸入 URL
    ↓
POST /api/analyze
    ↓
分析引擎處理
    ↓
返回分析結果
    ↓
前端展示 + 自動保存到 localStorage
    ↓
用戶可查看歷史、導出、查看統計
```

---

## API 文檔

### 1. 分析 API

**端點**: `POST /api/analyze`

**請求**:
```json
{
  "url": "https://www.xiaohongshu.com/discovery/item/...",
  "includeMetadata": true,
  "includeSentiment": true
}
```

**響應**:
```json
{
  "success": true,
  "data": {
    "url": "...",
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
    "recommendations": ["內容表現良好，繼續保持創作質量"],
    "analyzed_at": "2024-02-19T12:00:00Z"
  }
}
```

**錯誤響應**:
```json
{
  "success": false,
  "error": "請提供有效的小紅書鏈接"
}
```

### 2. 統計 API

**端點**: `GET /api/statistics`

**響應**:
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

### 3. 導出 API

**端點**: `GET /api/export?format=json|csv|excel`

**參數**:
- `format`: 導出格式（json/csv/excel）
- `startDate`: 開始日期（可選）
- `endDate`: 結束日期（可選）

**響應**: 文件下載

---

## 使用指南

### 分析帖子

1. 訪問 `/analyze` 頁面
2. 粘貼小紅書帖子鏈接
3. 點擊「開始分析」按鈕
4. 等待分析完成（通常 1-2 秒）
5. 查看詳細分析結果
6. 結果自動保存到歷史記錄

### 查看歷史記錄

1. 訪問 `/history` 頁面
2. 查看所有分析記錄
3. 使用篩選器按變現潛力篩選
4. 使用排序器按日期/熱度/互動率排序
5. 點擊「刪除」移除單條記錄
6. 點擊「清空所有記錄」清空全部

### 導出數據

1. 在歷史記錄頁面
2. 點擊「導出 JSON」或「導出 CSV」
3. 文件自動下載到本地

### 查看統計分析

1. 訪問 `/stats` 頁面
2. 查看綜合統計指標
3. 查看趨勢分布
4. 查看分類統計
5. 查看熱門關鍵詞
6. 閱讀智能洞察

---

## 數據導出

### JSON 格式

```json
{
  "exportDate": "2024-02-19T12:00:00Z",
  "totalRecords": 50,
  "data": [
    {
      "id": "1708345200000_abc123",
      "url": "...",
      "title": "...",
      ...
    }
  ]
}
```

### CSV 格式

```
分析ID,分析時間,標題,作者,分類,點贊,評論,分享,互動率(%),情感傾向,熱度評分,變現潛力,關鍵詞,鏈接
1708345200000_abc123,2024/2/19 12:00:00,"分享我的日常護膚秘訣",美妝博主,美妝,2500,450,180,18.33,positive,85,high,"護膚, 美妝, 秘訣",https://...
```

### Excel 格式

TSV 格式，可直接在 Excel 中打開

---

## 統計分析

### 關鍵指標

#### 互動率
- **計算公式**: `(點贊 + 評論×2 + 分享×3) / 瀏覽量 × 100%`
- **等級**:
  - 病毒級: > 10%
  - 高互動: 5-10%
  - 中等: 2-5%
  - 低互動: < 2%

#### 熱度評分 (0-100)
- **互動評分** (0-40): 基於互動率
- **情感評分** (0-20): 正面 +20, 中立 +10, 負面 +0
- **關鍵詞評分** (0-40): 基於關鍵詞多樣性

#### 變現潛力
- **高潛力**: 熱度 > 70 且互動率 > 5%，或高價值分類且熱度 > 50
- **中等潛力**: 熱度 > 50 且互動率 > 3%，或熱度 > 30
- **低潛力**: 其他情況

### 情感分析

使用關鍵詞匹配進行情感檢測：
- **正面詞**: 好、喜歡、愛、棒、完美、推薦、讚、美、優秀、開心、滿意
- **負面詞**: 差、討厭、煩、糟糕、失望、不好、垃圾、難看、生氣、不滿

### 分類識別

自動識別帖子分類：
- 美妝、時尚、美食、旅遊、生活、健身、教育、科技、其他

---

## 故障排除

### 常見問題

#### Q: 分析結果不準確？
A: 當前使用模擬數據進行演示。生產環境應集成真實的小紅書 API 或爬蟲。

#### Q: 數據丟失了？
A: 數據存儲在瀏覽器 localStorage 中。清除瀏覽器數據會導致丟失。建議定期導出備份。

#### Q: 如何增加存儲容量？
A: 當前最多保存 50 條記錄。可修改 `lib/analysis-history.ts` 中的 `MAX_HISTORY` 常數。

#### Q: 支持批量分析嗎？
A: 當前不支持。可在歷史記錄中查看多個分析結果。

#### Q: 如何自定義分析指標？
A: 修改 `lib/post-analyzer.ts` 中的計算函數。

### 性能優化

1. **緩存**: 使用瀏覽器 localStorage 緩存分析結果
2. **分頁**: 歷史記錄支持分頁加載
3. **索引**: 使用 Map 加速分類和關鍵詞查詢

### 安全性

1. **輸入驗證**: 驗證 URL 格式
2. **XSS 防護**: 使用 React 自動轉義
3. **CSRF 防護**: 使用 Next.js 內置保護
4. **數據隱私**: 所有數據存儲在本地，不上傳服務器

---

## 技術棧

- **框架**: Next.js 16.1.6
- **語言**: TypeScript 5
- **樣式**: Tailwind CSS 4
- **運行時**: Node.js 22+
- **存儲**: 瀏覽器 localStorage

---

## 部署指南

### 開發環境

```bash
npm install
npm run dev
# 訪問 http://localhost:3000
```

### 生產構建

```bash
npm run build
npm start
```

### 環境變數

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## 未來計劃

- [ ] 集成真實小紅書 API
- [ ] 添加用戶認證
- [ ] 支持批量分析
- [ ] 實時通知
- [ ] 高級篩選和搜索
- [ ] 自定義報告生成
- [ ] 數據庫存儲
- [ ] 雲端同步

---

## 支持

如有問題或建議，請提交 Issue 或聯繫開發團隊。

**版本**: 1.0.0  
**最後更新**: 2024-02-19  
**許可證**: MIT
