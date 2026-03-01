# Stripe 配置指南

## 🔑 獲取 API Keys

1. 登入 https://dashboard.stripe.com
2. 左側菜單 → Developers → API keys
3. 複製 **Publishable key** (以 `pk_test_` 開頭)
4. 點擊 "Reveal test key" 顯示 **Secret key** (以 `sk_test_` 開頭)
5. 把這兩個 key 填入 `.env.local`

## 🔄 配置 Webhook

1. Stripe Dashboard → Developers → Webhooks
2. 點擊 "Add endpoint"
3. Endpoint URL: `https://your-domain.vercel.app/api/webhooks/stripe`
4. 選擇以下 events:
   - `payment_intent.succeeded`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. 點擊 "Add endpoint"
6. 點擊 "Reveal signing secret"
7. 把 secret (以 `whsec_` 開頭) 填入 `.env.local`

## 🧪 測試支付

使用 Stripe 測試卡號:
- 卡號: `4242 4242 4242 4242`
- 到期: 任意未來日期 (如 12/25)
- CVC: 任意 3 位數 (如 123)
- 郵編: 任意 (如 12345)

## 🚀 部署步驟

```bash
# 1. 確保在項目目錄
cd xhs-project

# 2. 設置環境變數
# 編輯 .env.local，填入你的 Stripe keys

# 3. 執行部署腳本
chmod +x deploy-vercel.sh
./deploy-vercel.sh

# 4. 或使用 Vercel CLI 直接部署
vercel --prod
```

## 📊 測試檢查清單

- [ ] 訪問網站首頁
- [ ] 點擊「月度會員」按鈕
- [ ] 跳轉到 Stripe Checkout
- [ ] 使用測試卡完成支付
- [ ] 返回 success 頁面
- [ ] 在 Stripe Dashboard 查看交易記錄