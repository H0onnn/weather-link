import { todayWeatherMock } from '@/app/compare/mock';
import Image from 'next/image';

import { WeatherIcon } from '@/components/WeatherIcon';

import { getWeatherIconType } from '@/utils/weather';

// 날씨 데이터 비교를 위한 배열
const locations = [todayWeatherMock.location, todayWeatherMock.location];

// 날씨 세부 정보 비교 항목
const weatherDetails = [
  {
    id: 'humidity',
    label: '습도',
    icon: '/icons/weather/water.svg',
    values: [`${todayWeatherMock.currentWeather.humidity}%`, `${todayWeatherMock.currentWeather.humidity}%`],
  },
  {
    id: 'wind',
    label: '바람',
    icon: '/icons/weather/windy.svg',
    values: [`${todayWeatherMock.currentWeather.windSpeed}m/s`, `${todayWeatherMock.currentWeather.windSpeed}m/s`],
  },
  {
    id: 'fineDust',
    label: '미세먼지',
    icon: '/icons/weather/eye.svg',
    values: [
      todayWeatherMock.currentWeather.airQuality.pm10Grade,
      todayWeatherMock.currentWeather.airQuality.pm25Grade,
    ],
  },
  {
    id: 'temperature',
    label: '체감온도',
    icon: '/icons/weather/template.svg',
    values: [`${todayWeatherMock.currentWeather.temperature}°`, `${todayWeatherMock.currentWeather.temperature}°`],
  },
];

const TodayComparison = () => {
  const hourIconType = getWeatherIconType(
    todayWeatherMock.forecast.skyCondition,
    todayWeatherMock.forecast.precipitationType,
  );

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
          <WeatherIcon type={hourIconType} width={64} height={64} />
          <span className="-mt-4 text-3xl font-bold">{todayWeatherMock.currentWeather.temperature}°</span>
          <span className="text-sm text-gray500">{todayWeatherMock.forecast.skyCondition}</span>
          <span className="text-xs mt-10">{locations[0]}</span>
        </div>

        <div className="flex justify-center mt-4">
          <div className="bg-gray-200 w-px h-16" />
        </div>

        {/* 비교 위치 날씨 */}
        <div className="flex flex-col items-center justify-center">
          <WeatherIcon type={hourIconType} width={64} height={64} />
          <span className="-mt-4 text-3xl font-bold">{todayWeatherMock.currentWeather.temperature}°</span>
          <span className="text-sm text-gray500">{todayWeatherMock.forecast.skyCondition}</span>
          <span className="text-xs mt-10">{locations[1]}</span>
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

export default TodayComparison;
