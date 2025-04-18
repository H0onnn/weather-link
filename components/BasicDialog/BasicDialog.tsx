'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { type ReactNode, useRef } from 'react';

import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

type ButtonVariant = 'default' | 'secondary' | 'warn';

type ButtonProps = {
  text: string;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
};

type ModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  onExit?: () => void;
};

export interface BasicDialogProps extends ModalProps {
  title: {
    text: string;
    className?: string;
  };
  description?: ReactNode;
  children?: ReactNode;
  leftButton?: ButtonProps;
  rightButton?: ButtonProps;
  className?: string;
}

const BasicDialog = ({
  title,
  description,
  children,
  leftButton = {
    text: '아니요',
    variant: 'secondary',
  },
  rightButton = {
    text: '네, 취소할래요',
    variant: 'warn',
  },
  isOpen = false,
  onExit,
  onClose,
  className,
}: BasicDialogProps) => {
  const prevIsOpenRef = useRef(isOpen);

  if (isOpen !== prevIsOpenRef.current) {
    prevIsOpenRef.current = isOpen;

    if (prevIsOpenRef.current === false) {
      setTimeout(() => onExit?.(), 300);
    }
  }

  const handleReject = () => {
    setTimeout(() => {
      leftButton?.onClick?.();
      onClose?.();
    }, 300);
  };

  const handleResolve = () => {
    setTimeout(() => {
      rightButton?.onClick?.();
      onClose?.();
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            role="presentation"
            className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.6)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          <motion.div
            className={cn(
              'fixed z-[9999]',
              'w-[396px]',
              'top-1/2 left-1/2',
              'grid min-h-0 h-auto gap-6',
              'bg-white rounded-[20px] px-3 pt-[34px] pb-5 shadow-lg',
              className,
            )}
            initial={{ opacity: 0, scale: 1, x: '-50%', y: '-50%' }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{
              duration: 0.3,
              type: 'spring',
              damping: 25,
              stiffness: 500,
            }}
          >
            <div className={cn('flex flex-col gap-3 text-left px-2')}>
              <div className={cn('text-lg font-bold', title.className)}>{title.text}</div>
              {description && <div className="text-sm font-medium text-gray500">{description}</div>}
              {children && <div className="mt-1">{children}</div>}
            </div>
            <div className="flex w-full gap-2">
              {leftButton && (
                <div className="flex-1">
                  <Button
                    variant={leftButton.variant || 'secondary'}
                    onClick={handleReject}
                    className={cn('w-full text-base', leftButton.className)}
                  >
                    {leftButton.text}
                  </Button>
                </div>
              )}
              {rightButton && (
                <div className="flex-1">
                  <Button
                    variant={rightButton.variant || 'warn'}
                    onClick={handleResolve}
                    className={cn('w-full text-base', rightButton.className)}
                  >
                    {rightButton.text}
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BasicDialog;
