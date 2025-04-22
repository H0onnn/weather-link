import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import HourlyForecast from './HourlyForecast';
import WeeklyForecast from './WeeklyForecast';

const DetailComparison = () => {
  return (
    <div className="mt-8">
      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid grid-cols-2 w-full rounded-[16px] bg-[#F4F4F5] h-10 p-1">
          <TabsTrigger
            value="today"
            className="cursor-pointer rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white bg-[#F4F4F5] text-sm text-gray500"
          >
            시간별 예보
          </TabsTrigger>
          <TabsTrigger
            value="weekly"
            className="cursor-pointer rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white bg-[#F4F4F5] text-sm text-gray500"
          >
            주간 예보
          </TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="mt-4">
          <HourlyForecast />
        </TabsContent>
        <TabsContent value="weekly" className="mt-4">
          <WeeklyForecast />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DetailComparison;
