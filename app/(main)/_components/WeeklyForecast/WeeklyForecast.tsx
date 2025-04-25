'use client';

import { useWeeklyForecast } from '@/app/(main)/_service/queries';
import Image from 'next/image';
import { Fragment } from 'react';

import { WeatherIcon } from '@/components/WeatherIcon';

import { getWeatherIconType, separateWeatherInfo } from '@/utils/weather';

import { cn } from '@/lib/utils';

interface WeeklyForecastProps {
  city: string;
  district: string;
}

const WeeklyForecast = ({ city, district }: WeeklyForecastProps) => {
  const { data: weeklyData, isLoading } = useWeeklyForecast(city, district);

  if (!weeklyData || isLoading) return <Skeleton />;

  return (
    <>
      <h3 className="text-lg font-bold mb-2">주간 예보</h3>

      <div className="bg-white rounded-[16px] p-4 shadow-shadow1">
        <div className="grid grid-cols-4 gap-2 max-h-[300px] overflow-y-auto">
          <span className="col-span-1 text-center font-semibold">날짜</span>
          <span className="col-span-1 text-center font-semibold">오전</span>
          <span className="col-span-1 text-center font-semibold">오후</span>
          <span className="col-span-1 text-center font-semibold">최저/최고</span>

          {weeklyData.forecasts.map((day, index) => {
            const isToday = index === 0;
            const morningWeather = separateWeatherInfo(day.morning.skyAndPre);
            const afternoonWeather = separateWeatherInfo(day.afternoon.skyAndPre);

            return (
              <Fragment key={day.forecastDate}>
                {/* 날짜 열 */}
                <div className={cn('col-span-1', isToday && 'bg-primary/30 rounded-[16px]')}>
                  <div className="flex items-center justify-center space-x-1 h-full">
                    <span className="font-medium">{isToday ? '오늘' : day.dayOfWeek}</span>
                    <span className="text-gray500">{day.formattedDate}</span>
                  </div>
                </div>

                {/* 오전/오후 열 */}
                <div className="col-span-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <Image src="/icons/weather/water.svg" alt="비" width={16} height={16} />
                        <span className="text-primary text-xs">{day.morning.rnst}%</span>
                      </div>
                      <WeatherIcon type={getWeatherIconType(morningWeather.skyCondition, morningWeather.rainType)} />
                    </div>

                    <div className="flex items-center">
                      <div className="flex items-center">
                        <Image src="/icons/weather/water.svg" alt="비" width={16} height={16} />
                        <span className="text-primary text-xs">{day.afternoon.rnst}%</span>
                      </div>
                      <WeatherIcon
                        type={getWeatherIconType(afternoonWeather.skyCondition, afternoonWeather.rainType, true)}
                      />
                    </div>
                  </div>
                </div>

                {/* 최저/최고 열 */}
                <div className="col-span-1 flex items-center justify-center">
                  <span className="text-primary">{day.minTemp}°</span>
                  <span className="text-gray500 mx-1">/</span>
                  <span className="text-red">{day.maxTemp}°</span>
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

const Skeleton = () => {
  return (
    <>
      <div className="h-6 w-32 bg-gray-200 rounded-md mb-2 animate-pulse" />
      <div className="bg-white rounded-[16px] p-4 shadow-shadow1">
        <div className="grid grid-cols-4 gap-2">
          <div className="col-span-1 h-6 bg-gray-200 rounded-md animate-pulse mx-auto w-16" />
          <div className="col-span-1 h-6 bg-gray-200 rounded-md animate-pulse mx-auto w-16" />
          <div className="col-span-1 h-6 bg-gray-200 rounded-md animate-pulse mx-auto w-16" />
          <div className="col-span-1 h-6 bg-gray-200 rounded-md animate-pulse mx-auto w-20" />

          {Array.from({ length: 5 }).map((_, index) => (
            <Fragment key={index}>
              <div className={cn('col-span-1 p-2 rounded-[16px]', index === 0 && 'bg-primary/10')}>
                <div className="flex items-center justify-center space-x-1">
                  <div className="h-5 w-12 bg-gray-200 rounded-md animate-pulse" />
                  <div className="h-4 w-16 bg-gray-200 rounded-md animate-pulse" />
                </div>
              </div>

              <div className="col-span-1">
                <div className="flex items-center justify-center">
                  <div className="flex items-center mr-1">
                    <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse mr-1" />
                    <div className="h-4 w-8 bg-gray-200 rounded-md animate-pulse" />
                  </div>
                  <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                </div>
              </div>

              <div className="col-span-1">
                <div className="flex items-center justify-center">
                  <div className="flex items-center mr-1">
                    <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse mr-1" />
                    <div className="h-4 w-8 bg-gray-200 rounded-md animate-pulse" />
                  </div>
                  <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                </div>
              </div>

              <div className="col-span-1 flex items-center justify-center">
                <div className="h-5 w-8 bg-gray-200 rounded-md animate-pulse" />
                <div className="h-4 w-4 bg-gray-200 rounded-md animate-pulse mx-1" />
                <div className="h-5 w-8 bg-gray-200 rounded-md animate-pulse" />
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default WeeklyForecast;
