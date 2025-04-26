import type { ChatPreview, ChatRoom } from '@/app/chat/_model/types';

import { parseAxiosError } from '@/utils/error';

import { api } from '@/lib/axios';

export const getChatPreviews = async () => {
  try {
    const response = await api.get<ChatPreview>('/chat/rooms/preview');
    return response.data;
  } catch (error) {
    const parsedError = parseAxiosError(error);
    throw parsedError;
  }
};

export const getLocationChatRoom = async (city: string) => {
  try {
    const response = await api.get<ChatRoom>(`/chat/rooms/${city}`);
    return response.data;
  } catch (error) {
    const parsedError = parseAxiosError(error);
    throw parsedError;
  }
};
