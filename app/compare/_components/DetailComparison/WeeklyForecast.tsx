import { weeklyWeatherMock } from '@/app/compare/mock';

import { WeatherIcon } from '@/components/WeatherIcon';

import { getMonthDayWeekday } from '@/utils/time';

interface WeeklyForecastProps {
  myLocationData?: typeof weeklyWeatherMock;
  compareLocationData?: typeof weeklyWeatherMock;
}

const WeeklyForecast = ({
  myLocationData = weeklyWeatherMock,
  compareLocationData = {
    location: '부산광역시 무슨구',
    forecasts: weeklyWeatherMock.forecasts.map((forecast) => ({
      ...forecast,
      minTemp: forecast.minTemp - 1,
      maxTemp: forecast.maxTemp - 2,
    })),
  },
}: WeeklyForecastProps) => {
  return (
    <div className="bg-white rounded-[16px] p-4 shadow-shadow1">
      <div className="grid grid-cols-3 gap-4 mb-2">
        {/* 내 위치 */}
        <span className="text-center text-sm font-medium truncate">{myLocationData.location}</span>

        <span className="text-center text-sm text-gray500">날짜</span>

        {/* 비교 위치 */}
        <span className="text-center text-sm font-medium truncate">{compareLocationData.location}</span>
      </div>

      <div className="max-h-[300px] overflow-x-hidden overflow-y-auto">
        {myLocationData.forecasts.map((myForecast, index) => {
          const compareForecast = compareLocationData.forecasts[index];
          const { month, day, weekday } = getMonthDayWeekday(myForecast.forecastData);

          // TODO: 백엔드에 주간 기온 예보 데이터에 날씨 정보 추가 해달라고 요청
          // const myIconType = getWeatherIconType(myForecast, myForecast.rainType);
          // const compareIconType = getWeatherIconType(compareForecast.sky, compareForecast.rainType);

          return (
            <div key={`day-${index}`} className="grid grid-cols-3 items-center">
              {/* 내 위치 날씨 */}
              <div className="flex items-center justify-center -ml-4">
                <WeatherIcon type="PARTLY_CLOUDY_DAY" />
                <div className="text-sm">
                  <span className="text-red font-medium">{myForecast.maxTemp}°</span>
                  <span className="mx-1 text-gray500">|</span>
                  <span className="text-primary font-medium">{myForecast.minTemp}°</span>
                </div>
              </div>

              <div className="text-center text-gray500 text-sm">{`${month}/${day} (${weekday})`}</div>

              {/* 비교 위치 날씨 */}
              <div className="flex items-center justify-center">
                <WeatherIcon type="PARTLY_CLOUDY_DAY" />
                <div className="text-sm">
                  <span className="text-red font-medium">{compareForecast.maxTemp}°</span>
                  <span className="mx-1 text-gray500">|</span>
                  <span className="text-primary font-medium">{compareForecast.minTemp}°</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyForecast;
