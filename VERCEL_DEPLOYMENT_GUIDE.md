# 🚀 Vercel 部署執行指南

**生成時間**: 2026-03-04 凌晨 01:54 UTC
**項目**: XHS Downloader Web
**狀態**: 準備部署

---

## 📋 部署前檢查清單

### ✅ 已完成
- [x] 代碼開發完成
- [x] GitHub 部署完成 (14 個提交)
- [x] 所有文檔完成
- [x] 測試腳本完成
- [x] Vercel Token 已獲得

### ⏳ 待進行
- [ ] 配置 Vercel 環境變量
- [ ] 觸發 Vercel 部署
- [ ] 驗證部署成功
- [ ] 配置域名 DNS
- [ ] 驗證 HTTPS 證書

---

## 🔧 Vercel 部署步驟

### 步驟 1: 訪問 Vercel 控制面板
```
1. 打開 https://vercel.com/dashboard
2. 使用 GitHub 賬戶登錄
3. 點擊 "Add New..." → "Project"
```

### 步驟 2: 導入 GitHub 仓库
```
1. 搜索仓库: "xhs-video-downloader-REAL-"
2. 選擇 Demianyuen/xhs-video-downloader-REAL-
3. 點擊 "Import"
```

### 步驟 3: 配置項目設置
```
1. 項目名稱: xhs-downloader (或自定義)
2. 框架預設: Next.js
3. 根目錄: ./ (默認)
4. 構建命令: npm run build (默認)
5. 輸出目錄: .next (默認)
```

### 步驟 4: 配置環境變量

**在 Vercel 中添加以下環境變量：**

#### XHS Downloader API
```
XHS_API_BASE_URL = https://api.xhsdownloader.com
XHS_API_KEY = [你的 XHS API 密鑰]
VIDEO_DOWNLOAD_API = https://api.videodl.com
VIDEO_DOWNLOAD_API_KEY = [你的視頻下載 API 密鑰]
OPENAI_API_KEY = [你的 OpenAI API 密鑰]
```

#### Stripe 支付
```
STRIPE_SECRET_KEY = [你的 Stripe Secret Key]
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = [你的 Stripe Publishable Key]
STRIPE_WEBHOOK_SECRET = [你的 Stripe Webhook Secret]
```

#### AdSense 廣告
```
NEXT_PUBLIC_ADSENSE_CLIENT_ID = [你的 AdSense Client ID]
NEXT_PUBLIC_BASE_URL = https://xhsvideodownloader.com
```

#### Google OAuth (可選)
```
GOOGLE_CLIENT_ID = [你的 Google Client ID]
GOOGLE_CLIENT_SECRET = [你的 Google Client Secret]
GOOGLE_REDIRECT_URI = https://xhsvideodownloader.com/api/auth/callback
```

### 步驟 5: 觸發部署
```
1. 確認所有環境變量已配置
2. 點擊 "Deploy"
3. 等待部署完成（通常 2-5 分鐘）
```

### 步驟 6: 驗證部署成功
```
1. 檢查部署日誌，確保沒有錯誤
2. 訪問 Vercel 提供的臨時 URL
3. 測試主頁加載
4. 測試下載 API 端點
```

---

## 🌐 域名配置

### 步驟 1: 更新 DNS 記錄
```
在你的域名註冊商（如 Namecheap、GoDaddy 等）中：

1. 進入 DNS 管理
2. 添加 A 記錄:
   - 名稱: @ (或 www)
   - 類型: A
   - 值: 76.76.19.89 (Vercel IP)

3. 添加 CNAME 記錄:
   - 名稱: www
   - 類型: CNAME
   - 值: cname.vercel-dns.com
```

### 步驟 2: 在 Vercel 中添加域名
```
1. 進入項目設置 → Domains
2. 點擊 "Add Domain"
3. 輸入: xhsvideodownloader.com
4. 選擇 "Add"
5. 按照提示驗證域名所有權
```

### 步驟 3: 等待 DNS 傳播
```
- 通常需要 24-48 小時
- 可以使用 https://www.whatsmydns.net/ 檢查傳播狀態
```

---

## ✅ 部署後驗證

### 功能測試
```bash
# 1. 測試主頁
curl https://xhsvideodownloader.com/

# 2. 測試下載 API
curl -X POST https://xhsvideodownloader.com/api/download \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.xiaohongshu.com/explore/..."}'

# 3. 測試 AdSense API
curl https://xhsvideodownloader.com/api/adsense

# 4. 測試轉錄 API
curl -X POST https://xhsvideodownloader.com/api/transcript \
  -H "Content-Type: application/json" \
  -d '{"videoId":"..."}'
```

### 性能檢查
```
1. 訪問 https://xhsvideodownloader.com/
2. 打開瀏覽器開發者工具 (F12)
3. 檢查 Network 標籤
4. 檢查 Lighthouse 評分
5. 確保首頁加載時間 < 2 秒
```

### AdSense 驗證
```
1. 訪問 https://xhsvideodownloader.com/
2. 檢查頁面源代碼 (Ctrl+U)
3. 搜索 "google_ad_client"
4. 確保 AdSense 代碼已正確加載
```

---

## 🔍 常見問題排查

### 部署失敗
```
1. 檢查構建日誌
2. 確保所有環境變量已配置
3. 確保 package.json 和 package-lock.json 存在
4. 檢查 Node.js 版本兼容性
```

### 頁面加載緩慢
```
1. 檢查 API 響應時間
2. 優化圖片大小
3. 啟用 CDN 緩存
4. 檢查 Vercel 分析
```

### API 端點返回 404
```
1. 檢查路由配置
2. 確保 API 文件在正確位置
3. 檢查環境變量是否正確
4. 查看 Vercel 日誌
```

---

## 📊 部署後監測

### 實時監測
- Vercel Analytics: https://vercel.com/analytics
- 性能監測: https://vercel.com/docs/analytics
- 錯誤追蹤: 檢查 Vercel 日誌

### 定期檢查
- 每天檢查部署狀態
- 監測 API 響應時間
- 檢查 AdSense 收入數據
- 監測用戶流量

---

## 🎯 下一步行動

### 立即進行
1. [ ] 配置 Vercel 環境變量
2. [ ] 觸發 Vercel 部署
3. [ ] 驗證部署成功

### 24 小時內
1. [ ] 配置域名 DNS
2. [ ] 驗證 HTTPS 證書
3. [ ] 運行完整測試

### 48 小時內
1. [ ] 提交網站到 AdSense
2. [ ] 等待 AdSense 批准
3. [ ] 監測收入數據

---

**準備時間**: 2026-03-04 凌晨 01:54 UTC
**版本**: 1.0
**狀態**: ✅ 準備就緒，等待執行
