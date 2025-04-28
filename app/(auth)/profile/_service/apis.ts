import { User } from '@/types/user';

import { api } from '@/lib/axios';

export const getUserData = async () => {
  const response = await api.get<User>('/users/myinfo');
  return response;
};

export const updateProfile = async (data: FormData) => {
  try {
    const response = await api.patch('/users/myinfo', data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await api.post('/auth/logout');
    return response;
  } catch (error) {
    throw error;
  }
};

export const withdraw = async () => {
  try {
    const response = await api.delete('/users/myinfo');
    return response;
  } catch (error) {
    throw error;
  }
};
