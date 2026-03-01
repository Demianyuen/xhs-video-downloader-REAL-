#!/bin/bash
# Vercel CLI 強制部署腳本
# 適用於 Git 部署失敗時

echo "🚀 Vercel CLI 手動部署"
echo "======================"

# 檢查是否已登入
vercel whoami 2>/dev/null || {
  echo "請先登入 Vercel CLI:"
  echo "vercel login"
  exit 1
}

# 部署到生產環境
echo "正在部署到生產環境..."
vercel --prod --yes

echo "✅ 部署完成！"
echo "檢查 ads.txt:"
curl -s https://xhsvideodownloader.com/ads.txt
