import type { SettingInfo } from '@/app/setting/_model/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { ApiError } from '@/lib/axios';
import { getQueryClient } from '@/lib/query';

import { getSettings, updateSetting } from './apis';

export const settingsKeys = {
  all: ['settings'] as const,
  list: (filters?: string) => [...settingsKeys.all, 'list', filters] as const,
};

export const useGetSettings = () => {
  return useQuery({
    queryKey: settingsKeys.all,
    queryFn: getSettings,
    staleTime: Infinity,
  });
};

export const useUpdateSetting = () => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationFn: ({ settingId, settingInfo }: { settingId: string; settingInfo: SettingInfo }) =>
      updateSetting(settingId, settingInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsKeys.all });
      toast.success('설정 값이 변경되었어요');
    },
    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });
};
