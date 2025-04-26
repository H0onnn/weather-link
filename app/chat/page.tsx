import { getUserData } from '../(auth)/profile/_service/apis';
import ChatList from './_components/ChatList/ChatList';

export default function ChatPage() {
  const userPromise = getUserData();

  return <ChatList userPromise={userPromise} />;
}
