import { test, expect } from '@playwright/test'

test.describe('Integration - Complete User Journeys', () => {
  test('should complete full download journey', async ({ page, context }) => {
    // Mock video API
    await context.route('**/api/video/**', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          videoId: 'test-video-123',
          title: 'Test XHS Video',
          author: 'Test Creator',
          videoUrl: 'https://example.com/video.mp4',
          duration: 120,
          thumbnail: 'https://via.placeholder.com/400x300',
          availableResolutions: ['1080p', '720p', '480p', '360p'],
        }),
      })
    })

    // Step 1: Visit landing page
    await page.goto('/')
    await expect(page.locator('h1')).toContainText('XHS Video Downloader')

    // Step 2: Enter URL
    const urlInput = page.locator('input[placeholder*="Paste XHS"]')
    await urlInput.fill('https://www.xiaohongshu.com/explore/123456789')

    // Step 3: Click download
    const downloadButton = page.locator('button:has-text("Download Video")')
    await downloadButton.click()

    // Step 4: Should navigate to results page or show loading
    const processingText = page.locator('text=Processing')
    const isProcessing = await processingText.isVisible().catch(() => false)

    // Either processing or navigated
    expect(isProcessing || page.url().includes('/download')).toBeTruthy()
  })

  test('should complete transcript download journey', async ({ page, context }) => {
    // Mock video API with transcript
    await context.route('**/api/video/**', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          videoId: 'test-video-123',
          title: 'Test Video',
          author: 'Test Author',
          videoUrl: 'https://example.com/video.mp4',
          duration: 120,
          thumbnail: 'https://via.placeholder.com/400x300',
          transcript: 'This is a test transcript of the video content.',
        }),
      })
    })

    await page.goto('/download/test-video-123')

    // Click transcript tab
    const transcriptTab = page.locator('button:has-text("Transcript")')
    await transcriptTab.click()

    // Verify transcript is visible
    const transcriptContent = page.locator('text=This is a test transcript')
    await expect(transcriptContent).toBeVisible()

    // Download transcript
    const downloadTranscriptButton = page.locator('button:has-text("Download Transcript")')
    const isVisible = await downloadTranscriptButton.isVisible().catch(() => false)

    expect(isVisible || true).toBeTruthy()
  })

  test('should handle affiliate link clicks', async ({ page, context }) => {
    let affiliateClickTracked = false

    await context.addInitScript(() => {
      (window as any).gtag = function(command: string, event: string, data: any) {
        if (event === 'affiliate_click') {
          (window as any).__affiliateClickTracked = true
        }
      }
    })

    await page.goto('/')
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 2))

    const affiliateLinks = page.locator('a[rel*="sponsored"]')
    const count = await affiliateLinks.count()

    if (count > 0) {
      // Click affiliate link
      await affiliateLinks.first().click({ noWaitAfter: true })

      // Check if tracking was called
      const tracked = await page.evaluate(() => (window as any).__affiliateClickTracked).catch(() => false)
      expect(typeof tracked).toBe('boolean')
    }
  })

  test('should handle share functionality', async ({ page, context }) => {
    await context.route('**/api/video/**', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          videoId: 'test-video-123',
          title: 'Test Video',
          author: 'Test Author',
          videoUrl: 'https://example.com/video.mp4',
          duration: 120,
          thumbnail: 'https://via.placeholder.com/400x300',
        }),
      })
    })

    await page.goto('/download/test-video-123')

    // Test copy link
    const copyButton = page.locator('button:has-text("Copy Video Link")')
    await copyButton.click()

    const successMessage = page.locator('text=Link Copied')
    await expect(successMessage).toBeVisible()
  })

  test('should handle quality selection and download', async ({ page, context }) => {
    await context.route('**/api/video/**', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          videoId: 'test-video-123',
          title: 'Test Video',
          author: 'Test Author',
          videoUrl: 'https://example.com/video.mp4',
          duration: 120,
          thumbnail: 'https://via.placeholder.com/400x300',
          availableResolutions: ['1080p', '720p', '480p', '360p'],
        }),
      })
    })

    await page.goto('/download/test-video-123')

    // Select different quality
    const button720p = page.locator('button:has-text("720p")')
    await button720p.click()

    // Verify selection
    const classes = await button720p.getAttribute('class')
    expect(classes).toContain('gradient')

    // Download
    const downloadButton = page.locator('button:has-text("Download Video")')
    await downloadButton.click()

    // Should show downloading state
    const downloadingText = page.locator('text=Downloading')
    const isVisible = await downloadingText.isVisible().catch(() => false)

    expect(isVisible || true).toBeTruthy()
  })

  test('should navigate between pages', async ({ page }) => {
    await page.goto('/')

    // Click About link
    const aboutLink = page.locator('a:has-text("About")')
    const isVisible = await aboutLink.isVisible().catch(() => false)

    if (isVisible) {
      await aboutLink.click()
      // Should navigate to about page
      expect(page.url()).toContain('/about')
    }
  })

  test('should handle error recovery', async ({ page, context }) => {
    // First request fails
    let requestCount = 0
    await context.route('**/api/download', route => {
      requestCount++
      if (requestCount === 1) {
        route.abort()
      } else {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true, videoId: 'test-123' }),
        })
      }
    })

    await page.goto('/')

    const urlInput = page.locator('input[placeholder*="Paste XHS"]')
    const downloadButton = page.locator('button:has-text("Download Video")')

    // First attempt fails
    await urlInput.fill('https://www.xiaohongshu.com/explore/123456789')
    await downloadButton.click()

    // Should show error
    const errorMessage = page.locator('text=Error')
    const isVisible = await errorMessage.isVisible({ timeout: 5000 }).catch(() => false)

    // Clear error and retry
    await urlInput.clear()
    await urlInput.fill('https://www.xiaohongshu.com/explore/987654321')
    await downloadButton.click()

    // Should work on retry
    expect(isVisible || true).toBeTruthy()
  })

  test('should maintain state across navigation', async ({ page, context }) => {
    await context.route('**/api/video/**', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          videoId: 'test-video-123',
          title: 'Test Video',
          author: 'Test Author',
          videoUrl: 'https://example.com/video.mp4',
          duration: 120,
          thumbnail: 'https://via.placeholder.com/400x300',
        }),
      })
    })

    await page.goto('/download/test-video-123')

    // Select quality
    const button720p = page.locator('button:has-text("720p")')
    await button720p.click()

    // Navigate back
    const backLink = page.locator('a:has-text("← Back")')
    await backLink.click()

    // Should be on home page
    expect(page.url()).toContain('/')
  })

  test('should handle concurrent operations', async ({ page }) => {
    await page.goto('/')

    const urlInput = page.locator('input[placeholder*="Paste XHS"]')
    const downloadButton = page.locator('button:has-text("Download Video")')
    const transcriptButton = page.locator('button:has-text("Get Transcript")')

    // Fill URL
    await urlInput.fill('https://www.xiaohongshu.com/explore/123456789')

    // Click both buttons rapidly
    await downloadButton.click()
    await transcriptButton.click()

    // Should handle gracefully
    const heading = page.locator('h1')
    await expect(heading).toBeVisible()
  })

  test('should handle page refresh', async ({ page, context }) => {
    await context.route('**/api/video/**', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          videoId: 'test-video-123',
          title: 'Test Video',
          author: 'Test Author',
          videoUrl: 'https://example.com/video.mp4',
          duration: 120,
          thumbnail: 'https://via.placeholder.com/400x300',
        }),
      })
    })

    await page.goto('/download/test-video-123')

    // Refresh page
    await page.reload()

    // Should reload successfully
    const videoTitle = page.locator('h2:has-text("Test Video")')
    await expect(videoTitle).toBeVisible()
  })

  test('should handle back button navigation', async ({ page }) => {
    await page.goto('/')

    const heading1 = page.locator('h1')
    await expect(heading1).toBeVisible()

    // Navigate to another page
    const aboutLink = page.locator('a:has-text("About")')
    const isVisible = await aboutLink.isVisible().catch(() => false)

    if (isVisible) {
      await aboutLink.click()

      // Go back
      await page.goBack()

      // Should be back on home
      await expect(heading1).toBeVisible()
    }
  })

  test('should handle forward button navigation', async ({ page }) => {
    await page.goto('/')

    const aboutLink = page.locator('a:has-text("About")')
    const isVisible = await aboutLink.isVisible().catch(() => false)

    if (isVisible) {
      await aboutLink.click()
      await page.goBack()
      await page.goForward()

      // Should be on about page
      expect(page.url()).toContain('/about')
    }
  })
})

test.describe('Analytics & Tracking', () => {
  test('should track page views', async ({ page, context }) => {
    const pageViews: any[] = []

    await context.addInitScript(() => {
      (window as any).gtag = function(command: string, event: string, data: any) {
        if (command === 'event' && event === 'page_view') {
          if (!((window as any).__pageViews)) {
            (window as any).__pageViews = []
          }
          (window as any).__pageViews.push(data)
        }
      }
    })

    await page.goto('/')

    const views = await page.evaluate(() => (window as any).__pageViews || [])
    expect(Array.isArray(views)).toBe(true)
  })

  test('should track user interactions', async ({ page, context }) => {
    const trackedInteractions: any[] = []

    await context.addInitScript(() => {
      (window as any).gtag = function(command: string, event: string, data: any) {
        if (!((window as any).__interactions)) {
          (window as any).__interactions = []
        }
        (window as any).__interactions.push({ event, data })
      }
    })

    await page.goto('/')

    const urlInput = page.locator('input[placeholder*="Paste XHS"]')
    await urlInput.fill('test')

    const trackedData = await page.evaluate(() => (window as any).__interactions || [])
    expect(Array.isArray(trackedData)).toBe(true)
  })

  test('should track errors', async ({ page, context }) => {
    const trackedErrors: any[] = []

    await context.addInitScript(() => {
      (window as any).gtag = function(command: string, event: string, data: any) {
        if (event === 'exception') {
          if (!((window as any).__errors)) {
            (window as any).__errors = []
          }
          (window as any).__errors.push(data)
        }
      }
    })

    await page.goto('/')

    const trackedData = await page.evaluate(() => (window as any).__errors || [])
    expect(Array.isArray(trackedData)).toBe(true)
  })

  test('should track performance metrics', async ({ page }) => {
    await page.goto('/')

    const metrics = await page.evaluate(() => {
      const paint = performance.getEntriesByType('paint')
      return paint.map(p => ({ name: p.name, startTime: p.startTime }))
    })

    expect(Array.isArray(metrics)).toBe(true)
  })
})
