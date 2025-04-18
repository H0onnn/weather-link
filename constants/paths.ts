export const PATH = Object.freeze({
  /**
   * 홈
   */
  root: '/' as const,

  /**
   * 회원가입
   */
  signUp: '/sign-up' as const,

  /**
   * 로그인
   */
  login: '/login' as const,

  /**
   * 비밀번호 찾기
   */
  findPassword: '/find-password' as const,

  /**
   * 날씨비교
   */
  compare: '/compare' as const,

  /**
   * 친구
   */
  friend: '/friend' as const,

  /**
   * 채팅
   */
  chat: '/chat' as const,

  /**
   * 마이페이지
   */
  profile: '/profile' as const,
});
