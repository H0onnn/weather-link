import { getToken, removeToken, setToken } from '@/actions';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { redirect } from 'next/navigation';

const isServer = typeof window === 'undefined';

const API_BASE_URL = isServer ? process.env.NEXT_API_URL : process.env.NEXT_PUBLIC_API_URL;

export interface ApiResponse<T> {
  success?: boolean;
  statusCode?: number;
  error?: string;
  message: string;
  data: T;
}

type Token = {
  accessToken: string;
  refreshToken: string;
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
  // fetch adapter
  adapter: 'fetch',
  fetchOptions: {
    cache: 'force-cache',
    credentials: 'include',
  },
} satisfies AxiosRequestConfig);

// req interceptor
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
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
    if (response.data.success) {
      if (response.data.data && 'accessToken' in response.data.data) {
        const { accessToken } = response.data.data as Token;
        await setToken(accessToken);
      }

      if (response.data.data) return response;
    }

    return Promise.reject(response.data);
  },
  async (error: AxiosError) => {
    console.error('axios res error: ', error);

    if (error.response && error.response.status === 401) {
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

export const api = {
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    axiosInstance.get<T>(url, config),

  post: <T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    axiosInstance.post<T, AxiosResponse<T>, D>(url, data, config),

  put: <T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    axiosInstance.put<T, AxiosResponse<T>, D>(url, data, config),

  patch: <T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    axiosInstance.patch<T, AxiosResponse<T>, D>(url, data, config),

  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    axiosInstance.delete<T>(url, config),
};

export default axiosInstance;
