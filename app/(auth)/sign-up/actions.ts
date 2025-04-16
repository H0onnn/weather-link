'use server';

import { AxiosError } from 'axios';
import { ZodError } from 'zod';

import { api } from '@/lib/axios';

import { type SignupFormSchema, signupSchema } from './validator';

export const signup = async (data: FormData | SignupFormSchema) => {
  const formData = data instanceof FormData ? Object.fromEntries(data.entries()) : data;

  try {
    const validatedData = signupSchema.safeParse(formData);

    if (!validatedData.success) {
      return {
        error: '입력 데이터가 유효하지 않습니다.',
        validation: validatedData.error.format(),
      };
    }

    await api.post('/auth/signup', validatedData.data);

    return { success: true, message: '회원가입이 완료되었습니다.' };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        error: '입력 데이터가 유효하지 않습니다.',
        validation: error.format(),
      };
    }

    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || '회원가입 실패';
      return { error: errorMessage };
    }

    return { error: '알 수 없는 오류가 발생했습니다.' };
  }
};
