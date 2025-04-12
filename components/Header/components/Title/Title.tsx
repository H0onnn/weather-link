import React from 'react';

import { cn } from '@/lib/utils';

export interface HeaderTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const Title = ({ children, className, ...props }: HeaderTitleProps) => {
  return (
    <h2
      className={cn('flex justify-center items-center text-lg font-medium text-gray-700 text-center', className)}
      {...props}
    >
      {children}
    </h2>
  );
};

export default Title;
