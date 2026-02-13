# E2E Testing Guide - XHS Downloader

## Quick Start

### Installation
```bash
npm install --save-dev @playwright/test
npx playwright install
```

### Run Tests
```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/e2e/landing-page.spec.ts

# Run tests in headed mode (see browser)
npx playwright test --headed

# Debug tests
npx playwright test --debug

# Generate HTML report
npx playwright show-report
```

---

## Test Structure

### Test Organization
```
tests/
├── e2e/
│   ├── landing-page.spec.ts          # Landing page tests
│   ├── download-flow.spec.ts         # Download interaction tests
│   ├── results-page.spec.ts          # Results page tests
│   ├── monetization.spec.ts          # AdSense & affiliate tests
│   ├── edge-cases.spec.ts            # Error scenarios
│   ├── performance.spec.ts           # Performance metrics
│   ├── security.spec.ts              # Security tests
│   ├── responsive-accessibility.spec.ts  # Responsive & a11y
│   └── integration.spec.ts           # Complete journeys
├── fixtures.ts                        # Test fixtures
└── helpers.ts                         # Test utilities
```

---

## Writing Tests

### Basic Test Structure
```typescript
import { test, expect } from '@playwright/test'

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
    await page.goto('/')
  })

  test('should do something', async ({ page }) => {
    // Arrange
    const element = page.locator('selector')

    // Act
    await element.click()

    // Assert
    await expect(element).toBeVisible()
  })
})
```

### Using Fixtures
```typescript
import { test, expect } from '../fixtures'

test.describe('With Fixtures', () => {
  test('should use mocked AdSense', async ({ page, mockAdSense }) => {
    await page.goto('/')
    const called = await page.evaluate(() => (window as any).__adsbygoogleCalled)
    expect(called).toBeTruthy()
  })
})
```

### Common Patterns

#### Waiting for Elements
```typescript
// Wait for element to be visible
await page.locator('selector').waitFor({ state: 'visible' })

// Wait for network response
await page.waitForResponse(resp => resp.url().includes('/api/endpoint'))

// Wait for page load
await page.waitForLoadState('networkidle')
```

#### Handling Errors
```typescript
// Expect error message
const error = page.locator('text=Error')
await expect(error).toBeVisible()

// Handle missing elements
const element = page.locator('selector')
const isVisible = await element.isVisible().catch(() => false)
expect(isVisible).toBeFalsy()
```

#### Mocking API Responses
```typescript
await context.route('**/api/endpoint', route => {
  route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ data: 'value' })
  })
})
```

---

## Test Categories

### 1. Landing Page Tests
**File:** `tests/e2e/landing-page.spec.ts`

Tests the landing page monetization features:
- Page loads successfully
- Navigation links visible
- AdSense script loads
- Affiliate links displayed
- Page load time < 3 seconds
- No XSS vulnerabilities
- Safe external links

**Run:**
```bash
npx playwright test tests/e2e/landing-page.spec.ts
```

### 2. Download Flow Tests
**File:** `tests/e2e/download-flow.spec.ts`

Tests user download interaction:
- URL input validation
- Error handling
- Button state management
- Loading states
- API error handling
- Ad non-interference

**Run:**
```bash
npx playwright test tests/e2e/download-flow.spec.ts
```

### 3. Results Page Tests
**File:** `tests/e2e/results-page.spec.ts`

Tests results page functionality:
- Video data loading
- Quality selection
- Transcript display
- Share functionality
- Ad display
- Affiliate links
- Error handling

**Run:**
```bash
npx playwright test tests/e2e/results-page.spec.ts
```

### 4. Monetization Tests
**File:** `tests/e2e/monetization.spec.ts`

Tests AdSense and affiliate features:
- AdSense script loading
- Ad impression tracking
- Affiliate link tracking
- Affiliate link validation
- Ad exclusion paths
- API key security

**Run:**
```bash
npx playwright test tests/e2e/monetization.spec.ts
```

### 5. Edge Cases Tests
**File:** `tests/e2e/edge-cases.spec.ts`

Tests error scenarios:
- Missing configuration
- Network errors
- Invalid data
- Malformed responses
- Server errors
- Timeouts
- CORS errors

**Run:**
```bash
npx playwright test tests/e2e/edge-cases.spec.ts
```

### 6. Performance Tests
**File:** `tests/e2e/performance.spec.ts`

Tests performance metrics:
- Page load times
- Core Web Vitals (FCP, LCP, CLS)
- Image lazy loading
- Bundle size
- Asset caching
- Memory leaks

**Run:**
```bash
npx playwright test tests/e2e/performance.spec.ts
```

### 7. Security Tests
**File:** `tests/e2e/security.spec.ts`

Tests security vulnerabilities:
- XSS prevention
- Input sanitization
- CSRF prevention
- Safe redirects
- Sensitive data exposure
- Security headers

**Run:**
```bash
npx playwright test tests/e2e/security.spec.ts
```

### 8. Responsive & Accessibility Tests
**File:** `tests/e2e/responsive-accessibility.spec.ts`

Tests responsive design and accessibility:
- Mobile (375px)
- Tablet (768px)
- Desktop (1920px)
- WCAG compliance
- Keyboard navigation
- Screen reader support
- Browser compatibility

**Run:**
```bash
npx playwright test tests/e2e/responsive-accessibility.spec.ts
```

### 9. Integration Tests
**File:** `tests/e2e/integration.spec.ts`

Tests complete user journeys:
- Full download journey
- Transcript download
- Affiliate clicks
- Share functionality
- Error recovery
- Analytics tracking

**Run:**
```bash
npx playwright test tests/e2e/integration.spec.ts
```

---

## Debugging Tests

### Debug Mode
```bash
npx playwright test --debug
```

### Headed Mode
```bash
npx playwright test --headed
```

### Slow Motion
```bash
npx playwright test --headed --slow-mo=1000
```

### Single Test
```bash
npx playwright test -g "should load landing page"
```

### Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
```

### View Traces
```bash
npx playwright show-trace trace.zip
```

---

## CI/CD Integration

### GitHub Actions
```yaml
name: E2E Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npx playwright test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

### GitLab CI
```yaml
e2e-tests:
  image: mcr.microsoft.com/playwright:v1.58.2-focal
  script:
    - npm ci
    - npm run build
    - npx playwright test
  artifacts:
    when: always
    paths:
      - playwright-report/
```

---

## Best Practices

### 1. Use Data Attributes
```typescript
// Good
await page.locator('[data-testid="download-button"]').click()

// Avoid
await page.locator('button:nth-child(2)').click()
```

### 2. Wait for Conditions
```typescript
// Good
await page.waitForResponse(resp => resp.url().includes('/api/video'))

// Avoid
await page.waitForTimeout(5000)
```

### 3. Use Page Objects
```typescript
class DownloadPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/')
  }

  async enterUrl(url: string) {
    await this.page.locator('input').fill(url)
  }

  async clickDownload() {
    await this.page.locator('button:has-text("Download")').click()
  }
}
```

### 4. Isolate Tests
```typescript
test.beforeEach(async ({ page }) => {
  // Setup for each test
  await page.goto('/')
})

test.afterEach(async ({ page }) => {
  // Cleanup after each test
  await page.close()
})
```

### 5. Use Meaningful Assertions
```typescript
// Good
await expect(page.locator('h1')).toContainText('XHS Video Downloader')

// Avoid
await expect(page.locator('h1')).toBeVisible()
```

---

## Troubleshooting

### Tests Timing Out
- Increase timeout: `test.setTimeout(60000)`
- Check network conditions
- Verify selectors are correct

### Flaky Tests
- Add explicit waits
- Use `waitForLoadState('networkidle')`
- Avoid arbitrary timeouts
- Check for race conditions

### Selector Issues
- Use `data-testid` attributes
- Avoid nth-child selectors
- Use text content for buttons
- Test selectors in console

### API Mocking Issues
- Verify route patterns
- Check response format
- Ensure mock is set before navigation
- Use `context.route()` for global mocks

---

## Performance Benchmarks

### Target Metrics
- Landing page load: < 3 seconds
- Results page load: < 3 seconds
- First Contentful Paint: < 1.5 seconds
- Largest Contentful Paint: < 2.5 seconds
- Cumulative Layout Shift: < 0.1

### Monitoring
```typescript
const metrics = await page.evaluate(() => {
  const paint = performance.getEntriesByType('paint')
  return paint.map(p => ({ name: p.name, time: p.startTime }))
})
```

---

## Security Testing

### XSS Prevention
```typescript
const xssPayload = '<script>alert("xss")</script>'
await page.locator('input').fill(xssPayload)
const alertCalled = await page.evaluate(() => (window as any).__alertCalled)
expect(alertCalled).toBeFalsy()
```

### CSRF Prevention
```typescript
const forms = page.locator('form')
const csrfToken = forms.locator('input[name*="csrf"]')
await expect(csrfToken).toBeVisible()
```

### Safe Redirects
```typescript
const link = page.locator('a[target="_blank"]')
const rel = await link.getAttribute('rel')
expect(rel).toContain('noopener')
expect(rel).toContain('noreferrer')
```

---

## Accessibility Testing

### Keyboard Navigation
```typescript
await page.keyboard.press('Tab')
const focused = await page.evaluate(() => document.activeElement?.tagName)
expect(focused).toBeTruthy()
```

### Screen Reader Support
```typescript
const ariaLabel = await page.locator('button').getAttribute('aria-label')
expect(ariaLabel).toBeTruthy()
```

### Color Contrast
```typescript
const element = page.locator('p')
const color = await element.evaluate(el => {
  return window.getComputedStyle(el).color
})
expect(color).toBeTruthy()
```

---

## Reporting

### HTML Report
```bash
npx playwright show-report
```

### JUnit XML
```bash
# Generated as playwright-results.xml
```

### JSON Report
```bash
# Generated as playwright-results.json
```

### Custom Report
```typescript
// In playwright.config.ts
reporter: [
  ['html', { outputFolder: 'playwright-report' }],
  ['junit', { outputFile: 'playwright-results.xml' }],
  ['json', { outputFile: 'playwright-results.json' }],
]
```

---

## Maintenance

### Regular Tasks
- Update selectors when UI changes
- Review and fix flaky tests
- Update test data
- Monitor performance trends
- Review security findings

### Quarterly Reviews
- Analyze test coverage
- Update performance baselines
- Review monetization metrics
- Assess security posture

---

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Guide](https://playwright.dev/docs/debug)
- [CI/CD Integration](https://playwright.dev/docs/ci)

---

**Last Updated:** February 13, 2026
**Playwright Version:** 1.58.2
**Status:** Production Ready
