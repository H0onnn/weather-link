import { getUserData } from '@/apis/users';

const userKeys = {
  all: ['users'] as const,
  my: () => [...userKeys.all, 'my'] as const,
};

const userQueryOptions = {
  my: () => ({
    queryKey: userKeys.my(),
    queryFn: () => getUserData(),
    staleTime: Infinity,
  }),
};

export { userQueryOptions };
