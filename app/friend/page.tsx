import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { FindFriend } from './_components/FindFriend';
import { FriendList } from './_components/FriendList';

export default function FriendPage() {
  return (
    <Tabs defaultValue="1">
      <TabsList className="w-full">
        <TabsTrigger value="1">친구 찾기</TabsTrigger>
        <TabsTrigger value="2">친구 목록</TabsTrigger>
      </TabsList>
      <TabsContent value="1">
        <FindFriend />
      </TabsContent>
      <TabsContent value="2">
        <FriendList />
      </TabsContent>
    </Tabs>
  );
}
