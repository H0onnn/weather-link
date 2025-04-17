'use client';

import Image from 'next/image';

import { cn } from '@/lib/utils';

export type OAuthProvider = 'kakao' | 'google' | 'naver';

interface OAuthButtonProps {
  provider: OAuthProvider;
  onClick?: (provider: OAuthProvider) => void;
  className?: string;
}

const OAuthButton = ({ provider, onClick, className = '' }: OAuthButtonProps) => {
  const handleClick = () => {
    onClick?.(provider);
  };

  return (
    <button type="button" onClick={handleClick} className={cn('cursor-pointer', className)}>
      <div className="w-12 h-12 rounded-full flex items-center justify-center">
        <Image src={`/icons/oauth/${provider}.svg`} alt={`${provider} 로그인`} width={48} height={48} />
      </div>
    </button>
  );
};

export default OAuthButton;
