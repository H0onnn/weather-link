'use client';

import { SettingsAction, SettingsState, cityOptions, districts } from '@/app/setting/_lib/settingsReducer';
import { type Dispatch } from 'react';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LocationSettingsProps {
  state: SettingsState;
  dispatch: Dispatch<SettingsAction>;
}

const LocationSettings = ({ state, dispatch }: LocationSettingsProps) => {
  const handleCityChange = (value: string) => {
    dispatch({ type: 'SET_CITY', payload: value });
  };

  return (
    <div className="bg-white rounded-[16px] p-4 shadow-shadow1">
      <h2 className="text-lg font-bold mb-4">위치 설정</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="city">시/도 선택</Label>
          <Select value={state.city} onValueChange={handleCityChange}>
            <SelectTrigger id="city" className="rounded-[16px] w-full">
              <SelectValue placeholder="시/도를 선택해주세요" />
            </SelectTrigger>
            <SelectContent className="rounded-[16px]">
              {cityOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="rounded-[16px]">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="district">시/군/구 선택</Label>
          <Select
            value={state.district}
            onValueChange={(value) => dispatch({ type: 'SET_DISTRICT', payload: value })}
            disabled={!state.city || !districts[state.city]}
          >
            <SelectTrigger id="district" className="rounded-[16px] w-full">
              <SelectValue placeholder="시/군/구를 선택해주세요" />
            </SelectTrigger>
            <SelectContent className="rounded-[16px]">
              {state.city &&
                districts[state.city] &&
                districts[state.city].map((option) => (
                  <SelectItem key={option.value} value={option.value} className="rounded-[16px]">
                    {option.label}
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
