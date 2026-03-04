import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "XHS Video Downloader - Free Xiaohongshu Video Downloader",
  description: "Free, fast Xiaohongshu video downloader. Download XHS videos without watermarks. No registration required.",
  keywords: "xhs downloader, xiaohongshu downloader, xhs video download, 小红书下载",
  authors: [{ name: "XHS Video Downloader" }],
  robots: "index, follow",
  openGraph: {
    title: "XHS Video Downloader - Free Xiaohongshu Video Downloader",
    description: "Free, fast Xiaohongshu video downloader. No watermarks, no registration.",
    type: "website",
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
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
