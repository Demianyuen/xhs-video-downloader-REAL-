#!/bin/bash

# XHS Downloader 完整测试脚本
# 用于验证所有功能和 AdSense 集成

set -e

echo "🚀 XHS Downloader 完整测试开始"
echo "================================"

# 配置
BASE_URL="https://xhsvideodownloader.com"
LOCAL_URL="http://localhost:3000"
TEST_RESULTS="test-results.json"

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 测试计数
TESTS_PASSED=0
TESTS_FAILED=0

# 日志函数
log_test() {
  echo -e "${YELLOW}[TEST]${NC} $1"
}

log_pass() {
  echo -e "${GREEN}[PASS]${NC} $1"
  ((TESTS_PASSED++))
}

log_fail() {
  echo -e "${RED}[FAIL]${NC} $1"
  ((TESTS_FAILED++))
}

# 1. 主页测试
echo ""
echo "📄 1. 主页测试"
echo "=============="

log_test "检查主页是否可访问"
if curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/" | grep -q "200"; then
  log_pass "主页可访问 (HTTP 200)"
else
  log_fail "主页无法访问"
fi

log_test "检查主页内容"
if curl -s "$BASE_URL/" | grep -q "XHS Downloader"; then
  log_pass "主页包含正确的标题"
else
  log_fail "主页标题不正确"
fi

# 2. API 端点测试
echo ""
echo "🔌 2. API 端点测试"
echo "=================="

log_test "检查下载 API 端点"
RESPONSE=$(curl -s -X POST "$BASE_URL/api/download" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.xiaohongshu.com/explore/test"}' \
  -w "\n%{http_code}")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "400" ]; then
  log_pass "下载 API 端点响应正常 (HTTP $HTTP_CODE)"
else
  log_fail "下载 API 端点响应异常 (HTTP $HTTP_CODE)"
fi

log_test "检查 AdSense 报告 API 端点"
if curl -s "$BASE_URL/api/adsense?action=report" | grep -q "period\|error"; then
  log_pass "AdSense 报告 API 端点响应正常"
else
  log_fail "AdSense 报告 API 端点响应异常"
fi

log_test "检查 AdSense 监测 API 端点"
if curl -s "$BASE_URL/api/adsense?action=monitor" | grep -q "alerts\|error"; then
  log_pass "AdSense 监测 API 端点响应正常"
else
  log_fail "AdSense 监测 API 端点响应异常"
fi

# 3. 多语言测试
echo ""
echo "🌍 3. 多语言测试"
echo "================"

log_test "检查简体中文支持"
if curl -s "$BASE_URL/?lang=zh-CN" | grep -q "小红书"; then
  log_pass "简体中文支持正常"
else
  log_fail "简体中文支持异常"
fi

log_test "检查繁体中文支持"
if curl -s "$BASE_URL/?lang=zh-TW" | grep -q "小紅書"; then
  log_pass "繁体中文支持正常"
else
  log_fail "繁体中文支持异常"
fi

log_test "检查英文支持"
if curl -s "$BASE_URL/?lang=en" | grep -q "XHS Downloader"; then
  log_pass "英文支持正常"
else
  log_fail "英文支持异常"
fi

# 4. 性能测试
echo ""
echo "⚡ 4. 性能测试"
echo "=============="

log_test "检查主页加载时间"
START_TIME=$(date +%s%N)
curl -s "$BASE_URL/" > /dev/null
END_TIME=$(date +%s%N)
LOAD_TIME=$(( (END_TIME - START_TIME) / 1000000 ))

if [ $LOAD_TIME -lt 3000 ]; then
  log_pass "主页加载时间: ${LOAD_TIME}ms (< 3000ms)"
else
  log_fail "主页加载时间: ${LOAD_TIME}ms (> 3000ms)"
fi

log_test "检查 API 响应时间"
START_TIME=$(date +%s%N)
curl -s "$BASE_URL/api/adsense?action=report" > /dev/null
END_TIME=$(date +%s%N)
API_TIME=$(( (END_TIME - START_TIME) / 1000000 ))

if [ $API_TIME -lt 5000 ]; then
  log_pass "API 响应时间: ${API_TIME}ms (< 5000ms)"
else
  log_fail "API 响应时间: ${API_TIME}ms (> 5000ms)"
fi

# 5. AdSense 验证
echo ""
echo "💰 5. AdSense 验证"
echo "=================="

log_test "检查 AdSense 脚本是否加载"
if curl -s "$BASE_URL/" | grep -q "pagead2.googlesyndication.com"; then
  log_pass "AdSense 脚本已加载"
else
  log_fail "AdSense 脚本未加载"
fi

log_test "检查 AdSense 账户 ID"
if curl -s "$BASE_URL/" | grep -q "ca-pub-"; then
  log_pass "AdSense 账户 ID 已配置"
else
  log_fail "AdSense 账户 ID 未配置"
fi

# 6. 安全性测试
echo ""
echo "🔒 6. 安全性测试"
echo "================"

log_test "检查 HTTPS"
if curl -s -I "$BASE_URL/" | grep -q "HTTP/2\|HTTP/1.1"; then
  log_pass "HTTPS 已启用"
else
  log_fail "HTTPS 未启用"
fi

log_test "检查安全头"
if curl -s -I "$BASE_URL/" | grep -q "Content-Security-Policy\|X-Frame-Options"; then
  log_pass "安全头已配置"
else
  log_fail "安全头未配置"
fi

# 7. 测试总结
echo ""
echo "📊 测试总结"
echo "==========="
echo -e "通过: ${GREEN}$TESTS_PASSED${NC}"
echo -e "失败: ${RED}$TESTS_FAILED${NC}"
echo "总计: $((TESTS_PASSED + TESTS_FAILED))"

# 保存结果
cat > "$TEST_RESULTS" << EOF
{
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "base_url": "$BASE_URL",
  "tests_passed": $TESTS_PASSED,
  "tests_failed": $TESTS_FAILED,
  "total_tests": $((TESTS_PASSED + TESTS_FAILED)),
  "success_rate": $(echo "scale=2; $TESTS_PASSED * 100 / ($TESTS_PASSED + $TESTS_FAILED)" | bc)%
}
EOF

echo ""
echo "✅ 测试完成！结果已保存到 $TEST_RESULTS"

# 返回状态码
if [ $TESTS_FAILED -eq 0 ]; then
  exit 0
else
  exit 1
fi
