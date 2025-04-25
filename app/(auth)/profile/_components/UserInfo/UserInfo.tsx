'use client';

import { ProfileImageInput } from '@/app/(auth)/_components/ProfileImageInput';
import { type UpdateProfileSchema, updateProfileSchema } from '@/app/(auth)/profile/_model/valdator';
import { useMyUserInfo, useUpdateProfile } from '@/app/(auth)/profile/_service/queries';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Mail, MapPin, Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import { ErrorMessage } from '@/components/ErrorMessage';

import { NAME_MAX_LENGTH } from '@/constants/valid';

import { cn } from '@/lib/utils';

const UserInfo = () => {
  const { data: user } = useMyUserInfo();

  if (!user) return null;

  const defaultValues = {
    name: user.name || '',
    profileImage: user.profileImage || '',
  };

  const method = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues,
  });

  const [isEditing, setIsEditing] = useState(false);

  const {
    handleSubmit: submit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = method;

  const { mutate: updateProfile } = useUpdateProfile();

  const profileImage = watch('profileImage');

  const handleSubmit = submit((data) => {
    if (data.name && data.name.trim() && data.name !== defaultValues.name) {
      const formData = new FormData();
      formData.append('name', data.name);
      updateProfile(formData);
    }

    setIsEditing(false);
  });

  useEffect(() => {
    if (!profileImage) return;

    if (profileImage instanceof File && profileImage.size > 0) {
      const formData = new FormData();
      formData.append('profileImage', profileImage);

      updateProfile(formData);
    }
  }, [profileImage]);

  return (
    <div className="p-6 shadow-shadow1 rounded-[16px]">
      <div className="flex items-center justify-center">
        <FormProvider {...method}>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
            <ProfileImageInput
              isDescriptionVisible={false}
              name="profileImage"
              defaultImage={user.profileImage ?? undefined}
            />
            <div className="flex items-center">
              <div className="relative inline-block">
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <div className="flex flex-col">
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
                        value={field.value ?? defaultValues.name}
                        size={(field.value?.length || defaultValues.name?.length || 0) + 2}
                        maxLength={NAME_MAX_LENGTH}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSubmit();
                          }
                        }}
                      />

                      {errors && <ErrorMessage>{errors.name?.message}</ErrorMessage>}
                    </div>
                  )}
                />
              </div>

              <button
                type={isEditing ? 'submit' : 'button'}
                onClick={(e) => {
                  if (!isEditing) {
                    e.preventDefault();
                    setIsEditing(true);
                  }
                }}
                className="text-gray500"
                disabled={isSubmitting}
              >
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
            <span className="font-medium">{user.email}</span>
          </div>
        </div>
        <div className="bg-gray-100 rounded-[16px] h-17 p-3 flex items-center space-x-3">
          <MapPin size={20} className="text-primary" />
          <div className="flex flex-col">
            <span className="text-gray500 text-sm">주소</span>
            <span className="font-medium">
              {user.location.sido} {user.location.gugun}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
