import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { memberEliteCollectionsReset } from '@/service/query/member';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function PUT() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  return memberEliteCollectionsReset(user.uid)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
