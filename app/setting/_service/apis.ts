import type { Setting, SettingInfo } from '@/app/setting/_model/types';

import { parseAxiosError } from '@/utils/error';

import { api } from '@/lib/axios';

export const getSettings = async () => {
  try {
    const response = await api.get<Setting[]>('/alert-settings');
    return response.data;
  } catch (error) {
    throw parseAxiosError(error);
  }
};

export const createSettingInfo = async (settingInfo: SettingInfo) => {
  try {
    const response = await api.post('/alert-settings', settingInfo);
    return response.data;
  } catch (error) {
    throw parseAxiosError(error);
  }
};

export const updateSetting = async (settingId: string, settingInfo: SettingInfo) => {
  try {
    const response = await api.put(`/alert-settings/${settingId}`, settingInfo);
    return response.data;
  } catch (error) {
    return {
      success: false,
      ...parseAxiosError(error),
    };
  }
};

export const updateSettingActive = async (active: boolean) => {
  try {
    const response = await api.patch('/alert-settings/toggle-all', { active });
    return response;
  } catch (error) {
    return {
      success: false,
      ...parseAxiosError(error),
    };
  }
};
