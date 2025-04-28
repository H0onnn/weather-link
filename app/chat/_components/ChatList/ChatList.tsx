'use client';

import type { ChatPreview, Message } from '@/app/chat/_model/types';
import { useLocationChatRoom, useMessages } from '@/app/chat/_service/queries';
import { useObserver } from '@/hooks';
import type { User } from '@/types/user';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { CircleAlert } from 'lucide-react';
import { use, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { SpeechBubble } from '@/components/SpeechBubble';
import { Header } from '@/components/layout/Header';

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
  chatRoomPromise: Promise<ChatPreview>;
}

const ChatList = ({ userPromise, chatRoomPromise }: ChatListProps) => {
  const chatListRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const { data: user } = use(userPromise);
  const chatRoomInfo = use(chatRoomPromise);

  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);
  const scrollHeightBeforeUpdate = useRef<number>(0);
  const scrollTopBeforeUpdate = useRef<number>(0);

  const { data: chatRoom } = useLocationChatRoom(user.location.sido);
  const roomId = chatRoom?.id ?? '';

  const { data: initialMessages, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useMessages(roomId);

  const loaderRef = useObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      // 스크롤 위치 저장
      if (chatListRef.current) {
        scrollHeightBeforeUpdate.current = chatListRef.current.scrollHeight;
        scrollTopBeforeUpdate.current = chatListRef.current.scrollTop;
      }
      setShouldScrollToBottom(false);
      fetchNextPage();
    }
  });

  const handleSendMessage = (message: string) => {
    chatSocketManager.emit('sendMessage', {
      roomId,
      userId: user.id,
      content: message,
    });
    setShouldScrollToBottom(true);
  };

  useEffect(() => {
    if (initialMessages) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  useEffect(() => {
    if (roomId && user.id) {
      chatSocketManager.connectRoom(roomId, user.id);

      chatSocketManager.emit('joinRoom', { roomId });

      const handleNewMessage = (message: Message) => {
        // 내가 새로운 메세지 보내면 스크롤 하단으로 이동
        const isMine = message.sender.id === user.id;
        if (isMine) {
          setShouldScrollToBottom(true);
        }

        setMessages((prev) => [...prev, message]);
      };

      chatSocketManager.on('newMessage', handleNewMessage);

      return () => {
        chatSocketManager.disconnectRoom(roomId);
        chatSocketManager.off('newMessage', handleNewMessage);
      };
    }
  }, [roomId, user.id]);

  useLayoutEffect(() => {
    if (chatListRef.current) {
      if (shouldScrollToBottom) {
        console.log('shouldScrollToBottom');
        chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
      } else if (isFetchingNextPage) {
        // 이전 채팅 가져올 땐 스크롤 위치 고정
        const newScrollHeight = chatListRef.current.scrollHeight;
        const heightDifference = newScrollHeight - scrollHeightBeforeUpdate.current;
        chatListRef.current.scrollTop = scrollTopBeforeUpdate.current + heightDifference;
      }
    }
  }, [messages, shouldScrollToBottom, isFetchingNextPage, initialMessages]);

  return (
    <>
      <Header
        title="지역 날씨 이야기"
        rightSlot={
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <CircleAlert width={16} height={16} className="text-gray500" />
              <span className="text-sm font-medium text-gray500">
                {user.location.sido} {user.location.gugun}
              </span>
            </div>

            <span className="text-sm text-gray500 text-right">{chatRoomInfo.participantCount.toLocaleString()}명</span>
          </div>
        }
      />

      <div className="flex flex-col h-[calc(100vh-160px)] overflow-hidden">
        {!isFetching && messages?.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
            <p className="text-gray500 text-center">
              아직 우리 동네에 아무런 소식이 없어요
              <br />
              {user.name}님이 첫 메시지를 남겨보세요!
            </p>
          </div>
        )}

        <div ref={chatListRef} className="flex-1 overflow-y-auto px-5">
          <div className="flex flex-col space-y-4 min-h-full">
            {hasNextPage && <div ref={loaderRef} className="h-2 flex items-center justify-center" />}

            {isFetching && !isFetchingNextPage && <Skeleton />}

            {!isFetching &&
              Object.entries(groupMessagesByDate(messages ?? [])).map(([date, dateMessages]) => (
                <div key={date}>
                  <div
                    className={cn(
                      'h-6 rounded-full px-3 py-1 text-sm text-white bg-primary',
                      'flex items-center justify-center my-4 max-w-1/2 mx-auto bg-[#8A91A8]/50',
                    )}
                  >
                    {date}
                  </div>

                  <div className="space-y-4">
                    {dateMessages.map((message, index) => {
                      const isMine = message.sender.id === user.id;
                      return (
                        <SpeechBubble
                          key={`${message.id}-${index}`}
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
          </div>
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
