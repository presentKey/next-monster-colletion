import Link from 'next/link';
import styles from './css/GlobalNav.module.css';
import SunIcon from '../icons/SunIcon';

export default function GlobalNav() {
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
      <button className={styles.sign} type='button'>
        로그인
      </button>
    </nav>
  );
}
