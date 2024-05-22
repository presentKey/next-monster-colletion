import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { getBookmarkDetail } from '@/service/query/member';
import { authOptions } from '@/utils/authOptions';

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  return getBookmarkDetail(user.uid, user?.nonmember)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
