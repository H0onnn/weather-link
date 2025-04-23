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

export type Meta = {
  total: number;
  page: string;
  limit: string;
  totalPages: number;
};
