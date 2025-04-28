import type { FriendRequest, SearchedFriend } from '@/app/friend/_model/types';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getQueryClient } from '@/lib/query';

import { deleteFriend, getMyFriendList, searchFriend } from './apis';

export const friendKeys = {
  all: ['friend'] as const,
  list: (filters: string) => [...friendKeys.all, filters] as const,
};

export const useSearchFriend = (query: string) => {
  return useInfiniteQuery({
    queryKey: friendKeys.list(query),
    queryFn: ({ pageParam = 0 }) => searchFriend(query, pageParam, 20),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.total <= lastPage.take * (lastPage.skip + 1) ? undefined : lastPage.skip + lastPage.take;
    },
    select: (data) => data.pages.flatMap((page) => page.data),
    enabled: !!query,
  });
};

export const useGetMyFriendList = () => {
  return useInfiniteQuery({
    queryKey: friendKeys.list('my-friends'),
    queryFn: ({ pageParam = 0 }) => getMyFriendList(pageParam, 20),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.total <= lastPage.take * (lastPage.skip + 1) ? undefined : lastPage.skip + lastPage.take;
    },
    select: (data) => data.pages.flatMap((page) => page.data),
  });
};

export const useDeleteFriend = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (friend: SearchedFriend) => deleteFriend(friend.id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: friendKeys.list('my-friends') });
      toast.success(`${variables.name}님을 친구 목록에서 삭제했어요`);
    },
    onError: (error) => {
      toast.error('친구 삭제 중 오류가 발생했어요');
      console.error('친구 삭제 오류: ', error);
    },
  });
};
