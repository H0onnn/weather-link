import type { FriendRequest, RequestFriendResponse, SearchedFriend } from '@/app/friend/_model/types';
import type { User } from '@/types/user';

import { parseAxiosError } from '@/utils/error';

import { api } from '@/lib/axios';

export const searchFriend = async (query: string, skip: number = 0, take: number = 20) => {
  try {
    const response = await api.get<{
      data: SearchedFriend[];
      total: number;
      take: number;
      skip: number;
    }>('/friends/search', {
      params: {
        name: query,
        skip,
        take,
      },
    });
    return response.data;
  } catch (error) {
    throw parseAxiosError(error);
  }
};

export const requestFriend = async (friendId: string) => {
  try {
    const response = await api.post<RequestFriendResponse>('/friends/request', {
      receiverId: friendId,
    });
    return response;
  } catch (error) {
    const parsedError = parseAxiosError(error);
    return {
      success: false,
      ...parsedError,
    };
  }
};

export const getMyFriendList = async (skip: number = 0, take: number = 20) => {
  try {
    const response = await api.get<{
      data: User[];
      total: number;
      take: number;
      skip: number;
    }>('/friends', {
      params: {
        skip,
        take,
      },
    });
    return response.data;
  } catch (error) {
    throw parseAxiosError(error);
  }
};

export const deleteFriend = async (friendId: string) => {
  try {
    const response = await api.delete<void>('/friends/remove', {
      data: {
        friendId,
      },
    });
    return response;
  } catch (error) {
    return {
      success: false,
      ...parseAxiosError(error),
    };
  }
};

export const getFriendRequestList = async () => {
  try {
    const response = await api.get<FriendRequest[]>('/friends/requests/received');
    return response.data;
  } catch (error) {
    throw parseAxiosError(error);
  }
};

export const respondFriendRequest = async (requestId: string, accept: boolean) => {
  try {
    const response = await api.post<void>('/friends/respond', {
      requestId,
      accept,
    });
    return response;
  } catch (error) {
    const parsed = parseAxiosError(error);
    return {
      success: false,
      ...parsed,
    };
  }
};
