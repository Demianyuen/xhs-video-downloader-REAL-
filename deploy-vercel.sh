#!/bin/bash
# XHS Downloader Vercel 部署腳本
# 使用前請確保已安裝 Vercel CLI: npm i -g vercel

echo "═══════════════════════════════════════════════════"
echo "  🚀 XHS Downloader 部署腳本"
echo "═══════════════════════════════════════════════════"
echo ""

# 檢查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安裝。請先安裝 Node.js 18+"
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 版本過低。需要 18+，當前: $(node --version)"
    exit 1
fi

echo "✅ Node.js: $(node --version)"

# 檢查 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📦 安裝 Vercel CLI..."
    npm install -g vercel
fi

echo "✅ Vercel CLI: $(vercel --version)"

# 安裝依賴
echo ""
echo "📦 安裝項目依賴..."
npm install

# 檢查環境變數
if [ ! -f .env.local ]; then
    echo "❌ .env.local 不存在。請先設置環境變數。"
    echo "需要設置:"
    echo "  - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
    echo "  - STRIPE_SECRET_KEY"
    exit 1
fi

echo "✅ 環境變數檔案存在"

# 構建測試
echo ""
echo "🔨 執行生產構建..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 構建失敗。請檢查錯誤信息。"
    exit 1
fi

echo "✅ 構建成功"

# 部署到 Vercel
echo ""
echo "🚀 開始部署到 Vercel..."
echo "請按照提示操作:"
echo ""

vercel --prod

echo ""
echo "═══════════════════════════════════════════════════"
echo "  ✅ 部署完成！"
echo "═══════════════════════════════════════════════════"
echo ""
echo "下一步:"
echo "1. 在 Vercel Dashboard 設置環境變數"
echo "2. 配置 Stripe Webhook"
echo "3. 測試支付流程"
echo ""
echo "需要幫助？執行: vercel --help"