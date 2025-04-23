'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { type OverlayControllerComponent } from 'overlay-kit';
import { FunctionComponent, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

type ExtractComponentProps<T> = T extends FunctionComponent<infer P> ? P : never;

type ExtractedOverlayControllerProps = ExtractComponentProps<OverlayControllerComponent>;

export interface ModalProps extends Omit<ExtractedOverlayControllerProps, 'overlayId'> {
  children?: ReactNode;
  titleSlot: ReactNode;
  buttonSlot: ReactNode;
  className?: string;
}

const Dialog = ({ children, buttonSlot, isOpen = false, close, unmount, className, titleSlot }: ModalProps) => {
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
            onClick={() => {
              close();

              setTimeout(() => {
                unmount();
              }, 500);
            }}
          />
          <motion.div
            className={cn(
              'fixed z-[9999]',
              'w-[calc(100%-44px)] lg:w-[396px]',
              'top-1/2 left-1/2',
              'grid min-h-0 h-auto',
              'bg-white rounded-[20px] px-3 pt-7 pb-5 shadow-lg',
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
            <div className="flex flex-col text-left px-2">
              <div className={cn('text-lg font-bold mb-6', children && 'mb-4')}>{titleSlot}</div>
              {children && <div className="text-sm text-gray600 mb-6">{children}</div>}
            </div>
            <div className="flex w-full gap-2">{buttonSlot}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Dialog;
