'use client';

import { Home, ServerCrash } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

import { PATH } from '@/constants/paths';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex flex-col max-w-[430px] mx-auto text-black mt-12 p-5 min-h-screen">
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <ServerCrash className="w-16 h-16 text-red" />
            </div>

            <h2 className="text-2xl font-bold mb-2">예상치 못한 오류가 발생했습니다.</h2>
            <p className="text-gray500 mb-8">
              서비스 이용에 불편을 드려 죄송합니다. <br />
              문제를 해결하기 위해 노력하고 있습니다.
            </p>

            <div className="flex gap-4">
              <Button size="lg" className="rounded-[16px]" onClick={() => reset()}>
                다시 시도
              </Button>
              <Link href={PATH.root}>
                <Button size="lg" variant="outline" className="rounded-[16px]">
                  <Home className="w-5 h-5 mr-2" />
                  홈으로 이동
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
