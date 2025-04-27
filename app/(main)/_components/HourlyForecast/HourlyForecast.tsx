'use client';

import { useHourlyWeather } from '@/app/(main)/_service/queries';
import Image from 'next/image';

import { WeatherIcon } from '@/components/WeatherIcon';

import { getIsNight } from '@/utils/time';
import { getWeatherIconType } from '@/utils/weather';

interface HourlyForecastProps {
  city: string;
  district: string;
}

const HourlyForecast = ({ city, district }: HourlyForecastProps) => {
  const { data, isFetching } = useHourlyWeather(city, district);

  if (!data || isFetching) return <Skeleton />;

  const hourlyData = data.forecasts;

  return (
    <>
      <h2 className="text-lg font-bold mb-2">시간별 예보</h2>

      <div className="bg-white rounded-[16px] p-4 shadow-shadow1">
        <ul className="flex overflow-x-auto space-x-4">
          {hourlyData.map((hour, index) => (
            <li key={index} className="flex flex-col items-center min-w-[60px]">
              <span className="text-sm text-gray500">{hour.time}</span>
              <WeatherIcon type={getWeatherIconType(hour.sky, hour.rainType, getIsNight(hour.time))} className="my-2" />
              <span className="text-lg font-bold">{hour.temperature}°</span>
              {hour.rainfall ? (
                <div className="flex items-center">
                  <Image src="/icons/weather/water.svg" alt="비" width={16} height={16} />
                  <span className="text-sm text-blue-300">{hour.rainfall}mm</span>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const Skeleton = () => {
  return (
    <>
      <div className="h-6 w-32 bg-gray-200 rounded-md mb-2 animate-pulse" />

      <div className="bg-white rounded-[16px] p-4 shadow-shadow1">
        <div className="flex overflow-x-auto space-x-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center min-w-[60px]">
              <div className="w-10 h-4 bg-gray-200 rounded-md animate-pulse" />
              <div className="w-10 h-10 rounded-full bg-gray-200 my-2 animate-pulse" />
              <div className="h-6 w-10 bg-gray-200 rounded-md mb-1 animate-pulse" />
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-200 rounded-full mr-1 animate-pulse" />
                <div className="w-10 h-4 bg-gray-200 rounded-md animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HourlyForecast;
