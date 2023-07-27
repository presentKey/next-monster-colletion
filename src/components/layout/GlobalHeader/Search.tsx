'use client';
import SearchForm from '@/components/common/SearchForm/SearchForm';
import { useEffect, useRef, useState } from 'react';
import SearchList from '../SearchBar/SearchList';
import { SearchMonster } from '@/model/monster';
import styles from './css/Search.module.css';

type Props = {
  monsters: SearchMonster[];
};

export default function Search({ monsters }: Props) {
  const [text, setText] = useState('');
  const [listOpen, setListOpen] = useState(false);
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!listOpen) return;

    const closeSearchList = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setListOpen(false);
      }
    };

    document.addEventListener('click', closeSearchList);
    return () => document.removeEventListener('click', closeSearchList);
  }, [listOpen]);

  return (
    <div className={`sm-hidden ${styles.search}`} ref={searchRef}>
      <SearchForm
        text={text}
        onChange={handleTextChange}
        onTextClear={() => setText('')}
        onClick={() => setListOpen(true)}
      />
      {listOpen && <SearchList monsters={monsters} text={text} />}
    </div>
  );
}
