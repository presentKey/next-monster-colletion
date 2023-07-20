'use client';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function InitialSetup() {
  const { data: session } = useSession();
  console.log(session);

  useEffect(() => {
    if (!localStorage.getItem('bookmark')) {
      localStorage.setItem('bookmark', JSON.stringify({ bookmarks: [] }));
    }
  }, []);

  useEffect(() => {
    if (session?.user.nonmember) {
      localStorage.setItem('nonmember', session.user.uid);
    }
  }, [session?.user.nonmember, session?.user.uid]);

  return <></>;
}
