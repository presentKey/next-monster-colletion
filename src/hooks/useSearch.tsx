import { SearchMonster } from '@/model/monster';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const ARROW_UP = 'ArrowUp';
const ARROW_DOWN = 'ArrowDown';

export default function useSearch(monsters: SearchMonster[]) {
  const [text, setText] = useState('');
  const [keyword, setKeyword] = useState(text);
  const [select, setSelect] = useState<SearchMonster | null>(null);
  const [cursor, setCursor] = useState<number | null>(null);
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
  const handleTextClear = useCallback(() => {
    setText('');
    setKeyword('');
    setCursor(0);
  }, []);
  const handleOpenList = useCallback(() => setListOpen(true), []);
  const handleCloseList = useCallback(() => setListOpen(false), []);
  const handleLinkClick = useCallback((name: string) => {
    setText(name);
    setCursor(0);
    setKeyword(name);
  }, []);
  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setListOpen(true);
      setText(e.target.value);
      setKeyword(e.target.value);
      setCursor(0);
    },
    []
  );

  /** 방향키에 따른 검색 목록 스크롤 함수 */
  const scrollSearchList = useCallback(
    (cursor: number, direction: 'ArrowUp' | 'ArrowDown') => {
      const position =
        listRef.current?.children[cursor].getBoundingClientRect().top;

      if (position && direction === 'ArrowDown') {
        cursor < filterdMonsters.length - 1
          ? listRef.current?.scrollBy({
              top: position - 75,
            })
          : listRef.current?.scrollTo({ top: 0 }); // 검색 리스트 마지막에서 첫 번째로 이동 시, 스크롤 최상단 이동
      } else if (position && direction === 'ArrowUp') {
        cursor > 0
          ? listRef.current?.scrollBy({
              top: position - 150,
            })
          : listRef.current?.scrollTo({
              top: listRef.current.childElementCount * 35, // 검색 리스트 마지막으로 이동 시, 스크롤 최하단 이동
            });
      }
    },
    [filterdMonsters.length]
  );

  /** 검색 목록 위, 아래 방향키 이벤트 */
  useEffect(() => {
    if (filterdMonsters.length === 0) {
      setSelect(null);
      return;
    }
    const searchInstance = searchRef.current;

    const downHandler = (e: KeyboardEvent) => {
      if (e.key === ARROW_DOWN) {
        if (cursor === null) {
          setCursor(0);
          setText(filterdMonsters[0].name);
          scrollSearchList(0, ARROW_DOWN);
          return;
        }

        setCursor((prev) => {
          if (prev === null) return prev;
          const cursor = prev < filterdMonsters.length - 1 ? prev + 1 : 0;
          setText(filterdMonsters[cursor].name);
          scrollSearchList(prev, ARROW_DOWN);

          return cursor;
        });
      }
    };

    const upHandler = (e: KeyboardEvent) => {
      if (e.key === ARROW_UP) {
        if (cursor === null) {
          const filterdMonstersLength = filterdMonsters.length - 1;
          setCursor(filterdMonstersLength);
          setText(filterdMonsters[filterdMonstersLength].name);
          scrollSearchList(filterdMonstersLength, ARROW_UP);
          return;
        }
        setCursor((prev) => {
          if (prev === null) return prev;
          const cursor = prev > 0 ? prev - 1 : filterdMonsters.length - 1;
          setText(filterdMonsters[cursor].name);
          scrollSearchList(prev, ARROW_UP);

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
  }, [cursor, filterdMonsters, scrollSearchList]);

  /** 검색 목록에서 현재 선택한 몬스터 */
  useEffect(() => {
    if (filterdMonsters.length === 0 || cursor === null) {
      setSelect(null);
      return;
    }

    setSelect({
      name: filterdMonsters[cursor].name,
      path: filterdMonsters[cursor].path,
    });
  }, [cursor, filterdMonsters]);

  /** 검색 목록 바깥 영역 클릭 시, 목록 닫기 */
  useEffect(() => {
    if (!listOpen) return;

    const closeSearchList = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setCursor(null);
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
