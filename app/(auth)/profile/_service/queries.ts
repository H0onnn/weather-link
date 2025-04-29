import { getUserData, updateProfile, updateUserLocation } from '@/app/(auth)/profile/_service/apis';
import { chatKeys } from '@/app/chat/_service/queries';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { parseAxiosError } from '@/utils/error';

import type { ApiError } from '@/lib/axios';
import { getQueryClient } from '@/lib/query';

export const userKeys = {
  all: ['users'] as const,
  my: () => [...userKeys.all, 'my'] as const,
};

export const useMyUserInfo = () => {
  return useQuery({
    queryKey: userKeys.my(),
    queryFn: getUserData,
    staleTime: Infinity,
    select: (data) => data.data,
  });
};

export const useUpdateProfile = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userKeys.my() });
      const message =
        variables instanceof FormData && variables.get('name') ? '이름이 변경되었어요' : '프로필 이미지가 변경되었어요';
      toast.success(message);
    },
    onError: (error: unknown) => {
      const parsed = parseAxiosError(error);
      toast.error(parsed.message);
    },
  });
};

export const useUpdateUserLocation = (callback?: () => void) => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (locationId: string) => updateUserLocation(locationId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: userKeys.my() });
      await queryClient.invalidateQueries({ queryKey: chatKeys.previews() });
      toast.success('위치 변경이 완료되었어요');
      callback?.();
    },
    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });
};
