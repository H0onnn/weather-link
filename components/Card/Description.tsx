import React from 'react';

import { cn } from '@/lib/utils';

const Description = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <p className={cn('text-sm font-light text-gray-400', className)}>{children}</p>;
};

export default Description;
