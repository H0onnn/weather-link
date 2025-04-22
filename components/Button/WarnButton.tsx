import React from 'react';

import { Button, type ButtonProps } from '@/components/ui/button';

import { cn } from '@/lib/utils';

const WarnButton = ({ children, className, ...props }: ButtonProps) => {
  return (
    <Button variant="warn" className={cn('w-full text-base', className)} {...props}>
      {children}
    </Button>
  );
};

export default WarnButton;
