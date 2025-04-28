'use client';

import { ArrowLeftIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { type ReactNode } from 'react';

import { Button } from '@/components/ui/button';

import { HEADER_TITLE } from '@/constants/header';

import { cn } from '@/lib/utils';

interface HeaderProps {
  title?: ReactNode;
  rightSlot?: ReactNode;
  isBack?: boolean;
}

const Header = ({ title, rightSlot, isBack = true }: HeaderProps) => {
  const pathname = usePathname();
  const headerConfig = HEADER_TITLE[pathname as keyof typeof HEADER_TITLE];
  const headerTitle = headerConfig?.title;
  const hasBackButton = Boolean(headerConfig) || isBack;

  return (
    <header
      className={cn(
        'flex items-center justify-between w-full',
        'fixed top-0 left-0 right-0 z-10 min-h-[73px] max-h-[73px] max-w-[560px] mx-auto',
        'bg-white',
        'px-4 py-6 border-b border-b-gray-200',
      )}
    >
      {rightSlot ? (
        // rightSlot이 있을 때: [뒤로가기 제목] --- [rightSlot]
        <>
          <div className="flex items-center gap-2">
            {hasBackButton && <Back />}
            <h2 className="text-lg font-medium text-gray800">{headerTitle ?? title}</h2>
          </div>
          {rightSlot}
        </>
      ) : (
        // rightSlot이 없을 때: [뒤로가기] --- [제목 중앙] --- [빈 공간]
        <>
          <div className="w-9 shrink-0">{hasBackButton && <Back />}</div>

          <h2 className="flex-grow text-center text-lg font-medium text-gray800 mx-1 truncate">
            {headerTitle ?? title}
          </h2>

          <div className="w-9 shrink-0" />
        </>
      )}
    </header>
  );
};

const Back = () => {
  const router = useRouter();

  return (
    <Button variant="ghost" size="icon" onClick={() => router.back()}>
      <ArrowLeftIcon />
    </Button>
  );
};

export default Header;
