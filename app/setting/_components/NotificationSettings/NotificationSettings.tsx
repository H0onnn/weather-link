'use client';

import { SettingsAction, SettingsState, dustOptions } from '@/app/setting/_lib/settingsReducer';
import { Dispatch, useRef, useState } from 'react';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

import { debounce } from '@/utils/debounce';

interface NotificationSettingsProps {
  state: SettingsState;
  dispatch: Dispatch<SettingsAction>;
}

const NotificationSettings = ({ state, dispatch }: NotificationSettingsProps) => {
  // 로컬 UI 상태
  const [tempTemperature, setTempTemperature] = useState(state.temperatureThreshold);
  const [tempHumidity, setTempHumidity] = useState(state.humidityThreshold);
  const [tempWind, setTempWind] = useState(state.windThreshold);

  const debouncedTemperatureUpdate = useRef(
    debounce((value: number) => {
      dispatch({ type: 'SET_TEMPERATURE_THRESHOLD', payload: value });
      updateSettings({ temperatureThreshold: value });
    }),
  ).current;

  const debouncedHumidityUpdate = useRef(
    debounce((value: number) => {
      dispatch({ type: 'SET_HUMIDITY_THRESHOLD', payload: value });
      updateSettings({ humidityThreshold: value });
    }),
  ).current;

  const debouncedWindUpdate = useRef(
    debounce((value: number) => {
      dispatch({ type: 'SET_WIND_THRESHOLD', payload: value });
      updateSettings({ windThreshold: value });
    }),
  ).current;

  const updateSettings = async (settings: Partial<SettingsState>) => {
    console.log('API 호출:', settings);
  };

  // 알림 토글
  const handleNotificationToggle = (checked: boolean) => {
    dispatch({ type: 'TOGGLE_NOTIFICATIONS', payload: checked });
    updateSettings({ notificationsEnabled: checked });
  };

  // 온도 변경
  const handleTemperatureChange = (values: number[]) => {
    const value = values[0];
    setTempTemperature(value);
    debouncedTemperatureUpdate(value);
  };

  // 습도 변경
  const handleHumidityChange = (values: number[]) => {
    const value = values[0];
    setTempHumidity(value);
    debouncedHumidityUpdate(value);
  };

  // 바람 변경
  const handleWindChange = (values: number[]) => {
    const value = values[0];
    setTempWind(value);
    debouncedWindUpdate(value);
  };

  // 미세먼지 변경
  const handleDustChange = (value: string) => {
    dispatch({ type: 'SET_DUST_THRESHOLD', payload: value });
    updateSettings({ dustThreshold: value });
  };

  return (
    <div className="bg-white rounded-[16px] p-4 shadow-shadow1">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">알림 설정</h2>
        <div className="flex items-center space-x-2">
          <Label htmlFor="notifications" className="text-sm">
            알림
          </Label>
          <Switch id="notifications" checked={state.notificationsEnabled} onCheckedChange={handleNotificationToggle} />
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="flex items-center">온도</Label>
            <span className="text-sm font-medium text-primary">{tempTemperature}°C</span>
          </div>
          <Slider
            value={[tempTemperature]}
            onValueChange={handleTemperatureChange}
            min={0}
            max={40}
            step={1}
            disabled={!state.notificationsEnabled}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="flex items-center">습도</Label>
            <span className="text-sm font-medium text-primary">{tempHumidity}%</span>
          </div>
          <Slider
            value={[tempHumidity]}
            onValueChange={handleHumidityChange}
            min={0}
            max={100}
            step={1}
            disabled={!state.notificationsEnabled}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="flex items-center">바람</Label>
            <span className="text-sm font-medium text-primary">{tempWind}m/s</span>
          </div>
          <Slider
            value={[tempWind]}
            onValueChange={handleWindChange}
            min={0}
            max={30}
            step={1}
            disabled={!state.notificationsEnabled}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="flex items-center">미세먼지</Label>
          </div>
          <Select value={state.dustThreshold} onValueChange={handleDustChange} disabled={!state.notificationsEnabled}>
            <SelectTrigger className="rounded-[16px] w-full">
              <SelectValue placeholder="미세먼지 등급을 선택해주세요" />
            </SelectTrigger>
            <SelectContent className="rounded-[16px]">
              {dustOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="rounded-[16px]">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="text-xs text-gray500 p-2 bg-gray-100 rounded-[16px]">
          * 설정한 조건 중 하나라도 충족되면 알림을 받아볼 수 있어요
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
