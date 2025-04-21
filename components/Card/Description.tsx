import React from 'react';

import { cn } from '@/lib/utils';

const Description = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <p className={cn('text-sm text-gray500', className)}>{children}</p>;
};

export default Description;
