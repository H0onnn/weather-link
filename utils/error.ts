import { type AxiosError } from 'axios';

import { type ApiError } from '@/lib/axios';

export const parseAxiosError = (error: unknown): ApiError => {
  const axiosError = error as AxiosError<any>;

  console.error('Axios Error Response:', JSON.stringify(axiosError.response?.data, null, 2));

  const responseData = axiosError.response?.data;

  return {
    error: responseData?.error || 'error',
    message: responseData?.message || responseData?.error || '알 수 없는 에러가 발생했어요',
    statusCode: axiosError.response?.status || 500,
    data: responseData?.data || null,
  };
};
