import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

const AccountManagement = () => {
  return (
    <div className="px-4 shadow-shadow1 rounded-[16px] bg-white mt-8">
      <ul>
        {MANAGE_ITEMS.map((item, index) => (
          <li key={item.title}>
            <Link
              href={item.href}
              className={cn('flex items-center justify-between h-16', index === 0 && 'border-b border-gray-200')}
            >
              <span className="font-medium">{item.title}</span>
              <Image src="/icons/chevron-right.svg" alt="right" width={24} height={24} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountManagement;

const MANAGE_ITEMS = [
  {
    title: '계정 관리',
    href: '/profile/manage',
  },
  {
    title: '서비스 이용약관',
    href: '/terms',
  },
  {
    title: '개인정보 처리방침',
    href: '/privacy',
  },
] as const;
