'use client';

import { useMyUserInfo, useUpdateUserLocation } from '@/app/(auth)/profile/_service/queries';
import { useCityList, useDistrictList } from '@/services/locations/queries';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LocationSettings = () => {
  const router = useRouter();
  const { data: user } = useMyUserInfo();

  const [city, setCity] = useState(user?.location.sido);
  const [district, setDistrict] = useState(user?.location.gugun);

  const { data: cityList = [] } = useCityList();
  const { data: districtList = [] } = useDistrictList(city || '');
  const { mutate: updateUserLocation } = useUpdateUserLocation(() => router.refresh());

  const districtChange = (districtId: string) => {
    updateUserLocation(districtId);
  };

  const handleCityChange = (value: string) => {
    setCity(value);
    setDistrict('');
  };

  const handleDistrictSelect = (selectedGugun: string) => {
    setDistrict(selectedGugun);

    const selectedDistrict = districtList.find((d) => d.gugun === selectedGugun);
    if (selectedDistrict) {
      districtChange(selectedDistrict.id);
    }
  };

  return (
    <div className="bg-white rounded-[16px] p-4 shadow-shadow1">
      <h2 className="text-lg font-bold mb-4">위치 설정</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="city">시/도 선택</Label>
          <Select value={city} onValueChange={handleCityChange} defaultValue={user?.location.sido}>
            <SelectTrigger id="city" className="rounded-[16px] w-full">
              <SelectValue placeholder="시/도를 선택해주세요" />
            </SelectTrigger>
            <SelectContent className="rounded-[16px]">
              {cityList.map((city) => (
                <SelectItem key={city.id} value={city.sido} className="rounded-[16px]">
                  {city.sido}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="district">시/군/구 선택</Label>
          <Select
            value={district}
            onValueChange={handleDistrictSelect}
            disabled={!city}
            defaultValue={user?.location.gugun}
          >
            <SelectTrigger id="district" className="rounded-[16px] w-full">
              <SelectValue placeholder="시/군/구를 선택해주세요" />
            </SelectTrigger>
            <SelectContent className="rounded-[16px]">
              {city &&
                districtList.map((district) => (
                  <SelectItem key={district.id} value={district.gugun} className="rounded-[16px]">
                    {district.gugun}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div className="text-xs text-gray500 p-2 bg-gray-100 rounded-[16px]">
          * 시/군/구를 선택하면 자동으로 위치가 설정돼요
        </div>
      </div>
    </div>
  );
};

export default LocationSettings;
