import { CredentialsSignin, type NextAuthConfig, type User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { PATH } from '@/constants/paths';

//TODO: 추후 사용
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class InvalidLoginError extends CredentialsSignin {
  code: string;

  constructor(code: string) {
    super();

    this.code = code;
  }
}

export default {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text', placeholder: '이메일' },
        password: { label: 'password', type: 'password' },
      },

      async authorize(credentials): Promise<User | null> {
        if (!credentials) {
          console.error('No credentials provided');
          return null;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
      }

      return token;
    },

    async session({ session }) {
      return session;
    },
  },

  session: {
    strategy: 'jwt',
  },

  secret: process.env.AUTH_SECRET,

  pages: {
    signIn: PATH.root,
    signOut: PATH.root,
  },
} satisfies NextAuthConfig;
