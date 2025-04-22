'use client';

import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { OverlayProvider } from 'overlay-kit';
import { type ReactNode } from 'react';

import QueryProvider from './QueryProvider';

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryProvider>
      <OverlayProvider>
        <NuqsAdapter>{children}</NuqsAdapter>
      </OverlayProvider>
    </QueryProvider>
  );
};

export default Providers;
