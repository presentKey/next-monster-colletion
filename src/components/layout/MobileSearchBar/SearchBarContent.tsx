'use client';
import SearchForm from '@/components/common/Search/SearchForm';
import styles from './css/SearchBarContent.module.css';
import useSearchBar from '@/recoil/SearchBar/useSearchBar';
import CloseIcon from '@/components/common/icons/CloseIcon';
import BackgroundOverlay from '@/components/common/BackgroundOverlay/BackgroundOverlay';
import { SearchMonster } from '@/model/monster';
import SearchList from '../../common/Search/SearchList';
import useSearch from '@/components/common/Search/hooks/useSearch';

type Props = {
  monsters: SearchMonster[];
};

export default function SearchBarContent({ monsters }: Props) {
  const {
    text,
    filterdMonsters,
    selected,
    handleTextChange,
    handleTextClear,
    handleLinkClick,
  } = useSearch(monsters);
  const { open, toggleSearchBar } = useSearchBar();

  return (
    <>
      <aside
        className={`sm-only ${styles.searchbar} ${open && styles['is-open']}`}
      >
        <header className={`${styles.header}`}>
          <SearchForm
            text={text}
            selected={selected}
            onChange={handleTextChange}
            onTextClear={handleTextClear}
            onCloseSearchBar={toggleSearchBar}
          />
          <button
            className={styles.close}
            type='button'
            onClick={toggleSearchBar}
          >
            <CloseIcon />
          </button>
        </header>
        <SearchList
          monsters={filterdMonsters}
          onLinkClick={handleLinkClick}
          onCloseSearchBar={toggleSearchBar}
          display='mobileSearchBar'
        />
      </aside>
      {open && <BackgroundOverlay onClose={toggleSearchBar} />}
    </>
  );
}
