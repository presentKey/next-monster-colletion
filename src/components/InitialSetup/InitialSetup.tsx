'use client';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export const MODIFIER = 'modifier';
export const ELITENAME = 'eliteName';

export default function InitialSetup() {
  const { data: session } = useSession();

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

  useEffect(() => {
    if (!localStorage.getItem(MODIFIER)) {
      localStorage.setItem(MODIFIER, JSON.stringify(true));
    }

    if (!localStorage.getItem(ELITENAME)) {
      localStorage.setItem(ELITENAME, JSON.stringify(true));
    }
  }, []);

  return <></>;
}
