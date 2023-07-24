'use client';
import SearchForm from '@/components/common/SearchForm/SearchForm';
import styles from './css/SearchBarcontent.module.css';
import useSearchBar from '@/recoil/SearchBar/useSearchBar';
import CloseIcon from '@/components/common/icons/CloseIcon';
import BackgroundOverlay from '@/components/common/BackgroundOverlay/BackgroundOverlay';
import { SearchMonster } from '@/model/monster';
import Link from 'next/link';

type Props = {
  monsters: SearchMonster[];
};

export default function SearchBarcontent({ monsters }: Props) {
  const { open, toggleSearchBar } = useSearchBar();

  return (
    <>
      <aside
        className={`sm-only ${styles.searchbar} ${open && styles['is-open']}`}
      >
        <header className={`${styles.header}`}>
          <SearchForm />
          <button
            className={styles.close}
            type='button'
            onClick={toggleSearchBar}
          >
            <CloseIcon />
          </button>
        </header>

        <ul>
          {monsters.map(({ name, path }) => (
            <Link href={path ? `/category/${path}` : '/'} key={name}>
              {name}
            </Link>
          ))}
        </ul>
      </aside>
      {open && <BackgroundOverlay onClose={toggleSearchBar} />}
    </>
  );
}
