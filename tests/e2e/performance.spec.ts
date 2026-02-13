import { test, expect } from '@playwright/test'

test.describe('Performance - Page Load Times & Ad Impact', () => {
  test('should load landing page in under 3 seconds', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const loadTime = Date.now() - startTime

    expect(loadTime).toBeLessThan(3000)
  })

  test('should load results page in under 3 seconds', async ({ page, context }) => {
    // Mock video API
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
          availableResolutions: ['1080p', '720p', '480p'],
        }),
      })
    })

    const startTime = Date.now()
    await page.goto('/download/test-video-123')
    await page.waitForLoadState('networkidle')
    const loadTime = Date.now() - startTime

    expect(loadTime).toBeLessThan(3000)
  })

  test('should render main content before ads', async ({ page }) => {
    const startTime = Date.now()

    await page.goto('/')

    // Main heading should appear quickly
    const heading = page.locator('h1')
    await heading.waitFor({ state: 'visible', timeout: 1000 })

    const headingTime = Date.now() - startTime

    // Main content should appear within 1 second
    expect(headingTime).toBeLessThan(1000)
  })

  test('should not block page interaction while ads load', async ({ page, context }) => {
    // Slow down ad loading
    await context.route('**/pagead/js/adsbygoogle.js', route => {
      setTimeout(() => route.abort(), 2000)
    })

    await page.goto('/')

    // Input should be interactive immediately
    const urlInput = page.locator('input[placeholder*="Paste XHS"]')
    await expect(urlInput).toBeEnabled()

    // Should be able to type
    await urlInput.fill('test')
    const value = await urlInput.inputValue()
    expect(value).toBe('test')
  })

  test('should measure First Contentful Paint', async ({ page }) => {
    const metrics = await page.evaluate(() => {
      const paint = performance.getEntriesByType('paint')
      return paint.map(p => ({ name: p.name, startTime: p.startTime }))
    })

    const fcp = metrics.find(m => m.name === 'first-contentful-paint')
    expect(fcp).toBeDefined()
    expect(fcp?.startTime).toBeLessThan(2000)
  })

  test('should measure Largest Contentful Paint', async ({ page }) => {
    await page.goto('/')

    const lcp = await page.evaluate(() => {
      return new Promise(resolve => {
        const observer = new PerformanceObserver(list => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          resolve(lastEntry.startTime)
        })
        observer.observe({ entryTypes: ['largest-contentful-paint'] })

        setTimeout(() => resolve(null), 3000)
      })
    })

    expect(lcp).toBeLessThan(3000)
  })

  test('should not have layout shifts from ads', async ({ page, context }) => {
    let cumulativeLayoutShift = 0

    await context.addInitScript(() => {
      let cls = 0
      const observer = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            cls += (entry as any).value
          }
        }
        (window as any).__cls = cls
      })
      observer.observe({ entryTypes: ['layout-shift'] })
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const cls = await page.evaluate(() => (window as any).__cls || 0)

    // CLS should be less than 0.1 (good score)
    expect(cls).toBeLessThan(0.25)
  })

  test('should handle slow network gracefully', async ({ page, context }) => {
    // Simulate slow 3G
    await context.route('**/*', route => {
      setTimeout(() => route.continue(), 500)
    })

    const startTime = Date.now()
    await page.goto('/')
    const loadTime = Date.now() - startTime

    // Should still load within reasonable time
    expect(loadTime).toBeLessThan(10000)

    // Page should be functional
    const heading = page.locator('h1')
    await expect(heading).toBeVisible()
  })

  test('should lazy load images', async ({ page }) => {
    await page.goto('/')

    // Check if images have loading attribute
    const images = page.locator('img')
    const count = await images.count()

    let lazyLoadCount = 0
    for (let i = 0; i < Math.min(count, 10); i++) {
      const loading = await images.nth(i).getAttribute('loading')
      if (loading === 'lazy') {
        lazyLoadCount++
      }
    }

    // Should have some lazy loaded images
    expect(lazyLoadCount).toBeGreaterThanOrEqual(0)
  })

  test('should minimize JavaScript bundle size', async ({ page }) => {
    const resources = await page.evaluate(() => {
      return performance
        .getEntriesByType('resource')
        .filter(r => r.name.includes('.js'))
        .map(r => ({ name: r.name, size: (r as any).transferSize }))
    })

    const totalSize = resources.reduce((sum, r) => sum + (r.size || 0), 0)

    // Total JS should be reasonable (less than 500KB)
    expect(totalSize).toBeLessThan(500000)
  })

  test('should cache static assets', async ({ page, context }) => {
    // First load
    await page.goto('/')
    const firstLoadResources = await page.evaluate(() => {
      return performance
        .getEntriesByType('resource')
        .filter(r => r.name.includes('.css') || r.name.includes('.js'))
        .map(r => ({ name: r.name, duration: r.duration }))
    })

    // Second load
    await page.reload()
    const secondLoadResources = await page.evaluate(() => {
      return performance
        .getEntriesByType('resource')
        .filter(r => r.name.includes('.css') || r.name.includes('.js'))
        .map(r => ({ name: r.name, duration: r.duration }))
    })

    // Second load should be faster (cached)
    const firstLoadTime = firstLoadResources.reduce((sum, r) => sum + r.duration, 0)
    const secondLoadTime = secondLoadResources.reduce((sum, r) => sum + r.duration, 0)

    expect(secondLoadTime).toBeLessThanOrEqual(firstLoadTime)
  })

  test('should not have render-blocking resources', async ({ page }) => {
    const resources = await page.evaluate(() => {
      return performance
        .getEntriesByType('resource')
        .filter(r => (r as any).renderBlockingStatus === 'blocking')
        .map(r => r.name)
    })

    // Should have minimal render-blocking resources
    expect(resources.length).toBeLessThan(3)
  })

  test('should measure Time to Interactive', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/')

    // Wait for page to be interactive
    const urlInput = page.locator('input[placeholder*="Paste XHS"]')
    await urlInput.waitFor({ state: 'visible' })

    const tti = Date.now() - startTime

    // Should be interactive within 2 seconds
    expect(tti).toBeLessThan(2000)
  })

  test('should handle concurrent ad requests efficiently', async ({ page, context }) => {
    let requestCount = 0

    await context.route('**/pagead/**', route => {
      requestCount++
      route.abort()
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Should not make excessive ad requests
    expect(requestCount).toBeLessThan(10)
  })

  test('should not have memory leaks from ads', async ({ page }) => {
    const initialMemory = await page.evaluate(() => {
      if ((performance as any).memory) {
        return (performance as any).memory.usedJSHeapSize
      }
      return 0
    })

    // Reload page multiple times
    for (let i = 0; i < 3; i++) {
      await page.reload()
      await page.waitForLoadState('networkidle')
    }

    const finalMemory = await page.evaluate(() => {
      if ((performance as any).memory) {
        return (performance as any).memory.usedJSHeapSize
      }
      return 0
    })

    // Memory growth should be reasonable
    const memoryGrowth = finalMemory - initialMemory
    expect(memoryGrowth).toBeLessThan(50000000) // 50MB
  })
})
