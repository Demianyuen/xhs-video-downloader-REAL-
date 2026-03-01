# 快速部署指南

## 🚀 5 分鐘快速開始

### 1. 本地開發

```bash
# 克隆項目
git clone https://github.com/Demianyuen/xhs-downloader-web.git
cd xhs-downloader-web

# 安裝依賴
npm install

# 啟動開發服務器
npm run dev

# 訪問 http://localhost:3000
```

### 2. 功能測試

**下載功能：**
1. 訪問首頁
2. 粘貼小紅書視頻鏈接
3. 點擊「下載視頻」
4. 視頻自動下載

**分析功能：**
1. 點擊「帖子分析工具」
2. 粘貼小紅書帖子鏈接
3. 點擊「開始分析」
4. 查看分析結果

**歷史功能：**
1. 進行多次分析
2. 點擊「查看歷史」
3. 查看所有分析記錄
4. 導出為 JSON 或 CSV

---

## 🌐 Vercel 部署（推薦）

### 步驟 1：準備 GitHub 倉庫

```bash
# 初始化 git（如果還沒有）
git init
git add .
git commit -m "Initial commit"

# 推送到 GitHub
git remote add origin https://github.com/YOUR_USERNAME/xhs-downloader-web.git
git branch -M main
git push -u origin main
```

### 步驟 2：連接 Vercel

1. 訪問 [vercel.com](https://vercel.com)
2. 使用 GitHub 賬號登錄
3. 點擊「New Project」
4. 選擇 GitHub 倉庫
5. 點擊「Import」
6. 配置設置（使用默認值）
7. 點擊「Deploy」

### 步驟 3：配置環境

在 Vercel 項目設置中：
- 環境變量：暫無必需配置
- 構建命令：`npm run build`
- 啟動命令：`npm start`

**部署完成！** 你的應用現在在線了。

---

## 🐳 Docker 部署

### 創建 Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

# 複製 package 文件
COPY package*.json ./

# 安裝依賴
RUN npm ci

# 複製源代碼
COPY . .

# 構建應用
RUN npm run build

# 暴露端口
EXPOSE 3000

# 啟動應用
CMD ["npm", "start"]
```

### 構建和運行

```bash
# 構建鏡像
docker build -t xhs-downloader .

# 運行容器
docker run -p 3000:3000 xhs-downloader

# 訪問 http://localhost:3000
```

### Docker Compose

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

運行：
```bash
docker-compose up -d
```

---

## 🖥️ 自託管部署

### 在 Linux 服務器上部署

```bash
# 1. SSH 連接到服務器
ssh user@your-server.com

# 2. 安裝 Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. 克隆項目
git clone https://github.com/YOUR_USERNAME/xhs-downloader-web.git
cd xhs-downloader-web

# 4. 安裝依賴
npm install

# 5. 構建應用
npm run build

# 6. 使用 PM2 管理進程
npm install -g pm2
pm2 start npm --name "xhs-downloader" -- start
pm2 save
pm2 startup

# 7. 配置 Nginx 反向代理
sudo nano /etc/nginx/sites-available/default
```

### Nginx 配置

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

重啟 Nginx：
```bash
sudo systemctl restart nginx
```

### 配置 SSL（HTTPS）

```bash
# 使用 Certbot
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## 📊 監控和維護

### 查看日誌

```bash
# PM2 日誌
pm2 logs xhs-downloader

# Nginx 日誌
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### 更新應用

```bash
# 拉取最新代碼
git pull origin main

# 重新安裝依賴
npm install

# 重新構建
npm run build

# 重啟應用
pm2 restart xhs-downloader
```

### 備份數據

```bash
# 備份用戶數據（如果有數據庫）
# 定期備份 localStorage 數據
```

---

## 🔧 配置優化

### 性能優化

1. **啟用 Gzip 壓縮**
```nginx
gzip on;
gzip_types text/plain text/css text/javascript application/json;
gzip_min_length 1000;
```

2. **設置緩存**
```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

3. **啟用 HTTP/2**
```nginx
listen 443 ssl http2;
```

### 安全優化

1. **添加安全頭**
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
```

2. **限制請求速率**
```nginx
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
location /api/ {
    limit_req zone=api burst=20 nodelay;
}
```

---

## 📈 擴展功能

### 添加數據庫支持

```bash
# 安裝 Prisma
npm install @prisma/client
npm install -D prisma

# 初始化
npx prisma init
```

### 添加用戶認證

```bash
npm install next-auth
```

### 添加支付功能

```bash
npm install stripe
```

---

## 🐛 常見問題

### Q: 下載功能不工作
**A:** 確保 Python 腳本路徑正確，檢查 `app/api/download/route.ts` 中的路徑配置。

### Q: 分析結果不準確
**A:** 當前使用模擬數據。要使用真實數據，需要集成小紅書 API 或爬蟲。

### Q: localStorage 數據丟失
**A:** 檢查瀏覽器隱私設置，或考慮遷移到後端數據庫。

### Q: 部署後頁面空白
**A:** 檢查瀏覽器控制台錯誤，查看服務器日誌。

---

## 📞 技術支持

- 查看 [FEATURES.md](./FEATURES.md) 了解功能詳情
- 查看 [ARCHITECTURE.md](./ARCHITECTURE.md) 了解架構設計
- 提交 Issue 報告問題
- 提交 PR 貢獻代碼

---

## 🎯 下一步

1. **集成真實 API**
   - 集成小紅書官方 API（如可用）
   - 或使用第三方爬蟲服務

2. **添加用戶系統**
   - 用戶註冊和登錄
   - 用戶數據持久化
   - 個人分析歷史

3. **添加高級功能**
   - 批量分析
   - 定時分析
   - 數據對比
   - 趨勢預測

4. **商業化**
   - 添加廣告
   - 高級訂閱
   - API 服務
   - 數據報告

---

**祝部署順利！** 🚀
