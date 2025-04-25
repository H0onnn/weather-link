'use client';

import { useTodayWeather } from '@/app/(main)/_service/queries';
import Image from 'next/image';
import { parseAsString, useQueryStates } from 'nuqs';
import { useMemo } from 'react';

import { WeatherIcon } from '@/components/WeatherIcon';
import { NonDataFallback } from '@/components/fallback/NonDataFallback';

import { getWeatherIconType } from '@/utils/weather';

interface TodayComparisonProps {
  myLocation: {
    city: string;
    district: string;
  };
}

const TodayComparison = ({ myLocation }: TodayComparisonProps) => {
  const [compareLocation] = useQueryStates({
    city: parseAsString,
    district: parseAsString,
  });

  const { data: myWeather, isFetching: isMyWeatherFetching } = useTodayWeather(myLocation.city, myLocation.district);
  const { data: compareWeather, isFetching: isCompareWeatherFetching } = useTodayWeather(
    compareLocation.city || '',
    compareLocation.district || '',
  );

  const weatherDetails = useMemo(
    () => [
      {
        id: 'humidity',
        label: '습도',
        icon: '/icons/weather/water.svg',
        values: [`${myWeather?.currentWeather.humidity}%`, `${compareWeather?.currentWeather.humidity}%`],
      },
      {
        id: 'wind',
        label: '바람',
        icon: '/icons/weather/windy.svg',
        values: [`${myWeather?.currentWeather.windSpeed}m/s`, `${compareWeather?.currentWeather.windSpeed}m/s`],
      },
      {
        id: 'fineDust',
        label: '미세먼지',
        icon: '/icons/weather/eye.svg',
        values: [myWeather?.currentWeather.airQuality.pm10Grade, compareWeather?.currentWeather.airQuality.pm10Grade],
      },
      {
        id: 'temperature',
        label: '체감온도',
        icon: '/icons/weather/template.svg',
        values: [
          `${myWeather?.currentWeather.perceivedTemperature}°`,
          `${compareWeather?.currentWeather.perceivedTemperature}°`,
        ],
      },
    ],
    [myWeather, compareWeather],
  );

  if (isMyWeatherFetching || isCompareWeatherFetching) return <Skeleton />;

  if (!compareLocation.district) return <NonDataFallback description="비교할 위치를 선택해주세요" />;

  if (!myWeather || !compareWeather) return null;

  const myLocationCurrentWeather = myWeather.currentWeather;
  const compareLocationCurrentWeather = compareWeather.currentWeather;
  const myLocationForecast = myWeather.forecast;
  const compareLocationForecast = compareWeather.forecast;

  const gridItems = weatherDetails.flatMap((detail) => [
    {
      key: `${detail.id}-left`,
      content: (
        <div className="h-12 rounded-[16px] bg-[#F9FAFB] flex items-center justify-center">
          <span className="font-medium">{detail.values[0]}</span>
        </div>
      ),
    },
    {
      key: `${detail.id}-label`,
      content: (
        <div className="flex items-center justify-center space-x-2 h-12">
          <Image src={detail.icon} alt={detail.label} width={24} height={24} />
          <span className="text-sm">{detail.label}</span>
        </div>
      ),
    },
    {
      key: `${detail.id}-right`,
      content: (
        <div className="h-12 rounded-[16px] bg-[#F9FAFB] flex items-center justify-center">
          <span className="font-medium">{detail.values[1]}</span>
        </div>
      ),
    },
  ]);

  return (
    <div className="mt-6 bg-white rounded-[16px] p-4 shadow-shadow1">
      <div className="-mt-4 grid grid-cols-3 items-center">
        {/* 내 위치 날씨 */}
        <div className="flex flex-col items-center justify-center">
          <WeatherIcon
            type={getWeatherIconType(myLocationForecast.skyCondition, myLocationForecast.precipitationType)}
            width={64}
            height={64}
          />
          <span className="-mt-4 text-3xl font-bold">{myLocationCurrentWeather.temperature}°</span>
          <span className="text-sm text-gray500">{myLocationForecast.skyCondition}</span>
          <span className="text-xs mt-10">
            {myLocation.city} {myLocation.district}
          </span>
        </div>

        <div className="flex justify-center mt-4">
          <div className="bg-gray-200 w-px h-16" />
        </div>

        {/* 비교 위치 날씨 */}
        <div className="flex flex-col items-center justify-center">
          <WeatherIcon
            type={getWeatherIconType(compareLocationForecast.skyCondition, compareLocationForecast.precipitationType)}
            width={64}
            height={64}
          />
          <span className="-mt-4 text-3xl font-bold">{compareLocationCurrentWeather.temperature}°</span>
          <span className="text-sm text-gray500">{compareLocationForecast.skyCondition}</span>
          <span className="text-xs mt-10">
            {compareLocation.city} {compareLocation.district}
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-y-4">
        {gridItems.map((item) => (
          <div key={item.key}>{item.content}</div>
        ))}
      </div>
    </div>
  );
};

const Skeleton = () => {
  return (
    <div className="mt-6 bg-white rounded-[16px] p-4 shadow-shadow1">
      <div className="grid grid-cols-3 items-center">
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse" />
          <div className="mt-2 w-12 h-8 bg-gray-200 rounded-md animate-pulse" />
          <div className="mt-1 w-20 h-4 bg-gray-200 rounded-md animate-pulse" />
          <div className="mt-10 w-24 h-3 bg-gray-200 rounded-md animate-pulse" />
        </div>

        <div className="flex justify-center mt-4">
          <div className="bg-gray-200 w-px h-16" />
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse" />
          <div className="mt-2 w-12 h-8 bg-gray-200 rounded-md animate-pulse" />
          <div className="mt-1 w-20 h-4 bg-gray-200 rounded-md animate-pulse" />
          <div className="mt-10 w-24 h-3 bg-gray-200 rounded-md animate-pulse" />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-y-4">
        {Array(12)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="flex items-center justify-center">
              {index % 3 === 1 ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse" />
                  <div className="w-10 h-4 bg-gray-200 rounded-md animate-pulse" />
                </div>
              ) : (
                <div className="h-12 w-full max-w-[90%] rounded-[16px] bg-gray-200 animate-pulse" />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default TodayComparison;
