'use client';

import type { FriendStatusEnum, SearchedFriend } from '@/app/friend/_model/types';
import { useRequestFriend, useSearchFriend } from '@/app/friend/_service/queries';
import { useObserver } from '@/hooks';
import { SearchIcon, UserPlus2 } from 'lucide-react';
import { useState } from 'react';

import { Card } from '@/components/Card';
import { UserAvatar } from '@/components/UserAvatar';
import { LoadingFallback } from '@/components/fallback/LoadingFallback';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { debounce } from '@/utils/debounce';

import { cn } from '@/lib/utils';

const MAX_QUERY_LENGTH = 8;

const getFriendStatus = (status: FriendStatusEnum): string | null => {
  switch (status) {
    case 'FRIENDS':
      return '나와 친구사이에요';
    case 'REQUEST_SENT':
      return '보낸 요청이 있어요';
    case 'REQUEST_RECEIVED':
      return '받은 요청이 있어요';
    case 'NOT_FRIENDS':
      return null;
    default:
      return null;
  }
};

const FindFriend = () => {
  const [query, setQuery] = useState('');
  const [loadingFriendId, setLoadingFriendId] = useState<string | null>(null);

  const handleSearchFriend = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!value) return;

    setQuery(value);
  });

  const { data: friends, isFetching, hasNextPage, fetchNextPage } = useSearchFriend(query);
  const loaderRef = useObserver(() => {
    if (!hasNextPage) return;
    fetchNextPage();
  });

  const { mutateAsync: requestFriend } = useRequestFriend();

  const handleRequestFriend = async (friend: SearchedFriend) => {
    setLoadingFriendId(friend.id);
    try {
      await requestFriend(friend);
    } catch (error) {
      console.error('친구 요청 에러: ', error);
    } finally {
      setLoadingFriendId(null);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] overflow-hidden">
      <div className="px-5 pt-5">
        <Input
          className="placeholder:text-gray-300"
          placeholder="친구의 이름을 입력해주세요"
          onChange={handleSearchFriend}
          leftSlot={<SearchIcon className="text-[#9CA3AF]" />}
          maxLength={MAX_QUERY_LENGTH}
        />
      </div>

      {!query && (
        <CenteredContent>
          <span className="text-gray500">원하는 친구를 찾아보세요</span>
        </CenteredContent>
      )}

      {isFetching && (
        <CenteredContent>
          <LoadingFallback />
        </CenteredContent>
      )}

      <div className="flex-1 overflow-y-auto p-5">
        {friends && friends.length > 0 && (
          <div className="flex flex-col gap-3">
            {friends?.map((friend) => (
              <Card.Root key={friend.user.id}>
                <div className="flex items-center gap-2">
                  <UserAvatar />
                  <div className="flex flex-col gap-1 ml-3 flex-2/4">
                    <Card.Title>{friend.user.name}</Card.Title>
                    <Card.Description>{friend.user.email}</Card.Description>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <div
                      className={cn('flex items-center space-x-1', {
                        hidden: friend.status === 'NOT_FRIENDS',
                      })}
                    >
                      <div
                        className={cn('w-2 h-2 rounded-full', {
                          'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]': friend.status === 'FRIENDS',
                          'bg-primary shadow-[0_0_8px_rgba(99,102,241,0.6)]': friend.status === 'REQUEST_SENT',
                          'bg-orange-400 shadow-[0_0_8px_rgba(255,165,0,0.6)]': friend.status === 'REQUEST_RECEIVED',
                        })}
                      />
                      <span
                        className={cn('text-xs', {
                          'text-green-400': friend.status === 'FRIENDS',
                          'text-primary': friend.status === 'REQUEST_SENT',
                          'text-orange-400': friend.status === 'REQUEST_RECEIVED',
                        })}
                      >
                        {getFriendStatus(friend.status)}
                      </span>
                    </div>
                    <Button
                      className="flex-1/4 rounded-full text-sm h-9 max-w-28"
                      onClick={() => handleRequestFriend(friend.user)}
                      isLoading={loadingFriendId === friend.user.id}
                    >
                      <UserPlus2 />
                      친구 신청
                    </Button>
                  </div>
                </div>
              </Card.Root>
            ))}
            <div ref={loaderRef} className="h-px w-full" />
          </div>
        )}

        {friends && friends.length === 0 && (
          <CenteredContent>
            <span className="text-gray500 text-center">
              '{query}' <br />
              친구를 찾을 수 없어요
            </span>
          </CenteredContent>
        )}
      </div>
    </div>
  );
};

const CenteredContent = ({ children }: { children: React.ReactNode }) => (
  <div className="flex-grow flex justify-center items-center h-full min-h-[calc(100vh-300px)]">{children}</div>
);

export default FindFriend;
