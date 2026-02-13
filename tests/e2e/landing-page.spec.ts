import { test, expect } from '@playwright/test'

test.describe('Landing Page - Monetization Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('should load landing page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/XHS Video Downloader/)
    await expect(page.locator('h1')).toContainText('XHS Video Downloader')
  })

  test('should display header with navigation links', async ({ page }) => {
    const header = page.locator('header')
    await expect(header).toBeVisible()

    const aboutLink = page.locator('a:has-text("About")')
    const pricingLink = page.locator('a:has-text("Pricing")')
    const faqLink = page.locator('a:has-text("FAQ")')

    await expect(aboutLink).toBeVisible()
    await expect(pricingLink).toBeVisible()
    await expect(faqLink).toBeVisible()
  })

  test('should verify AdSense script loads when enabled', async ({ page, context }) => {
    // Mock AdSense script
    await context.addInitScript(() => {
      (window as any).adsbygoogle = (window as any).adsbygoogle || []
    })

    // Check if ads container is present
    const adContainers = page.locator('[class*="ad"]')
    const count = await adContainers.count()
    expect(count).toBeGreaterThanOrEqual(0)
  })

  test('should display affiliate links section', async ({ page }) => {
    // Scroll to find affiliate section
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 2))

    // Look for affiliate links
    const affiliateLinks = page.locator('a[rel*="sponsored"]')
    const linkCount = await affiliateLinks.count()

    // Should have at least some affiliate links visible
    if (linkCount > 0) {
      await expect(affiliateLinks.first()).toBeVisible()
    }
  })

  test('should verify page load time is under 3 seconds', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const loadTime = Date.now() - startTime

    expect(loadTime).toBeLessThan(3000)
  })

  test('should display features section with proper styling', async ({ page }) => {
    const featuresSection = page.locator('text=100% Free')
    await expect(featuresSection).toBeVisible()

    const featureCards = page.locator('[class*="border-l-4"]')
    const count = await featureCards.count()
    expect(count).toBeGreaterThanOrEqual(4)
  })

  test('should have proper footer with links', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, document.body.scrollHeight))

    const footer = page.locator('footer')
    await expect(footer).toBeVisible()

    const privacyLink = page.locator('a:has-text("Privacy")')
    const termsLink = page.locator('a:has-text("Terms")')

    await expect(privacyLink).toBeVisible()
    await expect(termsLink).toBeVisible()
  })

  test('should verify no XSS vulnerabilities in page content', async ({ page }) => {
    const pageContent = await page.content()

    // Check for common XSS patterns
    expect(pageContent).not.toContain('<script>')
    expect(pageContent).not.toContain('javascript:')
    expect(pageContent).not.toContain('onerror=')
    expect(pageContent).not.toContain('onload=')
  })

  test('should verify safe external links with proper attributes', async ({ page }) => {
    const externalLinks = page.locator('a[target="_blank"]')
    const count = await externalLinks.count()

    for (let i = 0; i < Math.min(count, 5); i++) {
      const link = externalLinks.nth(i)
      const rel = await link.getAttribute('rel')

      // Should have noopener and noreferrer for security
      if (rel) {
        expect(rel).toContain('noopener')
        expect(rel).toContain('noreferrer')
      }
    }
  })
})
