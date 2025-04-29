import { PATH } from '@/constants/paths';

type PathValue = (typeof PATH)[keyof typeof PATH];

export type HeaderConfig = {
  title: string;
};

export type HeaderPath = {
  [P in PathValue]?: HeaderConfig;
};

// constant에 포함되면 기본적으로 back 버튼을 가지고 rightSlot이 없음
// rightSlot이 필요한 경우에는 layout에서 따로 추가

export const HEADER_TITLE = {
  [PATH.findPassword]: {
    title: '비밀번호 찾기',
  },
  [PATH.signUp]: {
    title: '회원가입',
  },
  [PATH.signUpSocial]: {
    title: '소셜 회원가입',
  },
  [PATH.friend]: {
    title: '내 친구',
  },
  [PATH.profile]: {
    title: '마이페이지',
  },
  [PATH.profileManage]: {
    title: '계정 관리',
  },
  [PATH.compare]: {
    title: '날씨 비교',
  },
  [PATH.settings]: {
    title: '설정',
  },
  [PATH.friendRequest]: {
    title: '친구 요청',
  },
} satisfies HeaderPath;
