import { VariantProps, cva } from 'class-variance-authority';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { type HTMLAttributes } from 'react';

import { UserAvatar } from '@/components/UserAvatar';

import { cn } from '@/lib/utils';

dayjs.locale('ko');

const bubbleVariants = cva(
  `inline-flex items-center justify-center rounded-[16px] p-2 max-w-[280px] text-black text-sm`,
  {
    variants: {
      variant: {
        user: 'bg-primary rounded-tr-none text-white',
        other: 'bg-gray-100 rounded-tl-none',
      },
    },
    defaultVariants: {
      variant: 'user',
    },
  },
);

interface SpeechBubbleProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof bubbleVariants> {
  message: string;
  nickname: string;
  profileImage: string | null;
  sentAt: string | Date;
}

const SpeechBubble = ({ message, variant, className, nickname, profileImage, sentAt, ...props }: SpeechBubbleProps) => {
  const isMine = variant === 'user';

  return (
    <article className={cn('flex gap-2', isMine && 'flex-row-reverse', className)}>
      {!isMine && (
        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          <UserAvatar imageUrl={profileImage || undefined} />
        </div>
      )}

      <div className="space-y-2">
        <div className={cn('flex items-center gap-x-2', isMine && 'flex-row-reverse')}>
          <span className="font-medium text-black text-sm">{nickname}</span>
          <span className="text-xs text-gray500">{dayjs(sentAt).format('A hh:mm')}</span>
        </div>

        <div className="w-fit ml-auto">
          <div {...props} className={cn(bubbleVariants({ variant, className }))}>
            <p>{message}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default SpeechBubble;
