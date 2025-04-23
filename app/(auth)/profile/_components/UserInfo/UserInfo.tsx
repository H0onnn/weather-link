'use client';

import { ProfileImageInput } from '@/app/(auth)/_components/ProfileImageInput';
import { type UpdateProfileSchema, updateProfileSchema } from '@/app/(auth)/profile/valdator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Mail, MapPin, Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import { NAME_MAX_LENGTH } from '@/constants/valid';

import { cn } from '@/lib/utils';

// TODO: user 데이터로 변경
const defaultValues = {
  name: '미남정훈',
  profileImage: null,
};

const UserInfo = () => {
  const method = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues,
  });

  const [isEditing, setIsEditing] = useState(false);

  const { handleSubmit: submit, control, watch } = method;

  const profileImage = watch('profileImage');

  const editName = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSubmit = submit(async (data) => {
    console.info(data);
    // TODO: API 호출 구현

    editName();
  });

  useEffect(() => {
    if (profileImage) {
      handleSubmit();
    }
  }, [profileImage]);

  return (
    <div className="p-6 shadow-shadow1 rounded-[16px]">
      <div className="flex items-center justify-center">
        <FormProvider {...method}>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
            <ProfileImageInput isDescriptionVisible={false} name="profileImage" />
            <div className="flex items-center">
              <div className="relative inline-block">
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <input
                      {...field}
                      ref={(e) => {
                        if (isEditing) {
                          e?.focus();
                        }
                      }}
                      className={cn(
                        'text-[20px] leading-7 font-bold text-center outline-none bg-transparent',
                        'w-auto min-w-[60px] max-w-[200px]',
                        isEditing ? 'border-b border-primary' : 'border-b border-transparent',
                      )}
                      readOnly={!isEditing}
                      size={(field.value?.length || defaultValues.name.length) + 2}
                      maxLength={NAME_MAX_LENGTH}
                      onBlur={() => {
                        if (isEditing) {
                          setIsEditing(false);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleSubmit();
                        }
                      }}
                    />
                  )}
                />
              </div>

              <button type="button" onClick={editName} className="text-gray500">
                {isEditing ? <Check size={20} /> : <Pencil size={20} />}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>

      <div className="mt-8 flex flex-col space-y-4">
        <div className="bg-gray-100 rounded-[16px] h-17 p-3 flex items-center space-x-3">
          <Mail size={20} className="text-primary" />
          <div className="flex flex-col">
            <span className="text-gray500 text-sm">이메일</span>
            <span className="font-medium">user@example.com</span>
          </div>
        </div>
        <div className="bg-gray-100 rounded-[16px] h-17 p-3 flex items-center space-x-3">
          <MapPin size={20} className="text-primary" />
          <div className="flex flex-col">
            <span className="text-gray500 text-sm">주소</span>
            <span className="font-medium">서울특별시 양천구</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
