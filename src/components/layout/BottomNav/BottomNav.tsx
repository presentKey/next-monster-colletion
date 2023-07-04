'use client';
import Link from 'next/link';
import HomeIcon from '../../common/icons/HomeIcon';
import SwordIcon from '../../common/icons/SwordIcon';
import SearchIcon from '../../common/icons/SearchIcon';
import TimerIcon from '../../common/icons/TimerIcon';
import BookMarkIcon from '../../common/icons/BookMarkIcon';
import styles from './css/BottomNav.module.css';
import { usePathname } from 'next/navigation';
import HomeFillIcon from '../../common/icons/HomeFillIcon';
import BookMarkFillIcon from '../../common/icons/BookMarkIconFill';
import SwordFillIcon from '../../common/icons/SwordFillIcon';

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
