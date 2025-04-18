import { WeatherIcon } from '@/components/WeatherIcon';

const TodayWeather = () => {
  return (
    <div className="bg-white rounded-[16px] p-6 shadow-sm">
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-center justify-center mb-2">
          <WeatherIcon type="SUNNY" width={80} height={80} className="mr-2" />
          <span className="text-5xl font-bold">21°C</span>
        </div>
        <p className="text-gray500">맑음, 체감온도 19°C</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center p-2 bg-gray-50 rounded-[16px]">
          <WeatherIcon type="HUMIDITY" width={20} height={20} className="mb-1" />
          <span className="text-sm font-medium">습도</span>
          <span className="text-lg font-bold">65%</span>
        </div>
        <div className="flex flex-col items-center p-2 bg-gray-50 rounded-[16px]">
          <WeatherIcon type="WIND" width={20} height={20} className="mb-1" />
          <span className="text-sm font-medium">바람</span>
          <span className="text-lg font-bold">3m/s</span>
        </div>
        <div className="flex flex-col items-center p-2 bg-gray-50 rounded-[16px]">
          <WeatherIcon type="FINE_DUST" width={20} height={20} className="mb-1" />
          <span className="text-sm font-medium">미세먼지</span>
          <span className="text-lg font-bold">보통</span>
        </div>
      </div>
    </div>
  );
};

export default TodayWeather;
