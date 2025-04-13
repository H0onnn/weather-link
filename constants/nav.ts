import { PATH } from '@/constants/paths';

const NAV_ITEMS = [
  {
    href: PATH.root,
    activeSegment: null,
    activeIcon: '/icons/nav/home-active.svg',
    inactiveIcon: '/icons/nav/home.svg',
    label: '홈',
  },
  {
    href: PATH.compare,
    activeSegment: 'compare',
    activeIcon: '/icons/nav/compare-active.svg',
    inactiveIcon: '/icons/nav/compare.svg',
    label: '비교',
  },
  {
    href: PATH.friend,
    activeSegment: 'friend',
    activeIcon: '/icons/nav/friend-active.svg',
    inactiveIcon: '/icons/nav/friend.svg',
    label: '친구',
  },
  {
    href: PATH.chat,
    activeSegment: 'chat',
    activeIcon: '/icons/nav/chat-active.svg',
    inactiveIcon: '/icons/nav/chat.svg',
    label: '채팅',
  },
  {
    href: PATH.profile,
    activeSegment: 'profile',
    activeIcon: '/icons/nav/profile-active.svg',
    inactiveIcon: '/icons/nav/profile.svg',
    label: '마이',
  },
] as const;

export default NAV_ITEMS;
