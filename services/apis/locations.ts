import type { City, District } from '@/types/location';

import { api } from '@/lib/axios';

export const getSido = async () => {
  const response = await api.get<City[]>('/locations/sido');
  return response;
};

export const getGugun = async (sido: string) => {
  const response = await api.get<District[]>(`/locations/gugun?sido=${sido}`);
  return response;
};
