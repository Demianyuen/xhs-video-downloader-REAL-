# XHS Analyzer - 部署指南

## 📋 目錄

1. [開發環境設置](#開發環境設置)
2. [生產構建](#生產構建)
3. [部署選項](#部署選項)
4. [環境配置](#環境配置)
5. [監控和維護](#監控和維護)
6. [故障恢復](#故障恢復)

---

## 開發環境設置

### 系統要求

- **Node.js**: 18.0 或更高版本
- **npm**: 9.0 或更高版本
- **操作系統**: Windows/macOS/Linux
- **內存**: 最少 2GB
- **磁盤空間**: 最少 500MB

### 安裝步驟

```bash
# 1. 克隆項目
git clone <repository-url>
cd xhs-downloader-web

# 2. 安裝依賴
npm install

# 3. 創建環境文件
cp .env.example .env.local

# 4. 啟動開發服務器
npm run dev

# 5. 訪問應用
# 打開瀏覽器訪問 http://localhost:3000
```

### 驗證安裝

```bash
# 檢查 Node.js 版本
node --version  # 應該 >= 18.0.0

# 檢查 npm 版本
npm --version   # 應該 >= 9.0.0

# 檢查依賴安裝
npm list

# 檢查 TypeScript 編譯
npx tsc --noEmit
```

---

## 生產構建

### 構建應用

```bash
# 1. 構建優化版本
npm run build

# 2. 檢查構建輸出
ls -la .next/

# 3. 測試生產構建
npm start

# 4. 訪問應用
# 打開瀏覽器訪問 http://localhost:3000
```

### 構建優化

```bash
# 分析構建大小
npm run build -- --analyze

# 檢查構建時間
time npm run build

# 檢查輸出大小
du -sh .next/
```

### 構建檢查清單

- [ ] 沒有 TypeScript 錯誤
- [ ] 沒有 ESLint 警告
- [ ] 所有測試通過
- [ ] 構建大小 < 5MB
- [ ] 沒有未使用的依賴

---

## 部署選項

### 選項 1: Vercel (推薦)

Vercel 是 Next.js 的官方部署平台，提供最佳的性能和開發體驗。

```bash
# 1. 安裝 Vercel CLI
npm i -g vercel

# 2. 登錄 Vercel
vercel login

# 3. 部署應用
vercel

# 4. 設置環境變數
vercel env add NEXT_PUBLIC_API_URL

# 5. 重新部署
vercel --prod
```

**優點**:
- 自動 CI/CD
- 全球 CDN
- 自動 HTTPS
- 免費層可用
- 無需服務器管理

**成本**: 免費 ~ $20/月

### 選項 2: Docker + 自託管

適合需要完全控制的場景。

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# 複製 package 文件
COPY package*.json ./

# 安裝依賴
RUN npm ci --only=production

# 複製應用代碼
COPY . .

# 構建應用
RUN npm run build

# 暴露端口
EXPOSE 3000

# 啟動應用
CMD ["npm", "start"]
```

```bash
# 構建 Docker 鏡像
docker build -t xhs-analyzer:latest .

# 運行容器
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://localhost:3000 \
  xhs-analyzer:latest

# 推送到 Docker Hub
docker tag xhs-analyzer:latest username/xhs-analyzer:latest
docker push username/xhs-analyzer:latest
```

**優點**:
- 完全可控
- 可在任何服務器上運行
- 易於擴展

**成本**: 取決於服務器成本

### 選項 3: AWS

使用 AWS 的多種服務進行部署。

```bash
# 使用 AWS Amplify
amplify init
amplify add hosting
amplify publish

# 或使用 Elastic Beanstalk
eb init
eb create
eb deploy
```

**優點**:
- 高度可擴展
- 企業級支持
- 多種部署選項

**成本**: 按使用量計費

### 選項 4: Netlify

```bash
# 1. 連接 Git 倉庫
# 訪問 https://app.netlify.com

# 2. 配置構建設置
# Build command: npm run build
# Publish directory: .next

# 3. 部署
# Netlify 會自動部署
```

**優點**:
- 簡單易用
- 自動部署
- 免費 HTTPS

**成本**: 免費 ~ $19/月

---

## 環境配置

### 環境變數

創建 `.env.local` 文件：

```env
# API 配置
NEXT_PUBLIC_API_URL=http://localhost:3000

# 分析配置
NEXT_PUBLIC_MAX_HISTORY=50
NEXT_PUBLIC_TOKEN_EXPIRY_MS=300000

# 下載配置
PYTHON_PATH=/path/to/python
PYTHON_SCRIPT_PATH=/path/to/script.py

# 生產環境
NODE_ENV=production
```

### 生產環境配置

```env
# .env.production
NEXT_PUBLIC_API_URL=https://your-domain.com
NODE_ENV=production

# 安全配置
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_SENTRY_DSN=https://...

# 性能配置
NEXT_PUBLIC_CACHE_TTL=3600
```

### 配置驗證

```bash
# 檢查環境變數
env | grep NEXT_PUBLIC

# 驗證配置
npm run build -- --debug
```

---

## 監控和維護

### 日誌監控

```bash
# 查看應用日誌
npm start 2>&1 | tee app.log

# 使用 PM2 進行進程管理
npm install -g pm2
pm2 start npm --name "xhs-analyzer" -- start
pm2 logs xhs-analyzer
pm2 monit
```

### 性能監控

```bash
# 使用 New Relic
npm install newrelic
# 在 server.js 中添加 require('newrelic')

# 使用 Sentry 進行錯誤追蹤
npm install @sentry/nextjs
```

### 健康檢查

```bash
# 檢查應用健康狀態
curl http://localhost:3000/api/analyze

# 檢查響應時間
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:3000

# 監控磁盤空間
df -h

# 監控內存使用
free -h

# 監控 CPU 使用
top -b -n 1 | head -20
```

### 定期維護

```bash
# 每週
- 檢查日誌中的錯誤
- 驗證備份完整性
- 檢查安全更新

# 每月
- 更新依賴
- 檢查性能指標
- 清理舊日誌

# 每季度
- 進行安全審計
- 優化數據庫
- 更新文檔
```

---

## 故障恢復

### 常見問題

#### 應用無法啟動

```bash
# 1. 檢查 Node.js 版本
node --version

# 2. 清除緩存
rm -rf node_modules package-lock.json
npm install

# 3. 檢查端口占用
lsof -i :3000

# 4. 查看詳細錯誤
npm start -- --debug
```

#### 高內存使用

```bash
# 1. 檢查內存洩漏
node --inspect app.js

# 2. 增加堆大小
NODE_OPTIONS=--max-old-space-size=4096 npm start

# 3. 重啟應用
pm2 restart xhs-analyzer
```

#### 數據庫連接失敗

```bash
# 1. 檢查連接字符串
echo $DATABASE_URL

# 2. 測試連接
psql $DATABASE_URL -c "SELECT 1"

# 3. 檢查防火牆規則
netstat -an | grep 5432
```

### 備份和恢復

```bash
# 備份 localStorage 數據
# 在瀏覽器控制台執行
localStorage.getItem('xhs_analysis_history')

# 恢復數據
localStorage.setItem('xhs_analysis_history', '[...]')

# 備份整個應用
tar -czf xhs-analyzer-backup.tar.gz .

# 恢復應用
tar -xzf xhs-analyzer-backup.tar.gz
```

### 災難恢復計劃

1. **備份策略**
   - 每日備份應用代碼
   - 每小時備份用戶數據
   - 異地備份副本

2. **恢復時間目標 (RTO)**
   - 目標: 1 小時內恢復
   - 測試: 每月進行一次恢復演練

3. **恢復點目標 (RPO)**
   - 目標: 最多丟失 1 小時數據
   - 實現: 每小時備份一次

---

## 性能優化

### 前端優化

```bash
# 1. 代碼分割
# Next.js 自動進行代碼分割

# 2. 圖片優化
# 使用 Next.js Image 組件

# 3. 緩存策略
# 配置 Cache-Control 頭

# 4. 壓縮
# 啟用 gzip 壓縮
```

### 後端優化

```bash
# 1. 數據庫索引
# 為常用查詢字段添加索引

# 2. 查詢優化
# 使用 SELECT 而不是 SELECT *

# 3. 連接池
# 配置數據庫連接池

# 4. 緩存
# 使用 Redis 進行緩存
```

### 監控性能

```bash
# 使用 Lighthouse
npm install -g lighthouse
lighthouse http://localhost:3000

# 使用 WebPageTest
# 訪問 https://www.webpagetest.org

# 使用 Google PageSpeed Insights
# 訪問 https://pagespeed.web.dev
```

---

## 安全加固

### HTTPS 配置

```bash
# 使用 Let's Encrypt 獲取免費證書
certbot certonly --standalone -d your-domain.com

# 配置 Nginx
server {
    listen 443 ssl;
    server_name your-domain.com;
    
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
}
```

### 安全頭配置

```typescript
// next.config.ts
export default {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}
```

### 依賴安全審計

```bash
# 檢查已知漏洞
npm audit

# 修復漏洞
npm audit fix

# 自動修復
npm audit fix --force
```

---

## 擴展性規劃

### 水平擴展

```bash
# 使用 Docker Compose 進行多實例部署
docker-compose up -d --scale app=3

# 使用 Kubernetes
kubectl scale deployment xhs-analyzer --replicas=3
```

### 垂直擴展

```bash
# 增加服務器資源
# - CPU: 2 核 → 4 核
# - 內存: 2GB → 8GB
# - 磁盤: 20GB → 100GB
```

### 數據庫擴展

```bash
# 使用讀寫分離
# - 主數據庫: 寫入
# - 從數據庫: 讀取

# 使用分片
# - 按用戶 ID 分片
# - 按日期分片
```

---

## 成本估算

### 月度成本估算

| 服務 | 免費層 | 付費層 | 備註 |
|------|--------|--------|------|
| Vercel | 0 | $20-100 | 推薦 |
| AWS | 12 個月免費 | $50-500 | 按使用量 |
| Netlify | 0 | $19-99 | 簡單易用 |
| 自託管 | 0 | $10-100 | 需要管理 |

### 優化成本

1. **使用免費層服務**
   - Vercel 免費層
   - GitHub Pages
   - Netlify 免費層

2. **優化資源使用**
   - 減少 API 調用
   - 優化數據庫查詢
   - 使用 CDN

3. **自動化運維**
   - 使用 CI/CD
   - 自動備份
   - 自動監控

---

## 檢查清單

### 部署前

- [ ] 所有測試通過
- [ ] 沒有 TypeScript 錯誤
- [ ] 沒有 ESLint 警告
- [ ] 環境變數配置完成
- [ ] 安全審計通過
- [ ] 性能測試通過
- [ ] 備份完成

### 部署後

- [ ] 應用正常運行
- [ ] 所有功能可用
- [ ] 監控告警配置
- [ ] 日誌收集配置
- [ ] 備份驗證
- [ ] 性能基準測試
- [ ] 用戶通知

---

## 支持和資源

- **Next.js 文檔**: https://nextjs.org/docs
- **Vercel 文檔**: https://vercel.com/docs
- **Node.js 文檔**: https://nodejs.org/docs
- **TypeScript 文檔**: https://www.typescriptlang.org/docs

---

**版本**: 1.0.0  
**最後更新**: 2024-02-19  
**維護者**: XHS Analyzer Team
