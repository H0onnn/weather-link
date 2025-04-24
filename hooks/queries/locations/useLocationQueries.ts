import { useAppQuery } from '../common';
import { locationQueryOptions } from './queries';

export const useCityList = () => {
  return useAppQuery(locationQueryOptions.sido());
};

export const useDistrictList = (sido: string) => {
  return useAppQuery(locationQueryOptions.gugun(sido));
};
