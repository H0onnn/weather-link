'use client';

import { LocationSettings } from '@/app/setting/_components/LocationSettings';
import { NotificationSettings } from '@/app/setting/_components/NotificationSettings';
import { initialState, settingsReducer } from '@/app/setting/_lib/settingsReducer';
import { useReducer } from 'react';

export default function SettingsPage() {
  const [state, dispatch] = useReducer(settingsReducer, initialState);

  return (
    <>
      <div className="flex-1 p-5 space-y-6">
        <LocationSettings state={state} dispatch={dispatch} />
        <NotificationSettings state={state} dispatch={dispatch} />
      </div>
    </>
  );
}
