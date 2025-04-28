import type { HourlyWeather, TodayWeather, WeeklyTemperature, WeeklyWeather } from '@/app/(main)/_model/types';

import { api } from '@/lib/axios';

export const getTodayWeather = async (city: string, district: string) => {
  const response = await api.get<TodayWeather>('/weather/todayweather', {
    params: {
      sido: city,
      gugun: district,
    },
  });
  return response;
};

export const getHourlyWeather = async (city: string, district: string) => {
  const response = await api.get<HourlyWeather>('/weather/todayforecast', {
    params: {
      sido: city,
      gugun: district,
    },
  });
  return response;
};

export const getWeeklyWeather = async (city: string, district: string) => {
  const response = await api.get<WeeklyWeather>('/weather/midtermforecast', {
    params: {
      sido: city,
      gugun: district,
    },
  });
  return response;
};

export const getWeeklyTemperature = async (city: string, district: string) => {
  const response = await api.get<WeeklyTemperature>('/weather/mid-temp', {
    params: {
      sido: city,
      gugun: district,
    },
  });
  return response;
};
