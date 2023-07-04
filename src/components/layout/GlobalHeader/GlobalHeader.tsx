import styles from './css/GlobalHeader.module.css';
import Link from 'next/link';
import GlobalNav from './GlobalNav';
import SearchForm from '../../common/SearchForm/SearchForm';
import HamburgerMenu from './HamburgerMenu';
import { dohyeon } from '@/utils/fonts';

export default function GlobalHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <HamburgerMenu />
        <Link href='/' className={`${dohyeon.className} ${styles.title}`}>
          몬스터컬렉션
        </Link>
        <SearchForm />
        <GlobalNav />
      </div>
    </header>
  );
}
