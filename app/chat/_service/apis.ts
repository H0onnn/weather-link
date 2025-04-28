import type { ChatPreview, ChatRoom, MessagesResponse } from '@/app/chat/_model/types';

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

export const getMessages = async ({
  roomId,
  page = 1,
  limit = 20,
}: {
  roomId: string;
  page?: number;
  limit?: number;
}) => {
  try {
    const response = await api.get<MessagesResponse>(`/chat/${roomId}/messages`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    const parsedError = parseAxiosError(error);
    throw parsedError;
  }
};
