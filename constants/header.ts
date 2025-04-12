import { PATH } from '@/constants/paths';

type PathValue = (typeof PATH)[keyof typeof PATH];

export type NavigationHeaderConfig = {
  title: string;
};

export type NavigationHeaderPath = {
  [P in PathValue]?: NavigationHeaderConfig;
};

export const NAVIGATION_HEADER_TITLE = {
  [PATH.login]: {
    title: '로그인',
  },
} satisfies NavigationHeaderPath;
