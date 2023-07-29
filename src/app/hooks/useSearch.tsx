import { SearchMonster } from '@/model/monster';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const ARROW_UP = 'ArrowUp';
const ARROW_DOWN = 'ArrowDown';

export default function useSearch(monsters: SearchMonster[]) {
  const [text, setText] = useState('');
  const [keyword, setKeyword] = useState(text);
  const [select, setSelect] = useState<SearchMonster | null>(null);
  const [cursor, setCursor] = useState<number>(0);
  const [listOpen, setListOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
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
  const ScrollList = useCallback(
    (cursor: number, direction: 'ArrowUp' | 'ArrowDown') => {
      const position =
        listRef.current?.children[cursor].getBoundingClientRect().top;

      if (position && direction === 'ArrowDown') {
        cursor < filterdMonsters.length - 1
          ? listRef.current?.scrollBy({
              top: position - 5,
            })
          : listRef.current?.scrollTo({ top: 0 });
      } else if (position && direction === 'ArrowUp') {
        cursor > 0
          ? listRef.current?.scrollBy({
              top: position - 75,
            })
          : listRef.current?.scrollTo({
              top: listRef.current.childElementCount * 35,
            });
      }
    },
    [filterdMonsters.length]
  );

  useEffect(() => {
    if (filterdMonsters.length === 0) {
      setSelect(null);
      return;
    }
    const searchInstance = searchRef.current;

    const downHandler = (e: KeyboardEvent) => {
      if (e.key === ARROW_DOWN) {
        setCursor((prev) => {
          const cursor = prev < filterdMonsters.length - 1 ? prev + 1 : 0;
          setText(filterdMonsters[cursor].name);
          ScrollList(prev, ARROW_DOWN);

          return cursor;
        });
      }
    };

    const upHandler = (e: KeyboardEvent) => {
      if (e.key === ARROW_UP) {
        setCursor((prev) => {
          const cursor = prev > 0 ? prev - 1 : filterdMonsters.length - 1;
          setText(filterdMonsters[cursor].name);
          ScrollList(prev, ARROW_UP);

          return cursor;
        });
      }
    };

    searchInstance?.addEventListener('keydown', downHandler);
    searchInstance?.addEventListener('keydown', upHandler);

    return () => {
      searchInstance?.removeEventListener('keydown', downHandler);
      searchInstance?.removeEventListener('keydown', upHandler);
    };
  }, [cursor, filterdMonsters, ScrollList]);

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
  };
}
