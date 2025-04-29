import { User } from '@/types/user';

import { parseAxiosError } from '@/utils/error';

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

export const updateUserLocation = async (locationId: string) => {
  try {
    const response = await api.patch('/users/location', {
      locationId,
    });
    return response;
  } catch (error) {
    return {
      success: false,
      ...parseAxiosError(error),
    };
  }
};
