// tests/helpers.ts - Test utility functions

import { Page, expect } from '@playwright/test'

/**
 * Wait for API response with specific criteria
 */
export async function waitForApiResponse(
  page: Page,
  urlPattern: string | RegExp,
  timeout = 5000
) {
  return page.waitForResponse(
    response => {
      const url = response.url()
      if (typeof urlPattern === 'string') {
        return url.includes(urlPattern)
      }
      return urlPattern.test(url)
    },
    { timeout }
  )
}

/**
 * Mock API endpoint with response
 */
export async function mockApiEndpoint(
  page: Page,
  urlPattern: string | RegExp,
  responseData: any,
  status = 200
) {
  await page.route(urlPattern, route => {
    route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify(responseData),
    })
  })
}

/**
 * Get all console messages
 */
export async function getConsoleMessages(page: Page) {
  const messages: string[] = []
  page.on('console', msg => messages.push(msg.text()))
  return messages
}

/**
 * Check for console errors
 */
export async function checkForConsoleErrors(page: Page) {
  const errors: string[] = []
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text())
    }
  })
  return errors
}

/**
 * Measure page load time
 */
export async function measurePageLoadTime(page: Page, url: string) {
  const startTime = Date.now()
  await page.goto(url)
  await page.waitForLoadState('networkidle')
  return Date.now() - startTime
}

/**
 * Get Core Web Vitals
 */
export async function getCoreWebVitals(page: Page) {
  return page.evaluate(() => {
    const paint = performance.getEntriesByType('paint')
    const navigation = performance.getEntriesByType('navigation')[0] as any

    return {
      fcp: paint.find(p => p.name === 'first-contentful-paint')?.startTime,
      lcp: null, // Would need PerformanceObserver
      cls: 0, // Would need PerformanceObserver
      ttfb: navigation?.responseStart - navigation?.requestStart,
    }
  })
}

/**
 * Check if element is in viewport
 */
export async function isElementInViewport(page: Page, selector: string) {
  return page.evaluate(sel => {
    const element = document.querySelector(sel)
    if (!element) return false
    const rect = element.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth
    )
  }, selector)
}

/**
 * Scroll element into view
 */
export async function scrollIntoView(page: Page, selector: string) {
  await page.evaluate(sel => {
    const element = document.querySelector(sel)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, selector)
}

/**
 * Get computed styles
 */
export async function getComputedStyles(page: Page, selector: string) {
  return page.evaluate(sel => {
    const element = document.querySelector(sel)
    if (!element) return null
    return window.getComputedStyle(element)
  }, selector)
}

/**
 * Check accessibility attributes
 */
export async function checkAccessibilityAttributes(page: Page, selector: string) {
  return page.evaluate(sel => {
    const element = document.querySelector(sel)
    if (!element) return null
    return {
      role: element.getAttribute('role'),
      ariaLabel: element.getAttribute('aria-label'),
      ariaDescribedBy: element.getAttribute('aria-describedby'),
      ariaLabelledBy: element.getAttribute('aria-labelledby'),
      tabIndex: element.getAttribute('tabindex'),
    }
  }, selector)
}

/**
 * Simulate network condition
 */
export async function simulateNetworkCondition(
  page: Page,
  condition: 'slow-3g' | 'fast-3g' | '4g'
) {
  const conditions = {
    'slow-3g': { downloadThroughput: 50 * 1024 / 8, uploadThroughput: 20 * 1024 / 8, latency: 2000 },
    'fast-3g': { downloadThroughput: 1.6 * 1024 * 1024 / 8, uploadThroughput: 750 * 1024 / 8, latency: 40 },
    '4g': { downloadThroughput: 4 * 1024 * 1024 / 8, uploadThroughput: 3 * 1024 * 1024 / 8, latency: 20 },
  }

  const client = await page.context().newCDPSession(page)
  await client.send('Network.emulateNetworkConditions', {
    offline: false,
    ...conditions[condition],
  })
}

/**
 * Take screenshot with timestamp
 */
export async function takeTimestampedScreenshot(page: Page, name: string) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const filename = `screenshots/${name}-${timestamp}.png`
  await page.screenshot({ path: filename })
  return filename
}

/**
 * Get all links on page
 */
export async function getAllLinks(page: Page) {
  return page.evaluate(() => {
    return Array.from(document.querySelectorAll('a')).map(a => ({
      text: a.textContent,
      href: a.href,
      target: a.target,
      rel: a.rel.toString(),
    }))
  })
}

/**
 * Check for broken links
 */
export async function checkForBrokenLinks(page: Page) {
  const links = await getAllLinks(page)
  const brokenLinks = []

  for (const link of links) {
    if (link.href.startsWith('http')) {
      try {
        const response = await page.request.head(link.href)
        if (response.status() >= 400) {
          brokenLinks.push(link)
        }
      } catch (error) {
        brokenLinks.push(link)
      }
    }
  }

  return brokenLinks
}

/**
 * Get all images on page
 */
export async function getAllImages(page: Page) {
  return page.evaluate(() => {
    return Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.src,
      alt: img.alt,
      width: img.width,
      height: img.height,
      loading: img.loading,
    }))
  })
}

/**
 * Check for missing alt text
 */
export async function checkForMissingAltText(page: Page) {
  const images = await getAllImages(page)
  return images.filter(img => !img.alt)
}

/**
 * Get page metadata
 */
export async function getPageMetadata(page: Page) {
  return page.evaluate(() => {
    return {
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
      viewport: document.querySelector('meta[name="viewport"]')?.getAttribute('content'),
      charset: document.querySelector('meta[charset]')?.getAttribute('charset'),
      lang: document.documentElement.lang,
    }
  })
}

/**
 * Check for duplicate IDs
 */
export async function checkForDuplicateIds(page: Page) {
  return page.evaluate(() => {
    const ids = new Map<string, number>()
    document.querySelectorAll('[id]').forEach(el => {
      const id = el.id
      ids.set(id, (ids.get(id) || 0) + 1)
    })
    return Array.from(ids.entries())
      .filter(([_, count]) => count > 1)
      .map(([id, count]) => ({ id, count }))
  })
}

/**
 * Get performance metrics
 */
export async function getPerformanceMetrics(page: Page) {
  return page.evaluate(() => {
    const navigation = performance.getEntriesByType('navigation')[0] as any
    const paint = performance.getEntriesByType('paint')

    return {
      dns: navigation?.domainLookupEnd - navigation?.domainLookupStart,
      tcp: navigation?.connectEnd - navigation?.connectStart,
      ttfb: navigation?.responseStart - navigation?.requestStart,
      download: navigation?.responseEnd - navigation?.responseStart,
      domInteractive: navigation?.domInteractive - navigation?.fetchStart,
      domComplete: navigation?.domComplete - navigation?.fetchStart,
      loadComplete: navigation?.loadEventEnd - navigation?.fetchStart,
      fcp: paint.find(p => p.name === 'first-contentful-paint')?.startTime,
      lcp: null,
    }
  })
}

/**
 * Check for memory leaks
 */
export async function checkForMemoryLeaks(page: Page, iterations = 3) {
  const memorySnapshots = []

  for (let i = 0; i < iterations; i++) {
    await page.reload()
    await page.waitForLoadState('networkidle')

    const memory = await page.evaluate(() => {
      if ((performance as any).memory) {
        return (performance as any).memory.usedJSHeapSize
      }
      return 0
    })

    memorySnapshots.push(memory)
  }

  // Check if memory is growing
  const growth = memorySnapshots[memorySnapshots.length - 1] - memorySnapshots[0]
  return {
    snapshots: memorySnapshots,
    growth,
    hasLeak: growth > 50000000, // 50MB threshold
  }
}

/**
 * Validate form
 */
export async function validateForm(page: Page, formSelector: string) {
  return page.evaluate(sel => {
    const form = document.querySelector(sel) as HTMLFormElement
    if (!form) return null

    const inputs = form.querySelectorAll('input, textarea, select')
    return Array.from(inputs).map(input => ({
      name: (input as any).name,
      type: (input as any).type,
      required: (input as any).required,
      value: (input as any).value,
      valid: (input as any).checkValidity?.(),
    }))
  }, formSelector)
}

/**
 * Fill form
 */
export async function fillForm(page: Page, formData: Record<string, string>) {
  for (const [name, value] of Object.entries(formData)) {
    const input = page.locator(`[name="${name}"]`)
    await input.fill(value)
  }
}

/**
 * Submit form and wait for response
 */
export async function submitFormAndWait(
  page: Page,
  formSelector: string,
  responseUrlPattern: string | RegExp
) {
  const responsePromise = waitForApiResponse(page, responseUrlPattern)
  const form = page.locator(formSelector)
  await form.evaluate((el: HTMLFormElement) => el.submit())
  return responsePromise
}

/**
 * Get all data attributes
 */
export async function getDataAttributes(page: Page, selector: string) {
  return page.evaluate(sel => {
    const element = document.querySelector(sel)
    if (!element) return null

    const dataset: Record<string, string> = {}
    Object.keys(element.attributes).forEach((key: string) => {
      const attr = element.attributes[parseInt(key)]
      if (attr && attr.name.startsWith('data-')) {
        dataset[attr.name] = attr.value
      }
    })
    return dataset
  }, selector)
}

/**
 * Wait for element to have specific text
 */
export async function waitForElementWithText(
  page: Page,
  selector: string,
  text: string,
  timeout = 5000
) {
  await page.locator(`${selector}:has-text("${text}")`).waitFor({ timeout })
}

/**
 * Get element count
 */
export async function getElementCount(page: Page, selector: string) {
  return page.locator(selector).count()
}

/**
 * Check if element is visible
 */
export async function isElementVisible(page: Page, selector: string) {
  return page.locator(selector).isVisible().catch(() => false)
}

/**
 * Get element text
 */
export async function getElementText(page: Page, selector: string) {
  return page.locator(selector).textContent()
}

/**
 * Get element attribute
 */
export async function getElementAttribute(page: Page, selector: string, attribute: string) {
  return page.locator(selector).getAttribute(attribute)
}

/**
 * Click element if visible
 */
export async function clickIfVisible(page: Page, selector: string) {
  const isVisible = await isElementVisible(page, selector)
  if (isVisible) {
    await page.locator(selector).click()
    return true
  }
  return false
}

/**
 * Wait for navigation
 */
export async function waitForNavigation(page: Page, action: () => Promise<void>) {
  const navigationPromise = page.waitForNavigation()
  await action()
  await navigationPromise
}

/**
 * Get page title
 */
export async function getPageTitle(page: Page) {
  return page.title()
}

/**
 * Get page URL
 */
export async function getPageUrl(page: Page) {
  return page.url()
}

/**
 * Go back and wait for load
 */
export async function goBackAndWait(page: Page) {
  await page.goBack()
  await page.waitForLoadState('networkidle')
}

/**
 * Go forward and wait for load
 */
export async function goForwardAndWait(page: Page) {
  await page.goForward()
  await page.waitForLoadState('networkidle')
}

/**
 * Reload and wait for load
 */
export async function reloadAndWait(page: Page) {
  await page.reload()
  await page.waitForLoadState('networkidle')
}

export default {
  waitForApiResponse,
  mockApiEndpoint,
  getConsoleMessages,
  checkForConsoleErrors,
  measurePageLoadTime,
  getCoreWebVitals,
  isElementInViewport,
  scrollIntoView,
  getComputedStyles,
  checkAccessibilityAttributes,
  simulateNetworkCondition,
  takeTimestampedScreenshot,
  getAllLinks,
  checkForBrokenLinks,
  getAllImages,
  checkForMissingAltText,
  getPageMetadata,
  checkForDuplicateIds,
  getPerformanceMetrics,
  checkForMemoryLeaks,
  validateForm,
  fillForm,
  submitFormAndWait,
  getDataAttributes,
  waitForElementWithText,
  getElementCount,
  isElementVisible,
  getElementText,
  getElementAttribute,
  clickIfVisible,
  waitForNavigation,
  getPageTitle,
  getPageUrl,
  goBackAndWait,
  goForwardAndWait,
  reloadAndWait,
}
