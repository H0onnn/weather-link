'use server';

import { cookies } from 'next/headers';

export const getToken = async () => {
  const token = (await cookies()).get('token');

  return token?.value;
};

export const setToken = async (token: string) => {
  (await cookies()).set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    // expires: TODO: 몇시간 ?
  });
};

export const removeToken = async () => {
  (await cookies()).delete('token');
};
