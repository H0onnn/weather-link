'use client';

import { removeToken } from '@/actions';
import { OAuthButton } from '@/app/(auth)/_components/OAuthButton';
import type { OAuthProvider } from '@/app/(auth)/login/_model/types';
import { loginSchema } from '@/app/(auth)/login/_model/validator';
import { login } from '@/app/(auth)/login/_service/apis';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Input } from '@/components/Input';
import { Button } from '@/components/ui/button';

import { OAUTH_PROVIDERS } from '@/constants/oauth';

import { getQueryClient } from '@/lib/query';

const LoginForm = () => {
  const method = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    handleSubmit: submit,
    control,
    getValues,
    formState: { errors, isSubmitting },
  } = method;

  const handleSubmit = submit(async () => {
    const { email, password } = getValues();

    const response = await login(email, password);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    redirect('/');
  });

  const handleOAuthLogin = async (provider: OAuthProvider) => {
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const authUrl = `${BASE_URL}/auth/${provider}?origin=${window.location.origin}`;
    window.location.href = authUrl;
  };

  // 임시 처리
  useEffect(() => {
    const clear = async () => {
      const queryClient = getQueryClient();

      queryClient.clear();
      await removeToken();
    };

    clear();
  }, []);

  return (
    <div className="p-5 -mt-[73px]">
      <FormProvider {...method}>
        <div className="flex flex-col items-center justify-center py-4">
          <Image src="/icons/logo-main.png" alt="로고" width={200} height={120} priority />
        </div>

        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
          <Input
            control={control}
            name="email"
            label="이메일"
            type="email"
            placeholder="이메일을 입력해주세요"
            required={false}
            autoComplete="email"
            error={errors.email?.message}
          />
          <Input
            control={control}
            name="password"
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            required={false}
            autoComplete="current-password"
            error={errors.password?.message}
          />
          <Button type="submit" disabled={isSubmitting} className="mt-[14px]" isLoading={isSubmitting}>
            로그인
          </Button>
        </form>
      </FormProvider>

      <div className="relative flex items-center justify-center py-6">
        <div className="border-t border-gray-200 w-full" />
        <div className="absolute bg-gray-50 px-4 text-sm text-gray500">또는</div>
      </div>

      <div className="flex justify-center space-x-4">
        {Object.values(OAUTH_PROVIDERS).map((provider) => (
          <OAuthButton key={provider} provider={provider} onClick={() => handleOAuthLogin(provider)} />
        ))}
      </div>

      <div className="text-center text-sm text-gray500 py-[30px]">
        계정이 없으신가요?{' '}
        <Link href="/sign-up" className="text-primary font-medium">
          회원가입
        </Link>
        <Link href="/find-password" className="text-gray-400 block mt-2">
          비밀번호 찾기
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
