import type { PrecipitationTypeEnum, SkyConditionEnum } from '@/app/(main)/_model/types';

import type { WeatherIconType } from '@/constants/weather-icons';

/**
 * 날씨 상태와 WeatherIcon 타입 매핑 헬퍼 함수
 * @param skyCondition 하늘 상태 (맑음, 보통, 구름많음, 흐림)
 * @param rainType 강수 형태 (없음, 비, 비/눈, 눈, 소나기)
 * @param isNight 현재 시간이 밤인지 여부
 * @returns 날씨 아이콘 타입
 */
export const getWeatherIconType = (skyCondition?: string, rainType?: string, isNight = false): WeatherIconType => {
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
    if (rainType === '소나기') {
      return 'RAINY';
    }
  }

  // 하늘 상태별 아이콘
  if (skyCondition === '맑음') {
    return isNight ? 'NIGHT' : 'SUNNY';
  }
  if (skyCondition === '보통') {
    return isNight ? 'PARTLY_CLOUDY_NIGHT' : 'PARTLY_CLOUDY_DAY';
  }
  if (skyCondition === '구름많음' || skyCondition === '흐림') {
    return 'CLOUDY';
  }

  return isNight ? 'NIGHT' : 'SUNNY';
};

export const separateWeatherInfo = (skyAndPre: PrecipitationTypeEnum | SkyConditionEnum | null) => {
  if (!skyAndPre) return null;

  const precipitationTypes = ['없음', '비', '비/눈', '눈', '소나기'] as PrecipitationTypeEnum[];

  const isPrecipitation = precipitationTypes.some((type) => skyAndPre?.includes(type));

  if (isPrecipitation) {
    return {
      skyCondition: '흐림', // 강수가 있으면 일반적으로 하늘은 흐리다고 판단
      rainType: skyAndPre,
    };
  }

  return {
    skyCondition: skyAndPre,
    rainType: '없음',
  };
};
