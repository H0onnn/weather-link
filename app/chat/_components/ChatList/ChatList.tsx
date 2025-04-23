'use client';

import { mockMessages } from '@/app/chat/mock';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useLayoutEffect, useRef } from 'react';

import { SpeechBubble } from '@/components/SpeechBubble';

import { cn } from '@/lib/utils';

import { MessageInput } from './MessageInput';

const userId = 'user1';

dayjs.locale('ko');

const ChatList = () => {
  let currentDate = '';
  const chatListRef = useRef<HTMLDivElement>(null);

  //   useEffect(() => {
  //     chatSocketManager.connectForPage('joinRoom');

  //     return () => {
  //       chatSocketManager.disconnectForPage('joinRoom');
  //     };
  // }, [roomId]);

  useLayoutEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, []);

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

      <MessageInput />
    </>
  );
};

export default ChatList;
