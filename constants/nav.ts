import { PATH } from '@/constants/paths';

export const BOTTOM_NAV_VISIBLE_PATHS = [PATH.root, PATH.compare, PATH.friend, PATH.chat, PATH.profile];

export const NAV_ITEMS = [
  {
    href: PATH.root,
    pathname: '/',
    activeIcon: '/icons/nav/home-active.svg',
    inactiveIcon: '/icons/nav/home.svg',
    label: '홈',
    isActive: (path: string) => path === '/',
  },
  {
    href: PATH.compare,
    pathname: '/compare',
    activeIcon: '/icons/nav/compare-active.svg',
    inactiveIcon: '/icons/nav/compare.svg',
    label: '비교',
    isActive: (path: string) => path.startsWith('/compare'),
  },
  {
    href: PATH.friend,
    pathname: '/friend',
    activeIcon: '/icons/nav/friend-active.svg',
    inactiveIcon: '/icons/nav/friend.svg',
    label: '친구',
    isActive: (path: string) => path.startsWith('/friend'),
  },
  {
    href: PATH.chat,
    pathname: '/chat',
    activeIcon: '/icons/nav/chat-active.svg',
    inactiveIcon: '/icons/nav/chat.svg',
    label: '채팅',
    isActive: (path: string) => path.startsWith('/chat'),
  },
  {
    href: PATH.profile,
    pathname: '/profile',
    activeIcon: '/icons/nav/profile-active.svg',
    inactiveIcon: '/icons/nav/profile.svg',
    label: '마이',
    isActive: (path: string) => path.startsWith('/profile'),
  },
] as const;

export type BottomNavVisiblePaths = (typeof BOTTOM_NAV_VISIBLE_PATHS)[number];
