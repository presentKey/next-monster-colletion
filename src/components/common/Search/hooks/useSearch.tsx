import { SearchMonster } from '@/model/monster';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const ARROW_UP = 'ArrowUp';
const ARROW_DOWN = 'ArrowDown';

const SEARCH_LIST_SHOW_MAX_ITEM_COUNT = 7;

type keyDirection = typeof ARROW_UP | typeof ARROW_DOWN;

export default function useSearch(monsters: SearchMonster[]) {
  const [text, setText] = useState(''); // 사용자가 입력한 search form text 상태
  const [keyword, setKeyword] = useState(''); // search list 방향키 이벤트 발생 전, 사용자가 입력한 keyword 상태
  const [selected, setSelected] = useState<SearchMonster | null>(null); // search list에서 선택된 item
  const [cursor, setCursor] = useState<number | null>(null); // search list에서 현재 선택된 item의 cursor
  const [listOpen, setListOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null); // search 최상위 element
  const listRef = useRef<HTMLOListElement>(null); // search list element

  /** search list 방향키 이벤트 발생 전, 사용자가 입력한 keyword에 따라 목록 필터 */
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
    setCursor(null);
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
      e.target.value.trim() === '' ? setCursor(null) : setCursor(0);
    },
    []
  );

  /** 방향키에 따른 검색 목록 스크롤 함수 */
  const scrollSearchList = useCallback(
    (cursor: number, direction: keyDirection) => {
      const listElement = listRef.current;
      const itemHeight = listElement?.children[0].clientHeight || 32;

      if (direction === ARROW_DOWN) {
        cursor >= SEARCH_LIST_SHOW_MAX_ITEM_COUNT
          ? listElement?.scrollBy({ top: itemHeight })
          : listElement?.scrollTo({ top: 0 });

        return;
      }

      if (direction === ARROW_UP) {
        cursor <= filterdMonsters.length - 1 - SEARCH_LIST_SHOW_MAX_ITEM_COUNT
          ? listElement?.scrollBy({ top: -itemHeight })
          : listElement?.scrollTo({
              top: listElement.childElementCount * itemHeight,
            });

        return;
      }
    },
    [filterdMonsters.length]
  );

  /** 검색 목록 위, 아래 방향키 이벤트 */
  useEffect(() => {
    // 일치하는 몬스터가 없으면 이벤트가 발생하지 않음
    if (filterdMonsters.length === 0) {
      setSelected(null);
      return;
    }

    const searchElement = searchRef.current;

    /** 위 방향키 이벤트 핸들러 */
    const ArrowDownKeyHandler = (e: KeyboardEvent) => {
      if (e.key === ARROW_DOWN) {
        if (cursor === null) {
          setCursor(0);
          setText(filterdMonsters[0].name);
          scrollSearchList(0, ARROW_DOWN);
          return;
        }

        const nextCursor = cursor < filterdMonsters.length - 1 ? cursor + 1 : 0;

        setCursor(nextCursor);
        setText(filterdMonsters[nextCursor].name);
        scrollSearchList(nextCursor, ARROW_DOWN);
      }
    };

    /** 위 방향키 이벤트 핸들러 */
    const ArrowUpKeyHandler = (e: KeyboardEvent) => {
      if (e.key === ARROW_UP) {
        if (cursor === null) {
          const last = filterdMonsters.length - 1;
          setCursor(last);
          setText(filterdMonsters[last].name);
          scrollSearchList(last, ARROW_UP);
          return;
        }

        const nextCursor = cursor > 0 ? cursor - 1 : filterdMonsters.length - 1;

        setCursor(nextCursor);
        setText(filterdMonsters[nextCursor].name);
        scrollSearchList(nextCursor, ARROW_UP);
      }
    };

    searchElement?.addEventListener('keydown', ArrowDownKeyHandler);
    searchElement?.addEventListener('keydown', ArrowUpKeyHandler);

    return () => {
      searchElement?.removeEventListener('keydown', ArrowDownKeyHandler);
      searchElement?.removeEventListener('keydown', ArrowUpKeyHandler);
    };
  }, [cursor, filterdMonsters, scrollSearchList]);

  /** 검색 목록에서 현재 선택한 몬스터 */
  useEffect(() => {
    if (filterdMonsters.length === 0 || cursor === null) {
      setSelected(null);
      return;
    }

    setSelected({
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
    selected,
    cursor,
    listOpen,
    handleTextChange,
    handleTextClear,
    handleOpenList,
    handleCloseList,
    handleLinkClick,
  };
}
