import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { getChatPreviews, getLocationChatRoom, getMessages } from './apis';

export const chatKeys = {
  all: ['chat'] as const,
  previews: () => [...chatKeys.all, 'previews'] as const,
  location: (city: string) => [...chatKeys.all, 'location', city] as const,
  messages: (roomId: string, page: number) => [...chatKeys.all, 'messages', roomId, page] as const,
};

export const useChatPreviews = () => {
  return useQuery({
    queryKey: chatKeys.previews(),
    queryFn: getChatPreviews,
  });
};

export const useLocationChatRoom = (city: string) => {
  return useQuery({
    queryKey: chatKeys.location(city),
    queryFn: () => getLocationChatRoom(city),
    enabled: !!city,
    staleTime: 1000 * 60 * 1,
  });
};

export const useMessages = (roomId: string, page: number = 1) => {
  return useInfiniteQuery({
    queryKey: chatKeys.messages(roomId, page),
    queryFn: ({ pageParam = 1 }) => getMessages({ roomId, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.meta.totalPages > pages.length ? pages.length + 1 : undefined;
    },
    staleTime: Infinity,
    enabled: !!roomId,
    select: (data) => data.pages.flatMap((page) => page.messages),
  });
};
