'use server';

import { FindPasswordFormSchema } from '@/app/(auth)/find-password/_model/validator';

import { parseAxiosError } from '@/utils/error';

import { api } from '@/lib/axios';

/**
 * 비밀번호 찾기 이메일 인증 번호 발송
 * @param email 가입 이메일
 * @returns 이메일 인증 번호 발송 성공 여부
 */
export const sendFindPasswordCertEmail = async (email: string) => {
  try {
    const response = await api.post<void>('/auth/service/password/find/email', { email });
    return response;
  } catch (error) {
    const parsed = parseAxiosError(error);
    return {
      success: false,
      ...parsed,
    };
  }
};

/**
 * 비밀번호 찾기 이메일 인증 번호 검증
 * @param email 가입 이메일
 * @param code 인증 번호
 * @returns 인증 번호 검증 성공 여부
 */
export const verifyFindPasswordCertCode = async (email: string, code: string) => {
  try {
    const response = await api.post<void>('/auth/service/password/find/verify', { email, code });
    return response;
  } catch (error) {
    const parsed = parseAxiosError(error);
    return {
      success: false,
      ...parsed,
    };
  }
};

/**
 * 비밀번호 변경
 * @param email 가입 이메일
 * @param newPassword 새 비밀번호
 * @param confirmPassword 새 비밀번호 확인
 * @returns 비밀번호 변경 성공 여부
 */

export const changePassword = async (data: FindPasswordFormSchema) => {
  try {
    const response = await api.patch<void>('/auth/service/password/find/reset', {
      email: data.email,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
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
