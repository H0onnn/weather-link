import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export const getIsNight = (timeString: string) => {
  const hour = parseInt(timeString.split(':')[0]);
  return hour >= 18 || hour < 6;
};

export const getMonthDayWeekday = (dateString: string) => {
  const date = dayjs(dateString);
  const month = date.month() + 1;
  const day = date.date();
  const weekday = date.format('ddd');

  return { month, day, weekday };
};
