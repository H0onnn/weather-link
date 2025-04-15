import { type ReactNode } from 'react';

import QueryProvider from './QueryProvider';

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return <QueryProvider>{children}</QueryProvider>;
};

export default Providers;
