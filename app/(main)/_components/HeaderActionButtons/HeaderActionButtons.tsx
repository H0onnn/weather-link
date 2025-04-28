'use client';

import type { FriendRequestList } from '@/app/friend/_model/types';
import { Mail, Settings } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';

import { Button } from '@/components/ui/button';

interface HeaderActionButtonsProps {
  friendReqPromise: Promise<FriendRequestList[]>;
}

const HeaderActionButtons = ({ friendReqPromise }: HeaderActionButtonsProps) => {
  return (
    <div className="flex items-center space-x-2">
      <MailButton friendReqPromise={friendReqPromise} />
      <SettingButton />
    </div>
  );
};

const SettingButton = () => {
  return (
    <Button variant="ghost" size="icon" asChild>
      <Link href="/setting">
        <Settings width={16} height={16} />
      </Link>
    </Button>
  );
};

const MailButton = ({ friendReqPromise }: Pick<HeaderActionButtonsProps, 'friendReqPromise'>) => {
  const friendReq = use(friendReqPromise);

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" asChild>
        <Link href="/friend/request">
          <Mail width={16} height={16} />
        </Link>
      </Button>

      {friendReq.length > 0 && <div className="absolute top-2.5 right-2 bg-red rounded-full w-1.5 h-1.5" />}
    </div>
  );
};

export default HeaderActionButtons;
