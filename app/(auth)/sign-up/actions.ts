'use server';

import { AxiosError } from 'axios';
import { ZodError } from 'zod';

import { api } from '@/lib/axios';

import { type SignupFormSchema, signupSchema } from './validator';

/**
 * 회원가입
 * @param data 회원가입 데이터
 * @returns 회원가입 성공 여부
 */
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

/**
 * 회원가입 이메일 인증 번호 발송
 * @param email 이메일
 * @returns 이메일 인증 번호 발송 성공 여부
 */
export const sendCertEmail = async (email: string) => {
  try {
    await api.post('/auth/service/signup/sendcode', { email });
  } catch (error) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data?.message || '이메일 인증 번호 발송 실패' };
    }
  }
};

/**
 * 회원가입 이메일 인증 번호 검증
 * @param email 이메일
 * @param code 인증 번호
 * @returns 인증 번호 검증 성공 여부
 */
export const verifyCertEmail = async (email: string, code: string) => {
  try {
    await api.post('/auth/service/signup/verifycode', { email, code });
  } catch (error) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data?.message || '이메일 인증 번호 검증 실패' };
    }
  }
};
