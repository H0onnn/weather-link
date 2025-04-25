import { useAppQuery } from '@/hooks/queries';

import { getGugun, getSido } from './apis';

export const locationKeys = {
  all: ['locations'] as const,
  lists: () => [...locationKeys.all, 'list'] as const,
  list: (filters: string) => [...locationKeys.lists(), { filters }] as const,
};

export const useCityList = () => {
  return useAppQuery({
    queryKey: locationKeys.list('sido'),
    queryFn: () => getSido(),
    staleTime: Infinity,
  });
};

export const useDistrictList = (sido: string) => {
  return useAppQuery({
    queryKey: locationKeys.list(`${sido}-gugun`),
    queryFn: () => getGugun(sido),
    staleTime: Infinity,
    enabled: !!sido,
  });
};
