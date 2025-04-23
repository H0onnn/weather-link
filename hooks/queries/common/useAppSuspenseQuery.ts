import { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult, useSuspenseQuery } from '@tanstack/react-query';

import { BaseQueryOptions } from '@/lib/query';

export function useAppSuspenseQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: BaseQueryOptions<TQueryFnData, TQueryKey> &
    Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>,
): UseSuspenseQueryResult<TData, TError> {
  return useSuspenseQuery({
    ...options,
  });
}
