import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { cn } from '@/lib/utils';

import './globals.css';

const pretendard = localFont({
  src: '../fonts/pretendard/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: '오늘 날씨 어때? 웨더링크',
  description: '오늘 날씨 어때? 웨더링크',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={cn(pretendard.className, 'bg-body')}>{children}</body>
    </html>
  );
}
