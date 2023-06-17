import styles from './css/GlobalHeader.module.css';
import { dohyeon } from '@/app/layout';
import MenuIcon from '../icons/MenuIcon';
import Link from 'next/link';
import GlobalNav from './GlobalNav';
import SearchForm from '../SearchForm';
import { DarkModeProvider } from '@/context/DarkModeContext';

export default function GlobalHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className='sm-only'>
          <MenuIcon />
        </div>
        <Link href='/' className={`${dohyeon.className} ${styles.title}`}>
          몬스터컬렉션
        </Link>
        <SearchForm />
        <DarkModeProvider>
          <GlobalNav />
        </DarkModeProvider>
      </div>
    </header>
  );
}
