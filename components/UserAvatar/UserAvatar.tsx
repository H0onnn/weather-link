import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { UserRoundIcon } from 'lucide-react';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { cn } from '@/lib/utils';

export interface UserAvatarProps extends React.ComponentProps<typeof AvatarPrimitive.Root> {
  imageUrl?: string;
}

const UserAvatar = ({ imageUrl, className, ...props }: UserAvatarProps) => {
  return (
    <Avatar {...props} className={cn('size-10', className)}>
      <AvatarImage src={imageUrl || 'https://github.com/shadcn.png'} />
      <AvatarFallback className="bg-gray-300 text-gray-600">
        <UserRoundIcon />
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
