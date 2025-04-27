'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';

import { BOTTOM_NAV_VISIBLE_PATHS, type BottomNavVisiblePaths, NAV_ITEMS } from '@/constants/nav';

import { cn } from '@/lib/utils';

interface NavItemProps {
  href: string;
  pathname: string;
  activeIcon: string;
  inactiveIcon: string;
  label: string;
  getIsActive: (path: string) => boolean;
}

const NavItem = ({ href, pathname, activeIcon, inactiveIcon, label, getIsActive }: NavItemProps) => {
  const isActive = getIsActive(pathname);

  return (
    <li>
      <Button variant="ghost" size="icon" className="hover:bg-transparent" asChild>
        <Link href={href}>
          <div className="flex flex-col items-center space-y-3">
            <Image src={isActive ? activeIcon : inactiveIcon} alt={label} width={16} height={16} />
            <span className={cn('text-xs', isActive ? 'text-primary' : 'text-gray500')}>{label}</span>
          </div>
        </Link>
      </Button>
    </li>
  );
};

const BottomNav = () => {
  const pathname = usePathname();

  const isVisible = BOTTOM_NAV_VISIBLE_PATHS.includes(pathname as BottomNavVisiblePaths);

  if (!isVisible) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 max-w-[560px] mx-auto bg-white border-t border-gray-200 py-2 px-3 h-14">
      <ul className="flex justify-between">
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.href} {...item} getIsActive={item.isActive} pathname={pathname} />
        ))}
      </ul>
    </nav>
  );
};

export default BottomNav;
