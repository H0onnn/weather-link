import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import { type HTMLMotionProps, motion } from 'framer-motion';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[16px] text-lg font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-primary focus-visible:outline-primary focus-visible:outline-2 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border border-gray500 bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary: 'bg-secondary text-black hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
        warn: 'bg-warn text-white hover:bg-warn/80',
      },
      size: {
        default: 'h-12 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

// 애니메이션 설정
const animationProps = {
  initial: { scale: 1 },
  whileTap: { scale: 0.97 },
};

interface ButtonProps extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isAnimated?: boolean;
  isLoading?: boolean;
}

const MotionButton = motion.button;
const MotionSlot = motion.create(Slot);

function Button({
  className,
  variant,
  size,
  asChild = false,
  isAnimated = true,
  isLoading = false,
  children,
  ...props
}: ButtonProps) {
  if (isAnimated) {
    const motionProps = {
      ...animationProps,
      className: cn(buttonVariants({ variant, size, className })),
      'data-slot': 'button',
      disabled: isLoading || props.disabled,
      ...props,
    } as HTMLMotionProps<'button'>;

    if (asChild) {
      return <MotionSlot {...motionProps}>{isLoading ? <LoadingFallback /> : children}</MotionSlot>;
    }
    return <MotionButton {...motionProps}>{isLoading ? <LoadingFallback /> : children}</MotionButton>;
  }

  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <LoadingFallback /> : children}
    </Comp>
  );
}

const LoadingFallback = () => {
  return (
    <div className="flex space-x-2 justify-center items-center">
      <span className="sr-only">Loading...</span>
      <div className="h-2 w-2 bg-white/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="h-2 w-2 bg-white/60 rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="h-2 w-2 bg-white/70 rounded-full animate-bounce" />
    </div>
  );
};

export { Button, buttonVariants };
export type { ButtonProps };
