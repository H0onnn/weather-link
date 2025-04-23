import { AccountManagement } from './_components/AccountManagement';
import { UserInfo } from './_components/UserInfo';

export default function ProfilePage() {
  return (
    <div className="p-5">
      <UserInfo />
      <AccountManagement />
    </div>
  );
}
