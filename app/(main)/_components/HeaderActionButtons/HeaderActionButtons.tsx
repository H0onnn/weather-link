'use client';

import { Settings } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const HeaderActionButtons = () => {
  return (
    <div className="flex items-center space-x-2">
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

export default HeaderActionButtons;
