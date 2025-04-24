import { api } from '@/lib/axios';

export const updateProfile = async (data: FormData) => {
  try {
    const response = await api.patch('/users/myinfo', data);
    return response;
  } catch (error) {
    throw error;
  }
};
