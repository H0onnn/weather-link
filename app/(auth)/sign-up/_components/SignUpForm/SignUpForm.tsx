'use client';

import { AuthType, Authenticator } from '@/app/(auth)/_components/Authenticator';
import { OAuthButton, type OAuthProvider } from '@/app/(auth)/_components/OAuthButton';
import { ProfileImageInput } from '@/app/(auth)/_components/ProfileImageInput';
import { SignupFormSchema, signupSchema } from '@/app/(auth)/sign-up/_model/validator';
import { signup } from '@/app/(auth)/sign-up/_service/apis';
import { useCityList, useDistrictList } from '@/services/locations/queries';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { ErrorMessage } from '@/components/ErrorMessage';
import { Input } from '@/components/Input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { OAUTH_PROVIDERS } from '@/constants/oauth';

const defaultValues = {
  email: '',
  password: '',
  passwordConfirm: '',
  name: '',
  profileImage: '',
  location: {
    sido: '',
    gugun: '',
  },
  termsAgreed: false,
  locationAgreed: false,
};

const SignUpForm = () => {
  const method = useForm<SignupFormSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues,
  });

  const {
    handleSubmit: submit,
    control,
    formState: { errors, isSubmitting },
    watch,
  } = method;

  const [isVerified, setIsVerified] = useState(false);

  const { data: sidoList } = useCityList();
  const { data: gugunList } = useDistrictList(watch('location.sido'));

  const handleSubmit = submit(async (data) => {
    const formData = new FormData();

    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('name', data.name);
    formData.append('sido', data.location.sido);
    formData.append('gugun', data.location.gugun);
    formData.append('termsAgreed', String(data.termsAgreed));
    formData.append('locationAgreed', String(data.locationAgreed));

    if (data.profileImage instanceof File && data.profileImage.size > 0) {
      formData.append('profileImage', data.profileImage);
    }

    const response = await signup(formData);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    toast.success('회원가입이 완료되었어요');
    redirect('/login');
  });

  const handleOAuthSignUp = (provider: OAuthProvider) => {
    console.info(`${provider} 소셜 회원가입`); // TODO: 소셜 회원가입 구현
  };

  return (
    <>
      <FormProvider {...method}>
        <form onSubmit={handleSubmit} className="p-5">
          <div className="flex flex-col items-center justify-center py-4">
            <ProfileImageInput name="profileImage" />
            <p className="text-xs text-gray-400">*이미지를 등록하지 않으면 기본 이미지로 설정돼요</p>
          </div>

          <div className="flex flex-col gap-y-4 mt-1">
            <Input
              control={control}
              name="name"
              label="이름"
              type="text"
              placeholder="사용하실 이름을 입력해주세요"
              error={errors.name?.message}
              autoComplete="username"
            />

            <Authenticator
              type={AuthType.Signup}
              control={control}
              name="email"
              label="이메일"
              placeholder="example@email.com"
              error={errors.email?.message}
              onVerified={() => setIsVerified(true)}
            />

            <Input
              control={control}
              name="password"
              label="비밀번호"
              type="password"
              placeholder="최소 8자 이상, 특수문자, 대소문자 포함"
              error={errors.password?.message}
              autoComplete="new-password"
            />

            <Input
              control={control}
              name="passwordConfirm"
              label="비밀번호 확인"
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
              error={errors.passwordConfirm?.message}
              autoComplete="new-password"
            />

            {/* 위치 */}
            <div>
              <Label htmlFor="location">
                위치
                <span className="text-red-500"> *</span>
              </Label>
              <div className="grid grid-cols-2 gap-3 mt-2.5">
                <Controller
                  control={control}
                  name="location.sido"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full py-6 rounded-[16px] bg-gray-100 border-0">
                        <SelectValue placeholder="시/도 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        {sidoList?.data?.map((sido) => (
                          <SelectItem key={sido.id} value={sido.sido}>
                            {sido.sido}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />

                <Controller
                  control={control}
                  name="location.gugun"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full py-6 rounded-[16px] bg-gray-100 border-0">
                        <SelectValue placeholder="시/군/구 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        {gugunList?.data?.map((gugun) => (
                          <SelectItem key={gugun.id} value={gugun.gugun}>
                            {gugun.gugun}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-x-3">
                {errors.location?.sido && <ErrorMessage>{errors.location.sido.message}</ErrorMessage>}
                {errors.location?.gugun && <ErrorMessage>{errors.location.gugun.message}</ErrorMessage>}
              </div>
            </div>

            {/* 약관 동의 */}
            <div className="mt-1">
              <div className="space-y-3">
                <Controller
                  control={control}
                  name="termsAgreed"
                  render={({ field }) => (
                    <Checkbox
                      id="terms"
                      label="서비스 이용약관에 동의합니다. (필수)"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="locationAgreed"
                  render={({ field }) => (
                    <Checkbox
                      id="locationAgreed"
                      label="개인정보 수집 및 이용에 동의합니다. (필수)"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
              {(errors.termsAgreed || errors.locationAgreed) && (
                <ErrorMessage>{errors.termsAgreed?.message || errors.locationAgreed?.message}</ErrorMessage>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full mt-[30px]"
            disabled={isSubmitting || !isVerified}
            isLoading={isSubmitting}
          >
            회원가입
          </Button>
        </form>
      </FormProvider>

      <div className="relative flex items-center justify-center py-6">
        <div className="border-t border-gray-200 w-full" />
        <div className="absolute bg-gray-50 px-4 text-sm text-gray500">또는</div>
      </div>

      {/* OAuth 회원가입 버튼 */}
      <div className="flex justify-center space-x-4">
        {Object.values(OAUTH_PROVIDERS).map((provider) => (
          <OAuthButton key={provider} provider={provider} onClick={() => handleOAuthSignUp(provider)} />
        ))}
      </div>

      <div className="text-center text-sm text-gray500 py-[30px]">
        이미 계정이 있으신가요?{' '}
        <Link href="/login" className="text-primary font-medium">
          로그인
        </Link>
      </div>
    </>
  );
};

export default SignUpForm;
