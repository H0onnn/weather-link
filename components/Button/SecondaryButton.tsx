import React from 'react';

import { Button, type ButtonProps } from '@/components/ui/button';

import { cn } from '@/lib/utils';

const SecondaryButton = ({ children, className, ...props }: ButtonProps) => {
  return (
    <Button variant="secondary" className={cn('w-full text-base', className)} {...props}>
      {children}
    </Button>
  );
};

export default SecondaryButton;
