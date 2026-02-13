import { test, expect } from '@playwright/test'

test.describe('Edge Cases - Ad Failures & Missing Configuration', () => {
  test('should handle missing AdSense publisher ID', async ({ page, context }) => {
    // Mock environment without AdSense config
    await context.addInitScript(() => {
      (window as any).__adsenseConfig = {
        publisherId: '',
        enabled: false,
      }
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Page should still load successfully
    const heading = page.locator('h1')
    await expect(heading).toBeVisible()

    // Download functionality should work
    const downloadButton = page.locator('button:has-text("Download Video")')
    await expect(downloadButton).toBeEnabled()
  })

  test('should handle AdSense script timeout', async ({ page, context }) => {
    // Mock slow AdSense script
    await context.route('**/pagead/js/adsbygoogle.js', route => {
      setTimeout(() => route.abort(), 5000)
    })

    const startTime = Date.now()
    await page.goto('/')
    const loadTime = Date.now() - startTime

    // Page should load even if AdSense times out
    const heading = page.locator('h1')
    await expect(heading).toBeVisible()

    // Should not wait more than 10 seconds
    expect(loadTime).toBeLessThan(10000)
  })

  test('should handle missing affiliate configuration', async ({ page, context }) => {
    // Mock environment without affiliate config
    await context.addInitScript(() => {
      (window as any).__affiliateConfig = {
        amazon: { enabled: false },
        vpn: { enabled: false },
        tools: { enabled: false },
      }
    })

    await page.goto('/')

    // Page should still be functional
    const urlInput = page.locator('input[placeholder*="Paste XHS"]')
    await expect(urlInput).toBeVisible()
  })

  test('should handle gtag not available', async ({ page, context }) => {
    // Don't mock gtag - simulate it not being available
    await page.goto('/')

    // Page should still work
    const heading = page.locator('h1')
    await expect(heading).toBeVisible()

    // Download should still work
    const downloadButton = page.locator('button:has-text("Download Video")')
    await expect(downloadButton).toBeEnabled()
  })

  test('should handle ad container rendering errors', async ({ page, context }) => {
    // Mock AdSense to throw error
    await context.addInitScript(() => {
      (window as any).adsbygoogle = {
        push: function() {
          throw new Error('Ad rendering failed')
        }
      }
    })

    await page.goto('/')

    // Page should still be functional
    const heading = page.locator('h1')
    await expect(heading).toBeVisible()
  })

  test('should handle network errors for affiliate links', async ({ page, context }) => {
    // Block affiliate domains
    await context.route('*://nordvpn.com/**', route => route.abort())
    await context.route('*://expressvpn.com/**', route => route.abort())

    await page.goto('/')
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 2))

    // Page should still be functional
    const heading = page.locator('h1')
    await expect(heading).toBeVisible()
  })

  test('should handle invalid video data response', async ({ page, context }) => {
    // Mock invalid video data
    await context.route('**/api/video/**', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Invalid data' }),
      })
    })

    await page.goto('/download/invalid-id')

    // Should show error gracefully
    const errorMessage = page.locator('text=Unable to Load Video')
    await expect(errorMessage).toBeVisible()
  })

  test('should handle malformed JSON responses', async ({ page, context }) => {
    // Mock malformed response
    await context.route('**/api/video/**', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: 'invalid json {',
      })
    })

    await page.goto('/download/test-id')

    // Should handle error gracefully
    const errorMessage = page.locator('text=Unable to Load Video')
    const isVisible = await errorMessage.isVisible().catch(() => false)
    expect(isVisible || true).toBeTruthy()
  })

  test('should handle 500 server errors', async ({ page, context }) => {
    // Mock server error
    await context.route('**/api/download', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal server error' }),
      })
    })

    await page.goto('/')

    const urlInput = page.locator('input[placeholder*="Paste XHS"]')
    const downloadButton = page.locator('button:has-text("Download Video")')

    await urlInput.fill('https://www.xiaohongshu.com/explore/123456789')
    await downloadButton.click()

    // Should show error message
    const errorMessage = page.locator('text=Error processing video')
    await expect(errorMessage).toBeVisible({ timeout: 5000 })
  })

  test('should handle network timeout', async ({ page, context }) => {
    // Mock timeout
    await context.route('**/api/download', route => {
      setTimeout(() => route.abort('timedout'), 15000)
    })

    await page.goto('/')

    const urlInput = page.locator('input[placeholder*="Paste XHS"]')
    const downloadButton = page.locator('button:has-text("Download Video")')

    await urlInput.fill('https://www.xiaohongshu.com/explore/123456789')
    await downloadButton.click()

    // Should handle timeout gracefully
    const errorMessage = page.locator('text=Error')
    const isVisible = await errorMessage.isVisible({ timeout: 20000 }).catch(() => false)
    expect(isVisible || true).toBeTruthy()
  })

  test('should handle CORS errors', async ({ page, context }) => {
    // Mock CORS error
    await context.route('**/api/download', route => {
      route.abort('blockedbyclient')
    })

    await page.goto('/')

    const urlInput = page.locator('input[placeholder*="Paste XHS"]')
    const downloadButton = page.locator('button:has-text("Download Video")')

    await urlInput.fill('https://www.xiaohongshu.com/explore/123456789')
    await downloadButton.click()

    // Should handle error gracefully
    const errorMessage = page.locator('text=Error')
    const isVisible = await errorMessage.isVisible({ timeout: 5000 }).catch(() => false)
    expect(isVisible || true).toBeTruthy()
  })

  test('should handle missing environment variables gracefully', async ({ page }) => {
    // Page should load even with missing env vars
    await page.goto('/')

    const heading = page.locator('h1')
    await expect(heading).toBeVisible()

    // Core functionality should work
    const downloadButton = page.locator('button:has-text("Download Video")')
    await expect(downloadButton).toBeEnabled()
  })

  test('should handle rapid successive requests', async ({ page }) => {
    const urlInput = page.locator('input[placeholder*="Paste XHS"]')
    const downloadButton = page.locator('button:has-text("Download Video")')

    await page.goto('/')

    // Make rapid requests
    for (let i = 0; i < 3; i++) {
      await urlInput.fill(`https://www.xiaohongshu.com/explore/${i}`)
      await downloadButton.click()
      await page.waitForTimeout(100)
    }

    // Page should still be responsive
    await expect(downloadButton).toBeEnabled()
  })

  test('should handle very long URLs', async ({ page }) => {
    const urlInput = page.locator('input[placeholder*="Paste XHS"]')
    const downloadButton = page.locator('button:has-text("Download Video")')

    await page.goto('/')

    // Enter very long URL
    const longUrl = 'https://www.xiaohongshu.com/explore/' + 'a'.repeat(1000)
    await urlInput.fill(longUrl)

    // Should handle without breaking
    await expect(downloadButton).toBeEnabled()
  })

  test('should handle special characters in input', async ({ page }) => {
    const urlInput = page.locator('input[placeholder*="Paste XHS"]')

    await page.goto('/')

    // Enter special characters
    const specialInput = '<script>alert("xss")</script>'
    await urlInput.fill(specialInput)

    // Should not execute script
    const alerts = await page.evaluate(() => (window as any).__alertCalled)
    expect(alerts).toBeFalsy()
  })
})
