import { getUserData, updateProfile } from '@/app/(auth)/profile/_service/apis';
import { toast } from 'sonner';

import { useAppMutation, useAppSuspenseQuery } from '@/hooks/queries';

import { parseAxiosError } from '@/utils/error';

import { getQueryClient } from '@/lib/query';

export const userKeys = {
  all: ['users'] as const,
  my: () => [...userKeys.all, 'my'] as const,
};

export const useMyUserInfo = () => {
  return useAppSuspenseQuery({
    queryKey: userKeys.my(),
    queryFn: getUserData,
    staleTime: Infinity,
    select: (data) => data.data,
  });
};

export const useUpdateProfile = () => {
  const queryClient = getQueryClient();

  return useAppMutation(updateProfile, {
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
