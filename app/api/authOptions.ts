import { login } from '@/app/(auth)/login/_service/apis';
import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';

// TODO: 추후
// import GoogleProvider from 'next-auth/providers/google';
// import KakaoProvider from 'next-auth/providers/kakao';
// import NaverProvider from 'next-auth/providers/naver';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'User',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(8) })
          .parse(credentials);

        const response = await login(parsedCredentials.email, parsedCredentials.password);

        if (!response.success) {
          throw new Error(response.message);
        }

        return {
          id: credentials?.email ?? '',
          name: credentials?.email,
          password: parsedCredentials.password,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/login',
    // error: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {},
};
