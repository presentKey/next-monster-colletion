'use client';
import SearchForm from '@/components/common/Search/SearchForm';
import SearchList from '../SearchList';
import { SearchMonster } from '@/model/monster';
import styles from './css/index.module.css';
import useSearch from '@/components/common/Search/hooks/useSearch';
import { usePathname } from 'next/navigation';

type Props = {
  monsters: SearchMonster[];
  responsive?: 'sm-hidden';
  visuallyHidden?: boolean;
  hasShadow?: boolean;
};

export default function SearchFormWithList({
  monsters,
  responsive,
  visuallyHidden = false,
  hasShadow = true,
}: Props) {
  const {
    text,
    searchRef,
    listRef,
    filterdMonsters,
    selected,
    cursor,
    listOpen,
    handleTextChange,
    handleTextClear,
    handleOpenList,
    handleCloseList,
    handleLinkClick,
  } = useSearch(monsters);
  const pathname = usePathname();

  return (
    <div
      className={`${responsive === 'sm-hidden' ? 'sm-hidden' : undefined} ${
        visuallyHidden && pathname === '/' && 'visually-hidden'
      } ${styles.search}`}
      ref={searchRef}
    >
      <SearchForm
        text={text}
        selected={selected}
        hasShadow={hasShadow}
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
