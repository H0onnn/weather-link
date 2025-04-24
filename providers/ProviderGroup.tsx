'use client';

import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { OverlayProvider } from 'overlay-kit';
import { type ReactNode } from 'react';

import { QueryProvider } from './QueryProvider';
import { SessionProvider } from './SessionProvider';

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <SessionProvider>
      <QueryProvider>
        <OverlayProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </OverlayProvider>
      </QueryProvider>
    </SessionProvider>
  );
};

export default Providers;
