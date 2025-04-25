'use client';

import { useWeeklyForecast } from '@/app/(main)/_service/queries';
import { parseAsString, useQueryStates } from 'nuqs';

import { WeatherIcon } from '@/components/WeatherIcon';

import { getWeatherIconType, separateWeatherInfo } from '@/utils/weather';

interface WeeklyForecastProps {
  myLocation: {
    city: string;
    district: string;
  };
}

const WeeklyForecast = ({ myLocation }: WeeklyForecastProps) => {
  const [compareLocation] = useQueryStates({
    city: parseAsString,
    district: parseAsString,
  });

  const { data: myWeather, isLoading: isMyWeatherFetching } = useWeeklyForecast(myLocation.city, myLocation.district);
  const { data: compareWeather, isLoading: isCompareWeatherFetching } = useWeeklyForecast(
    compareLocation.city || '',
    compareLocation.district || '',
  );

  if (isMyWeatherFetching || isCompareWeatherFetching) {
    return <Skeleton />;
  }

  if (!myWeather || !compareWeather) return null;

  return (
    <div className="bg-white rounded-[16px] p-4 shadow-shadow1">
      <div className="grid grid-cols-3 gap-4 mb-2">
        {/* 내 위치 */}
        <span className="text-center text-sm font-medium truncate">
          {myLocation.city} {myLocation.district}
        </span>

        <span className="text-center text-sm text-gray500">날짜</span>

        {/* 비교 위치 */}
        <span className="text-center text-sm font-medium truncate">
          {compareLocation.city} {compareLocation.district}
        </span>
      </div>

      <div className="max-h-[300px] overflow-x-hidden overflow-y-auto">
        {myWeather.forecasts.map((myForecast, index) => {
          const compareForecast = compareWeather.forecasts[index];

          const myMorningWeather = separateWeatherInfo(myForecast.morning.skyAndPre);
          const compareMorningWeather = separateWeatherInfo(compareForecast.morning.skyAndPre);

          return (
            <div key={`day-${index}`} className="grid grid-cols-3 items-center">
              {/* 내 위치 날씨 */}
              <div className="flex items-center justify-center -ml-4">
                <WeatherIcon type={getWeatherIconType(myMorningWeather.skyCondition, myMorningWeather.rainType)} />
                <div className="text-sm">
                  <span className="text-primary font-medium">{myForecast.minTemp}°</span>
                  <span className="mx-1 text-gray500">/</span>
                  <span className="text-red font-medium">{myForecast.maxTemp}°</span>
                </div>
              </div>

              <div className="text-center text-gray500 text-sm">{myForecast.formattedDate}</div>

              {/* 비교 위치 날씨 */}
              <div className="flex items-center justify-center">
                <WeatherIcon
                  type={getWeatherIconType(compareMorningWeather.skyCondition, compareMorningWeather.rainType)}
                />
                <div className="text-sm">
                  <span className="text-primary font-medium">{compareForecast.minTemp}°</span>
                  <span className="mx-1 text-gray500">/</span>
                  <span className="text-red font-medium">{compareForecast.maxTemp}°</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Skeleton = () => {
  return (
    <div className="bg-white rounded-[16px] p-4 shadow-shadow1">
      <div className="grid grid-cols-3 gap-4 mb-2">
        <div className="h-5 bg-gray-200 rounded-md animate-pulse mx-auto w-20" />

        <div className="h-5 bg-gray-200 rounded-md animate-pulse mx-auto w-12" />

        <div className="h-5 bg-gray-200 rounded-md animate-pulse mx-auto w-20" />
      </div>

      <div className="max-h-[300px] overflow-x-hidden overflow-y-auto">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={`skeleton-day-${index}`} className="grid grid-cols-3 items-center py-2">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
              <div className="w-16 h-5 bg-gray-200 rounded-md animate-pulse" />
            </div>

            <div className="mx-auto w-16 h-4 bg-gray-200 rounded-md animate-pulse" />

            <div className="flex items-center justify-center space-x-2">
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
              <div className="w-16 h-5 bg-gray-200 rounded-md animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;
