'use client';

import { useTodayWeather } from '@/app/(main)/_service/queries';

import { WeatherIcon } from '@/components/WeatherIcon';

import { getIsNight } from '@/utils/time';
import { getWeatherBGImage, getWeatherIconType } from '@/utils/weather';

import { WEATHER_BG_IMAGES } from '@/constants/weather-icons';

interface TodayWeatherProps {
  city: string;
  district: string;
}

const TodayWeather = ({ city, district }: TodayWeatherProps) => {
  const { data: todayWeather, isFetching } = useTodayWeather(city, district);

  if (!todayWeather || isFetching) return <Skeleton />;

  const currentWeather = todayWeather.currentWeather;
  const forecast = todayWeather.forecast;

  return (
    <div
      className="bg-white rounded-[16px] p-6 shadow-shadow1 bg-cover bg-center"
      style={{
        backgroundImage: `url(${WEATHER_BG_IMAGES[getWeatherBGImage(forecast.skyCondition, forecast.precipitationType)]})`,
      }}
    >
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-center justify-center mb-2">
          <WeatherIcon
            type={getWeatherIconType(forecast.skyCondition, forecast.precipitationType, getIsNight())}
            width={80}
            height={80}
            className="mr-2"
          />
          <span className="text-5xl font-bold">{currentWeather.temperature}°C</span>
        </div>
        <p className="text-gray800">
          {forecast.precipitationType === '없음' ? forecast.skyCondition : forecast.precipitationType}, 체감온도{' '}
          {currentWeather.perceivedTemperature}°C
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center p-2 bg-gray-50 rounded-[16px]">
          <WeatherIcon type="HUMIDITY" width={20} height={20} className="mb-1" />
          <span className="text-sm font-medium">습도</span>
          <span className="text-lg font-bold">{currentWeather.humidity}%</span>
        </div>
        <div className="flex flex-col items-center p-2 bg-gray-50 rounded-[16px]">
          <WeatherIcon type="WIND" width={20} height={20} className="mb-1" />
          <span className="text-sm font-medium">바람</span>
          <span className="text-lg font-bold">{currentWeather.windSpeed}m/s</span>
        </div>
        <div className="flex flex-col items-center p-2 bg-gray-50 rounded-[16px]">
          <WeatherIcon type="FINE_DUST" width={20} height={20} className="mb-1" />
          <span className="text-sm font-medium">미세먼지</span>
          <span className="text-lg font-bold">{currentWeather.airQuality.pm10Grade}</span>
        </div>
      </div>
    </div>
  );
};

const Skeleton = () => {
  return (
    <div className="bg-white rounded-[16px] p-6 shadow-shadow1">
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-center justify-center mb-2">
          <div className="w-[80px] h-[80px] rounded-full bg-gray-200 mr-2 animate-pulse" />
          <div className="h-12 w-24 bg-gray-200 rounded-md animate-pulse" />
        </div>
        <div className="h-4 w-48 bg-gray-200 rounded-md mt-2 animate-pulse" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center p-2 bg-gray-50 rounded-[16px]">
            <div className="w-5 h-5 bg-gray-200 rounded-full mb-1 animate-pulse" />
            <div className="w-12 h-3 bg-gray-200 rounded-md mb-1 animate-pulse" />
            <div className="w-8 h-5 bg-gray-200 rounded-md animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayWeather;
