export type Meta = {
  total: number;
  page: string;
  limit: string;
  totalPages: number;
};

export type ChatPreview = {
  id: string;
  name: string;
  participantCount: number; // 참여자 수
  messages: Message[];
};

export type Message = {
  id: string;
  content: string;
  createdAt: string;
  sender: Sender;
};

type Sender = {
  id: string; // uuid
  name: string;
  profileImage: string | null;
};

export type ChatRoom = {
  id: string;
  sido: string;
};
