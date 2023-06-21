import styles from './css/GlobalHeader.module.css';
import { dohyeon } from '@/app/layout';
import Link from 'next/link';
import GlobalNav from './GlobalNav';
import SearchForm from '../SearchForm';
import HamburgerMenu from './HamburgerMenu';

export default function GlobalHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={`sm-only ${styles.menu}`}>
          <HamburgerMenu />
        </div>
        <Link href='/' className={`${dohyeon.className} ${styles.title}`}>
          몬스터컬렉션
        </Link>
        <SearchForm />
        <GlobalNav />
      </div>
    </header>
  );
}
