import Image from 'next/image';

import { WEATHER_ICONS, WEATHER_INFO_ICONS, type WeatherIcon as WeatherIconType } from '@/constants/weather-icons';

interface WeatherIconProps {
  type: keyof typeof WEATHER_ICONS | keyof typeof WEATHER_INFO_ICONS;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * 날씨 아이콘 컴포넌트
 * @example
 * <WeatherIcon type="SUNNY" width={64} height={64} className="mr-2" />
 * <WeatherIcon type="HUMIDITY" width={20} height={20} />
 */
const WeatherIcon = ({ type, width, height, className }: WeatherIconProps) => {
  let icon: WeatherIconType | undefined;

  if (type in WEATHER_ICONS) {
    icon = WEATHER_ICONS[type as keyof typeof WEATHER_ICONS];
  } else if (type in WEATHER_INFO_ICONS) {
    icon = WEATHER_INFO_ICONS[type as keyof typeof WEATHER_INFO_ICONS];
  }

  if (!icon) {
    console.warn(`날씨 아이콘 '${type}'을(를) 찾을 수 없습니다.`);
    return null;
  }

  return (
    <Image
      src={icon.src}
      alt={icon.alt}
      width={width || icon.width}
      height={height || icon.height}
      className={className}
    />
  );
};

export default WeatherIcon;
