import { getToken, removeToken, setToken } from '@/actions';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { redirect } from 'next/navigation';

const isServer = typeof window === 'undefined';

const API_BASE_URL = isServer ? process.env.API_BASE_URL : process.env.NEXT_PUBLIC_API_BASE_URL;

export interface ApiResponse<T> {
  success?: boolean;
  statusCode?: number;
  error?: string;
  message: string;
  data: T | null;
}

export interface ApiError extends ApiResponse<null> {
  error: string;
  message: string;
  statusCode: number;
}

type Token = {
  accessToken: string;
  refreshToken: string;
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
  withCredentials: true,
  // fetch adapter
  adapter: 'fetch',
  fetchOptions: {
    credentials: 'include',
  },
} satisfies AxiosRequestConfig);

// req interceptor
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    console.log('req url: ', config.url);

    const accessToken = await getToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    console.error('axios req error: ', error);

    return Promise.reject(error);
  },
);

// res interceptor
axiosInstance.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (response.data?.data && 'accessToken' in response.data.data) {
      const { accessToken } = response.data.data as Token;
      await setToken(accessToken);
    }

    return response;
  },
  async (error: AxiosError) => {
    console.error('axios res error: ', error);

    const requestUrl = error.config?.url || '';

    const isAuthEndpoint = requestUrl.includes('/auth');

    if (error.response && error.response.status === 401 && !isAuthEndpoint) {
      console.error('Unauthorized');
      await removeToken();

      if (isServer) {
        redirect('/login');
      } else {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  },
);

const makeRequest = async <T, D = any>(
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
) => {
  try {
    const apiCall = () => {
      switch (method) {
        case 'get':
          return axiosInstance.get<ApiResponse<T>>(url, config);
        case 'post':
          return axiosInstance.post<ApiResponse<T>>(url, data, config);
        case 'put':
          return axiosInstance.put<ApiResponse<T>>(url, data, config);
        case 'patch':
          return axiosInstance.patch<ApiResponse<T>>(url, data, config);
        case 'delete':
          return axiosInstance.delete<ApiResponse<T>>(url, config);
      }
    };

    const response = await apiCall();
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) => makeRequest<T>('get', url, undefined, config),

  post: <T, D = any>(url: string, data?: D, config?: AxiosRequestConfig) =>
    makeRequest<T, D>('post', url, data, config),

  put: <T, D = any>(url: string, data?: D, config?: AxiosRequestConfig) => makeRequest<T, D>('put', url, data, config),

  patch: <T, D = any>(url: string, data?: D, config?: AxiosRequestConfig) =>
    makeRequest<T, D>('patch', url, data, config),

  delete: <T>(url: string, config?: AxiosRequestConfig) => makeRequest<T>('delete', url, undefined, config),
};

export default axiosInstance;
