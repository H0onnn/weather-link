'use client';

import { OverlayProvider } from 'overlay-kit';
import { type ReactNode } from 'react';

import QueryProvider from './QueryProvider';

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryProvider>
      <OverlayProvider>{children}</OverlayProvider>
    </QueryProvider>
  );
};

export default Providers;
