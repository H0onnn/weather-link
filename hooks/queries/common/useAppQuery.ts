import { QueryKey, UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export const useAppQuery = <
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
  options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, QueryKey>, 'queryKey' | 'queryFn'>;
}): UseQueryResult<TData, TError> =>
  useQuery<TQueryFnData, TError, TData>({
    queryKey,
    queryFn: async () => {
      const res = await fetcher();

      return res.data;
    },
    ...options,
    throwOnError: true,
  });
