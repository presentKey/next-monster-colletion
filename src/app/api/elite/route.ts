import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { NextRequest, NextResponse } from 'next/server';
import {
  getEliteCollections,
  updateEliteCollections,
} from '@/service/query/member';
import { EliteCollections } from '@/model/monster';

type EliteList = {
  eliteList: EliteCollections[];
};

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  return getEliteCollections(user.uid, user?.nonmember)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  const { eliteList }: EliteList = await request.json();
  const updateList = JSON.stringify(
    eliteList.map((item) => ({
      name: item.elite.name,
      isRegistred: item.elite?.isRegistred || false,
    }))
  );

  return updateEliteCollections(user.uid, updateList)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
