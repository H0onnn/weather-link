import type { FriendRequest, SearchedFriend } from '@/app/friend/_model/types';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { type ApiError } from '@/lib/axios';
import { getQueryClient } from '@/lib/query';

import {
  deleteFriend,
  getFriendRequestList,
  getMyFriendList,
  requestFriend,
  respondFriendRequest,
  searchFriend,
} from './apis';

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
    select: (data) => data.pages.flatMap((page) => page.items),
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
    select: (data) => data.pages.flatMap((page) => page.items),
  });
};

export const useRequestFriend = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (friend: SearchedFriend) => requestFriend(friend.id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: friendKeys.all });
      toast.success(`${variables.name}님에게 친구 요청을 보냈어요`);
    },
    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteFriend = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (friend: SearchedFriend) => deleteFriend(friend.id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: friendKeys.all });
      toast.success(`${variables.name}님을 친구 목록에서 삭제했어요`);
    },
    onError: (error) => {
      toast.error('친구 삭제 중 오류가 발생했어요');
      console.error('친구 삭제 오류: ', error);
    },
  });
};

export const useFriendRequestList = () => {
  return useQuery({
    queryKey: friendKeys.list('friend-requests'),
    queryFn: getFriendRequestList,
  });
};

export const useRespondFriendRequest = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: ({ request, accept }: { request: FriendRequest; accept: boolean }) =>
      respondFriendRequest(request.id, accept),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: friendKeys.list('friend-requests') });

      if (variables.accept) {
        toast.success(`${variables.request.sender.name}님과 친구가 되었어요`);
      } else {
        toast.success(`${variables.request.sender.name}님의 친구 요청을 거절했어요`);
      }
    },
    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });
};
