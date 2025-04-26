'use client';

import { useMyUserInfo } from '@/app/(auth)/profile/_service/queries';
import { useLocationChatRoom } from '@/app/chat/_service/queries';
import { mockMessages } from '@/app/chat/mock';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useEffect, useLayoutEffect, useRef } from 'react';

import { SpeechBubble } from '@/components/SpeechBubble';

import { chatSocketManager } from '@/lib/chatManager';
import { cn } from '@/lib/utils';

import { MessageInput } from './MessageInput';

const userId = 'user1';

dayjs.locale('ko');

const ChatList = () => {
  let currentDate = '';
  const chatListRef = useRef<HTMLDivElement>(null);

  const { data: user } = useMyUserInfo();
  const { data: chatRoom } = useLocationChatRoom(user?.location.sido ?? '');
  const roomId = chatRoom?.id ?? '';

  useEffect(() => {
    if (roomId) {
      chatSocketManager.connectRoom(roomId);

      chatSocketManager.emit('joinRoom', { roomId });

      return () => {
        chatSocketManager.disconnectRoom(roomId);
      };
    }
  }, [roomId]);

  useLayoutEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [mockMessages]);

  return (
    <>
      <div ref={chatListRef} className="flex-grow overflow-y-auto p-5 pb-20">
        <div className="flex flex-col space-y-4 min-h-full">
          {mockMessages.map((message, index) => {
            const messageDate = dayjs(message.createdAt).format('YYYY년 M월 D일 dddd');
            const isMine = message.sender.id === userId;

            const showDateDivider = messageDate !== currentDate;

            if (showDateDivider) {
              currentDate = messageDate;
            }

            return (
              <div key={message.id}>
                {showDateDivider && (
                  <div
                    className={cn(
                      'h-6 rounded-full px-3 py-1 text-sm text-white bg-primary',
                      'flex items-center justify-center my-4 max-w-1/2 mx-auto bg-[#8A91A8]/50',
                      index === 0 && 'mt-0',
                    )}
                  >
                    {messageDate}
                  </div>
                )}

                <SpeechBubble
                  message={message.content}
                  nickname={isMine ? '나' : message.sender.name}
                  profileImage={message.sender.profileImage ?? ''}
                  sentAt={message.createdAt}
                  variant={isMine ? 'user' : 'other'}
                />
              </div>
            );
          })}
        </div>
      </div>

      <MessageInput roomId={roomId} />
    </>
  );
};

export default ChatList;
