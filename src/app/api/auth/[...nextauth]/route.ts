import { addMember, addNonMember } from '@/service/member';
import NextAuth, { NextAuthOptions } from 'next-auth';
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
      authorize() {
        const uid = createNonmemberUID();
        const user = {
          nonmember: true,
          id: uid,
        };
        return user;
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
