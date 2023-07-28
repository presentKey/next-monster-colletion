'use client';
import SearchForm from '@/components/common/SearchForm/SearchForm';
import SearchList from '../../common/SearchList/SearchList';
import { SearchMonster } from '@/model/monster';
import styles from './css/Search.module.css';
import useSearch from '@/app/hooks/useSearch';

type Props = {
  monsters: SearchMonster[];
};

export default function Search({ monsters }: Props) {
  const {
    text,
    searchRef,
    filterdMonsters,
    select,
    cursor,
    listOpen,
    handleTextChange,
    handleTextClear,
    handleOpenList,
    handleCloseList,
  } = useSearch(monsters);

  return (
    <div className={`sm-hidden ${styles.search}`} ref={searchRef}>
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
          monsters={filterdMonsters}
          cursor={cursor}
          onCloseList={handleCloseList}
        />
      )}
    </div>
  );
}
