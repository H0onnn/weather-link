import { useQuery } from '@tanstack/react-query';

import { getGugun, getSido } from './apis';

export const locationKeys = {
  all: ['locations'] as const,
  lists: () => [...locationKeys.all, 'list'] as const,
  list: (filters: string) => [...locationKeys.lists(), { filters }] as const,
};

export const useCityList = () => {
  return useQuery({
    queryKey: locationKeys.list('sido'),
    queryFn: () => getSido(),
    staleTime: Infinity,
    select: (data) => data.data,
  });
};

export const useDistrictList = (sido: string) => {
  return useQuery({
    queryKey: locationKeys.list(`${sido}-gugun`),
    queryFn: () => (sido ? getGugun(sido) : null),
    staleTime: Infinity,
    select: (data) => data?.data,
    enabled: !!sido,
  });
};
