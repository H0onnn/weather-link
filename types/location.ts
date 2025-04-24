export type Location = {
  sido: string; // 시/도 (예: 경기도)
  gugun: string; // 시/군/구 (예: 고양시, 가평군)
  dong?: string; // 읍/면/동 (예: 일산동구, 청평면)
};

export type City = {
  sido: string;
  id: string;
};

export type District = {
  sido: string;
  gugun: string;
  id: string;
};
