export const AFFILIATE_PROGRAMS = {
  amazon: {
    baseUrl: 'https://amazon.com/s',
    trackingId: process.env.NEXT_PUBLIC_AMAZON_TRACKING_ID || '',
    enabled: !!process.env.NEXT_PUBLIC_AMAZON_TRACKING_ID,
  },
  vpn: {
    nordvpn: {
      url: 'https://nordvpn.com',
      label: 'NordVPN - Secure Browsing',
      enabled: true,
    },
    expressvpn: {
      url: 'https://expressvpn.com',
      label: 'ExpressVPN - Fast & Reliable',
      enabled: true,
    },
  },
  tools: {
    youtube: {
      url: 'https://www.youtube.com/premium',
      label: 'YouTube Premium',
      enabled: true,
    },
  },
};

export const AFFILIATE_KEYWORDS = {
  video: ['Video Downloader', 'Video Editor', 'Video Converter'],
  productivity: ['Cloud Storage', 'Project Management', 'Productivity Tools'],
  security: ['VPN Services', 'Password Manager', 'Security Tools'],
};
