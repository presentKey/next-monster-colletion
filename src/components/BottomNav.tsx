import Link from 'next/link';
import HomeIcon from './icons/HomeIcon';
import SwordIcon from './icons/SwordIcon';
import SearchIcon from './icons/SearchIcon';
import TimerIcon from './icons/TimerIcon';
import BookMarkIcon from './icons/BookMarkIcon';
import styles from './css/BottomNav.module.css';

export default function BottomNav() {
  return (
    <nav className={`sm-only ${styles['bottom-nav']}`}>
      <Link className={styles.button} href='/'>
        <HomeIcon />
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
        <BookMarkIcon />
        <span>북마크</span>
      </Link>

      <Link className={styles.button} href='/elmon'>
        <SwordIcon />
        <span>엘몬</span>
      </Link>
    </nav>
  );
}
