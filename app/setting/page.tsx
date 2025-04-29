import { LocationSettings } from '@/app/setting/_components/LocationSettings';
import { NotificationSettings } from '@/app/setting/_components/NotificationSettings';

export default function SettingsPage() {
  return (
    <div className="flex-1 p-5 space-y-6">
      <LocationSettings />
      {/* <NotificationSettings /> */}
    </div>
  );
}
