import { useAppSuspenseQuery } from '@/hooks/queries';

import { getGugun, getSido } from './apis';

export const locationKeys = {
  all: ['locations'] as const,
  lists: () => [...locationKeys.all, 'list'] as const,
  list: (filters: string) => [...locationKeys.lists(), { filters }] as const,
};

export const useCityList = () => {
  return useAppSuspenseQuery({
    queryKey: locationKeys.list('sido'),
    queryFn: () => getSido(),
    staleTime: Infinity,
    select: (data) => data.data,
  });
};

export const useDistrictList = (sido: string) => {
  return useAppSuspenseQuery({
    queryKey: locationKeys.list(`${sido}-gugun`),
    queryFn: () => {
      if (!sido) return;
      return getGugun(sido);
    },
    staleTime: Infinity,
    select: (data) => data?.data,
  });
};
