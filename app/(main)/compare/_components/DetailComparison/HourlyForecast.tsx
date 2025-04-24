import { hourlyWeatherMock } from '@/app/(main)/compare/mock';

import { WeatherIcon } from '@/components/WeatherIcon';

import { getIsNight } from '@/utils/time';
import { getWeatherIconType } from '@/utils/weather';

interface HourlyForecastProps {
  myLocationData?: typeof hourlyWeatherMock;
  compareLocationData?: typeof hourlyWeatherMock;
}

const HourlyForecast = ({
  myLocationData = hourlyWeatherMock,
  compareLocationData = {
    location: '부산광역시 무슨구',
    forecasts: hourlyWeatherMock.forecasts.map((forecast) => ({
      ...forecast,
      temperature: (parseInt(forecast.temperature) - 2).toString(),
      sky: forecast.sky === '맑음' ? '구름 조금' : forecast.sky,
    })),
  },
}: HourlyForecastProps) => {
  return (
    <div className="bg-white rounded-[16px] p-4 shadow-shadow1">
      <div className="grid grid-cols-3 gap-4 mb-2">
        {/* 내 위치 */}
        <span className="text-center text-sm font-medium truncate">{myLocationData.location}</span>

        <span className="text-center text-sm text-gray500">시간</span>

        {/* 비교 위치 */}
        <span className="text-center text-sm font-medium truncate">{compareLocationData.location}</span>
      </div>

      <div className="max-h-[300px] overflow-x-hidden overflow-y-auto">
        {myLocationData.forecasts.map((myForecast, index) => {
          const compareForeast = compareLocationData.forecasts[index];
          const myIconType = getWeatherIconType(myForecast.sky, myForecast.rainType, getIsNight(myForecast.time));

          const compareIconType = getWeatherIconType(
            compareForeast.sky,
            compareForeast.rainType,
            getIsNight(compareForeast.time),
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
                <div className="font-medium">{compareForeast.temperature}°</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;
