import type { PrecipitationTypeEnum, SkyConditionEnum } from '@/app/(main)/_model/types';
import type { User } from '@/types/user';

export interface SearchedFriend extends Omit<User, 'registerType' | 'theme'> {}

export type ReceivedFriendReq = {
  id: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  sender: SearchedFriend;
};

export type FriendList = {
  items: {
    user: SearchedFriend;
    weather: {
      temperature: number;
      sky: SkyConditionEnum | PrecipitationTypeEnum;
    };
  }[];
  total: number;
  take: number;
  skip: number;
};

export type RequestFriendResponse = {
  data: {
    id: string;
    status: string;
    sender: SearchedFriend;
    receiver: SearchedFriend;
  };
};

export type FriendRequest = {
  id: string;
  status: string;
  createdAt: string;
  sender: SearchedFriend;
};
