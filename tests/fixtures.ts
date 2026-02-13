import { test as base, expect } from '@playwright/test'

export type TestFixtures = {
  mockAdSense: void
  mockGtag: void
  mockVideoAPI: void
}

export const test = base.extend<TestFixtures>({
  mockAdSense: async ({ context }, use) => {
    await context.addInitScript(() => {
      const w = window as any
      w.adsbygoogle = w.adsbygoogle || []
      w.adsbygoogle.push = function() {
        w.__adsbygoogleCalled = true
      }
    })
    await use()
  },

  mockGtag: async ({ context }, use) => {
    await context.addInitScript(() => {
      const w = window as any
      w.__gtagEvents = []
      w.gtag = function(command: string, event: string, data: any) {
        w.__gtagEvents.push({ command, event, data })
      }
    })
    await use()
  },

  mockVideoAPI: async ({ context }, use) => {
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
          transcript: 'This is a test transcript of the video content.',
        }),
      })
    })
    await use()
  },
})

export { expect }
