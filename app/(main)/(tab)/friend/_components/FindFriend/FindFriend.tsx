'use client';

import { SearchIcon, UserPlus2 } from 'lucide-react';
import { useRef } from 'react';

import { Card } from '@/components/Card';
import { UserAvatar } from '@/components/UserAvatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { debounce } from '@/utils/debounce';

const FindFriend = () => {
  const searchRef = useRef<HTMLInputElement>(null);

  const handleFriendSearch = debounce(() => {
    //TODO: 검색 api
    console.log(searchRef.current?.value);
  }, 500);

  return (
    <div className="p-4 flex flex-col gap-3">
      <div className="relative mb-1">
        <Input
          ref={searchRef}
          className="w-full pl-6 placeholder:text-gray-300 placeholder:font-light"
          placeholder="친구 검색"
          onChange={() => {
            handleFriendSearch();
          }}
        />
        <SearchIcon className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
      </div>

      <div className="card-container flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card.Root key={i}>
            <div className="flex items-center gap-2">
              <UserAvatar />
              <div className="flex flex-col gap-1 ml-3 flex-2/4">
                <Card.Title>강하늘</Card.Title>
                <Card.Description>email@email.com</Card.Description>
              </div>
              <Button className="flex-1/4 rounded-2xl text-sm h-8 max-w-28">
                <UserPlus2 className="size-3" />
                친구 추가
              </Button>
            </div>
          </Card.Root>
        ))}
      </div>
    </div>
  );
};

export default FindFriend;
