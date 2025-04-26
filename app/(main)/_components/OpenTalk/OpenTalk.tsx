'use client';

import { useMyUserInfo } from '@/app/(auth)/profile/_service/queries';
import { useChatPreviews } from '@/app/chat/_service/queries';
import { ChevronRight, MessageCircle, Send } from 'lucide-react';
import Link from 'next/link';

import { SpeechBubble } from '@/components/SpeechBubble';
import { Input } from '@/components/ui/input';

const OpenTalk = () => {
  const { data: user } = useMyUserInfo();
  const { data: preview, isFetching } = useChatPreviews();

  if (!preview || !user) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">오픈톡</h3>
        <Link href="/chat" className="text-primary flex items-center gap-1 hover:underline">
          바로가기
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {isFetching ? (
        <Skeleton />
      ) : (
        <Link href="/chat" className="flex flex-col space-y-5 p-4 bg-white rounded-[16px] shadow-shadow1">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-primary">{preview?.name}</span>
            </div>
            <span className="text-xs text-gray500">· {preview.participantCount.toLocaleString()}명</span>
          </div>

          <ul className="flex flex-col gap-3">
            {preview.messages.length > 0 ? (
              preview.messages.map((message) => (
                <li key={message.id}>
                  <SpeechBubble
                    message={message.content}
                    nickname={message.sender.name}
                    profileImage={message.sender.profileImage}
                    sentAt={message.createdAt}
                    variant={message.sender.id === user.id ? 'user' : 'other'}
                  />
                </li>
              ))
            ) : (
              <p className="text-gray500 text-center">
                아직 우리 동네에 아무런 소식이 없어요
                <br />
                {user.name}님이 첫 메시지를 남겨보세요!
              </p>
            )}
          </ul>

          <div className="flex items-center space-x-2">
            <Input
              placeholder="오픈톡에 참여해보세요"
              containerClassName="bg-gray-100 border-0"
              className="pointer-events-none"
              readOnly
            />
            <div className="rounded-full bg-primary w-10 min-w-10 h-10 min-h-10 flex items-center justify-center">
              <Send className="w-4 h-4 text-white" />
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

const Skeleton = () => {
  return (
    <div className="flex flex-col space-y-5 p-4 bg-white rounded-[16px] shadow-shadow1 animate-pulse">
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1">
          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-gray-300" />
          </div>
          <div className="h-4 w-24 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-3 w-16 bg-gray-200 rounded-full"></div>
      </div>

      <ul className="flex flex-col gap-3">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <li key={index} className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200"></div>
              <div className="flex-1">
                <div className="h-3 w-20 bg-gray-200 rounded-full mb-1"></div>
                <div className="h-10 bg-gray-200 rounded-[12px] w-full max-w-[200px]"></div>
              </div>
            </li>
          ))}
      </ul>

      <div className="flex items-center space-x-2">
        <div className="flex-1 h-10 bg-gray-200 rounded-md"></div>
        <div className="rounded-full bg-gray-200 w-10 h-10 flex items-center justify-center">
          <Send className="w-4 h-4 text-gray-300" />
        </div>
      </div>
    </div>
  );
};

export default OpenTalk;
