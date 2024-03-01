'use client';
import Link from 'next/link';
import HomeIcon from '../../common/icons/HomeIcon';
import SwordIcon from '../../common/icons/SwordIcon';
import SearchIcon from '../../common/icons/SearchIcon';
import TimerIcon from '../../common/icons/TimerIcon';
import BookMarkIcon from '../../common/icons/BookMarkIcon';
import styles from './css/index.module.css';
import { usePathname } from 'next/navigation';
import HomeFillIcon from '../../common/icons/HomeFillIcon';
import BookMarkFillIcon from '../../common/icons/BookMarkIconFill';
import SwordFillIcon from '../../common/icons/SwordFillIcon';
import useTimerBar from '@/recoil/TimerBar/useTimerBar';
import useSearchBar from '@/recoil/SearchBar/useSearchBar';
import TimerBadge from '@/components/common/TimerBadge';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { toggleTimerBar } = useTimerBar();
  const { toggleSearchBar } = useSearchBar();

  return (
    <nav className={`sm-only ${styles.nav}`}>
      <Link className={styles.button} href='/'>
        {pathname === '/' ? <HomeFillIcon /> : <HomeIcon />}
        <span className={styles.text}>홈</span>
      </Link>

      <button className={styles.button} type='button' onClick={toggleSearchBar}>
        <SearchIcon size='big' />
        <span className={styles.text}>검색</span>
      </button>

      <button
        className={`${styles.timer} ${styles.button}`}
        type='button'
        onClick={toggleTimerBar}
      >
        <TimerIcon />
        <span className={styles.text}>타이머</span>
        <TimerBadge />
      </button>

      <Link className={styles.button} href='/bookmark'>
        {pathname === '/bookmark' ? <BookMarkFillIcon /> : <BookMarkIcon />}
        <span className={styles.text}>북마크</span>
      </Link>

      <Link className={styles.button} href='/elite'>
        {pathname === '/elite' ? <SwordFillIcon /> : <SwordIcon />}
        <span className={styles.text}>엘몬</span>
      </Link>
    </nav>
  );
}
