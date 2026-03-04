import type { Metadata } from "next";
import { Noto_Sans, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["400", "600", "700"] });
const notoSansSC = Noto_Sans_SC({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-sc" });

export const metadata: Metadata = {
  title: "XHS Video Downloader - Free Xiaohongshu Video Downloader | 小红书视频下载",
  description: "Free XHS video downloader. Download Xiaohongshu videos without watermark in HD quality. Fast, safe, and no registration required. 免费小红书视频下载器，无水印高清下载。",
  keywords: "xhs downloader, xiaohongshu downloader, xhs video download, 小红书下载, 小红书视频下载, 小红书去水印, xhs无水印下载, xiaohongshu video download, red note downloader",
  authors: [{ name: "XHS Video Downloader" }],
  robots: "index, follow",
  openGraph: {
    title: "XHS Video Downloader - Free Xiaohongshu Video Downloader",
    description: "Download Xiaohongshu videos without watermark. Fast, free, and easy to use.",
    type: "website",
    url: "https://xhsvideodownloader.com",
    siteName: "XHS Video Downloader",
    locale: "en_US",
    alternateLocale: ["zh_CN"],
  },
  twitter: {
    card: "summary_large_image",
    title: "XHS Video Downloader - Free Xiaohongshu Video Downloader",
    description: "Download Xiaohongshu videos without watermark. Fast, free, and easy to use.",
  },
  alternates: {
    canonical: "https://xhsvideodownloader.com",
  },
  verification: {
    google: "b74c2e3e158d7f83", // Google Search Console verification
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6GDQLLJVJC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6GDQLLJVJC');
          `}
        </Script>

        {/* Google AdSense - IMPORTANT: Replace with your actual Publisher ID */}
        {/* Step 1: Go to https://www.google.com/adsense and get your Publisher ID */}
        {/* Step 2: Replace 'ca-pub-XXXXXXXXXXXXXXXX' below with your actual ID */}
        {/* Step 3: Uncomment the Script component below */}
        {/*
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        */}
      </head>
      <body className={`${notoSans.className} ${notoSansSC.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
