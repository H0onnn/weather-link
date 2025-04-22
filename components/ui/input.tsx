import * as React from 'react';

import { cn } from '@/lib/utils';

interface InputProps extends React.ComponentProps<'input'> {
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  containerClassName?: string;
}

function Input({ className, type, leftSlot, rightSlot, containerClassName, ...props }: InputProps) {
  return (
    <div
      className={cn(
        'relative flex items-center bg-transparent w-full text-black',
        'bg-white border-gray-300 flex h-12 w-full min-w-0 rounded-[16px] border py-3.5 px-4 min-h-4',
        'transition-colors duration-200',
        'focus-within:border-primary',
        props.disabled && 'opacity-50 cursor-not-allowed',
        containerClassName,
      )}
    >
      {leftSlot && <div className="mr-2">{leftSlot}</div>}
      <input
        type={type}
        data-slot="input"
        className={cn(
          'w-full flex-1',
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30',
          'text-base outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-inherit',
          'focus:outline-none',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          className,
        )}
        {...props}
      />
      {rightSlot && <div className="ml-2">{rightSlot}</div>}
    </div>
  );
}

export { Input };
