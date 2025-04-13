'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { ErrorMessage } from '@/components/ErrorMessage';
import { Input } from '@/components/Input';
import { Button } from '@/components/ui/button';

import { getLoginErrorMessage } from './util';
import { loginSchema } from './validator';

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
    getValues,
    setError,
    formState: { errors },
  } = method;

  const handleSubmit = submit(async () => {
    setError('root', { message: '서버메시지: 서버메시지 렌더링테스트' });

    alert(JSON.stringify(getValues()));
  });

  return (
    <FormProvider {...method}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input type="email" label="이메일" name="email" placeholder="이메일을 입력해주세요." />
        <Input type="password" label="비밀번호" name="password" placeholder="비밀번호를 입력해주세요." />
        <Button type="submit">로그인</Button>
      </form>
      <ErrorMessage>{getLoginErrorMessage(errors)}</ErrorMessage>
    </FormProvider>
  );
};

export default LoginForm;
