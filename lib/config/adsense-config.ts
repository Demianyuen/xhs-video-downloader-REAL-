export const ADSENSE_CONFIG = {
  publisherId: process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || '',
  enabled: process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true',
  slots: {
    headerBanner: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER || '',
    sidebarSquare: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR || '',
    footerBanner: process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER || '',
    resultInline: process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULT || '',
  },
  excludePaths: ['/admin', '/payment', '/api'],
};
