import { useAppQuery } from '@/hooks/queries';

import { getChatPreviews, getLocationChatRoom } from './apis';

export const chatKeys = {
  all: ['chat'] as const,
  previews: () => [...chatKeys.all, 'previews'] as const,
  location: (city: string) => [...chatKeys.all, 'location', city] as const,
};

export const useChatPreviews = () => {
  return useAppQuery({
    queryKey: chatKeys.previews(),
    queryFn: getChatPreviews,
  });
};

export const useLocationChatRoom = (city: string) => {
  return useAppQuery({
    queryKey: chatKeys.location(city),
    queryFn: () => getLocationChatRoom(city),
    enabled: !!city,
    staleTime: 1000 * 60 * 1,
  });
};
