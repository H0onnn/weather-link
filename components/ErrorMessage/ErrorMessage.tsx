import { type ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface ErrorMessageProps {
  children: ReactNode;
  className?: string;
}

const ErrorMessage = ({ children, className }: ErrorMessageProps) => {
  return <p className={cn('text-red text-sm', className)}>{children}</p>;
};

export default ErrorMessage;
