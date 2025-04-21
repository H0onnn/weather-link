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
  });

  return (
    <div className="p-5 flex flex-col gap-3">
      <Input
        ref={searchRef}
        className="placeholder:text-gray-300"
        placeholder="친구의 이름을 입력해주세요"
        onChange={() => {
          handleFriendSearch();
        }}
        leftSlot={<SearchIcon className="text-[#9CA3AF]" />}
      />

      <div className="card-container flex flex-col gap-3 mt-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card.Root key={i}>
            <div className="flex items-center gap-2">
              <UserAvatar />
              <div className="flex flex-col gap-1 ml-3 flex-2/4">
                <Card.Title>강하늘</Card.Title>
                <Card.Description>email@email.com</Card.Description>
              </div>
              <Button className="flex-1/4 rounded-full text-sm h-9 max-w-28">
                <UserPlus2 />
                친구 신청
              </Button>
            </div>
          </Card.Root>
        ))}
      </div>
    </div>
  );
};

export default FindFriend;
