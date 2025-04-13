import { NAVIGATION_HEADER_TITLE } from '@/constants/header';

export const headerTitleExtractor = (pathname: string) => {
  const isValidPathname = (pathname: string): pathname is keyof typeof NAVIGATION_HEADER_TITLE => {
    return pathname in NAVIGATION_HEADER_TITLE;
  };

  if (isValidPathname(pathname)) {
    return NAVIGATION_HEADER_TITLE[pathname]?.title;
  }

  return null;
};
