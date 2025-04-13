import {
  Chat,
  ChatActive,
  Compare,
  CompareActive,
  Friend,
  FriendActive,
  Home,
  HomeActive,
  Profile,
  ProfileActive,
} from '@/public/assets/nav';

const NAV_ITEMS = [
  {
    href: '/',
    activeSegment: null,
    activeIcon: HomeActive,
    inactiveIcon: Home,
    label: '홈',
  },
  {
    href: '/compare',
    activeSegment: 'compare',
    activeIcon: CompareActive,
    inactiveIcon: Compare,
    label: '비교',
  },
  {
    href: '/friend',
    activeSegment: 'friend',
    activeIcon: FriendActive,
    inactiveIcon: Friend,
    label: '친구',
  },
  {
    href: '/chat',
    activeSegment: 'chat',
    activeIcon: ChatActive,
    inactiveIcon: Chat,
    label: '채팅',
  },
  {
    href: '/profile',
    activeSegment: 'profile',
    activeIcon: ProfileActive,
    inactiveIcon: Profile,
    label: '마이',
  },
] as const;

export default NAV_ITEMS;
