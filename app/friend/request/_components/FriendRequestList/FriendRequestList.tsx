'use client';

import { useFriendRequestList, useRespondFriendRequest } from '@/app/friend/_service/queries';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { EllipsisVertical, Handshake, MailX } from 'lucide-react';

import { Card } from '@/components/Card';
import { DropdownMenu } from '@/components/DropdownMenu';
import { Button } from '@/components/ui/button';
import { DropdownMenuGroup, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';

dayjs.locale('ko');

const FriendRequestList = () => {
  const { data: friendReqList = [], isFetching } = useFriendRequestList();
  const { mutate: respondFriendRequest } = useRespondFriendRequest();

  if (isFetching) {
    return <FriendRequestListSkeleton />;
  }

  if (friendReqList.length === 0) {
    return (
      <div className="flex-grow flex justify-center items-center h-full min-h-[calc(100dvh-200px)]">
        <span className="text-gray500 text-center">받은 친구 요청이 없어요</span>
      </div>
    );
  }

  return (
    <div className="flex-1 p-5">
      <div className="flex flex-col space-y-3">
        {friendReqList.map((friendReq) => (
          <Card.Root key={friendReq.id}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span>친구신청</span>
                <span className="text-gray700 text-sm">{dayjs(friendReq.createdAt).format('A hh:mm')}</span>
              </div>

              <DropdownMenu
                trigger={
                  <Button size="icon" variant="ghost" className="absolute right-2 top-2">
                    <EllipsisVertical />
                  </Button>
                }
                slot={
                  <DropdownMenuGroup className="p-3 space-y-3">
                    <DropdownMenuItem
                      className="cursor-pointer text-sm p-0"
                      onClick={() => {
                        respondFriendRequest({ request: friendReq, accept: true });
                      }}
                    >
                      <Handshake className="text-black" stroke="currentColor" />
                      수락하기
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer text-red text-sm p-0"
                      onClick={() => {
                        respondFriendRequest({ request: friendReq, accept: false });
                      }}
                    >
                      <MailX className="text-red" stroke="currentColor" />
                      거절하기
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                }
              />
            </div>

            <span className="mt-2.5 text-sm font-medium text-gray500">
              '{friendReq.sender.name}' 님이 친구 요청을 보냈어요
            </span>
          </Card.Root>
        ))}
      </div>
    </div>
  );
};

const FriendRequestListSkeleton = () => {
  return (
    <div className="flex-1 p-5">
      <div className="flex flex-col space-y-3">
        {[...Array(3)].map((_, index) => (
          <Card.Root key={index}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <Skeleton className="h-5 w-4/5 mt-2.5" />
          </Card.Root>
        ))}
      </div>
    </div>
  );
};

export default FriendRequestList;
