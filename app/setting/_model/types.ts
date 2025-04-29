export const SettingTypeEnum = {
  TEMPERATURE: 'TEMPERATURE',
  HUMIDITY: 'HUMIDITY',
  WIND: 'WIND',
  AIRQUALITY: 'AIRQUALITY',
} as const;

export type SettingType = (typeof SettingTypeEnum)[keyof typeof SettingTypeEnum];

export type Setting = {
  id: string;
  type: SettingType;
  threshold: number | string;
  unit: string;
  active: boolean;
};

export type SettingInfo = {
  type: SettingType;
  threshold: number | string;
  active: boolean;
};
