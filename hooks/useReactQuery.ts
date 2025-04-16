import {
  type QueryKey,
  type UseInfiniteQueryOptions,
  type UseInfiniteQueryResult,
  type UseMutationOptions,
  type UseMutationResult,
  type UseQueryOptions,
  type UseQueryResult,
  type UseSuspenseQueryOptions,
  type UseSuspenseQueryResult,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';

/**
 * @description react-query 훅을 사용하기 위한 공용 커스텀 훅
 * 사용하는 곳에서 외부 라이브러리 (여기서는 react-query) 에 대한 의존성을 줄이기 위함
 * ex) version up 등으로 인한 내부 구조 변경 시 해당 파일만 구정할 수 있도록
 */

/**
 * 모든 쿼리 훅에 공통적으로 적용되는 기본 옵션
 */
export const defaultQueryOptions = {
  staleTime: 1000 * 60 * 5, // 5분
  retry: 1,
  refetchOnWindowFocus: false,
} as const;

/**
 * 기본 쿼리 옵션 타입
 */
type BaseQueryOptions<TQueryFnData, TQueryKey extends QueryKey> = {
  queryKey: TQueryKey;
  queryFn: () => Promise<TQueryFnData>;
};

export const useAppQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: BaseQueryOptions<TQueryFnData, TQueryKey> &
    Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>,
): UseQueryResult<TData, TError> => {
  return useQuery({
    ...defaultQueryOptions,
    ...options,
  });
};

export const useAppSuspenseQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: BaseQueryOptions<TQueryFnData, TQueryKey> &
    Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>,
): UseSuspenseQueryResult<TData, TError> => {
  return useSuspenseQuery({
    ...defaultQueryOptions,
    ...options,
  });
};

export const useAppInfiniteQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown,
>(
  options: UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey, TPageParam>,
): UseInfiniteQueryResult<TData, TError> => {
  return useInfiniteQuery({
    ...defaultQueryOptions,
    ...options,
  });
};

export const useAppMutation = <TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'>,
): UseMutationResult<TData, TError, TVariables, TContext> => {
  return useMutation({
    mutationFn,
    ...options,
  });
};
