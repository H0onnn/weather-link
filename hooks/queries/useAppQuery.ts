import { QueryKey, UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';

import { BaseQueryOptions } from '@/lib/query';

export function useAppQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: BaseQueryOptions<TQueryFnData, TQueryKey> &
    Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>,
): UseQueryResult<TData, TError> {
  return useQuery({
    ...options,
  });
}
