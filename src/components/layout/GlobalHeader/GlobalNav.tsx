'use client';
import Link from 'next/link';
import styles from './css/GlobalNav.module.css';
import { useSession, signIn, signOut } from 'next-auth/react';
import SignButton from './SignButton';
import ThemeButton from '../../common/ThemeButton';
import { usePathname } from 'next/navigation';

export default function GlobalNav() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <Link
        className={`sm-hidden ${styles.elite} ${
          pathname === '/elite' && styles['is-active']
        }`}
        href='/elite'
      >
        엘몬
      </Link>
      <Link
        className={`sm-hidden ${styles.bookmark} ${
          pathname === '/bookmark' && styles['is-active']
        }`}
        href='/bookmark'
      >
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
