export type AirQualityEnum = '좋음' | '보통' | '나쁨' | '매우 나쁨';
export type SkyConditionEnum = '맑음' | '보통' | '구름많음' | '흐림';
export type PrecipitationTypeEnum = '없음' | '비' | '비/눈' | '눈' | '소나기';

/**
 * 오늘의 날씨
 */
export type TodayWeather = {
  location: string; // 요청한 지역
  currentWeather: CurrentWeather;
  forecast: Forecast;
};

type CurrentWeather = {
  temperature: string; // 기온 C
  perceivedTemperature: string; // 체감온도 C
  humidity: string; // 습도 %
  windSpeed: string; // 풍속 m/s
  rainfall: string; // 강수량 mm
  airQuality: AirQuality;
};

type AirQuality = {
  pm10: string; // 미세먼지 농도
  pm10Grade: AirQualityEnum; // 미세먼지 등급
  pm25: string; // 초미세먼지 농도
  pm25Grade: AirQualityEnum; // 초미세먼지 등급
};

type Forecast = {
  skyCondition: SkyConditionEnum; // 하늘 상태
  precipitationType: PrecipitationTypeEnum; // 강수 형태
};

/**
 * 오늘 날씨 (시간별)
 */
export type HourlyWeather = {
  location: string;
  forecasts: HourlyForecasts[];
};

type HourlyForecasts = {
  time: string; // 24시간제 ex) 17:00
  temperature: string; // 기온 C
  rainfall: string; // 강수 확률 %
  sky: SkyConditionEnum; // 하늘 상태
  rainType: PrecipitationTypeEnum; // 강수 형태
};

/**
 * 주간 예보
 */
export type WeeklyWeather = {
  location: string;
  forecasts: WeeklyForecasts[];
};

type WeeklyForecasts = {
  forecastData: string; // 예보 날짜 ex) YYYYMMDD
  minTemp: number; // 최저 기온 C
  maxTemp: number; // 최고 기온 C
};
