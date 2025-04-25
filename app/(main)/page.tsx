import { getUserData } from '@/app/(auth)/profile/_service/apis';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { getQueryClient } from '@/lib/query';

import { HourlyForecast } from './_components/HourlyForecast';
import { OpenTalk } from './_components/OpenTalk';
import { TodayWeather } from './_components/TodayWeather';
import { WeeklyForecast } from './_components/WeeklyForecast';
import { getHourlyWeather, getTodayWeather } from './_service/apis';
import { weatherKeys } from './_service/queries';

export default async function Home() {
  const queryClient = getQueryClient();
  const { data: user } = await getUserData();

  if (!user) return null;

  const city = user.location.sido;
  const district = user.location.gugun;

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: weatherKeys.today(city, district),
      queryFn: () => getTodayWeather(city, district),
    }),
    queryClient.prefetchQuery({
      queryKey: weatherKeys.hourly(city, district),
      queryFn: () => getHourlyWeather(city, district),
    }),
  ]);

  return (
    <div className="flex-1 overflow-auto p-5 space-y-8 mb-2">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TodayWeather city={city} district={district} />
        <HourlyForecast city={city} district={district} />
      </HydrationBoundary>

      <WeeklyForecast city={city} district={district} />
      <OpenTalk />
    </div>
  );
}
