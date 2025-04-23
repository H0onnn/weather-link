type RegisterType = 'email' | 'kakao' | 'google' | 'naver';

export type User = {
  id: string;
  email: string;
  name: string;
  profileImage: string | null;
  registerType: RegisterType;
  theme: string;
  location: Location;
};
