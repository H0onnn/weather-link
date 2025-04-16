import { Location } from '@/types/location';

export type SignupFormData = {
  email: string;
  password: string;
  profileImage: File | string;
  name: string;
  location: Location;
  termsAgreed: boolean;
  locationAgreed: boolean;
};
