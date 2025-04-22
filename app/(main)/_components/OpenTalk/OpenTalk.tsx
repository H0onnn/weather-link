import { ChevronRight, MessageCircle, Send } from 'lucide-react';
import Link from 'next/link';

import { SpeechBubble } from '@/components/SpeechBubble';
import { Input } from '@/components/ui/input';

const messages = [
  {
    id: 1,
    sender: 'other',
    message: '오늘 날씨 정말 좋네요! 소풍 가기 딱 좋은 날씨인데 다들 어떻게 보내세요?',
    nickname: '미남성호',
    profileImage: '/images/profile.png',
    sentAt: new Date(),
  },
  {
    id: 2,
    sender: 'other',
    message: '저는 한강 피크닉 갈 예정이에요! 미세먼지도 적고 날씨가 정말 좋아요~',
    nickname: '미녀송희',
    profileImage: '/images/profile.png',
    sentAt: new Date(),
  },
  {
    id: 3,
    sender: 'other',
    message: '저는 오늘 오후 친구들과 카페에 갈 예정이에요! 오후 몇시에 갈까요?',
    nickname: '미남정훈',
    profileImage: '/images/profile.png',
    sentAt: new Date(),
  },
];
const OpenTalk = () => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">오픈톡</h3>
        <Link href="/chat" className="text-primary flex items-center gap-1 hover:underline">
          바로가기
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <Link href="/chat" className="flex flex-col space-y-5 p-4 bg-white rounded-[16px] shadow-shadow1">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-primary">우리동네 날씨 이야기</span>
          </div>
          <span className="text-xs text-gray500">· 3,254명</span>
        </div>

        <ul className="flex flex-col gap-3">
          {messages.map((message) => (
            <li key={message.id}>
              <SpeechBubble
                message={message.message}
                nickname={message.nickname}
                profileImage={message.profileImage}
                sentAt={message.sentAt}
                variant={message.sender as 'other' | 'user'}
              />
            </li>
          ))}
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
    </div>
  );
};

export default OpenTalk;
