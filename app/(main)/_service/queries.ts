import { useQueries } from '@tanstack/react-query';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import { useAppQuery } from '@/hooks/queries';

import { getHourlyWeather, getTodayWeather, getWeeklyTemperature, getWeeklyWeather } from './apis';

dayjs.locale('ko');

export const weatherKeys = {
  all: ['weather'] as const,
  filter: (city: string, district: string) => [...weatherKeys.all, city, district] as const,
  today: (city: string, district: string) => [...weatherKeys.filter(city, district), 'today'] as const,
  hourly: (city: string, district: string) => [...weatherKeys.filter(city, district), 'hourly'] as const,
  weekly: (city: string, district: string) => [...weatherKeys.filter(city, district), 'weekly'] as const,
  weeklyForecast: (city: string, district: string) => [...weatherKeys.weekly(city, district), 'forecast'] as const,
  weeklyTemperature: (city: string, district: string) =>
    [...weatherKeys.weekly(city, district), 'temperature'] as const,
};

export const useTodayWeather = (city: string, district: string) => {
  return useAppQuery({
    queryKey: weatherKeys.today(city, district),
    queryFn: () => getTodayWeather(city, district),
    enabled: !!city && !!district,
    select: (data) => {
      const response = data.data;
      if (!response) return null;

      const currentWeather = response.currentWeather;

      return {
        ...response,
        currentWeather: {
          ...currentWeather,
          humidity: Math.round(Number(currentWeather.humidity)),
          windSpeed: Math.round(Number(currentWeather.windSpeed)),
          temperature: Math.round(Number(currentWeather.temperature)),
          perceivedTemperature: Math.round(Number(currentWeather.perceivedTemperature)),
        },
      };
    },
  });
};

export const useHourlyWeather = (city: string, district: string) => {
  return useAppQuery({
    queryKey: weatherKeys.hourly(city, district),
    queryFn: () => getHourlyWeather(city, district),
    enabled: !!city && !!district,
    select: (data) => {
      const response = data.data;
      if (!response) return null;

      const forecasts = response.forecasts;

      return {
        forecasts: forecasts.map((forecast) => ({
          ...forecast,
          time: dayjs(forecast.time).format('HH:mm'),
        })),
      };
    },
  });
};

export const useWeeklyForecast = (city: string, district: string) => {
  const results = useQueries({
    queries: [
      {
        queryKey: weatherKeys.weeklyForecast(city, district),
        queryFn: () => getWeeklyWeather(city, district),
        enabled: !!city && !!district,
      },
      {
        queryKey: weatherKeys.weeklyTemperature(city, district),
        queryFn: () => getWeeklyTemperature(city, district),
        enabled: !!city && !!district,
      },
    ],
  });

  const [weeklyWeatherResult, weeklyTemperatureResult] = results;
  const { data: weeklyWeatherData, isLoading: isWeatherLoading, error: weatherError } = weeklyWeatherResult;
  const { data: weeklyTempData, isLoading: isTempLoading, error: tempError } = weeklyTemperatureResult;

  const isLoading = isWeatherLoading || isTempLoading;
  const error = weatherError || tempError;

  const data =
    weeklyWeatherData?.data && weeklyTempData?.data
      ? {
          location: weeklyWeatherData.data.location,
          forecasts: (() => {
            const today = dayjs().format('YYYYMMDD');

            // 주간 날씨 데이터에서 오늘 이후 7일 데이터만 필터링
            const filteredWeatherForecasts = weeklyWeatherData.data.forecasts
              .filter((forecast) => forecast.forecastDate >= today)
              .slice(0, 7);

            return filteredWeatherForecasts.map((forecast) => {
              const tempData = weeklyTempData.data?.forecasts?.find(
                (temp) => temp.forecastDate === forecast.forecastDate,
              );

              const dateParsed = dayjs(forecast.forecastDate);
              const formattedDate = `${dateParsed.format('M.D')}`;
              const dayOfWeek = dateParsed.format('ddd').charAt(0);

              return {
                ...forecast,
                formattedDate,
                dayOfWeek,
                minTemp: tempData?.minTemp ?? 0,
                maxTemp: tempData?.maxTemp ?? 0,
              };
            });
          })(),
        }
      : undefined;

  return {
    data,
    isLoading,
    error,
  };
};
