import styles from './css/GlobalHeader.module.css';
import Link from 'next/link';
import GlobalNav from './GlobalNav';
import HamburgerMenu from './HamburgerMenu';
import { dohyeon } from '@/utils/fonts';
import Search from './Search';
import { service } from '@/service/pickService';

export default async function GlobalHeader() {
  const monsters = await service.search.getMonsters();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <HamburgerMenu />
        <Link href='/' className={`${dohyeon.className} ${styles.title}`}>
          몬스터컬렉션
        </Link>
        <Search monsters={monsters} />
        <GlobalNav />
      </div>
    </header>
  );
}
