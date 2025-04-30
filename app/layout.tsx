import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import * as React from 'react';

import { Toaster } from '@/components/Toaster';
import { Layout } from '@/components/layout';

import { cn } from '@/lib/utils';

import './globals.css';

const pretendard = localFont({
  src: '../fonts/pretendard/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
});

const siteConfig = {
  title: '오늘 날씨 어때? 웨더링크',
  description: '친구와 날씨 정보를 공유하고 소통하는 새로운 방법, 웨더링크',
  url: 'https://weather-link.site',
  ogImage: '/images/og-image.png',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: ['날씨', '소셜', '친구', '공유', '웨더링크', '기상청', '커뮤니티'],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest', // TODO: public 폴더에 manifest 파일 추가하기
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={cn(pretendard.className, 'bg-primary/20')}>
        <Layout>{children}</Layout>
        <Toaster richColors={true} position="top-center" />
      </body>
    </html>
  );
}
