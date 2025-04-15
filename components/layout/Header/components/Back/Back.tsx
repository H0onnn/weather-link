'use client';

import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

const Back = () => {
  const router = useRouter();

  return (
    <Button variant="ghost" size="icon" onClick={() => router.back()}>
      <ArrowLeftIcon />
    </Button>
  );
};

export default Back;
