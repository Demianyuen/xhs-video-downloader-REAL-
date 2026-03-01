import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "小红书视频下载器 - 免费下载无水印视频 | XHS Downloader",
  description: "免费在线下载小红书视频，无水印高清画质。支持所有小红书视频链接，一键下载到本地。Free Xiaohongshu video downloader.",
  keywords: "小红书下载,小红书视频下载,XHS下载器,小红书无水印,xiaohongshu downloader,红书视频保存,小红书视频提取,xiaohongshu video downloader",
  authors: [{ name: "XHS Downloader" }],
  creator: "XHS Downloader",
  publisher: "XHS Downloader",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: {
    languages: {
      "zh-CN": "https://xhsvideodownloader.com/",
      "zh-TW": "https://xhsvideodownloader.com/",
      "en": "https://xhsvideodownloader.com/",
      "x-default": "https://xhsvideodownloader.com/",
    },
    canonical: "https://xhsvideodownloader.com/",
  },
  openGraph: {
    title: "小红书视频下载器 - 免费下载无水印视频",
    description: "免费在线下载小红书视频，无水印高清画质。支持所有小红书视频链接，一键下载到本地。",
    type: "website",
    locale: "zh_CN",
    alternateLocale: ["zh_TW", "en_US"],
    url: "https://xhsvideodownloader.com/",
    siteName: "XHS Downloader",
    images: [
      {
        url: "https://xhsvideodownloader.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "XHS Downloader - 小红书视频下载器",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "小红书视频下载器 - 免费下载无水印视频",
    description: "免费在线下载小红书视频，无水印高清画质。",
    images: ["https://xhsvideodownloader.com/og-image.png"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "XHS Downloader",
    "description": "免费在线下载小红书视频，无水印高清画质",
    "url": "https://xhsvideodownloader.com",
    "applicationCategory": "UtilityApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "author": {
      "@type": "Organization",
      "name": "XHS Downloader",
      "url": "https://xhsvideodownloader.com"
    },
    "inLanguage": ["zh-CN", "zh-TW", "en"],
    "areaServed": ["CN", "TW", "HK", "SG", "US", "GB", "AU", "CA"],
  };

  return (
    <html lang="zh-CN">
      <head>
        <meta name="geo.placename" content="Global" />
        <meta name="geo.region" content="CN" />
        <meta name="ICBM" content="39.9042,116.4074" />
        <link rel="sitemap" href="https://xhsvideodownloader.com/sitemap.xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="google-adsense-account" content="ca-pub-7935038704820292" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7935038704820292" crossOrigin="anonymous"></script>
      </head>
      <body className="antialiased">
        <Header />
        {children}
        <Script id="json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
