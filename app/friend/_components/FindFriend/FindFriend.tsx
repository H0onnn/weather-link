'use client';

import type { SearchedFriend } from '@/app/friend/_model/types';
import { requestFriend } from '@/app/friend/_service/apis';
import { useSearchFriend } from '@/app/friend/_service/queries';
import { useObserver } from '@/hooks';
import { SearchIcon, UserPlus2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Card } from '@/components/Card';
import { UserAvatar } from '@/components/UserAvatar';
import { LoadingFallback } from '@/components/fallback/LoadingFallback';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { debounce } from '@/utils/debounce';

const MAX_QUERY_LENGTH = 8;

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

  const handleRequestFriend = async (friend: SearchedFriend) => {
    try {
      setLoadingFriendId(friend.id);
      const response = await requestFriend(friend.id);

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success(`${friend.name}님에게 친구 요청을 보냈어요`);
    } catch (error) {
      console.error('친구 요청 에러: ', error);
      toast.error('친구 요청 중 오류가 발생했어요');
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
              <Card.Root key={friend.id}>
                <div className="flex items-center gap-2">
                  <UserAvatar />
                  <div className="flex flex-col gap-1 ml-3 flex-2/4">
                    <Card.Title>{friend.name}</Card.Title>
                    <Card.Description>{friend.email}</Card.Description>
                  </div>
                  <Button
                    className="flex-1/4 rounded-full text-sm h-9 max-w-28"
                    onClick={() => handleRequestFriend(friend)}
                    isLoading={loadingFriendId === friend.id}
                  >
                    <UserPlus2 />
                    친구 신청
                  </Button>
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
