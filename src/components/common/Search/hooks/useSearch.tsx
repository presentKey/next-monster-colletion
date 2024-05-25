import { SearchMonster } from '@/model/monster';
import calcScrollAmount from '@/utils/calcScrollAmount';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const ARROW_UP = 'ArrowUp';
const ARROW_DOWN = 'ArrowDown';

// 값 변경 시, SearchList 컴포넌트의 .list 클래스 max-height 변경해주세요.
const SEARCH_LIST_SHOW_MAX_ITEM_COUNT = 7;

type keyDirection = typeof ARROW_UP | typeof ARROW_DOWN;

export default function useSearch(monsters: SearchMonster[]) {
  const [text, setText] = useState(''); //사용자가 입력한 search form text 상태
  const [keyword, setKeyword] = useState(''); // search list 방향키 이벤트 발생 전, 사용자가 입력한 keyword 상태
  const [selected, setSelected] = useState<SearchMonster | null>(null); // search list에서 선택된 item
  const [cursor, setCursor] = useState<number | null>(null); // search list에서 현재 선택된 item의 cursor
  const [listOpen, setListOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null); // search 최상위 element
  const listRef = useRef<HTMLOListElement>(null); // search list element
  const searchParams = useSearchParams();

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
      setCursor(null);
      setSelected(null);
    },
    []
  );

  /** 방향키에 따른 검색 목록 스크롤 함수 */
  const scrollSearchList = useCallback(
    (cursor: number, direction: keyDirection) => {
      const listElement = listRef.current;
      const itemHeight = listElement?.children[0].clientHeight || 32;

      // 아래 방향키
      if (direction === ARROW_DOWN) {
        cursor >= SEARCH_LIST_SHOW_MAX_ITEM_COUNT
          ? listElement?.scrollBy({ top: itemHeight })
          : listElement?.scrollTo({ top: 0 });

        return;
      }

      // 위 방향키
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
    if (!listOpen) return;

    // 일치하는 몬스터가 없으면 이벤트가 발생하지 않음
    if (filterdMonsters.length === 0) {
      setSelected(null);
      return;
    }

    const searchElement = searchRef.current;

    const KeyHandler = (e: KeyboardEvent) => {
      // 아래 방향키
      if (e.key === ARROW_DOWN) {
        let nextCursor;

        if (cursor === null) nextCursor = 0;
        else nextCursor = cursor < filterdMonsters.length - 1 ? cursor + 1 : 0;

        setCursor(nextCursor);
        setText(filterdMonsters[nextCursor].name);
        setSelected({
          name: filterdMonsters[nextCursor].name,
          path: filterdMonsters[nextCursor].path,
        });
        scrollSearchList(nextCursor, ARROW_DOWN);
        return;
      }

      // 위 방향키
      if (e.key === ARROW_UP) {
        let nextCursor;

        if (cursor === null) nextCursor = filterdMonsters.length - 1;
        else nextCursor = cursor > 0 ? cursor - 1 : filterdMonsters.length - 1;

        setCursor(nextCursor);
        setText(filterdMonsters[nextCursor].name);
        setSelected({
          name: filterdMonsters[nextCursor].name,
          path: filterdMonsters[nextCursor].path,
        });
        scrollSearchList(nextCursor, ARROW_UP);
        return;
      }
    };

    searchElement?.addEventListener('keydown', KeyHandler);

    return () => {
      searchElement?.removeEventListener('keydown', KeyHandler);
    };
  }, [listOpen, cursor, filterdMonsters, scrollSearchList]);

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

  /** URL's query string 'search'값으로 text, keyword, selected 상태 설정  */
  useEffect(() => {
    const searchParam = searchParams.get('search');
    if (searchParam) {
      const selectedMonster =
        monsters.find((monster) => monster.name === searchParam) || null;

      setText(searchParam);
      setKeyword(searchParam);
      setSelected(selectedMonster);
    }
  }, [searchParams]);

  /** 검색한 몬스터 위치로 페이지 스크롤 */
  useEffect(() => {
    const searchParam = searchParams.get('search');
    const cardNodeList = document.querySelectorAll(
      `[data-monster-name='${searchParam}']`
    );

    if (cardNodeList.length >= 1) {
      const position = cardNodeList[0].getBoundingClientRect().top;

      window.scrollBy({
        top: calcScrollAmount(position),
      });
    }
  }, [searchParams]);

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
