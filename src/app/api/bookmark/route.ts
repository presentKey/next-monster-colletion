import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import {
  addBookmark,
  deleteBookmark,
  getBookmark,
} from '@/service/query/member';
import { authOptions } from '@/utils/authOptions';

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  return getBookmark(user.uid, user?.nonmember)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  const { monsterId, saved } = await request.json();

  const service = saved ? deleteBookmark : addBookmark;

  return service(monsterId, user.uid)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
