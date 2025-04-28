'use client';

import type { FriendRequest } from '@/app/friend/_model/types';
import { respondFriendRequest } from '@/app/friend/_service/apis';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { EllipsisVertical, Handshake, MailX } from 'lucide-react';
import { use } from 'react';
import { toast } from 'sonner';

import { Card } from '@/components/Card';
import { DropdownMenu } from '@/components/DropdownMenu';
import { Button } from '@/components/ui/button';
import { DropdownMenuGroup, DropdownMenuItem } from '@/components/ui/dropdown-menu';

dayjs.locale('ko');

interface FriendRequestListProps {
  friendReqListPromise: Promise<FriendRequest[]>;
}

const FriendRequestList = ({ friendReqListPromise }: FriendRequestListProps) => {
  const friendReqList = use(friendReqListPromise);

  const handleRespondFriendRequest = async (friendReq: FriendRequest, accept: boolean) => {
    try {
      const response = await respondFriendRequest(friendReq.id, accept);
      if (!response.success) {
        toast.error(response.message);
      }

      toast.success(`${friendReq.sender.name}님과 친구가 되었어요`);
    } catch (error) {
      toast.error('친구 요청 처리 중 오류가 발생했어요');
    }
  };

  return (
    <div className="flex-1 p-5">
      {friendReqList.length === 0 && (
        <div className="flex-grow flex justify-center items-center h-full min-h-[calc(100dvh-200px)]">
          <span className="text-gray500 text-center">받은 친구 요청이 없어요</span>
        </div>
      )}

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
                        handleRespondFriendRequest(friendReq, true);
                      }}
                    >
                      <Handshake className="text-black" stroke="currentColor" />
                      수락하기
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer text-red text-sm p-0"
                      onClick={() => {
                        handleRespondFriendRequest(friendReq, false);
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

export default FriendRequestList;
