import { User } from '@/types/user';

import { api } from '@/lib/axios';

export const getUserData = async () => {
  const response = await api.get<User>('/users/myinfo');
  return response;
};
