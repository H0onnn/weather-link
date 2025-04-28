import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { getQueryClient } from '@/lib/query';

import { AccountManagement } from './_components/AccountManagement';
import { UserInfo } from './_components/UserInfo';
import { getUserData } from './_service/apis';
import { userKeys } from './_service/queries';

export default async function ProfilePage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({ queryKey: userKeys.my(), queryFn: getUserData, staleTime: Infinity });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="p-5">
        <UserInfo />
        <AccountManagement />
      </div>
    </HydrationBoundary>
  );
}
