import { getFriendRequestList } from '@/app/friend/_service/apis';

import { FriendRequestList } from './_components/FriendRequestList';

export default async function FriendRequestPage() {
  const friendReqListPromise = getFriendRequestList();

  return <FriendRequestList friendReqListPromise={friendReqListPromise} />;
}
