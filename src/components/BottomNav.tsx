'use client';
import Link from 'next/link';
import HomeIcon from './icons/HomeIcon';
import SwordIcon from './icons/SwordIcon';
import SearchIcon from './icons/SearchIcon';
import TimerIcon from './icons/TimerIcon';
import BookMarkIcon from './icons/BookMarkIcon';
import styles from './css/BottomNav.module.css';
import { usePathname } from 'next/navigation';
import HomeFillIcon from './icons/HomeFillIcon';
import BookMarkFillIcon from './icons/BookMarkIconFill';
import SwordFillIcon from './icons/SwordFillIcon';

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className={`sm-only ${styles.nav}`}>
      <Link className={styles.button} href='/'>
        {pathname === '/' ? <HomeFillIcon /> : <HomeIcon />}
        <span>홈</span>
      </Link>

      <button className={styles.button} type='button'>
        <SearchIcon />
        <span>검색</span>
      </button>

      <button className={styles.button} type='button'>
        <TimerIcon />
        <span>타이머</span>
      </button>

      <Link className={styles.button} href='/bookmark'>
        {pathname === '/bookmark' ? <BookMarkFillIcon /> : <BookMarkIcon />}
        <span>북마크</span>
      </Link>

      <Link className={styles.button} href='/elmon'>
        {pathname === '/elmon' ? <SwordFillIcon /> : <SwordIcon />}
        <span>엘몬</span>
      </Link>
    </nav>
  );
}
