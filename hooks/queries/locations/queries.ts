import { getGugun, getSido } from '@/apis/locations';

const locationKeys = {
  all: ['locations'] as const,
  lists: () => [...locationKeys.all, 'list'] as const,
  list: (filters: string) => [...locationKeys.lists(), { filters }] as const,
};

const locationQueryOptions = {
  sido: () => ({
    queryKey: locationKeys.list('sido'),
    queryFn: () => getSido(),
    staleTime: Infinity,
  }),
  gugun: (sido: string) => ({
    queryKey: locationKeys.list(`${sido}-gugun`),
    queryFn: () => getGugun(sido),
    staleTime: Infinity,
    enabled: !!sido,
  }),
};

export { locationQueryOptions };
