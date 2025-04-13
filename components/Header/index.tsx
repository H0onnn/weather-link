'use client';

import * as React from 'react';

import { Back, LocationDisplay, Notification, Setting, Title } from './components';

const Root = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="flex items-center justify-between fixed top-0 left-0 right-0 z-10 min-h-[73px] max-h-[73px] max-w-[560px] mx-auto bg-background px-4 py-6 border-b border-b-gray-200">
      {children}
    </header>
  );
};

const Header = () => null;

Header.Root = Root;
Header.LocationDisplay = LocationDisplay;
Header.Notification = Notification;
Header.Setting = Setting;
Header.Back = Back;
Header.Title = Title;

export default Header;
