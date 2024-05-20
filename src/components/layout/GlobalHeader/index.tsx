import styles from './css/index.module.css';
import Link from 'next/link';
import GlobalNav from './GlobalNav';
import HamburgerMenu from './HamburgerMenu';
import { dohyeon } from '@/utils/fonts';
import SearchFormWithList from '../../common/Search/SearchFormWithList';
import { service } from '@/service/pickService';
import { Suspense } from 'react';

export default async function GlobalHeader() {
  const monsters = await service.search.getMonsters();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <HamburgerMenu />
        <Link href='/' className={`${dohyeon.className} ${styles.title}`}>
          몬스터컬렉션
        </Link>
        <Suspense>
          <SearchFormWithList
            monsters={monsters}
            responsive='sm-hidden'
            visuallyHidden
          />
        </Suspense>
        <GlobalNav />
      </div>
    </header>
  );
}
