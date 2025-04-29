import { Location } from './location';

export type RegisterType = 'EMAIL' | 'KAKAO' | 'GOOGLE' | 'NAVER';

export type User = {
  id: string;
  email: string;
  name: string;
  profileImage: string | null;
  registerType: RegisterType;
  theme: string;
  location: Location;
};
