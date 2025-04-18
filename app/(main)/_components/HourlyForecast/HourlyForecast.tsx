import { WeatherIcon } from '@/components/WeatherIcon';

import type { WeatherIconType, WeatherInfoIconType } from '@/constants/weather-icons';

type HourlyWeatherData = {
  time: string;
  iconType: WeatherIconType | WeatherInfoIconType;
  temperature: number;
};

const HourlyForecast = () => {
  // TODO: 백엔드에 맞춤
  const hourlyData: HourlyWeatherData[] = [
    { time: '지금', iconType: 'SUNNY', temperature: 21 },
    { time: '13:00', iconType: 'SUNNY', temperature: 23 },
    { time: '14:00', iconType: 'SUNNY', temperature: 24 },
    { time: '15:00', iconType: 'PARTLY_CLOUDY_DAY', temperature: 23 },
    { time: '16:00', iconType: 'CLOUDY', temperature: 22 },
    { time: '17:00', iconType: 'CLOUDY', temperature: 21 },
    { time: '18:00', iconType: 'RAINY', temperature: 20 },
    { time: '19:00', iconType: 'RAINY', temperature: 19 },
    { time: '20:00', iconType: 'RAINY', temperature: 18 },
    { time: '21:00', iconType: 'RAINY', temperature: 17 },
    { time: '22:00', iconType: 'RAINY', temperature: 16 },
    { time: '23:00', iconType: 'RAINY', temperature: 15 },
  ];

  return (
    <>
      <h2 className="text-lg font-bold mb-2">시간별 예보</h2>

      <div className="bg-white rounded-[16px] p-4 shadow-shadow1">
        <div className="flex overflow-x-auto pb-2 space-x-4">
          {hourlyData.map((hour, index) => (
            <div key={index} className="flex flex-col items-center min-w-[60px]">
              <span className="text-sm text-gray500">{hour.time}</span>
              <WeatherIcon type={hour.iconType} className="my-2" />
              <span className="text-lg font-bold">{hour.temperature}°</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HourlyForecast;
