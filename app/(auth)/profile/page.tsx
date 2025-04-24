import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { userQueryOptions } from '@/hooks/queries/users/queries';

import { getQueryClient } from '@/lib/query';

import { AccountManagement } from './_components/AccountManagement';
import { UserInfo } from './_components/UserInfo';

export default async function ProfilePage() {
  const queryClient = getQueryClient();
  const { queryKey, queryFn, staleTime } = userQueryOptions.my();

  await queryClient.prefetchQuery({ queryKey, queryFn, staleTime });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="p-5">
        <UserInfo />
        <AccountManagement />
      </div>
    </HydrationBoundary>
  );
}
