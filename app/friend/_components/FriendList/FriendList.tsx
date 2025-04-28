'use client';

import type { SearchedFriend } from '@/app/friend/_model/types';
import { useDeleteFriend, useGetMyFriendList } from '@/app/friend/_service/queries';
import { useObserver } from '@/hooks';
import { EllipsisVertical, LucideTrash2 } from 'lucide-react';
import { overlay } from 'overlay-kit';

import { Card } from '@/components/Card';
import { DropdownMenu } from '@/components/DropdownMenu/DropdownMenu';
import { Modal } from '@/components/Modal';
import { UserAvatar } from '@/components/UserAvatar';
// import { WeatherIcon } from '@/components/WeatherIcon';
import { Button } from '@/components/ui/button';
import { DropdownMenuGroup, DropdownMenuItem } from '@/components/ui/dropdown-menu';

const FriendList = () => {
  const { data: friends, isFetching, hasNextPage, fetchNextPage } = useGetMyFriendList();
  const { mutate: deleteFriend } = useDeleteFriend();

  const loaderRef = useObserver(() => {
    if (!hasNextPage) return;
    fetchNextPage();
  });

  const handleDeleteFriend = (friend: SearchedFriend) => {
    overlay.open((props) => {
      return (
        <Modal
          {...props}
          titleSlot="정말 삭제할까요?"
          buttonSlot={
            <>
              <Button variant="secondary" className="flex-1" onClick={props.close}>
                아니오
              </Button>
              <Button
                variant="warn"
                className="flex-1"
                onClick={() => {
                  deleteFriend(friend);
                  props.close();
                }}
              >
                네, 삭제할래요
              </Button>
            </>
          }
        >
          삭제했던 친구도 언제든지 다시 추가할 수 있어요
        </Modal>
      );
    });
  };

  return (
    <div className="flex h-[calc(100vh-180px)] overflow-hidden">
      <div className="flex-1 overflow-y-auto p-5">
        <div className="flex flex-col gap-3">
          {isFetching && <Skeleton />}

          {!isFetching && friends?.length === 0 && (
            <div className="flex-grow flex justify-center items-center h-full min-h-[calc(100vh-300px)]">
              <span className="text-gray500 text-center">
                아직 친구가 없어요 <br /> '친구 찾기'를 통해 새로운 친구를 만들어보세요!
              </span>
            </div>
          )}

          {friends && friends.length > 0 && (
            <>
              {friends.map((friend) => (
                <Card.Root key={friend.id}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <UserAvatar />
                      <div className="flex flex-col gap-1">
                        <Card.Title>{friend.name}</Card.Title>
                        <Card.Description>{friend.email}</Card.Description>
                      </div>
                    </div>

                    <DropdownMenu
                      trigger={
                        <Button size="icon" variant="ghost" className="absolute right-2 top-2">
                          <EllipsisVertical />
                        </Button>
                      }
                      slot={
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            className="cursor-pointer text-red"
                            onClick={() => handleDeleteFriend(friend)}
                          >
                            <LucideTrash2 className="text-red" stroke="currentColor" />
                            친구 삭제
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      }
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5 rounded-[16px] bg-gray-100 p-3 mt-2">
                    <span className="text-gray500 text-sm">
                      {friend.location.sido} {friend.location.gugun}
                    </span>
                    {/* TODO: 친구 날씨 정보 추가 (백엔드) */}
                    <span className="text-gray500 text-sm">구름 조금</span>
                  </div>
                </Card.Root>
              ))}

              <div ref={loaderRef} className="h-px w-full" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const FriendCardSkeleton = () => {
  return (
    <Card.Root>
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />

        <div className="flex flex-col gap-1 ml-3 flex-2/4">
          <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="flex-1/4 rounded-full h-9 max-w-28 bg-gray-200 animate-pulse" />
      </div>
    </Card.Root>
  );
};

const Skeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: count }).map((_, index) => (
        <FriendCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default FriendList;
