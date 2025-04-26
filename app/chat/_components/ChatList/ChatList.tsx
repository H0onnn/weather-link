'use client';

import type { Message } from '@/app/chat/_model/types';
import { useLocationChatRoom, useMessages } from '@/app/chat/_service/queries';
import { useObserver } from '@/hooks';
import type { User } from '@/types/user';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { use, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { SpeechBubble } from '@/components/SpeechBubble';

import type { ApiResponse } from '@/lib/axios';
import { chatSocketManager } from '@/lib/chatManager';
import { cn } from '@/lib/utils';

import { MessageInput } from './MessageInput';

dayjs.locale('ko');

const groupMessagesByDate = (messages: Message[]) => {
  return messages.reduce(
    (acc, message) => {
      const date = dayjs(message.createdAt).format('YYYY년 M월 D일 dddd');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(message);
      return acc;
    },
    {} as Record<string, Message[]>,
  );
};

interface ChatListProps {
  userPromise: Promise<ApiResponse<User>>;
}

const ChatList = ({ userPromise }: ChatListProps) => {
  const chatListRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const { data: user } = use(userPromise);
  const { data: chatRoom } = useLocationChatRoom(user.location.sido);
  const roomId = chatRoom?.id ?? '';

  const { data: initialMessages, fetchNextPage, hasNextPage, isFetching } = useMessages(roomId);
  const loaderRef = useObserver(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  });

  const handleSendMessage = (message: string) => {
    chatSocketManager.emit('sendMessage', {
      roomId,
      userId: user.id,
      content: message,
    });

    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        content: message,
        sender: {
          id: user.id,
          name: user.name,
          profileImage: user.profileImage,
        },
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  useEffect(() => {
    if (initialMessages) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  useEffect(() => {
    if (roomId) {
      chatSocketManager.connectRoom(roomId);

      chatSocketManager.emit('joinRoom', { roomId });

      const handleNewMessage = (message: Message) => {
        setMessages((prev) => [...prev, message]);
      };

      chatSocketManager.on('newMessage', handleNewMessage);

      return () => {
        chatSocketManager.disconnectRoom(roomId);
        chatSocketManager.off('newMessage', handleNewMessage);
      };
    }
  }, [roomId]);

  useLayoutEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div ref={chatListRef} className="flex-grow overflow-y-auto px-5 pt-3 pb-20">
        <div ref={loaderRef} className="h-2 flex items-center justify-center" />

        <div className="flex flex-col space-y-4 min-h-full">
          {messages.length > 0 ? (
            Object.entries(groupMessagesByDate(messages)).map(([date, messages], index) => (
              <div key={date}>
                <div
                  className={cn(
                    'h-6 rounded-full px-3 py-1 text-sm text-white bg-primary',
                    'flex items-center justify-center my-4 max-w-1/2 mx-auto bg-[#8A91A8]/50',
                    index === 0 && 'mt-0',
                  )}
                >
                  {date}
                </div>

                <div className="space-y-2">
                  {messages.map((message) => {
                    const isMine = message.sender.id === user.id;

                    return (
                      <SpeechBubble
                        key={message.id}
                        message={message.content}
                        nickname={isMine ? '나' : message.sender.name}
                        profileImage={message.sender.profileImage ?? ''}
                        sentAt={message.createdAt}
                        variant={isMine ? 'user' : 'other'}
                      />
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-[calc(100vh-200px)]">
              <p className="text-gray500 text-center">
                아직 우리 동네에 아무런 소식이 없어요
                <br />
                {user.name}님이 첫 메시지를 남겨보세요!
              </p>
            </div>
          )}
        </div>
      </div>

      <MessageInput onSendMessage={handleSendMessage} />
    </>
  );
};

export default ChatList;
