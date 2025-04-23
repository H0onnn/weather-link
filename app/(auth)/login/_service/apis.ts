'use server';

import { parseAxiosError } from '@/utils/error';

import { api } from '@/lib/axios';

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post<{ accessToken: string; refreshToken: string }>('/auth/login', {
      email,
      password,
    });

    return response;
  } catch (error) {
    const parsed = parseAxiosError(error);
    return {
      success: false,
      ...parsed,
    };
  }
};
