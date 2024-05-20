import { addMember, addNonMember, findNonmember } from '@/service/query/member';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import createNonmemberUID from '@/utils/createNonmemberUID';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || '',
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Nonmember',
      credentials: {},
      async authorize(_, req) {
        const requestUID = req?.body?.uid;
        const existNonmember =
          requestUID !== 'null' && (await findNonmember(requestUID));

        if (existNonmember) {
          // 유효한 비회원인 경우
          const user = {
            nonmember: true,
            id: existNonmember.uid,
          };

          return user;
        } else {
          const uid = createNonmemberUID();
          const UIDduplicateCheck = await findNonmember(uid);

          if (UIDduplicateCheck) {
            return null;
          }

          // 새로운 비회원 생성
          const user = {
            nonmember: true,
            id: uid,
          };

          return user;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user: { id: uid, nonmember } }) {
      if (!uid) {
        return false;
      }

      nonmember ? addNonMember(uid) : addMember(uid);
      return true;
    },
    async session({ session, token }) {
      const user = session?.user;

      if (user) {
        session.user = {
          ...user,
          uid: token.id as string,
          nonmember: token.nonmember as boolean,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.nonmember = user.nonmember;
      }
      return token;
    },
  },
  pages: {
    signIn: '/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
