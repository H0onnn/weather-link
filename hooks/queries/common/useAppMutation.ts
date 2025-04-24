import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';

export function useAppMutation<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'>,
): UseMutationResult<TData, TError, TVariables, TContext> {
  return useMutation({
    mutationFn,
    ...options,
  });
}
