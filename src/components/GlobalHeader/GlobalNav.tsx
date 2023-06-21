'use client';
import Link from 'next/link';
import styles from './css/GlobalNav.module.css';
import { useSession, signIn, signOut } from 'next-auth/react';
import SignButton from './SignButton';
import ThemeButton from '../ThemeButton';

export default function GlobalNav() {
  const { data: session } = useSession();

  return (
    <nav className={styles.nav}>
      <Link href='/elite' className={`sm-hidden ${styles.elite}`}>
        엘몬
      </Link>
      <Link className={`sm-hidden ${styles.bookmark}`} href='/bookmark'>
        북마크
      </Link>
      <div className='sm-hidden'>
        <ThemeButton />
      </div>
      {session ? (
        <SignButton text='로그아웃' onClick={() => signOut()} />
      ) : (
        <SignButton text='로그인' onClick={() => signIn()} />
      )}
    </nav>
  );
}
