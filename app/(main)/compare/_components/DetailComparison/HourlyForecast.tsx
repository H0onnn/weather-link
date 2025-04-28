'use client';

import { useHourlyWeather } from '@/app/(main)/_service/queries';
import { parseAsString, useQueryStates } from 'nuqs';

import { WeatherIcon } from '@/components/WeatherIcon';

import { getIsNight } from '@/utils/time';
import { getWeatherIconType } from '@/utils/weather';

interface HourlyForecastProps {
  myLocation: {
    city: string;
    district: string;
  };
}

const HourlyForecast = ({ myLocation }: HourlyForecastProps) => {
  const [compareLocation] = useQueryStates({
    city: parseAsString,
    district: parseAsString,
  });

  const { data: myWeather, isFetching: isMyWeatherFetching } = useHourlyWeather(myLocation.city, myLocation.district);
  const { data: compareWeather, isFetching: isCompareWeatherFetching } = useHourlyWeather(
    compareLocation.city || '',
    compareLocation.district || '',
  );

  if (isMyWeatherFetching || isCompareWeatherFetching) return <Skeleton />;

  if (!myWeather || !compareWeather) return null;

  return (
    <div className="bg-white rounded-[16px] p-4 shadow-shadow1">
      <div className="grid grid-cols-3 gap-4 mb-2">
        {/* 내 위치 */}
        <span className="text-center text-sm font-medium truncate">
          {myLocation.city} {myLocation.district}
        </span>

        <span className="text-center text-sm text-gray500">시간</span>

        {/* 비교 위치 */}
        <span className="text-center text-sm font-medium truncate">
          {compareLocation.city} {compareLocation.district}
        </span>
      </div>

      <div className="max-h-[300px] overflow-x-hidden overflow-y-auto">
        {myWeather.forecasts.map((myForecast, index) => {
          const compareForeast = compareWeather.forecasts[index];

          const myIconType = getWeatherIconType(myForecast.sky, myForecast.rainType, getIsNight(myForecast.time));

          const compareIconType = getWeatherIconType(
            compareForeast?.sky,
            compareForeast?.rainType,
            getIsNight(compareForeast?.time),
          );

          return (
            <div key={`hour-${index}`} className="grid grid-cols-3 items-center">
              {/* 내 위치 날씨 */}
              <div className="flex items-center justify-center -ml-4">
                <WeatherIcon type={myIconType} />
                <div className="font-medium">{myForecast.temperature}°</div>
              </div>

              <div className="text-center text-gray500 text-sm">{myForecast.time}</div>

              {/* 비교 위치 날씨 */}
              <div className="flex items-center justify-center -mr-2">
                <WeatherIcon type={compareIconType} />
                <div className="font-medium">{compareForeast?.temperature}°</div>
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
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={`skeleton-hour-${index}`} className="grid grid-cols-3 items-center py-2">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
              <div className="w-8 h-6 bg-gray-200 rounded-md animate-pulse" />
            </div>

            <div className="mx-auto w-12 h-4 bg-gray-200 rounded-md animate-pulse" />

            <div className="flex items-center justify-center space-x-2">
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
              <div className="w-8 h-6 bg-gray-200 rounded-md animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
