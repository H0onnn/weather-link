'use client';

import { useMyUserInfo } from '@/app/(auth)/profile/_service/queries';
import { useCityList } from '@/services/locations/queries';
import { useDistrictList } from '@/services/locations/queries';
import { parseAsString, useQueryStates } from 'nuqs';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SelectCompareLocation = () => {
  const [location, setLocation] = useQueryStates({
    city: parseAsString,
    district: parseAsString,
  });

  const { city, district } = location;

  const { data: user } = useMyUserInfo();
  const { data: cityList } = useCityList();
  const { data: districtList } = useDistrictList(city || '');

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center">
        <div className="w-24 text-sm text-gray500">내 위치</div>
        <div className="font-medium">
          {user?.location.sido} {user?.location.gugun}
        </div>
      </div>

      <div className="flex items-center">
        <div className="w-24 text-sm text-gray500">비교 위치</div>
        <div className="flex items-center space-x-4">
          <Select value={city || ''} onValueChange={(value) => setLocation({ city: value, district: '' })}>
            <SelectTrigger className="h-9 rounded-[16px] bg-white">
              <SelectValue placeholder="시/도 선택" />
            </SelectTrigger>
            <SelectContent>
              {cityList?.map((city) => (
                <SelectItem key={city.id} value={city.sido}>
                  {city.sido}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {city && (
            <Select value={district || ''} onValueChange={(value) => setLocation({ ...location, district: value })}>
              <SelectTrigger className="h-9 rounded-[16px] bg-white">
                <SelectValue placeholder="구/군 선택" />
              </SelectTrigger>
              <SelectContent>
                {districtList?.map((district) => (
                  <SelectItem key={district.id} value={district.gugun}>
                    {district.gugun}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectCompareLocation;
