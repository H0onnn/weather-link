'use client';

import { SettingTypeEnum } from '@/app/setting/_model/types';
import { createSettingInfo, updateSettingActive } from '@/app/setting/_service/apis';
import { useGetSettings, useUpdateSetting } from '@/app/setting/_service/queries';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

import { debounce } from '@/utils/debounce';

export const dustOptions = [
  { value: '좋음', label: '좋음' },
  { value: '보통', label: '보통' },
  { value: '나쁨', label: '나쁨' },
  { value: '매우나쁨', label: '매우나쁨' },
];

const NotificationSettings = () => {
  const { data: settings = [] } = useGetSettings();
  const { mutate: updateSetting } = useUpdateSetting();

  const isFirstSetting = settings?.length === 0;

  const [notificationsEnabled, setNotificationsEnabled] = useState(
    () => settings?.some((setting) => setting.active) ?? false,
  );
  const [temperatureThreshold, setTemperatureThreshold] = useState(25);
  const [humidityThreshold, setHumidityThreshold] = useState(60);
  const [windThreshold, setWindThreshold] = useState(10);
  const [dustThreshold, setDustThreshold] = useState('매우나쁨');

  const debouncedTemperatureUpdate = useRef(
    debounce(async (value: number) => {
      if (isFirstSetting) {
        await createSettingInfo({
          type: SettingTypeEnum.TEMPERATURE,
          threshold: value,
          active: notificationsEnabled,
        });
      }

      updateSetting({
        settingId: settings.find((setting) => setting.type === SettingTypeEnum.TEMPERATURE)?.id!,
        settingInfo: {
          type: SettingTypeEnum.TEMPERATURE,
          threshold: value,
          active: notificationsEnabled,
        },
      });
    }),
  ).current;

  const debouncedHumidityUpdate = useRef(
    debounce(async (value: number) => {
      if (isFirstSetting) {
        await createSettingInfo({
          type: SettingTypeEnum.HUMIDITY,
          threshold: value,
          active: notificationsEnabled,
        });
      }

      updateSetting({
        settingId: settings.find((setting) => setting.type === SettingTypeEnum.HUMIDITY)?.id!,
        settingInfo: {
          type: SettingTypeEnum.HUMIDITY,
          threshold: value,
          active: notificationsEnabled,
        },
      });
    }),
  ).current;

  const debouncedWindUpdate = useRef(
    debounce(async (value: number) => {
      if (isFirstSetting) {
        await createSettingInfo({
          type: SettingTypeEnum.WIND,
          threshold: value,
          active: notificationsEnabled,
        });
      }
      updateSetting({
        settingId: settings.find((setting) => setting.type === SettingTypeEnum.WIND)?.id!,
        settingInfo: {
          type: SettingTypeEnum.WIND,
          threshold: value,
          active: notificationsEnabled,
        },
      });
    }),
  ).current;

  const handleNotificationToggle = async (checked: boolean) => {
    setNotificationsEnabled(checked);

    try {
      const response = await updateSettingActive(checked);

      if (!response.success) {
        toast.error(response.message);
        setNotificationsEnabled(false);
        return;
      }
    } catch (error) {
      console.error('알림 토글 오류: ', error);
      toast.error('알림 활성화 중 오류가 발생했어요');
      setNotificationsEnabled(false);
    }
  };

  const handleTemperatureChange = (values: number[]) => {
    const value = values[0];
    setTemperatureThreshold(value);
    debouncedTemperatureUpdate(value);
  };

  const handleHumidityChange = (values: number[]) => {
    const value = values[0];
    setHumidityThreshold(value);
    debouncedHumidityUpdate(value);
  };

  const handleWindChange = (values: number[]) => {
    const value = values[0];
    setWindThreshold(value);
    debouncedWindUpdate(value);
  };

  const handleDustChange = async (value: string) => {
    setDustThreshold(value);

    if (isFirstSetting) {
      await createSettingInfo({
        type: SettingTypeEnum.AIRQUALITY,
        threshold: value,
        active: notificationsEnabled,
      });
    }

    updateSetting({
      settingId: settings.find((setting) => setting.type === SettingTypeEnum.AIRQUALITY)?.id!,
      settingInfo: {
        type: SettingTypeEnum.AIRQUALITY,
        threshold: value,
        active: notificationsEnabled,
      },
    });
  };

  useEffect(() => {
    if (isFirstSetting) return;

    if (settings?.length) {
      settings.forEach((setting) => {
        switch (setting.type) {
          case SettingTypeEnum.TEMPERATURE:
            setTemperatureThreshold(setting.threshold as number);
            break;
          case SettingTypeEnum.HUMIDITY:
            setHumidityThreshold(setting.threshold as number);
            break;
          case SettingTypeEnum.WIND:
            setWindThreshold(setting.threshold as number);
            break;
          case SettingTypeEnum.AIRQUALITY:
            setDustThreshold(setting.threshold as string);
            break;
          default:
            break;
        }
      });
    }
  }, [settings]);

  return (
    <div className="bg-white rounded-[16px] p-4 shadow-shadow1">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">알림 설정</h2>
        <div className="flex items-center space-x-2">
          <Label htmlFor="notifications" className="text-sm">
            알림
          </Label>
          <Switch id="notifications" checked={notificationsEnabled} onCheckedChange={handleNotificationToggle} />
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="flex items-center">온도</Label>
            <span className="text-sm font-medium text-primary">{temperatureThreshold}°C</span>
          </div>
          <Slider
            value={[temperatureThreshold]}
            onValueChange={handleTemperatureChange}
            min={0}
            max={40}
            step={1}
            disabled={!notificationsEnabled}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="flex items-center">습도</Label>
            <span className="text-sm font-medium text-primary">{humidityThreshold}%</span>
          </div>
          <Slider
            value={[humidityThreshold]}
            onValueChange={handleHumidityChange}
            min={0}
            max={100}
            step={1}
            disabled={!notificationsEnabled}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="flex items-center">바람</Label>
            <span className="text-sm font-medium text-primary">{windThreshold}m/s</span>
          </div>
          <Slider
            value={[windThreshold]}
            onValueChange={handleWindChange}
            min={0}
            max={30}
            step={1}
            disabled={!notificationsEnabled}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="flex items-center">미세먼지</Label>
          </div>
          <Select value={dustThreshold} onValueChange={handleDustChange} disabled={!notificationsEnabled}>
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
