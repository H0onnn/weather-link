import { HourlyForecast } from './_components/HourlyForecast';
import { OpenTalk } from './_components/OpenTalk';
import { TodayWeather } from './_components/TodayWeather';
import { WeeklyForecast } from './_components/WeeklyForecast';

export default function Home() {
  return (
    <div className="flex-1 overflow-auto p-4 space-y-8 mb-2">
      <TodayWeather />
      <HourlyForecast />
      <WeeklyForecast />
      <OpenTalk />
    </div>
  );
}
