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

        {!isFetching && messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
            <p className="text-gray500 text-center">
              아직 우리 동네에 아무런 소식이 없어요
              <br />
              {user.name}님이 첫 메시지를 남겨보세요!
            </p>
          </div>
        )}

        <div className="flex flex-col space-y-4 min-h-full">
          {isFetching ? (
            <Skeleton />
          ) : (
            <>
              {Object.entries(groupMessagesByDate(messages)).map(([date, messages], index) => (
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
              ))}
            </>
          )}
        </div>
      </div>

      <MessageInput onSendMessage={handleSendMessage} />
    </>
  );
};

const SkeletonMessage = ({ variant }: { variant: 'user' | 'other' }) => {
  return (
    <div className={cn('flex', variant === 'user' ? 'justify-end' : 'justify-start', 'animate-pulse w-full')}>
      {variant === 'other' && <div className="w-10 h-10 rounded-full bg-gray-200 mr-2" />}
      <div className="flex flex-col gap-1">
        {variant !== 'user' && <div className="w-20 h-4 bg-gray-200 rounded" />}
        <div
          className={cn(
            'h-12 rounded-3xl px-4 py-2 max-w-[80%]',
            variant === 'user' ? 'bg-gray-200 rounded-tr-none ml-auto' : 'bg-gray-200 rounded-tl-none',
          )}
          style={{ width: `${Math.floor(Math.random() * 150) + 50}px` }}
        />
      </div>
    </div>
  );
};

const DateSkeleton = () => (
  <div className="flex justify-center my-4">
    <div className="h-6 w-32 rounded-full bg-gray-200 animate-pulse" />
  </div>
);

const Skeleton = () => {
  return (
    <div className="flex flex-col space-y-4 w-full">
      <DateSkeleton />
      <div className="space-y-2">
        <SkeletonMessage variant="other" />
        <SkeletonMessage variant="user" />
        <SkeletonMessage variant="other" />
        <SkeletonMessage variant="user" />
      </div>
      <DateSkeleton />
      <div className="space-y-2">
        <SkeletonMessage variant="other" />
        <SkeletonMessage variant="user" />
      </div>
    </div>
  );
};

export default ChatList;
