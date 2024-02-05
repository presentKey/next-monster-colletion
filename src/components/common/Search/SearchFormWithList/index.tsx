'use client';
import SearchForm from '@/components/common/Search/SearchForm';
import SearchList from '../SearchList';
import { SearchMonster } from '@/model/monster';
import styles from './css/index.module.css';
import useSearch from '@/components/common/Search/hooks/useSearch';

type Props = {
  monsters: SearchMonster[];
  smHidden?: 'sm-hidden' | false;
};

export default function SearchFormWithList({
  monsters,
  smHidden = 'sm-hidden',
}: Props) {
  const {
    text,
    searchRef,
    listRef,
    filterdMonsters,
    select,
    cursor,
    listOpen,
    handleTextChange,
    handleTextClear,
    handleOpenList,
    handleCloseList,
    handleLinkClick,
  } = useSearch(monsters);

  return (
    <div
      className={`${smHidden ? smHidden : undefined} ${styles.search}`}
      ref={searchRef}
    >
      <SearchForm
        text={text}
        select={select}
        onChange={handleTextChange}
        onTextClear={handleTextClear}
        onClick={handleOpenList}
        onCloseList={handleCloseList}
      />
      {listOpen && (
        <SearchList
          ref={listRef}
          monsters={filterdMonsters}
          cursor={cursor}
          onLinkClick={handleLinkClick}
          onCloseList={handleCloseList}
        />
      )}
    </div>
  );
}
