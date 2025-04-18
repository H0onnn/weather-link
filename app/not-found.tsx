'use client';

import { CloudOff, Home } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col bg-gray-50 max-w-[430px] mx-auto text-black mt-12">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <CloudOff className="w-16 h-16 text-primary" />
        </div>

        <h2 className="text-2xl font-bold mb-2">페이지를 찾을 수 없습니다.</h2>
        <p className="text-gray500 mb-8">
          요청하신 페이지가 구름 속으로 사라졌어요 <br />
          주소를 다시 확인하거나 아래 버튼을 통해 홈으로 이동해주세요
        </p>

        <Link href="/" className="w-full">
          <Button size="lg">
            <Home className="w-5 h-5" />
            홈으로 이동
          </Button>
        </Link>
      </div>
    </div>
  );
}
