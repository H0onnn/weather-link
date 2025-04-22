import { Providers } from '@/providers';
import * as React from 'react';

import { BottomNav } from '@/components/layout/BottomNav';
import Header from '@/components/layout/Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <div className="relative flex flex-col min-w-[390px] max-w-[560px] mx-auto min-h-[100dvh] bg-body">
        <Header />
        <main className="flex-1 pt-[73px] pb-14">{children}</main>
        <BottomNav />
      </div>
    </Providers>
  );
};

export default Layout;
