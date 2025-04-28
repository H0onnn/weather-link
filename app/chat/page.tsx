import { getUserData } from '../(auth)/profile/_service/apis';
import ChatList from './_components/ChatList/ChatList';
import { getChatPreviews } from './_service/apis';

export default function ChatPage() {
  const userPromise = getUserData();
  const chatRoomPromise = getChatPreviews();

  return <ChatList userPromise={userPromise} chatRoomPromise={chatRoomPromise} />;
}
