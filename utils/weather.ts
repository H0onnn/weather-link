import type { WeatherIconType } from '@/constants/weather-icons';

/**
 * 날씨 상태와 WeatherIcon 타입 매핑 헬퍼 함수
 */
export const getWeatherIconType = (skyCondition: string, rainType: string, isNight = false): WeatherIconType => {
  // 강수 타입별 아이콘
  if (rainType && rainType !== '없음') {
    if (rainType.includes('비')) {
      return rainType.includes('많은') ? 'HEAVY_RAIN' : 'RAINY';
    }
    if (rainType.includes('눈')) {
      return rainType.includes('많은') ? 'HEAVY_SNOW' : 'SNOWY';
    }
    if (rainType.includes('번개') || rainType.includes('천둥')) {
      return 'THUNDER';
    }
  }

  // 하늘 상태별 아이콘
  if (skyCondition.includes('맑음')) {
    return isNight ? 'NIGHT' : 'SUNNY';
  }
  if (skyCondition.includes('구름 조금') || skyCondition.includes('구름조금')) {
    return isNight ? 'PARTLY_CLOUDY_NIGHT' : 'PARTLY_CLOUDY_DAY';
  }
  if (skyCondition.includes('구름 많음') || skyCondition.includes('구름많음')) {
    return 'CLOUDY';
  }
  if (skyCondition.includes('흐림')) {
    return 'CLOUDY';
  }

  return isNight ? 'NIGHT' : 'SUNNY';
};
