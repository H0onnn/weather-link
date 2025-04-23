import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosResponse, isAxiosError } from 'axios';

import { QueryError } from '@/lib/query';

export const useAppMutation = <
  TMutationKey extends [string, Record<string, unknown>?],
  TMutationFnData,
  TInvalidateKey extends [string, Record<string, unknown>?],
  TError = Error,
  TVariables = void,
  TContext = unknown,
>({
  mutationKey,
  fetcher,
  invalidateKey,
  options,
}: {
  mutationKey: TMutationKey;
  invalidateKey?: TInvalidateKey;
  fetcher: (variables: TVariables) => Promise<AxiosResponse<TMutationFnData>>;
  options?: Omit<UseMutationOptions<TMutationFnData, TError, TVariables, TContext>, 'mutationKey' | 'mutationFn'>;
}): UseMutationResult<TMutationFnData, TError, TVariables, TContext> => {
  const queryClient = useQueryClient();

  return useMutation<TMutationFnData, TError, TVariables, TContext>({
    mutationKey,
    mutationFn: async (variables: TVariables) => {
      const res = await fetcher(variables);

      return res.data;
    },
    onSuccess: () => {
      if (invalidateKey) {
        queryClient.invalidateQueries({ queryKey: invalidateKey });
      }
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) {
        throw new QueryError(error.response?.status.toString() ?? '500', error.message ?? 'Error');
      }

      throw error;
    },
    ...options,
    throwOnError: false,
  });
};
