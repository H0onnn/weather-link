import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export const getIsNight = (timeString?: string) => {
  if (timeString) {
    const hour = parseInt(timeString.split(':')[0]);
    return hour >= 20 || hour < 6;
  }

  const now = dayjs();
  const hour = now.hour();
  return hour >= 20 || hour < 6;
};

export const getMonthDayWeekday = (dateString: string) => {
  const date = dayjs(dateString);
  const month = date.month() + 1;
  const day = date.date();
  const weekday = date.format('ddd');

  return { month, day, weekday };
};
