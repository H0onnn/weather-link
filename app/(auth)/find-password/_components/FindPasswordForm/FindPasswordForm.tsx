'use client';

import { AuthType, Authenticator } from '@/app/(auth)/_components/Authenticator';
import { type FindPasswordFormSchema, findPasswordSchema } from '@/app/(auth)/find-password/_model/validator';
import { changePassword } from '@/app/(auth)/find-password/_service/apis';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Input } from '@/components/Input';
import { Button } from '@/components/ui/button';

const defaultValues = {
  email: '',
  newPassword: '',
  confirmPassword: '',
};

const FindPasswordForm = () => {
  const router = useRouter();
  const method = useForm<FindPasswordFormSchema>({
    resolver: zodResolver(findPasswordSchema),
    defaultValues,
  });

  const [isVerified, setIsVerified] = useState(false);

  const {
    handleSubmit: submit,
    control,
    formState: { errors, isSubmitting },
  } = method;

  const handleSubmit = submit(async (data) => {
    const response = await changePassword(data);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    toast.success('비밀번호가 변경되었어요', {
      description: '변경된 비밀번호로 로그인해주세요',
    });
    router.push('/login');
  });

  return (
    <div className="p-5">
      <h3 className="text-black text-center text-2xl font-medium mt-[30px]">비밀번호를 잊으셨나요?</h3>
      <p className="text-gray500 text-sm text-center mt-2 mb-[30px]">
        가입하신 이메일 주소를 입력하시면 인증 코드를 보내드릴게요
      </p>

      <FormProvider {...method}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
          <Authenticator
            type={AuthType.PasswordReset}
            control={control}
            name="email"
            label="이메일"
            placeholder="example@email.com"
            error={errors.email?.message}
            onVerified={() => setIsVerified(true)}
          />

          {isVerified && (
            <>
              <Input
                control={control}
                name="newPassword"
                label="새 비밀번호"
                type="password"
                placeholder="최소 8자 이상, 특수문자, 대소문자 포함"
                error={errors.newPassword?.message}
                autoComplete="new-password"
              />

              <Input
                control={control}
                name="confirmPassword"
                label="비밀번호 확인"
                type="password"
                placeholder="사용하실 비밀번호를 다시 입력해주세요"
                error={errors.confirmPassword?.message}
                autoComplete="new-password"
              />

              <Button type="submit" className="w-full" isLoading={isSubmitting}>
                변경하기
              </Button>
            </>
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export default FindPasswordForm;
