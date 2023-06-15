'use client';
import Link from 'next/link';
import styles from './css/GlobalNav.module.css';
import SunIcon from '../icons/SunIcon';
import { useSession, signIn, signOut } from 'next-auth/react';

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
      <button type='button'>
        <SunIcon />
      </button>
      <button className={styles.sign} type='button' onClick={() => signIn()}>
        {session ? '로그아웃' : '로그인'}
      </button>
    </nav>
  );
}
