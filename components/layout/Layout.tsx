'use client';

import { usePathname } from 'next/navigation';

import { BottomNav } from '@/components/layout/BottomNav';
import { MainHeader } from '@/components/layout/MainHeader';
import { NavigationHeader } from '@/components/layout/NavigationHeader';
import { headerTitleExtractor } from '@/components/layout/utils/headerTitleExtractor';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const navigationHeaderTitle = headerTitleExtractor(pathname);

  return (
    <div className="relative flex flex-col min-w-[390px] max-w-[560px] mx-auto min-h-[100dvh] bg-body">
      {navigationHeaderTitle ? <NavigationHeader title={navigationHeaderTitle} /> : <MainHeader />}
      <main className="flex-1 p-4 pt-[73px] pb-14">{children}</main>
      <BottomNav />
    </div>
  );
};

export default Layout;
