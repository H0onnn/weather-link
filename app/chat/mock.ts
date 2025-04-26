import type { Message } from './_model/types';

export const mockMessages: Message[] = [
  {
    id: '1',
    content: '안녕하세요! 오늘 날씨 어때요?',
    createdAt: '2024-05-20T09:30:45.123Z',
    sender: {
      id: 'user1',
      name: '김하늘',
      profileImage: null,
    },
  },
  {
    id: '2',
    content: '여기는 맑고 화창해요. 기온도 25도로 따뜻하네요!',
    createdAt: '2024-05-20T09:32:12.456Z',
    sender: {
      id: 'user2',
      name: '이구름',
      profileImage: null,
    },
  },
  {
    id: '3',
    content: '저희 지역은 갑자기 비가 내리기 시작했어요. 우산 챙기세요!',
    createdAt: '2024-05-20T09:35:30.789Z',
    sender: {
      id: 'user3',
      name: '박비',
      profileImage: null,
    },
  },
  {
    id: '4',
    content: '내일 날씨는 어떻게 될까요? 야외활동 계획 중인데요.',
    createdAt: '2024-05-20T09:40:15.321Z',
    sender: {
      id: 'user1',
      name: '김하늘',
      profileImage: null,
    },
  },
  {
    id: '5',
    content: '내일은 전국적으로 맑을 예정이래요. 최고 온도 27도, 최저 온도 18도 정도라고 합니다.',
    createdAt: '2024-05-20T09:42:50.654Z',
    sender: {
      id: 'user4',
      name: '정예보',
      profileImage: null,
    },
  },
  {
    id: '6',
    content: '감사합니다! 그럼 내일 소풍 가기 좋겠네요.',
    createdAt: '2024-05-20T09:45:22.987Z',
    sender: {
      id: 'user1',
      name: '김하늘',
      profileImage: null,
    },
  },
  {
    id: '7',
    content: '오늘 미세먼지는 어떤가요?',
    createdAt: '2024-05-21T09:47:05.123Z',
    sender: {
      id: 'user5',
      name: '최맑음',
      profileImage: null,
    },
  },
  {
    id: '8',
    content: '미세먼지는 좋음 단계라고 해요. 걱정 안 하셔도 될 것 같아요!',
    createdAt: '2024-05-21T09:49:30.456Z',
    sender: {
      id: 'user4',
      name: '정예보',
      profileImage: null,
    },
  },
];
