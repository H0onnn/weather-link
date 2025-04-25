import { QueryKey, UseInfiniteQueryOptions, UseInfiniteQueryResult, useInfiniteQuery } from '@tanstack/react-query';

export function useAppInfiniteQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown,
>(
  options: UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey, TPageParam>,
): UseInfiniteQueryResult<TData, TError> {
  return useInfiniteQuery({
    ...options,
  });
}
