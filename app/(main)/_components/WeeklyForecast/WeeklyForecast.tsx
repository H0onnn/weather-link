import { WeatherIcon } from '@/components/WeatherIcon';

import type { WeatherIconType, WeatherInfoIconType } from '@/constants/weather-icons';

type DailyWeatherData = {
  day: string;
  iconType: WeatherIconType | WeatherInfoIconType;
  maxTemp: number;
  minTemp: number;
};

const WeeklyForecast = () => {
  // TODO: 백엔드에 맞춤
  const dailyData: DailyWeatherData[] = [
    { day: '오늘', iconType: 'PARTLY_CLOUDY_DAY', maxTemp: 21, minTemp: 15 },
    { day: '내일', iconType: 'SUNNY', maxTemp: 23, minTemp: 16 },
    { day: '수', iconType: 'SUNNY', maxTemp: 25, minTemp: 17 },
    { day: '목', iconType: 'CLOUDY', maxTemp: 22, minTemp: 16 },
    { day: '금', iconType: 'RAINY', maxTemp: 19, minTemp: 14 },
    { day: '토', iconType: 'RAINY', maxTemp: 18, minTemp: 13 },
    { day: '일', iconType: 'PARTLY_CLOUDY_DAY', maxTemp: 20, minTemp: 14 },
  ];

  return (
    <>
      <h3 className="text-lg font-bold mb-2">주간 예보</h3>

      <div className="bg-white rounded-[16px] p-4 shadow-shadow1">
        <div className="space-y-4">
          {dailyData.map((day, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-base font-medium w-10">{day.day}</span>
                <WeatherIcon type={day.iconType} />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-base font-bold">{day.maxTemp}°</span>
                <span className="text-gray500">/</span>
                <span className="text-base text-gray500">{day.minTemp}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WeeklyForecast;
