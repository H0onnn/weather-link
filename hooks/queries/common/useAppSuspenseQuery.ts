import { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult, useSuspenseQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export const useAppSuspenseQuery = <
  TQueryKey extends [string, Record<string, unknown>?],
  TQueryFnData,
  TError = Error,
  TData = TQueryFnData,
>({
  queryKey,
  fetcher,
  options,
}: {
  queryKey: TQueryKey;
  fetcher: () => Promise<AxiosResponse<TQueryFnData>>;
  options?: Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData, QueryKey>, 'queryKey' | 'queryFn'>;
}): UseSuspenseQueryResult<TData, TError> =>
  useSuspenseQuery<TQueryFnData, TError, TData>({
    queryKey,
    queryFn: async () => {
      const res = await fetcher();

      return res.data;
    },
    ...options,
  });
