import { QueryClient, QueryKey, isServer } from '@tanstack/react-query';

export type BaseQueryOptions<TQueryFnData, TQueryKey extends QueryKey> = {
  queryKey: TQueryKey;
  queryFn: () => Promise<TQueryFnData> | TQueryFnData;
};

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // SSR 환경에서는 보통 클라이언트에서 즉시 재요청하는 것을 방지하기 위해
        // staleTime을 0보다 큰 값으로 설정
        staleTime: 60 * 1000,
        throwOnError: true,
      },
      // dehydrate: {
      //   shouldDehydrateQuery: (query) =>
      //     defaultShouldDehydrateQuery(query) ||
      //     // pending 상태의 쿼리도 dehydrate에 포함하여 데이터를 전송
      //     query.state.status === 'pending',
      //   shouldRedactErrors: (error) => {
      //     console.error('query client error', error);
      //     return false;
      //   },
      // },
    },
  });
};

let browserQueryClient: QueryClient | undefined = undefined;

export const getQueryClient = () => {
  if (isServer) {
    // 서버 환경에서는 항상 새로운 쿼리 클라이언트 생성
    return makeQueryClient();
  } else {
    // 브라우저 환경에서는 이미 생성된 쿼리 클라이언트가 없는 경우에만 새로 생성
    // *React가 초기 렌더링 중에 일시 중단되는 경우 새 클라이언트를 다시 만들지 않기 위함
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};
