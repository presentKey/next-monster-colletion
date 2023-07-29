import { SearchMonster } from '@/model/monster';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function useSearch(monsters: SearchMonster[]) {
  const [text, setText] = useState('');
  const [keyword, setKeyword] = useState(text);
  const [select, setSelect] = useState<SearchMonster | null>(null);
  const [cursor, setCursor] = useState<number>(0);
  const [listOpen, setListOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const filterdMonsters = useMemo(
    () =>
      monsters.filter(({ name }) =>
        name
          .replace(/ /g, '')
          .toUpperCase()
          .includes(keyword.replace(/ /g, '').toUpperCase())
      ),
    [keyword, monsters]
  );
  const handleTextClear = () => {
    setText('');
    setKeyword('');
    setCursor(0);
  };
  const handleOpenList = () => setListOpen(true);
  const handleCloseList = () => setListOpen(false);
  const handleLinkClick = (name: string) => {
    setText(name);
    setCursor(0);
    setKeyword(name);
  };
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListOpen(true);
    setText(e.target.value);
    setKeyword(e.target.value);
    setCursor(0);
  };

  useEffect(() => {
    const searchInstance = searchRef.current;

    const downHandler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        setCursor((prev) => {
          const cursor = prev < filterdMonsters.length - 1 ? prev + 1 : 0;
          setText(filterdMonsters[cursor].name);

          return cursor;
        });
      }
    };

    const upHandler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        setCursor((prev) => {
          const cursor = prev > 0 ? prev - 1 : filterdMonsters.length - 1;
          setText(filterdMonsters[cursor].name);

          return cursor;
        });
      }
    };

    searchInstance?.addEventListener('keydown', downHandler);
    searchInstance?.addEventListener('keyup', upHandler);

    return () => {
      searchInstance?.removeEventListener('keydown', downHandler);
      searchInstance?.removeEventListener('keyup', upHandler);
    };
  }, [cursor, filterdMonsters]);

  useEffect(() => {
    if (filterdMonsters.length === 0) {
      setSelect(null);
      return;
    }

    setSelect({
      name: filterdMonsters[cursor].name,
      path: filterdMonsters[cursor].path,
    });
  }, [cursor, filterdMonsters]);

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

  return {
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
    handleLinkClick,
  };
}
