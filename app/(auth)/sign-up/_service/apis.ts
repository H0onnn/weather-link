'use server';

import type { User } from '@/types/user';

import { api } from '@/lib/axios';

/**
 * 회원가입
 * @param data 회원가입 데이터
 * @returns 회원가입 성공 여부
 */
export const signup = async (data: FormData) => {
  try {
    const response = await api.post<User>('/auth/signup', data);
    return response;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

/**
 * 회원가입 이메일 인증 번호 발송
 * @param email 이메일
 * @returns 이메일 인증 번호 발송 성공 여부
 */
export const sendCertEmail = async (email: string) => {
  try {
    const response = await api.post<void>('/auth/service/signup/sendcode', { email });
    return response;
  } catch (error) {
    console.error('Send cert email error:', error);
    throw error;
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
    const response = await api.post<void>('/auth/service/signup/verifycode', { email, code });
    return response;
  } catch (error) {
    console.error('Verify cert email error:', error);
    throw error;
  }
};
