import type { HourlyWeather, TodayWeather, WeeklyWeather } from '@/app/(main)/_model/types';

/**
 * 오늘의 날씨 더미 데이터
 */
export const todayWeatherMock: TodayWeather = {
  location: '서울특별시 강남구',
  currentWeather: {
    temperature: '18',
    perceivedTemperature: '16',
    humidity: '60',
    windSpeed: '3.5',
    rainfall: '0',
    airQuality: {
      pm10: '45',
      pm10Grade: '보통',
      pm25: '28',
      pm25Grade: '보통',
    },
  },
  forecast: {
    skyCondition: '맑음',
    precipitationType: '없음',
  },
};

/**
 * 시간별 날씨 더미 데이터
 */
export const hourlyWeatherMock: HourlyWeather = {
  location: '서울특별시 강남구',
  forecasts: [
    {
      time: '12:00',
      temperature: '18',
      rainfall: '0',
      sky: '맑음',
      rainType: '없음',
    },
    {
      time: '13:00',
      temperature: '19',
      rainfall: '0',
      sky: '맑음',
      rainType: '없음',
    },
    {
      time: '14:00',
      temperature: '20',
      rainfall: '0',
      sky: '구름 조금',
      rainType: '없음',
    },
    {
      time: '15:00',
      temperature: '20',
      rainfall: '10',
      sky: '구름 많음',
      rainType: '없음',
    },
    {
      time: '16:00',
      temperature: '19',
      rainfall: '20',
      sky: '구름 많음',
      rainType: '없음',
    },
    {
      time: '17:00',
      temperature: '18',
      rainfall: '40',
      sky: '흐림',
      rainType: '비',
    },
    {
      time: '18:00',
      temperature: '17',
      rainfall: '60',
      sky: '흐림',
      rainType: '비',
    },
    {
      time: '19:00',
      temperature: '16',
      rainfall: '30',
      sky: '흐림',
      rainType: '비',
    },
    {
      time: '20:00',
      temperature: '15',
      rainfall: '10',
      sky: '구름 많음',
      rainType: '없음',
    },
    {
      time: '21:00',
      temperature: '14',
      rainfall: '5',
      sky: '구름 조금',
      rainType: '없음',
    },
    {
      time: '22:00',
      temperature: '13',
      rainfall: '0',
      sky: '맑음',
      rainType: '없음',
    },
    {
      time: '23:00',
      temperature: '12',
      rainfall: '0',
      sky: '맑음',
      rainType: '없음',
    },
  ],
};

/**
 * 주간 날씨 더미 데이터
 */
export const weeklyWeatherMock: WeeklyWeather = {
  location: '서울특별시 강남구',
  forecasts: [
    {
      forecastData: '20231110',
      minTemp: 10,
      maxTemp: 20,
    },
    {
      forecastData: '20231111',
      minTemp: 8,
      maxTemp: 18,
    },
    {
      forecastData: '20231112',
      minTemp: 7,
      maxTemp: 16,
    },
    {
      forecastData: '20231113',
      minTemp: 6,
      maxTemp: 15,
    },
    {
      forecastData: '20231114',
      minTemp: 5,
      maxTemp: 14,
    },
    {
      forecastData: '20231115',
      minTemp: 4,
      maxTemp: 13,
    },
    {
      forecastData: '20231116',
      minTemp: 3,
      maxTemp: 12,
    },
  ],
};
