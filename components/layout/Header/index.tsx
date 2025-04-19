'use client';

import { usePathname } from 'next/navigation';
import * as React from 'react';

import { headerTitleExtractor } from '@/components/layout/utils/headerTitleExtractor';

import { Back, LocationDisplay, Notification, Setting, Title } from './components';

const Root = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="flex items-center justify-between fixed top-0 left-0 right-0 z-10 min-h-[73px] max-h-[73px] max-w-[560px] mx-auto bg-background px-4 py-6 border-b border-b-gray-200">
      {children}
    </header>
  );
};

const MainHeader = () => {
  return (
    <Root>
      <LocationDisplay />
      <div className="flex items-center gap-2">
        <Notification />
        <Setting />
      </div>
    </Root>
  );
};

const NavigationHeader = ({ title }: { title: string }) => {
  return (
    <Root>
      <Back />
      <Title>{title}</Title>
      <div className="w-9"></div>
    </Root>
  );
};

const Header = () => {
  const pathname = usePathname();
  const navigationHeaderTitle = headerTitleExtractor(pathname);

  if (navigationHeaderTitle) {
    return <NavigationHeader title={navigationHeaderTitle} />;
  }

  return <MainHeader />;
};

export default Header;
