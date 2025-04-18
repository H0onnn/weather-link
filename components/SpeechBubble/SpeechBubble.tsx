import { VariantProps, cva } from 'class-variance-authority';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { User } from 'lucide-react';
import { type HTMLAttributes } from 'react';

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
  profileImage: string;
  sentAt: string | Date;
}

const SpeechBubble = ({ message, variant, className, nickname, profileImage, sentAt, ...props }: SpeechBubbleProps) => {
  const isMine = variant === 'user';

  return (
    <article className={cn('flex gap-2', isMine && 'flex-row-reverse', className)}>
      {!isMine && (
        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          {/* TODO: Avatar 컴포넌트로 변경 */}
          <User className="text-gray500" />
        </div>
      )}

      <div className="space-y-2">
        <div className="space-x-2">
          <span className="font-medium text-black text-sm">{nickname}</span>
          <span className="text-xs text-gray500">{dayjs(sentAt).format('A hh:mm')}</span>
        </div>

        <div className="flex items-end">
          <div {...props} className={cn(bubbleVariants({ variant, className }))}>
            <p>{message}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default SpeechBubble;
