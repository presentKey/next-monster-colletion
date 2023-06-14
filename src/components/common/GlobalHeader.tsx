import styles from './css/GlobalHeader.module.css';
import { dohyeon } from '@/app/layout';
import MenuIcon from './icons/MenuIcon';
import SunIcon from './icons/SunIcon';
import Link from 'next/link';

export default function GlobalHeader() {
  return (
    <header className={styles.header}>
      <div>
        <MenuIcon />
      </div>
      <Link href='/' className={`${dohyeon.className} ${styles.title}`}>
        몬스터컬렉션
      </Link>
      <div className={styles.right}>
        <button type='button'>
          <SunIcon />
        </button>
        <button className={styles.sign} type='button'>
          로그인
        </button>
      </div>
    </header>
  );
}
