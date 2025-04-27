export interface WeatherIcon {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const DEFAULT_ICON_SIZE = {
  width: 40,
  height: 40,
};

/**
 * 날씨 상태 아이콘
 */
export const WEATHER_ICONS = {
  SUNNY: {
    src: '/icons/weather/day.svg',
    alt: '맑음',
    ...DEFAULT_ICON_SIZE,
  },
  CLOUDY: {
    src: '/icons/weather/cloudy.svg',
    alt: '구름많음',
    ...DEFAULT_ICON_SIZE,
  },
  PARTLY_CLOUDY_DAY: {
    src: '/icons/weather/cloudy-day-1.svg',
    alt: '구름조금(낮)',
    ...DEFAULT_ICON_SIZE,
  },
  PARTLY_CLOUDY_NIGHT: {
    src: '/icons/weather/cloudy-night-1.svg',
    alt: '구름조금(밤)',
    ...DEFAULT_ICON_SIZE,
  },
  RAINY: {
    src: '/icons/weather/rainy-1.svg',
    alt: '비',
    ...DEFAULT_ICON_SIZE,
  },
  HEAVY_RAIN: {
    src: '/icons/weather/rainy-6.svg',
    alt: '폭우',
    ...DEFAULT_ICON_SIZE,
  },
  SNOWY: {
    src: '/icons/weather/snowy-1.svg',
    alt: '눈',
    ...DEFAULT_ICON_SIZE,
  },
  HEAVY_SNOW: {
    src: '/icons/weather/snowy-6.svg',
    alt: '폭설',
    ...DEFAULT_ICON_SIZE,
  },
  NIGHT: {
    src: '/icons/weather/night.svg',
    alt: '맑은 밤',
    ...DEFAULT_ICON_SIZE,
  },
  THUNDER: {
    src: '/icons/weather/thunder.svg',
    alt: '천둥번개',
    ...DEFAULT_ICON_SIZE,
  },
  WINDY: {
    src: '/icons/weather/windy.svg',
    alt: '바람',
    ...DEFAULT_ICON_SIZE,
  },
} as const;

/**
 * 날씨 정보 관련 아이콘
 */
export const WEATHER_INFO_ICONS = {
  HUMIDITY: {
    src: '/icons/weather/water.svg',
    alt: '습도',
    ...DEFAULT_ICON_SIZE,
  },
  WIND: {
    src: '/icons/weather/windy.svg',
    alt: '바람',
    ...DEFAULT_ICON_SIZE,
  },
  FINE_DUST: {
    src: '/icons/weather/eye.svg',
    alt: '미세먼지',
    ...DEFAULT_ICON_SIZE,
  },
} as const;

/**
 * 날씨 배경 이미지
 */
export const WEATHER_BG_IMAGES = {
  SUNNY: '/images/weather/sunny_sky.webp',
  CLOUDY: '/images/weather/cloudy_sky.webp',
  RAINY: '/images/weather/rainy_sky.webp',
  SNOWY: '/images/weather/snow_sky.webp',
  PARTLY_CLOUDY: '/images/weather/partial_cloudy_sky.webp',
};

export type WeatherIconType = keyof typeof WEATHER_ICONS;
export type WeatherInfoIconType = keyof typeof WEATHER_INFO_ICONS;
export type WeatherBGImageType = keyof typeof WEATHER_BG_IMAGES;
