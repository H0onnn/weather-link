import { useAppQuery } from '../common';
import { userQueryOptions } from './queries';

export const useMyUserInfo = () => {
  return useAppQuery(userQueryOptions.my());
};
