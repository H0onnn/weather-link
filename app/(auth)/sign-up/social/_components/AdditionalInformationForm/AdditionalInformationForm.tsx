'use client';

import { signupWithSocial } from '@/app/(auth)/sign-up/_service/apis';
import { type SocialSignupFormSchema, socialSignupSchema } from '@/app/(auth)/sign-up/social/_model/validator';
import { useCityList, useDistrictList } from '@/services/locations/queries';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirect } from 'next/navigation';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { ErrorMessage } from '@/components/ErrorMessage';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const defaultValues = {
  sido: '',
  gugun: '',
  termsAgreed: false,
  locationAgreed: false,
};

const AdditionalInformationForm = () => {
  const method = useForm<SocialSignupFormSchema>({
    resolver: zodResolver(socialSignupSchema),
    defaultValues,
  });

  const {
    handleSubmit: submit,
    control,
    formState: { errors, isSubmitting },
    watch,
  } = method;

  const { data: sidoList = [] } = useCityList();
  const { data: gugunList = [], isFetching } = useDistrictList(watch('sido'));

  const handleSubmit = submit(async (data) => {
    const response = await signupWithSocial(data);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    toast.success('회원가입이 완료되었어요');
    redirect('/');
  });

  return (
    <FormProvider {...method}>
      <form onSubmit={handleSubmit} className="p-5">
        <h2 className="text-black text-center text-2xl font-medium mt-[30px]">
          원활한 서비스 이용을 위해
          <br />
          추가 정보를 입력해주세요
        </h2>

        <div className="flex flex-col gap-y-4 mt-[30px]">
          {/* 위치 */}
          <div>
            <Label htmlFor="location">
              위치
              <span className="text-red-500"> *</span>
            </Label>
            <div className="grid grid-cols-2 gap-3 mt-2.5">
              <Controller
                control={control}
                name="sido"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full py-6 rounded-[16px] bg-gray-100 border-0">
                      <SelectValue placeholder="시/도 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {sidoList.map((sido) => (
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
                name="gugun"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full py-6 rounded-[16px] bg-gray-100 border-0">
                      <SelectValue placeholder="시/군/구 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {isFetching ? (
                        <SelectItem value="loading">로딩중...</SelectItem>
                      ) : (
                        gugunList?.map((gugun) => (
                          <SelectItem key={gugun.id} value={gugun.gugun}>
                            {gugun.gugun}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-x-3">
              {errors.sido && <ErrorMessage>{errors.sido.message}</ErrorMessage>}
              {errors.gugun && <ErrorMessage>{errors.gugun.message}</ErrorMessage>}
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

        <Button type="submit" className="w-full mt-[30px]" disabled={isSubmitting} isLoading={isSubmitting}>
          회원가입
        </Button>
      </form>
    </FormProvider>
  );
};

export default AdditionalInformationForm;
