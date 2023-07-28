'use client';
import SearchForm from '@/components/common/SearchForm/SearchForm';
import styles from './css/SearchBarcontent.module.css';
import useSearchBar from '@/recoil/SearchBar/useSearchBar';
import CloseIcon from '@/components/common/icons/CloseIcon';
import BackgroundOverlay from '@/components/common/BackgroundOverlay/BackgroundOverlay';
import { SearchMonster } from '@/model/monster';
import SearchList from '../../common/SearchList/SearchList';
import useSearch from '@/app/hooks/useSearch';

type Props = {
  monsters: SearchMonster[];
};

export default function SearchBarcontent({ monsters }: Props) {
  const { text, filterdMonsters, select, handleTextChange, handleTextClear } =
    useSearch(monsters);
  const { open, toggleSearchBar } = useSearchBar();

  return (
    <>
      <aside
        className={`sm-only ${styles.searchbar} ${open && styles['is-open']}`}
      >
        <header className={`${styles.header}`}>
          <SearchForm
            text={text}
            select={select}
            onChange={handleTextChange}
            onTextClear={handleTextClear}
          />
          <button
            className={styles.close}
            type='button'
            onClick={toggleSearchBar}
          >
            <CloseIcon />
          </button>
        </header>
        <SearchList monsters={filterdMonsters} />
      </aside>
      {open && <BackgroundOverlay onClose={toggleSearchBar} />}
    </>
  );
}