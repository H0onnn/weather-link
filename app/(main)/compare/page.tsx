import { getUserData } from '@/app/(auth)/profile/_service/apis';
import { userKeys } from '@/app/(auth)/profile/_service/queries';
import { getHourlyWeather, getTodayWeather, getWeeklyTemperature, getWeeklyWeather } from '@/app/(main)/_service/apis';
import { weatherKeys } from '@/app/(main)/_service/queries';
import { getSido } from '@/services/locations/apis';
import { locationKeys } from '@/services/locations/queries';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { getQueryClient } from '@/lib/query';

import { DetailComparison } from './_components/DetailComparison';
import { SelectCompareLocation } from './_components/SelectCompareLocation';
import { TodayComparison } from './_components/TodayComparison';

export default async function ComparePage() {
  const queryClient = getQueryClient();
  const { data: user } = await getUserData();

  const city = user.location.sido;
  const district = user.location.gugun;

  await Promise.all([
    queryClient.prefetchQuery({ queryKey: locationKeys.list('sido'), queryFn: getSido, staleTime: Infinity }),
    queryClient.prefetchQuery({ queryKey: userKeys.my(), queryFn: getUserData, staleTime: Infinity }),
    queryClient.prefetchQuery({
      queryKey: weatherKeys.today(city, district),
      queryFn: () => getTodayWeather(city, district),
    }),
    queryClient.prefetchQuery({
      queryKey: weatherKeys.hourly(city, district),
      queryFn: () => getHourlyWeather(city, district),
    }),
    queryClient.prefetchQuery({
      queryKey: weatherKeys.weeklyForecast(city, district),
      queryFn: () => getWeeklyWeather(city, district),
    }),
    queryClient.prefetchQuery({
      queryKey: weatherKeys.weeklyTemperature(city, district),
      queryFn: () => getWeeklyTemperature(city, district),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="p-5">
        <SelectCompareLocation />
        <TodayComparison myLocation={{ city, district }} />
        <DetailComparison myLocation={{ city, district }} />
      </div>
    </HydrationBoundary>
  );
}
