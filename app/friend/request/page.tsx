import { getFriendRequestList } from '@/app/friend/_service/apis';
import { friendKeys } from '@/app/friend/_service/queries';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { getQueryClient } from '@/lib/query';

import { FriendRequestList } from './_components/FriendRequestList';

export const dynamic = 'force-dynamic';

export default async function FriendRequestPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: friendKeys.list('friend-requests'),
    queryFn: getFriendRequestList,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FriendRequestList />
    </HydrationBoundary>
  );
}
