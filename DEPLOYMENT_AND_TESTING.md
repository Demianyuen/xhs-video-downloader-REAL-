# 🚀 XHS Downloader Vercel 部署和测试指南

## 部署步骤

### 1. Vercel 部署

#### 1.1 连接 GitHub 仓库
```bash
# 访问 Vercel 控制面板
https://vercel.com/dashboard

# 导入项目
# 选择 GitHub 仓库: Demianyuen/xhs-video-downloader-REAL-
# 选择分支: main
```

#### 1.2 配置环境变量
在 Vercel 项目设置中添加以下环境变量：

```env
# XHS API 配置
XHS_API_BASE_URL=https://api.xhsdownloader.com
XHS_API_KEY=your_xhs_api_key

# 视频下载 API 配置
VIDEO_DOWNLOAD_API=https://api.videodl.com
VIDEO_DOWNLOAD_API_KEY=your_video_download_api_key

# OpenAI Whisper API 配置
OPENAI_API_KEY=your_openai_api_key

# Google AdSense 配置
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=https://xhsvideodownloader.com/api/auth/callback
ADSENSE_ACCOUNT_ID=pub-xxxxxxxxxxxxxxxx
ADSENSE_ACCESS_TOKEN=ya29.xxxxx

# AdSense 监测配置
ADSENSE_MIN_DAILY_REVENUE=10
ADSENSE_MIN_CPM=2.5
ADSENSE_MAX_CTR=5
```

#### 1.3 部署
```bash
# Vercel 会自动检测 GitHub 推送并部署
# 或者手动触发部署
vercel deploy --prod
```

### 2. 部署验证

#### 2.1 检查部署状态
```bash
# 访问 Vercel 控制面板查看部署状态
https://vercel.com/dashboard/xhs-downloader

# 检查构建日志
# 确保没有错误
```

#### 2.2 验证域名
```bash
# 检查域名是否正确解析
curl -I https://xhsvideodownloader.com/

# 应该返回 200 OK
```

## 测试计划

### 3. 功能测试

#### 3.1 主页测试
```bash
# 访问主页
https://xhsvideodownloader.com/

# 检查以下内容：
# ✅ 页面加载正常
# ✅ 所有文本显示正确
# ✅ 样式和布局正确
# ✅ 响应式设计工作正常
# ✅ 多语言支持工作正常
```

#### 3.2 下载 API 测试
```bash
# 测试下载 API
curl -X POST https://xhsvideodownloader.com/api/download \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.xiaohongshu.com/explore/xxxxx",
    "format": "mp4",
    "removeWatermark": true,
    "extractTranscript": true
  }'

# 应该返回：
# {
#   "success": true,
#   "videoId": "xxxxx",
#   "title": "Video Title",
#   "downloadUrl": "https://...",
#   "expiresAt": "2026-03-05T01:46:00Z"
# }
```

#### 3.3 AdSense API 测试
```bash
# 测试 AdSense 报告 API
curl https://xhsvideodownloader.com/api/adsense?action=report&period=daily&daysBack=30

# 应该返回：
# {
#   "period": "daily",
#   "totalRevenue": 1234.56,
#   "totalImpressions": 50000,
#   "metrics": [...]
# }
```

#### 3.4 AdSense 监测 API 测试
```bash
# 测试 AdSense 监测 API
curl https://xhsvideodownloader.com/api/adsense?action=monitor

# 应该返回：
# {
#   "alerts": [],
#   "metrics": {...}
# }
```

### 4. 性能测试

#### 4.1 页面加载速度
```bash
# 使用 Lighthouse 测试
# 访问 https://developers.google.com/web/tools/lighthouse

# 检查以下指标：
# ✅ First Contentful Paint (FCP) < 1.8s
# ✅ Largest Contentful Paint (LCP) < 2.5s
# ✅ Cumulative Layout Shift (CLS) < 0.1
# ✅ Performance Score > 90
```

#### 4.2 API 响应时间
```bash
# 测试 API 响应时间
time curl https://xhsvideodownloader.com/api/download \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.xiaohongshu.com/explore/xxxxx"}'

# 应该在 5 秒内响应
```

### 5. AdSense 验证

#### 5.1 AdSense 账户验证
```bash
# 1. 访问 Google AdSense 控制面板
https://adsense.google.com/

# 2. 检查网站是否已验证
# ✅ 网站状态应该是 "已批准"

# 3. 检查广告是否正常显示
# ✅ 页面上应该显示 Google 广告
```

#### 5.2 AdSense 收入验证
```bash
# 1. 访问 AdSense 报告
https://adsense.google.com/reports

# 2. 检查以下指标：
# ✅ 展示次数 > 0
# ✅ 点击次数 > 0
# ✅ 收入 > 0
# ✅ CTR > 0%
# ✅ CPM > 0
```

#### 5.3 AdSense API 集成验证
```bash
# 1. 检查 AdSense API 是否正常工作
curl https://xhsvideodownloader.com/api/adsense?action=account

# 2. 应该返回账户信息
# {
#   "id": "pub-xxxxxxxxxxxxxxxx",
#   "name": "XHS Downloader AdSense Account",
#   "status": "ACTIVE"
# }
```

## 故障排除

### 常见问题

#### 问题 1: 部署失败
```
错误: Build failed
原因: 环境变量未配置或依赖缺失
解决方案:
1. 检查所有环境变量是否正确配置
2. 检查 package.json 中的依赖是否正确
3. 查看 Vercel 构建日志获取详细错误信息
```

#### 问题 2: API 返回 500 错误
```
错误: Internal Server Error
原因: 外部 API 调用失败或环境变量配置错误
解决方案:
1. 检查环境变量是否正确
2. 检查外部 API 是否可用
3. 查看服务器日志获取详细错误信息
```

#### 问题 3: AdSense 广告不显示
```
错误: 页面上没有显示 Google 广告
原因: AdSense 账户未验证或广告代码配置错误
解决方案:
1. 检查 AdSense 账户是否已验证
2. 检查广告代码是否正确配置
3. 等待 24-48 小时让 Google 审核网站
```

## 检查清单

### 部署前检查
- [ ] 所有代码已提交到 GitHub
- [ ] 所有环境变量已配置
- [ ] 构建成功（npm run build）
- [ ] 没有 TypeScript 错误
- [ ] 没有 ESLint 警告

### 部署后检查
- [ ] Vercel 部署成功
- [ ] 域名正确解析
- [ ] 主页加载正常
- [ ] 所有 API 端点正常工作
- [ ] AdSense 广告正常显示

### 功能测试检查
- [ ] 下载 API 正常工作
- [ ] AdSense 报告 API 正常工作
- [ ] AdSense 监测 API 正常工作
- [ ] 多语言支持正常工作
- [ ] 响应式设计正常工作

### AdSense 验证检查
- [ ] AdSense 账户已验证
- [ ] 广告正常显示
- [ ] 收入数据正常更新
- [ ] API 集成正常工作
- [ ] 监测系统正常工作

## 下一步

1. **立即行动**
   - [ ] 配置 Vercel 环境变量
   - [ ] 触发 Vercel 部署
   - [ ] 验证部署成功

2. **测试验证**
   - [ ] 进行功能测试
   - [ ] 进行性能测试
   - [ ] 进行 AdSense 验证

3. **监测和优化**
   - [ ] 监测 AdSense 收入
   - [ ] 优化页面性能
   - [ ] 优化 API 响应时间

---

**创建时间**: 2026-03-04 01:46 UTC
**版本**: 1.0
**状态**: 准备部署
